export interface Project {
  title: string;
  description: string;
  technologies?: string[];
  link?: string;
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
  tagline: string;
  location: string;
  menuItems: MenuItem[];
}