export type StackCaseType =
  | "it"
  | "design-ux"
  | "design-photo"
  | "video-reels"
  | "video-ai"
  | "video-motion"
  | "video-long";

export type StackIconSide = "left" | "right";

export type StackLineStyle = "dashed" | "dotted" | "solid";

export interface StackLineConfig {
  style: StackLineStyle;
  opacity: number;
  width: number;
  animateOnEnter: boolean;
}

export interface StackIconEntry {
  name: string;
  svgPath: string;
  side: StackIconSide;
  /** Position on the connecting line: 0 = top of the rail, 1 = bottom */
  linePosition: number;
  /** Horizontal offset from the line in px (may be negative) */
  offsetX: number;
  floatDelay: number;
  floatDuration: number;
  parallaxSpeed: number;
}

interface IconSpec {
  name: string;
  file: string;
}

const ICONS_DIR = "/media/icons/stack";

/** Connecting line style shared by all rails (TZ §2.4) */
export const STACK_LINE: StackLineConfig = {
  style: "dashed",
  opacity: 0.55,
  width: 2.5,
  animateOnEnter: true,
};

const IT_ICONS: IconSpec[] = [
  { name: "VS Code", file: "vscode" },
  { name: "React", file: "react" },
  { name: "TypeScript", file: "typescript" },
  { name: "JavaScript", file: "javascript" },
  { name: "Node.js", file: "nodejs" },
  { name: "Tailwind CSS", file: "tailwindcss" },
  { name: "HTML5", file: "html5" },
  { name: "CSS3", file: "css" },
  { name: "PostgreSQL", file: "postgresql" },
  { name: "MongoDB", file: "mongodb" },
  { name: "Git", file: "git" },
  { name: "GitHub", file: "github" },
  { name: "Docker", file: "docker" },
  { name: "Vercel", file: "vercel" },
  { name: "npm", file: "npm" },
  { name: "Vite", file: "vite" },
  { name: "Figma", file: "figma" },
];

const DESIGN_UX_ICONS: IconSpec[] = [
  { name: "Figma", file: "figma" },
  { name: "Adobe Photoshop", file: "photoshop" },
  { name: "Adobe Illustrator", file: "illustrator" },
  { name: "Adobe XD", file: "xd" },
  { name: "Sketch", file: "sketch" },
  { name: "Procreate", file: "procreate" },
  { name: "Blender", file: "blender" },
  { name: "Canva", file: "canva" },
  { name: "Notion", file: "notion" },
  { name: "Miro", file: "miro" },
  { name: "After Effects", file: "aftereffects" },
  { name: "Adobe", file: "adobe" },
  { name: "Claude", file: "claude" },
  { name: "Gemini", file: "gemini" },
  { name: "Snapseed", file: "snapseed" },
  { name: "CapCut", file: "capcut" },
  { name: "DaVinci Resolve", file: "davinci" },
  { name: "Framer", file: "framer" },
  { name: "InVision", file: "invision" },
  { name: "Zeplin", file: "zeplin" },
  { name: "Principle", file: "principle" },
  { name: "ProtoPie", file: "protopie" },
  { name: "LottieFiles", file: "lottiefiles" },
  { name: "Cinema 4D", file: "cinema4d" },
  { name: "Affinity Designer", file: "affinity" },
  { name: "Penpot", file: "penpot" },
  { name: "Leonardo AI", file: "leonardo" },
  { name: "Midjourney", file: "midjourney" },
  { name: "Stable Diffusion", file: "stablediffusion" },
];

const DESIGN_PHOTO_ICONS: IconSpec[] = [
  { name: "Adobe Photoshop", file: "photoshop" },
  { name: "Adobe Lightroom", file: "lightroom" },
  { name: "Lightroom Classic", file: "lightroomclassic" },
  { name: "Adobe Camera Raw", file: "cameraraw" },
  { name: "Adobe Bridge", file: "bridge" },
  { name: "Adobe Firefly", file: "firefly" },
  { name: "Capture One", file: "captureone" },
  { name: "Luminar Neo", file: "luminar" },
  { name: "DxO PhotoLab", file: "dxo" },
  { name: "Topaz Photo AI", file: "topaz" },
  { name: "VSCO", file: "vsco" },
  { name: "Stable Diffusion", file: "stablediffusion" },
  { name: "Snapseed", file: "snapseed" },
  { name: "Adobe", file: "adobe" },
  { name: "Claude", file: "claude" },
  { name: "Gemini", file: "gemini" },
  { name: "Midjourney", file: "midjourney" },
  { name: "Retouch4me", file: "retouch4me" },
  { name: "Evoto", file: "evoto" },
  { name: "Imagen AI", file: "imagen" },
  { name: "Neural Love", file: "neurallove" },
  { name: "Magnific AI", file: "magnific" },
  { name: "Topaz Gigapixel", file: "gigapixel" },
  { name: "Leonardo AI", file: "leonardo" },
];

