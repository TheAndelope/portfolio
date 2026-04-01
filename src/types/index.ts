export interface Project {
  title: string;
  tagline: string;
  description?: string; // longer write-up; falls back to tagline if absent
  technologies?: string[];
  link?: string;
  video?: string;      // short preview clip
  videoUrl?: string;   // link to full video (falls back to preview if empty)
  image?: string;      // static photo/image thumbnail
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  content: string | string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  menuItems: MenuItem[];
}