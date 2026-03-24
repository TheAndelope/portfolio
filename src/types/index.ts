export interface Project {
  title: string;
  description: string;
  technologies?: string[];
  link?: string;
  video?: string;
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