const VIDEO_REELS_ICONS: IconSpec[] = [
  { name: "Premiere Pro", file: "premiere" },
  { name: "After Effects", file: "aftereffects" },
  { name: "DaVinci Resolve", file: "davinci" },
  { name: "CapCut", file: "capcut" },
  { name: "Photoshop", file: "photoshop" },
  { name: "Telegram", file: "telegram" },
  { name: "YouTube", file: "youtube" },
  { name: "Instagram", file: "instagram" },
  { name: "TikTok", file: "tiktok" },
  { name: "Blender", file: "blender" },
  { name: "Canva", file: "canva" },
  { name: "Figma", file: "figma" },
  { name: "Descript", file: "descript" },
  { name: "HeyGen", file: "heygen" },
  { name: "Pika", file: "pika" },
  { name: "Leonardo AI", file: "leonardo" },
  { name: "ElevenLabs", file: "elevenlabs" },
  { name: "Suno", file: "suno" },
  { name: "Luma", file: "luma" },
  { name: "Hugging Face", file: "huggingface" },
  { name: "OpenAI", file: "openai" },
  { name: "Runway", file: "runway" },
  { name: "Kling", file: "kling" },
];

const VIDEO_AI_ICONS: IconSpec[] = [
  { name: "Higgsfield", file: "higgsfield" },
  { name: "Seedance", file: "seedance" },
  { name: "Kling", file: "kling" },
  { name: "Gemini", file: "gemini" },
  { name: "Veo", file: "veo" },
  { name: "Sora", file: "sora" },
  { name: "Runway", file: "runway" },
  { name: "Luma", file: "luma" },
  { name: "Hugging Face", file: "huggingface" },
  { name: "OpenAI", file: "openai" },
  { name: "ElevenLabs", file: "elevenlabs" },
  { name: "Suno", file: "suno" },
  { name: "Pika", file: "pika" },
  { name: "Leonardo AI", file: "leonardo" },
  { name: "Stable Diffusion", file: "stablediffusion" },
  { name: "Midjourney", file: "midjourney" },
  { name: "Claude", file: "claude" },
];

const VIDEO_MOTION_ICONS: IconSpec[] = [
  { name: "After Effects", file: "aftereffects" },
  { name: "Premiere Pro", file: "premiere" },
  { name: "DaVinci Resolve", file: "davinci" },
  { name: "Blender", file: "blender" },
  { name: "Illustrator", file: "illustrator" },
  { name: "Figma", file: "figma" },
  { name: "Photoshop", file: "photoshop" },
  { name: "CapCut", file: "capcut" },
  { name: "Midjourney", file: "midjourney" },
  { name: "Canva", file: "canva" },
  { name: "Notion", file: "notion" },
  { name: "Claude", file: "claude" },
  { name: "Cinema 4D", file: "cinema4d" },
  { name: "Mocha Pro", file: "mocha" },
  { name: "Nuke", file: "nuke" },
  { name: "Adobe Audition", file: "audition" },
  { name: "LottieFiles", file: "lottiefiles" },
  { name: "Hugging Face", file: "huggingface" },
  { name: "OpenAI", file: "openai" },
  { name: "ElevenLabs", file: "elevenlabs" },
  { name: "Suno", file: "suno" },
  { name: "Luma", file: "luma" },
  { name: "Pika", file: "pika" },
  { name: "Leonardo AI", file: "leonardo" },
  { name: "Runway", file: "runway" },
];

const POOLS: Record<StackCaseType, IconSpec[]> = {
  it: IT_ICONS,
  "design-ux": DESIGN_UX_ICONS,
  "design-photo": DESIGN_PHOTO_ICONS,
  "video-reels": VIDEO_REELS_ICONS,
  "video-ai": VIDEO_AI_ICONS,
  "video-motion": VIDEO_MOTION_ICONS,
  "video-long": VIDEO_REELS_ICONS,
};

