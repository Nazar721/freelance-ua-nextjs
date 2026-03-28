export interface Case {
  id: number;
  category: string;
  title: string;
  description: string;
  review: string;
  image?: string;
  video?: string;
  link?: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author?: string;
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
