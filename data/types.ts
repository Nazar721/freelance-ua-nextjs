export type DesignCategory = "banners" | "branding" | "photo-retouch";
export type ITCategory = "ecommerce" | "landing" | "saas-telegram";

export interface CaseBadge {
  text: string;
  variant?: "default" | "solid" | "outline" | "ghost" | "gradient" | "neon" | "glass" | "success" | "warning" | "danger" | "purple" | "cyan" | "pink";
  animation?: "none" | "pulse" | "bounce" | "glow" | "float" | "shimmer";
}

export interface CaseEntry {
  slug: string;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  href: string;
  glowColor: string;
  glowColorStrong: string;
  image: string;
  hoverImage?: string;
  galleryImages?: string[];
  imageFit?: "cover" | "contain";
  objectPosition?: string;
  category?: DesignCategory;
  itCategory?: ITCategory;
  hideCta?: boolean;
  badge?: CaseBadge;
}
