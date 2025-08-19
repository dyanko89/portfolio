# Dynamic Project Integration Guide

## Summary

This document outlines strategies for connecting your portfolio website to external project management sources (like Obsidian vault, Notion, etc.) to automatically update project timelines and roadmaps. Instead of manually maintaining static project data, these approaches create a "source of truth" system that keeps your portfolio synchronized with your actual project progress.

## Strategy Comparison

### Primary Strategy: GitHub-Obsidian Workflow
**Concept**: Sync your Obsidian vault to GitHub, then have your Next.js site read project roadmaps from the GitHub API during build time.

**Pros:**
- ✅ Leverages existing Git workflow
- ✅ Free and reliable (GitHub API)
- ✅ Version controlled project data
- ✅ Minimal external dependencies
- ✅ Works with your current Obsidian setup
- ✅ Automatic rebuilds via GitHub Actions

**Cons:**
- ❌ Requires GitHub API token management
- ❌ Build-time updates only (not real-time)
- ❌ Requires markdown parsing logic
- ❌ Limited to GitHub's rate limits

### Alternative Approaches Comparison

#### Notion API Integration
**Pros:**
- ✅ Rich, user-friendly interface
- ✅ Structured data with relations
- ✅ Real-time collaboration
- ✅ Excellent API documentation
- ✅ Native task/project management features

**Cons:**
- ❌ Requires migrating from Obsidian
- ❌ Additional subscription cost
- ❌ Learning new platform
- ❌ Vendor lock-in

#### GitHub Actions Automation
**Pros:**
- ✅ Fully automated rebuild triggers
- ✅ Scheduled updates available
- ✅ Integrates with existing Git workflow
- ✅ Can trigger on specific file changes

**Cons:**
- ❌ Build time delays for updates
- ❌ GitHub Actions usage limits
- ❌ More complex deployment pipeline

#### Real-Time with Supabase
**Pros:**
- ✅ Live updates as you work
- ✅ Real-time subscriptions
- ✅ Robust database features
- ✅ Good TypeScript support

**Cons:**
- ❌ Additional service dependency
- ❌ Monthly subscription costs
- ❌ More complex architecture
- ❌ Requires data synchronization logic

---

## 🔄 Dynamic Project Integration Strategies

### 🏆 Recommended Approach: GitHub-Obsidian Workflow

**Why this works best for you:**
- Leverages your existing Git/GitHub workflow
- Obsidian vaults can sync to GitHub automatically
- Next.js can read from GitHub API during build
- Free, reliable, and version-controlled

**Implementation:**

**lib/external-data.ts**
```typescript
// Fetch project data from GitHub-synced Obsidian vault
interface ProjectRoadmap {
  project: string;
  phases: ProjectPhase[];
}

interface ProjectPhase {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  tasks: Task[];
}

interface Task {
  title: string;
  completed: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export async function fetchProjectRoadmap(projectSlug: string): Promise<ProjectRoadmap | null> {
  try {
    // Fetch from GitHub API (your Obsidian vault repo)
    const response = await fetch(
      `https://api.github.com/repos/your-username/obsidian-vault/contents/projects/${projectSlug}-roadmap.md`,
      {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3.raw'
        }
      }
    );
    
    if (!response.ok) return null;
    
    const markdownContent = await response.text();
    return parseObsidianRoadmap(markdownContent);
  } catch (error) {
    console.error('Failed to fetch roadmap:', error);
    return null;
  }
}

function parseObsidianRoadmap(markdown: string): ProjectRoadmap {
  const lines = markdown.split('\n');
  const phases: ProjectPhase[] = [];
  let currentPhase: ProjectPhase | null = null;
  
  lines.forEach(line => {
    // Parse phase headers: ## Phase: Discovery & Analysis
    if (line.startsWith('## Phase: ')) {
      if (currentPhase) phases.push(currentPhase);
      
      currentPhase = {
        id: `phase-${phases.length}`,
        name: line.replace('## Phase: ', ''),
        status: 'pending',
        tasks: []
      };
    }
    
    // Parse tasks: - [x] Task name or - [ ] Task name
    if (line.startsWith('- [') && currentPhase) {
      const completed = line.includes('[x]');
      const title = line.replace(/^- \[[x ]\]\s*/, '');
      
      currentPhase.tasks.push({ title, completed });
      
      // Determine phase status based on task completion
      const completedTasks = currentPhase.tasks.filter(t => t.completed).length;
      const totalTasks = currentPhase.tasks.length;
      
      if (completedTasks === totalTasks) {
        currentPhase.status = 'completed';
      } else if (completedTasks > 0) {
        currentPhase.status = 'in-progress';
      }
    }
  });
  
  if (currentPhase) phases.push(currentPhase);
  
  return {
    project: '', // Extract from filename or frontmatter
    phases
  };
}
```

**app/projects/[slug]/page.tsx**
```typescript
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  // Fetch dynamic roadmap data
  const roadmapData = await fetchProjectRoadmap(params.slug);
  const content = await renderMDX(project.content);

  return (
    <div className="projects-page-container">
      <ProjectDetailClient 
        project={project} 
        renderedContent={content}
        roadmapData={roadmapData} // Pass dynamic data
      />
    </div>
  );
}
```

## 🔄 Alternative Approaches

### 1. Notion API Integration (Most User-Friendly)

**Setup:**
```bash
npm install @notionhq/client@^2.2.3
```

**lib/notion-integration.ts**
```typescript
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function fetchNotionRoadmap(projectId: string) {
  try {
    // Query Notion database for project roadmap
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'Project',
        select: { equals: projectId }
      }
    });

    return parseNotionPages(response.results);
  } catch (error) {
    console.error('Notion fetch error:', error);
    return null;
  }
}
```

**Benefits:**
- Rich UI for managing roadmaps
- Real-time collaboration
- Structured data with relations
- Excellent API documentation

### 2. GitHub Actions Automation

**Setup automatic rebuilds when Obsidian vault changes:**

**.github/workflows/sync-obsidian.yml**
```yaml
name: Sync Obsidian Updates
on:
  push:
    paths:
      - 'projects/**/*.md'
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours

