#!/usr/bin/env node
/**
 * Project Creation Helper
 * Usage: node create-project.js project-name
 * 
 * Example: node create-project.js my-awesome-project
 * 
 * This creates the folder structure and generates a template project entry
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectName = process.argv[2];

if (!projectName) {
  console.error('❌ Please provide a project name');
  console.error('Usage: node create-project.js project-name');
  console.error('Example: node create-project.js my-plc-project');
  process.exit(1);
}

// Validate project name
if (!/^[a-z0-9-]+$/.test(projectName)) {
  console.error('❌ Project name must be lowercase with hyphens only');
  console.error('Example: smart-valve-controller (not Smart Valve Controller)');
  process.exit(1);
}

const imagesDir = path.join(__dirname, 'public', 'images', projectName);
const videosDir = path.join(__dirname, 'public', 'videos', projectName);

// Create directories
try {
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`✅ Created: public/images/${projectName}/`);
  }
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
    console.log(`✅ Created: public/videos/${projectName}/`);
  }
} catch (err) {
  console.error('❌ Error creating directories:', err.message);
  process.exit(1);
}

// Generate template
const template = `
// ⬇️ Add this to the PROJECTS array in constants.tsx

{
  id: '${projectName}',
  title: 'Your Project Title Here',
  category: 'Category (e.g., Automation, Embedded, etc)',
  description: 'Brief description of what this project does in 1-2 sentences.',
  
  technologies: [
    'Technology1',
    'Technology2',
    'Technology3'
  ],
  
  images: getProjectImages('${projectName}'),
  
  // Optional - add demo videos
  localVideos: getProjectVideos('${projectName}'),
  youtubeVideos: ['VIDEO_ID_1', 'VIDEO_ID_2'],
  
  challenges: 'What was the main challenge you faced?',
  outcome: 'What was the result and impact?',
  
  // Optional sections
  timeline: [
    { date: '2024-01', title: 'Phase 1', description: 'Description' },
    { date: '2024-06', title: 'Phase 2', description: 'Description' }
  ],
  
  lessons: [
    'Key lesson 1',
    'Key lesson 2'
  ],
  
  artifacts: [
    { label: 'GitHub', url: 'https://github.com/...' },
    { label: 'Docs', url: '/artifacts/...' }
  ]
}
`;

console.log('');
console.log('📋 Project Template:');
console.log('═'.repeat(60));
console.log(template);
console.log('═'.repeat(60));
console.log('');
console.log('📂 Folder structure ready:');
console.log(`   public/images/${projectName}/     ← Add images here (1.jpg, 2.jpg, etc)`);
console.log(`   public/videos/${projectName}/     ← Add demo.mp4 here (optional)`);
console.log('');
console.log('📖 For detailed instructions, see: PROJECTS_GUIDE.md');
console.log('');
