# Project Background Images Setup Guide

## Overview

The project header now supports background images that automatically populate both the project detail pages and the project cards on the /projects page. This creates a cohesive visual experience across your portfolio.

## File Structure

Place your project background images in the following directory:

```
public/
└── images/
    └── projects/
        ├── ai-assistant-bg.jpg
        ├── dev-toolkit-bg.jpg
        ├── b2b-marketing-bg.jpg
        └── enterprise-lms-bg.jpg
```

## Image Specifications

**Recommended Dimensions:**
- **Project Header**: 1200x400px (3:1 aspect ratio)
- **Project Cards**: Will automatically scale from header images
- **Format**: JPG, PNG, or WebP
- **Size**: Under 500KB for optimal loading

**Visual Guidelines:**
- **High contrast subjects** work best (avoid busy backgrounds)
- **Darker images** provide better text readability
- **Professional/technical imagery** that relates to your project
- **Consistent color temperature** across all project images

## Adding New Project Images

1. **Add image file** to `/public/images/projects/`
2. **Update the mapping** in `/lib/project-utils.ts`:

```typescript
export function getProjectBackgroundImage(slug: string): string | null {
  const backgroundImages: Record<string, string> = {
    'ai-assistant': '/images/projects/ai-assistant-bg.jpg',
    'ai-development-toolkit': '/images/projects/dev-toolkit-bg.jpg',
    'b2b-marketing-infrastructure': '/images/projects/b2b-marketing-bg.jpg',
    'enterprise-lms': '/images/projects/enterprise-lms-bg.jpg',
    'your-new-project': '/images/projects/your-new-project-bg.jpg', // Add here
  };
  
  return backgroundImages[slug] || null;
}
```

3. **Rebuild** your site to see the changes

## How It Works

### Project Detail Pages
- Background image appears at **10% opacity** behind the header content
- **Glassmorphism effect** with backdrop blur for modern look
- **Automatic fallback** to default styling if no image is available

### Project Cards
- Background image fills the **96x96px image placeholder**
- **Subtle dark overlay** ensures icon visibility
- **"IMAGE" text fallback** for projects without background images
- **Consistent sizing** across all project cards

## Current Project Mappings

| Project Slug | Image File | Status |
|--------------|------------|---------|
| `ai-assistant` | `ai-assistant-bg.jpg` | ⏳ Ready for image |
| `ai-development-toolkit` | `dev-toolkit-bg.jpg` | ⏳ Ready for image |
| `b2b-marketing-infrastructure` | `b2b-marketing-bg.jpg` | ⏳ Ready for image |
| `enterprise-lms` | `enterprise-lms-bg.jpg` | ⏳ Ready for image |

## Image Ideas by Project Type

### AI/ML Projects
- Code editor with AI completion
- Neural network visualizations
- Data flow diagrams
- Terminal/console interfaces

### Development Tools
- IDE screenshots
- Code architecture diagrams
- Developer workspace setups
- Technical documentation

### Enterprise Solutions
- Professional dashboard interfaces
- Business workflow diagrams
- Corporate meeting/collaboration
- Clean, modern office environments

## Fallback Behavior

If no background image is provided:
- **Project header**: Uses default background with subtle texture
- **Project cards**: Shows "IMAGE" text placeholder
- **No broken functionality**: Everything works without images

## Performance Considerations

- Images are **loaded on-demand** (not preloaded)
- **Automatic optimization** by Next.js when using next/image
- **Graceful degradation** if images fail to load
- **CSS background-image** for responsive scaling

## Future Enhancements

Potential additions for the image system:
- **Automatic image optimization** pipeline
- **Theme color extraction** from images
- **Multiple image variants** (light/dark mode)
- **Dynamic image generation** from project content
- **AI-generated backgrounds** based on project descriptions

---

**Ready to add your first project image?** Simply drop an image file in `/public/images/projects/` and update the mapping in `/lib/project-utils.ts`!
