import type { AvatarFullConfig } from "react-nice-avatar";

const FEMALE_PATTERNS =
  /^(ірина|віка|інна|наталя|наталія|лариса|оксана|таїсія|태на|марія|марина|аля|анастасія|любов|людмила|світлана|золтан|бріджит|червона|галина| дарина|яна|кароліна|софія|вероніка|євгенія|поль|ніна|лілія|可想而知|аліна|кристина|богдана|марта|urstula|руслана|olesya|olga|oksana|tetyana|halyna|myroslava|yaryna|solomiya|daryna|sofiya|viktoria|inna|iryna|nadiya|lesya|mariana)/i;

const MALE_PATTERNS =
  /^(іван|андрій|олександр|віктор|сергій|максим|нікіта|дмитро|артем|市场份额|микола|петро|богдан| taras|oleh|mykola|andrii|ivan|serhii|maksym|dmytro|artem|viacheslav|yaroslav|roman|danylo|denys|mykhailo|bohdan|makar|kyrylo|daniil|artyom|nika|vladyslav|ihor|yevhen|vasyl|stepan|rostyslav|oleksii|ruslan|viktor)/i;

function isCompanyName(name: string): boolean {
  const companyIndicators =
    /(?:_mydutyfree|sembud|route.?core|selloflow|darkshare|next.?cup|epiland|m\+d|s.?dent|mnm|voltone|importera|prime.?auto|pivden|asandra|shop|clinic|salon|agency|group|studio|digital|tech|lab|hub|pro)/i;
  return companyIndicators.test(name) || /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)*$/.test(name.trim());
}

function detectGender(name: string): "man" | "woman" {
  const lower = name.toLowerCase().split(",")[0].split(" ")[0].trim();

  if (FEMALE_PATTERNS.test(lower)) return "woman";
  if (MALE_PATTERNS.test(lower)) return "man";

  if (/^(анна|марта|софі|яна|дарі|полі|злата|мирослава|ярина|саломе|кіра|ева|lisa|anna|maria|hanna|nataliia|liudmyla|nadiya)/i.test(lower)) return "woman";

  return "man";
}

export function getAvatarConfig(name: string): AvatarFullConfig & { bgColor: string } {
  if (isCompanyName(name)) {
    return {
      sex: "man",
      hatStyle: "none",
      hatColor: "#6366F1",
      hairStyle: "normal",
      hairColor: "#3F3B4C",
      faceColor: "#F9C9B6",
      earSize: "small",
      eyeStyle: "oval",
      glassesStyle: "none",
      noseStyle: "short",
      mouthStyle: "smile",
      shirtStyle: "polo",
      shirtColor: "#6366F1",
      bgColor: "#1A1A2E",
      eyeBrowStyle: "up",
    };
  }

  const gender = detectGender(name);
  const isFemale = gender === "woman";

  const bgColors = ["#1A1A2E", "#2D1B69", "#1B3A4B", "#2C1810", "#1A2E1A", "#2E1A2E", "#1A2E3E", "#3B1A1A"];
  const hairColors = ["#3F3B4C", "#2C1810", "#5C3317", "#8B4513", "#D2691E", "#1A1A2E", "#A0522D"];
  const shirtColors = ["#6366F1", "#22C55E", "#EF4444", "#F97316", "#EC4899", "#3B82F6", "#8B5CF6", "#14B8A6"];
  const faceColors = ["#F9C9B6", "#F5D0A9", "#E8B899", "#FDBCB4", "#F0C8A0", "#FFDAB9"];

  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  return {
    sex: gender,
    hatStyle: "none",
    hairStyle: isFemale ? "womanLong" : "normal",
    hairColor: hairColors[hash % hairColors.length],
    faceColor: faceColors[hash % faceColors.length],
    earSize: "small",
    eyeStyle: "oval",
    glassesStyle: "none",
    noseStyle: "short",
    mouthStyle: "smile",
    shirtStyle: isFemale ? "short" : "polo",
    shirtColor: shirtColors[hash % shirtColors.length],
    bgColor: bgColors[hash % bgColors.length],
    eyeBrowStyle: isFemale ? "upWoman" : "up",
  };
}
