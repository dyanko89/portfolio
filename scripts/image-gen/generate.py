#!/usr/bin/env python3
"""Generate blog featured images via a local ComfyUI Flux workflow.

Requires a running ComfyUI server (see C:\\Users\\djyan\\ComfyUI\\comfyui-manager.ps1)
reachable at COMFY_URL. Prompts and per-post subject/mood clauses live in
prompts.json; the node graph lives in workflow.json.

Usage:
    python generate.py                       # generate all posts missing an image
    python generate.py coordination-debt      # generate one post
    python generate.py --force                # regenerate everything
"""
import argparse
import copy
import json
import pathlib
import time
import urllib.parse
import urllib.request
import uuid
import zlib

COMFY_URL = "http://127.0.0.1:8188"
SCRIPT_DIR = pathlib.Path(__file__).resolve().parent
WORKFLOW_PATH = SCRIPT_DIR / "workflow.json"
PROMPTS_PATH = SCRIPT_DIR / "prompts.json"
OUTPUT_DIR = SCRIPT_DIR.parents[1] / "public" / "images" / "blog"


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def build_prompt_text(config, slug):
    post = config["posts"].get(slug)
    if post is None:
        raise SystemExit(f"No prompt entry for slug '{slug}' in prompts.json")
    return config["base_template"].format(subject=post["subject"], mood=post["mood"])


def build_workflow(workflow_template, config, slug, seed):
    wf = copy.deepcopy(workflow_template)
    wf["3"]["inputs"]["text"] = build_prompt_text(config, slug)
    wf["4"]["inputs"]["guidance"] = config.get("guidance", 3.5)
    wf["7"]["inputs"]["width"] = config["resolution"]["width"]
    wf["7"]["inputs"]["height"] = config["resolution"]["height"]
    wf["8"]["inputs"]["seed"] = seed
    wf["8"]["inputs"]["steps"] = config.get("steps", 20)
    wf["10"]["inputs"]["filename_prefix"] = f"blog-featured/{slug}"
    return wf


def queue_prompt(workflow):
    client_id = str(uuid.uuid4())
    payload = json.dumps({"prompt": workflow, "client_id": client_id}).encode("utf-8")
    req = urllib.request.Request(
        f"{COMFY_URL}/prompt", data=payload, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = json.loads(resp.read())
    if "error" in body:
        raise RuntimeError(f"ComfyUI rejected the prompt: {body['error']}")
    return body["prompt_id"]


def wait_for_result(prompt_id, timeout=300):
    deadline = time.time() + timeout
    while time.time() < deadline:
        with urllib.request.urlopen(f"{COMFY_URL}/history/{prompt_id}", timeout=10) as resp:
            history = json.loads(resp.read())
        entry = history.get(prompt_id)
        if entry:
            status = entry.get("status", {})
            if status.get("status_str") == "error":
                raise RuntimeError(f"ComfyUI generation failed: {status}")
            for node_output in entry.get("outputs", {}).values():
                images = node_output.get("images")
                if images:
                    return images[0]
        time.sleep(2)
    raise TimeoutError(f"Timed out waiting for prompt {prompt_id}")


def fetch_and_save(image_info, dest_path):
    params = urllib.parse.urlencode(
        {
            "filename": image_info["filename"],
            "subfolder": image_info.get("subfolder", ""),
            "type": image_info.get("type", "output"),
        }
    )
    with urllib.request.urlopen(f"{COMFY_URL}/view?{params}", timeout=30) as resp:
        dest_path.write_bytes(resp.read())


def generate_one(slug, config, workflow_template, seed, force):
    dest = OUTPUT_DIR / f"{slug}.png"
    if dest.exists() and not force:
        print(f"skip {slug} (already exists, use --force to regenerate)")
        return
    workflow = build_workflow(workflow_template, config, slug, seed)
    print(f"queueing {slug} (seed={seed})...")
    prompt_id = queue_prompt(workflow)
    image_info = wait_for_result(prompt_id)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    fetch_and_save(image_info, dest)
    print(f"saved {dest}")


def main():
    parser = argparse.ArgumentParser(description="Generate blog featured images via ComfyUI/Flux")
    parser.add_argument(
        "slugs", nargs="*", help="Blog post slugs to generate (default: all defined in prompts.json)"
    )
    parser.add_argument("--force", action="store_true", help="Overwrite existing images")
    parser.add_argument(
        "--seed", type=int, default=None, help="Fixed seed for every slug (default: deterministic per-slug seed)"
    )
    args = parser.parse_args()

    config = load_json(PROMPTS_PATH)
    workflow_template = load_json(WORKFLOW_PATH)

    slugs = args.slugs or list(config["posts"].keys())
    for slug in slugs:
        seed = args.seed if args.seed is not None else zlib.crc32(slug.encode())
        generate_one(slug, config, workflow_template, seed, args.force)


if __name__ == "__main__":
    main()
