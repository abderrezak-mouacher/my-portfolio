# How to Add New Projects

This guide makes it super easy to add new projects to your portfolio.

## Quick Start (3 Steps)

### Step 1: Create Project Folders
```
public/
  images/
    your-project-name/
  videos/
    your-project-name/
```

### Step 2: Add Your Files
- **Images**: Add up to 10 JPG files named `1.jpg`, `2.jpg`, ... `10.jpg` in the images folder
- **Video** (optional): Add one MP4 file named `demo.mp4` in the videos folder

### Step 3: Add Project to Constants
Edit `constants.tsx` and add your project to the `PROJECTS` array:

```tsx
{
  id: 'unique-id',
  title: 'Your Project Title',
  category: 'Project Category',
  description: 'Brief description of what the project does...',
  technologies: ['Tech1', 'Tech2', 'Tech3'],
  images: getProjectImages('your-project-name'),
  localVideo: '/videos/your-project-name/demo.mp4',  // Optional
  youtubeVideos: ['videoId1', 'videoId2'],          // Optional
  challenges: 'What was the main challenge?',
  outcome: 'What was achieved?',
  
  // Optional sections
  timeline: [
    {
      date: '2024-01',
      title: 'Phase 1 Title',
      description: 'What happened in this phase'
    }
  ],
  lessons: [
    'Lesson 1',
    'Lesson 2'
  ],
  artifacts: [
    { label: 'Document Name', url: 'https://...' }
  ]
}
```

---

## Complete Template

Copy this and fill in your project details:

```tsx
{
  id: 'project-slug',
  title: 'Project Title Goes Here',
  category: 'Category (e.g., Automation, Embedded, etc)',
  description: 'One or two sentences explaining what this project is about. Keep it concise and impactful.',
  
  technologies: [
    'Technology1',
    'Technology2',
    'Technology3',
    'Technology4'
  ],
  
  images: getProjectImages('project-slug'),
  
  localVideo: '/videos/project-slug/demo.mp4',
  youtubeVideos: ['VIDEO_ID_1', 'VIDEO_ID_2'],
  
  challenges: 'Describe the main technical or business challenges you faced. 2-3 sentences.',
  
  outcome: 'Describe what you achieved and the impact. 2-3 sentences.',
  
  timeline: [
    {
      date: '2024-01',
      title: 'Initial Design',
      description: 'Planned architecture and requirements'
    },
    {
      date: '2024-06',
      title: 'Implementation',
      description: 'Built core features and integrated components'
    },
    {
      date: '2024-12',
      title: 'Deployment',
      description: 'Tested and deployed to production'
    }
  ],
  
  lessons: [
    'First key lesson learned',
    'Second key lesson learned',
    'Third key lesson learned'
  ],
  
  artifacts: [
    {
      label: 'GitHub Repository',
      url: 'https://github.com/username/repo'
    },
    {
      label: 'Technical Documentation',
      url: '/artifacts/project-docs.pdf'
    }
  ]
}
```

---

## Field Reference

| Field | Required | Notes |
|-------|----------|-------|
| `id` | ✅ | Unique identifier (use lowercase-with-hyphens) |
| `title` | ✅ | Project name (max 80 chars recommended) |
| `category` | ✅ | Type of project (Automation, Embedded, etc) |
| `description` | ✅ | Brief overview (1-2 sentences) |
| `technologies` | ✅ | Array of 3-5 tech skills used |
| `images` | ✅ | Always use `getProjectImages('your-project-name')` |
| `localVideo` | ❌ | Path to demo video (optional) |
| `youtubeVideos` | ❌ | Array of YouTube video IDs (optional) |
| `challenges` | ✅ | Main technical challenges faced |
| `outcome` | ✅ | Results and impact achieved |
| `timeline` | ❌ | Project phases with dates |
| `lessons` | ❌ | Key learnings (bullet points) |
| `artifacts` | ❌ | Links to docs, repos, files |

---

## File Organization Example

Here's the complete folder structure for a project named `my-plc-project`:

```
portfolio/
├── public/
│   ├── images/
│   │   └── my-plc-project/
│   │       ├── 1.jpg          (landscape photo)
│   │       ├── 2.jpg
│   │       ├── 3.jpg
│   │       └── 4.jpg
│   │
│   └── videos/
│       └── my-plc-project/
│           └── demo.mp4       (product demo or walkthrough)
│
├── constants.tsx              (← Add project data here)
└── PROJECTS_GUIDE.md
```