// Deterministic pseudo-random so SSR/CSR and reloads produce identical layout
function buildEntries(caseType: StackCaseType): StackIconEntry[] {
  const pool = POOLS[caseType] ?? [];

  // Side assignment: alternating with an occasional wave flip
  const sides = pool.map((_, i): StackIconSide => {
    const waveFlip = i % 5 === 2;
    return (i % 2 === 0) === !waveFlip ? "left" : "right";
  });

  // Even distribution along each rail's line, per side
  const counters: Record<StackIconSide, number> = { left: 0, right: 0 };
  const perSide: Record<StackIconSide, number> = { left: 0, right: 0 };
  for (const s of sides) perSide[s] += 1;

  return pool.map((spec, i) => {
    const side = sides[i];
    const indexInSide = counters[side]++;
    const count = perSide[side];
    // 0.03..0.97 so edge icons never clip the rail caps
    const linePosition = count === 1 ? 0.5 : 0.03 + (0.94 * indexInSide) / (count - 1);
    const offsetSign = indexInSide % 2 === 0 ? 1 : -1;
    const offsetX = offsetSign * (8 + ((i * 7) % 9));
    return {
      name: spec.name,
      svgPath: `${ICONS_DIR}/${spec.file}.svg`,
      side,
      linePosition: Math.round(linePosition * 1000) / 1000,
      offsetX,
      floatDelay: Math.round(((i * 0.37) % 2.8) * 10) / 10,
      floatDuration: Math.round((3.4 + (i % 5) * 0.55) * 10) / 10,
      parallaxSpeed: Math.round((0.1 + ((i * 7) % 10) * 0.013) * 1000) / 1000,
    };
  });
}

const ICON_SPACING_PX = 120;
const MIN_ICONS_PER_SIDE = 4;

const CACHE = new Map<string, StackIconEntry[]>();

function buildEntriesWithLimit(caseType: StackCaseType, maxPerSide: number): StackIconEntry[] {
  const pool = POOLS[caseType] ?? [];
  const limited = pool.slice(0, maxPerSide * 2);

  const sides = limited.map((_, i): StackIconSide => {
    const waveFlip = i % 5 === 2;
    return (i % 2 === 0) === !waveFlip ? "left" : "right";
  });

  const counters: Record<StackIconSide, number> = { left: 0, right: 0 };
  const perSide: Record<StackIconSide, number> = { left: 0, right: 0 };
  for (const s of sides) perSide[s] += 1;

  return limited.map((spec, i) => {
    const side = sides[i];
    const indexInSide = counters[side]++;
    const count = perSide[side];
    const linePosition = count === 1 ? 0.5 : 0.03 + (0.94 * indexInSide) / (count - 1);
    const offsetSign = indexInSide % 2 === 0 ? 1 : -1;
    const offsetX = offsetSign * (8 + ((i * 7) % 9));
    return {
      name: spec.name,
      svgPath: `${ICONS_DIR}/${spec.file}.svg`,
      side,
      linePosition: Math.round(linePosition * 1000) / 1000,
      offsetX,
      floatDelay: Math.round(((i * 0.37) % 2.8) * 10) / 10,
      floatDuration: Math.round((3.4 + (i % 5) * 0.55) * 10) / 10,
      parallaxSpeed: Math.round((0.1 + ((i * 7) % 10) * 0.013) * 1000) / 1000,
    };
  });
}

export function getStackIcons(caseType: StackCaseType, railHeight?: number): StackIconEntry[] {
  const pool = POOLS[caseType] ?? [];
  const totalPool = pool.length;

  let maxPerSide = Math.ceil(totalPool / 2);
  if (railHeight && railHeight > 0) {
    const calculated = Math.max(MIN_ICONS_PER_SIDE, Math.floor(railHeight / ICON_SPACING_PX));
    maxPerSide = Math.min(maxPerSide, calculated);
  }

  const cacheKey = `${caseType}:${maxPerSide}`;
  let entries = CACHE.get(cacheKey);
  if (!entries) {
    entries = maxPerSide >= Math.ceil(totalPool / 2)
      ? buildEntries(caseType)
      : buildEntriesWithLimit(caseType, maxPerSide);
    CACHE.set(cacheKey, entries);
  }
  return entries;
}

export function stackPoolSize(caseType: StackCaseType): number {
  return (POOLS[caseType] ?? []).length;
}
