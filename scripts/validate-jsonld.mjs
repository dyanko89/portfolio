// Validates that key pages emit parseable JSON-LD.
// Usage: node scripts/validate-jsonld.mjs [baseUrl]  (default http://localhost:3000)
const base = process.argv[2] ?? "http://localhost:3000";
const pages = [
  "/",
  "/blog/four-kilobyte-reads",
  "/projects/kopeng-self-curating-memory",
  "/services",
];

let failed = false;
for (const page of pages) {
  const res = await fetch(base + page);
  if (!res.ok) {
    console.error(`FAIL ${page}: HTTP ${res.status}`);
    failed = true;
    continue;
  }
  const html = await res.text();
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    ),
  ].map((m) => m[1]);
  if (blocks.length === 0) {
    console.error(`FAIL ${page}: no JSON-LD found`);
    failed = true;
    continue;
  }
  for (const block of blocks) {
    try {
      const data = JSON.parse(block);
      console.log(`OK   ${page}: ${data["@type"] ?? "(untyped)"}`);
    } catch {
      console.error(`FAIL ${page}: unparseable JSON-LD`);
      failed = true;
    }
  }
}
process.exit(failed ? 1 : 0);