---

## Media Guidelines

### Images
- **Format**: JPG or PNG
- **Count**: 1-10 images per project
- **Size**: 300KB-3MB per image (smaller is faster)
- **Naming**: `1.jpg`, `2.jpg`, `3.jpg`, etc.
- **Aspect Ratio**: Landscape (16:9 or similar) works best
- **Tip**: The first image appears in project cards, use it as a hero/cover

### Videos
- **Format**: MP4 (H.264 codec recommended)
- **File**: One local video named `demo.mp4` (optional)
- **Size**: Try to keep under 50MB for fast loading
- **YouTube**: Use video IDs from YouTube URLs
  - From: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  - Use: `dQw4w9WgXcQ`

---

## Adding YouTube Videos

1. Go to your YouTube video URL: `https://www.youtube.com/watch?v=XXXXXXX`
2. Copy the video ID (the part after `v=`)
3. Add to `youtubeVideos` array:

```tsx
youtubeVideos: ['dQw4w9WgXcQ', 'jNQXAC9IVRw']
```

---

## Step-by-Step Walkthrough

### Adding Project: "Smart Valve Controller"

**1. Create folders:**
```powershell
mkdir public\images\smart-valve-controller
mkdir public\videos\smart-valve-controller
```

**2. Add files:**
- Copy 3-5 project photos → `public/images/smart-valve-controller/1.jpg`, `2.jpg`, etc.
- Copy demo video (optional) → `public/videos/smart-valve-controller/demo.mp4`

**3. Edit `constants.tsx`:**

Find the `PROJECTS` array and add this entry:

```tsx
{
  id: 'smart-valve-controller',
  title: 'Smart Valve Controller for Industrial IoT',
  category: 'Embedded Systems',
  description: 'Developed a networked valve controller using Arduino and Modbus TCP for remote operation and monitoring.',
  technologies: ['Arduino', 'Modbus TCP', 'IoT', 'C++'],
  images: getProjectImages('smart-valve-controller'),
  localVideo: '/videos/smart-valve-controller/demo.mp4',
  youtubeVideos: ['dQw4w9WgXcQ'],
  challenges: 'Ensuring reliable communication over noisy industrial networks with minimal latency.',
  outcome: 'Reduced manual valve operation by 80%, enabling remote monitoring across 50+ sites.',
  timeline: [
    { date: '2024-03', title: 'Design', description: 'Schematic and firmware architecture' },
    { date: '2024-07', title: 'Testing', description: 'Lab validation and field trials' },
    { date: '2024-10', title: 'Deployment', description: 'Rollout to production sites' }
  ],
  lessons: [
    'Always implement watchdog timers for critical systems',
    'Test extensively in real network conditions, not just lab'
  ],
  artifacts: [
    { label: 'GitHub Repo', url: 'https://github.com/user/smart-valve' }
  ]
}
```

**4. Rebuild and deploy:**
```powershell
npm run build
```

Done! Your new project now appears on the portfolio.

---

## Tips & Best Practices

✅ **Do:**
- Use descriptive project IDs (lowercase, hyphens, no spaces)
- Add 3-5 high-quality images minimum
- Include both challenges and outcomes for context
- Use relevant technologies (helps with SEO)
- Add a timeline if the project has distinct phases

❌ **Don't:**
- Use spaces or special characters in folder names
- Upload massive video files (optimize first!)
- Skip the challenges section (adds credibility)
- Use generic descriptions ("Built an app")

---

## Troubleshooting

**Images not showing?**
- Check folder name matches exactly (case-sensitive on some systems)
- Verify files are named `1.jpg`, `2.jpg`, etc.
- Ensure files are in `public/images/your-folder/`

**Video not playing?**
- Confirm `demo.mp4` exists in `public/videos/your-folder/`
- Try a different MP4 encoder if video won't play
- YouTube videos need correct video IDs

**Project not appearing?**
- Check TypeScript errors: `npm run build`
- Verify `id` field is unique
- Make sure `getProjectImages('your-folder')` matches your folder name

---

## Next Steps

1. Create your project folders
2. Add images and videos
3. Copy the template and fill it out
4. Run `npm run build`
5. Test on localhost
6. Deploy!

Happy adding! 🚀
