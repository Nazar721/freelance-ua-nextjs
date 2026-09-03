export type CaseSection = "it" | "design" | "motion" | "ai_video";

export interface Case {
  id: number;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  reviewKey: string;
  image?: string;
  hoverImage?: string;
  imageFit?: "cover" | "contain";
  video?: string;
  link?: string;
  section: CaseSection;
}

export interface Testimonial {
  id: number;
  textKey: string;
  author?: string;
  video?: string;
  audio?: string;
  screenshot?: string;
  serviceKey?: string;
}

export interface Service {
  category: string;
  icon: string;
  items: string[];
}

export interface Brand {
  name: string;
  logo: string;
}
