# Project Addition System - Quick Reference

## 🚀 One-Command Project Creation

```bash
node create-project.js your-project-name
```

This single command:
- ✅ Creates folder structure
- ✅ Generates template with all required fields
- ✅ Shows ready-to-copy code to add to constants.tsx

## 📂 What Gets Created

```
public/
  images/your-project-name/      ← Add 1-10 JPG images (1.jpg, 2.jpg, etc)
  videos/your-project-name/      ← Add demo.mp4 (optional)
```

## 📝 3-Step Process

### 1️⃣ Create project folders
```bash
node create-project.js my-awesome-project
```

### 2️⃣ Add your media
- Copy images to `public/images/my-awesome-project/` (name them 1.jpg, 2.jpg, etc)
- Copy video to `public/videos/my-awesome-project/demo.mp4` (optional)

### 3️⃣ Update constants.tsx
Copy the template output from step 1 and add to the `PROJECTS` array

## Example: Adding "Smart Relay Project"

```bash
# Step 1: Create structure and see template
node create-project.js smart-relay-project

# Output:
# ✅ Created: public/images/smart-relay-project/
# ✅ Created: public/videos/smart-relay-project/
# 
# 📋 Project Template:
# {
#   id: 'smart-relay-project',
#   ...
# }
```

```bash
# Step 2: Add your files
copy my-photos\*.jpg public\images\smart-relay-project\1.jpg
copy my-photos\*.jpg public\images\smart-relay-project\2.jpg
copy my-videos\demo.mp4 public\videos\smart-relay-project\demo.mp4
```

```bash
# Step 3: Edit constants.tsx and add the template to PROJECTS array

# Step 4: Rebuild
npm run build

# Done! Your project now appears on the site
```

## 📚 Documentation

- **Detailed Guide:** See [PROJECTS_GUIDE.md](./PROJECTS_GUIDE.md)
- **Images/Video Tips:** See [PROJECTS_GUIDE.md - Media Guidelines](./PROJECTS_GUIDE.md#media-guidelines)
- **Troubleshooting:** See [PROJECTS_GUIDE.md - Troubleshooting](./PROJECTS_GUIDE.md#troubleshooting)

## ⚡ Quick Tips

✅ **Images:**
- Name them `1.jpg`, `2.jpg`, `3.jpg`, etc. (up to 10)
- Use landscape format (16:9 aspect ratio works best)
- Keep under 3MB per image for fast loading
- First image shows in project cards

✅ **Videos:**
- Local: Add one `demo.mp4` file (optional)
- YouTube: Add video IDs to `youtubeVideos` array (optional)
- Both supported - tabs appear automatically!

✅ **Required Fields:**
- `id` - unique identifier (lowercase-hyphens)
- `title` - project name
- `category` - type (Automation, Embedded, etc)
- `description` - 1-2 sentence overview
- `technologies` - 3-5 tech skills
- `challenges` - main problem solved
- `outcome` - results achieved

✅ **Optional Fields:**
- `timeline` - project phases
- `lessons` - key learnings
- `artifacts` - downloadable links
- `localVideo` - demo video path
- `youtubeVideos` - YouTube video IDs

## 🎯 Workflow

1. Run: `node create-project.js project-name`
2. Add images/videos to created folders
3. Copy template from output
4. Paste into `constants.tsx` PROJECTS array
5. Update template with your info
6. Run: `npm run build`
7. Done! ✨

## 📖 Full Reference

For comprehensive details including:
- Step-by-step walkthrough
- Field reference table
- Media guidelines and best practices
- Troubleshooting guide
- YouTube URL to video ID conversion

**See:** [PROJECTS_GUIDE.md](./PROJECTS_GUIDE.md)
