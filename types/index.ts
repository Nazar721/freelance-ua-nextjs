export type CaseSection = "it" | "design" | "motion" | "ai_video";

export interface Case {
  id: number;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  reviewKey: string;
  image?: string;
  video?: string;
  link?: string;
  section: CaseSection;
}

export interface Testimonial {
  id: number;
  textKey: string;
  author?: string;
  video?: string;
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
