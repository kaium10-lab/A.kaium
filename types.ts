
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface NavLink {
  name: string;
  href: string;
}

export interface PortfolioData {
  hero: {
    firstName: string;
    lastName: string;
    roles: string[];
    description: string;
    badgeText: string;
    profileImage: string;
    logo?: string;
    favicon?: string;
    club: {
      name: string;
      description: string;
      banner: string;
      link: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    profileImage: string;
    education: {
      label: string;
      degree: string;
      link: string;
      image: string;
      bannerImage?: string;
    };
  };
  skills: SkillCategory[];
  projects: Project[];
  contact: {
    email: string;
    address: string;
    phone: string;
    description: string;
  };
  settings: {
    password: string;
    requirePasswordEveryTime: boolean;
  };
}