jobs:
  update-portfolio:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Portfolio Rebuild
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.VERCEL_TOKEN }}" \
            "https://api.vercel.com/v1/integrations/deploy/your-deployment-id"
```

### 3. Real-Time with Supabase

**For live updates as you work:**

```typescript
// lib/supabase-sync.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function syncProjectProgress(projectSlug: string, phases: ProjectPhase[]) {
  const { data, error } = await supabase
    .from('project_roadmaps')
    .upsert({
      project_slug: projectSlug,
      phases: phases,
      updated_at: new Date().toISOString()
    });

  return { data, error };
}

// Real-time subscription in component
export function useProjectProgress(projectSlug: string) {
  const [phases, setPhases] = useState<ProjectPhase[]>([]);

  useEffect(() => {
    const subscription = supabase
      .channel(`project-${projectSlug}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'project_roadmaps' },
        (payload) => setPhases(payload.new.phases)
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [projectSlug]);

  return phases;
}
```

## 🎯 Recommended Implementation Plan

### Phase 1: Foundation (Week 1)
1. **Set up GitHub sync** for your Obsidian vault
2. **Create markdown parser** for roadmap files
3. **Implement fallback system** (current static data if fetch fails)

### Phase 2: Enhancement (Week 2)
1. **Add caching layer** for external API calls
2. **Implement error handling** and retry logic
3. **Create admin interface** for manual data refresh

### Phase 3: Automation (Week 3)
1. **Set up GitHub Actions** for automatic rebuilds
2. **Add webhook endpoints** for real-time updates
3. **Implement status tracking** across multiple projects

## 📊 Data Structure Example

### Your Obsidian vault structure:
```
vault/
├── projects/
│   ├── ai-assistant-roadmap.md
│   ├── development-toolkit-roadmap.md
│   └── lms-platform-roadmap.md
└── templates/
    └── project-roadmap-template.md
```

### ai-assistant-roadmap.md:
```markdown
---
project: ai-assistant
status: completed
last_updated: 2024-12-10
---

# AI Assistant Project Roadmap

## Phase: Discovery & Analysis
- [x] Stakeholder interviews
- [x] Email workflow analysis  
- [x] Technical requirements gathering

## Phase: System Design
- [x] API integration planning
- [x] Data flow architecture
- [x] Security framework design

## Phase: Development
- [x] Email processing engine
- [x] Task extraction logic
- [x] Asana integration
- [x] Response automation

## Phase: Testing & Deployment
- [x] Unit testing
- [x] Integration testing
- [x] User acceptance testing
- [x] Production deployment
```

### Expected TypeScript Interfaces:
```typescript
interface ProjectRoadmap {
  project: string;
  phases: ProjectPhase[];
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  lastUpdated: string;
}

interface ProjectPhase {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  tasks: Task[];
  startDate?: string;
  endDate?: string;
}

interface Task {
  title: string;
  completed: boolean;
  priority?: 'high' | 'medium' | 'low';
  assignee?: string;
  dueDate?: string;
}
```

## Implementation Benefits

This approach would give you:
- ✅ **Single source of truth** in Obsidian
- ✅ **Automatic website updates** when you update roadmaps
- ✅ **Version control** for all project data
- ✅ **Fallback systems** for reliability
- ✅ **Real-time updates** (optional with webhooks)
- ✅ **Minimal maintenance overhead**
- ✅ **Professional project tracking**

## Getting Started

1. **Choose your preferred approach** (GitHub-Obsidian recommended)
2. **Set up the basic integration** with fallback to current static data
3. **Test with one project** before rolling out to all projects
4. **Add automation and enhancement features** incrementally
5. **Monitor and optimize** based on usage patterns

This system would transform your portfolio from static project showcases to dynamic, living documentation that reflects your actual work progress in real-time.
