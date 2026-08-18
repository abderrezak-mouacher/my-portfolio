
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  images: string[];
  localVideos?: string[]; // Paths to local MP4 videos
  videoTitle?: string; // Custom title for the video section
  youtubeVideo?: string[]; // YouTube video IDs
  challenges: string[];
  outcome: string;
  results?: string[];
  timeline?: { date: string; title?: string; description?: string }[];
  lessons?: string[];
  artifacts?: { label: string; url: string }[];

}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  category: 'PLC/SCADA' | 'Modeling' | 'Hardware' | 'Software' | 'softskills'| 'Embedded Systems'| 'Electrical Design'| 'Industrial Communication';
}

export interface PIDDataPoint {
  time: number;
  sp: number; // Setpoint
  pv: number; // Process Variable
}
