"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CurvedDashedLinesProps {
  glowColor: string;
  side?: "left" | "right" | "both";
  className?: string;
  icons?: Array<{
    position: number; // 0-1 along the path
    side: "left" | "right";
    element: React.ReactNode;
  }>;
}

function parseRgb(rgba: string): [number, number, number] {
  const m = rgba.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (!m) return [99, 102, 241];
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function tintOf(rgba: string, mix = 0.55): string {
  const [r, g, b] = parseRgb(rgba);
  const mixCh = (c: number) => Math.round(c + (255 - c) * mix);
  return `rgb(${mixCh(r)}, ${mixCh(g)}, ${mixCh(b)})`;
}

// Generate a smooth curved path that winds dramatically from top to bottom
function curvedPath(side: "left" | "right", height: number): string {
  const centerX = 60;
  const amplitude = 40;
  const segments = 5;
  const segmentHeight = height / segments;
  
  let d = `M ${centerX} 0`;
  
  for (let i = 0; i < segments; i++) {
    const y1 = i * segmentHeight + segmentHeight * 0.33;
    const y2 = i * segmentHeight + segmentHeight * 0.66;
    const y3 = (i + 1) * segmentHeight;
    
    const direction = side === "left" ? 1 : -1;
    const waveOffset = Math.sin(i * 1.5) * amplitude * 0.7;
    const cx1 = centerX + direction * (amplitude + waveOffset);
    const cx2 = centerX - direction * (amplitude * 0.9 - waveOffset);
    
    d += ` C ${cx1} ${y1}, ${cx2} ${y2}, ${centerX} ${y3}`;
  }
  
  return d;
}

// Calculate position along a cubic bezier path segment
function getPointOnPath(
  startX: number,
  startY: number,
  cp1x: number,
  cp1y: number,
  cp2x: number,
  cp2y: number,
  endX: number,
  endY: number,
  t: number
): { x: number; y: number } {
  const t2 = t * t;
  const t3 = t2 * t;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  
  return {
    x: mt3 * startX + 3 * mt2 * t * cp1x + 3 * mt * t2 * cp2x + t3 * endX,
    y: mt3 * startY + 3 * mt2 * t * cp1y + 3 * mt * t2 * cp2y + t3 * endY,
  };
}

// Get icon positions along the curved path
function getIconPositions(side: "left" | "right", height: number): Array<{ x: number; y: number }> {
  const centerX = 60;
  const amplitude = 40;
  const segments = 5;
  const segmentHeight = height / segments;
  const positions: Array<{ x: number; y: number }> = [];
  
  // Place icons at specific points along the path
  const iconPositions = [0.15, 0.35, 0.55, 0.75, 0.9];
  
  for (const pos of iconPositions) {
    const segmentIndex = Math.min(Math.floor(pos * segments), segments - 1);
    const segmentProgress = (pos * segments) - segmentIndex;
    
    const startY = segmentIndex * segmentHeight;
    const y1 = startY + segmentHeight * 0.33;
    const y2 = startY + segmentHeight * 0.66;
    const endY = (segmentIndex + 1) * segmentHeight;
    
    const direction = side === "left" ? 1 : -1;
    const waveOffset = Math.sin(segmentIndex * 1.5) * amplitude * 0.7;
    const cx1 = centerX + direction * (amplitude + waveOffset);
    const cx2 = centerX - direction * (amplitude * 0.9 - waveOffset);
    
    const point = getPointOnPath(
      centerX, startY,
      cx1, y1,
      cx2, y2,
      centerX, endY,
      segmentProgress
    );
    
    positions.push(point);
  }
  
  return positions;
}

const CURVED_LINES_CSS = `
.curved-dashed-lines {
  position: absolute;
  top: 0;
  width: 120px;
  height: 100%;
  z-index: 5;
  pointer-events: none;
  opacity: 0;
  transition: opacity 700ms var(--ease-out);
}
.curved-dashed-lines.is-visible { opacity: 1; }
.curved-dashed-lines-left { left: -80px; }
.curved-dashed-lines-right { right: -80px; }

.curved-dashed-lines svg {
  position: absolute;
  inset: 0;
  overflow: visible;
  pointer-events: none;
}
.curved-dashed-lines-base {
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 30 20;
}
.curved-dashed-lines-flow {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 15 35;
  animation: curved-lines-flow 4s linear infinite;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
}
@keyframes curved-lines-flow {
  to { stroke-dashoffset: -50; }
}

@media (max-width: 1279.98px) {
  .curved-dashed-lines { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .curved-dashed-lines-flow { animation: none; }
}
`;

export default function CurvedDashedLines({
  glowColor,
  side = "both",
  className = "",
  icons = [],
}: CurvedDashedLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [leftBaseRef, rightBaseRef] = [
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null),
  ];

  const isInView = useInView(containerRef, {
    once: false,
    margin: "10% 0px",
  });

  const accent = useMemo(() => parseRgb(glowColor).join(", "), [glowColor]);
  const tint = useMemo(() => tintOf(glowColor), [glowColor]);

  const leftPath = useMemo(() => curvedPath("left", height), [height]);
  const rightPath = useMemo(() => curvedPath("right", height), [height]);

  // Measure container height
  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.offsetHeight);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Scroll progressive draw
  useEffect(() => {
    if (!isInView || !height) return;

    const applyDraw = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.6 - rect.top) / rect.height)
      );

      const drawOffset = (1 - progress).toFixed(3);
      if (leftBaseRef.current) leftBaseRef.current.style.strokeDashoffset = drawOffset;
      if (rightBaseRef.current) rightBaseRef.current.style.strokeDashoffset = drawOffset;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        applyDraw();
      });
    };
    applyDraw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isInView, height]);

  if (!height) {
    return <div ref={containerRef} className={className} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }} />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CURVED_LINES_CSS }} />
      <div ref={containerRef} className={className} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
        {(side === "left" || side === "both") && (
          <div
            className={`curved-dashed-lines curved-dashed-lines-left ${isInView ? "is-visible" : ""}`}
            style={{ height }}
            aria-hidden="true"
          >
            <svg width={120} height={height} viewBox={`0 0 120 ${height}`}>
              <defs>
                <linearGradient id="curved-grad-left" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`rgba(${accent}, 0)`} />
                  <stop offset="10%" stopColor={tint} />
                  <stop offset="90%" stopColor={tint} />
                  <stop offset="100%" stopColor={`rgba(${accent}, 0)`} />
                </linearGradient>
              </defs>
              <path ref={leftBaseRef} className="curved-dashed-lines-base" d={leftPath} pathLength={1} stroke="url(#curved-grad-left)" />
              <path className="curved-dashed-lines-flow" d={leftPath} pathLength={1} stroke="url(#curved-grad-left)" />
            </svg>
            {/* Render icons on left side */}
            {icons
              .filter((icon) => icon.side === "left")
              .map((icon, index) => {
                const positions = getIconPositions("left", height);
                const posIndex = Math.min(index, positions.length - 1);
                const pos = positions[posIndex];
                return (
                  <div
                    key={`left-${index}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: pos.x, top: pos.y, pointerEvents: "auto" }}
                  >
                    {icon.element}
                  </div>
                );
              })}
          </div>
        )}
        {(side === "right" || side === "both") && (
          <div
            className={`curved-dashed-lines curved-dashed-lines-right ${isInView ? "is-visible" : ""}`}
            style={{ height }}
            aria-hidden="true"
          >
            <svg width={120} height={height} viewBox={`0 0 120 ${height}`}>
              <defs>
                <linearGradient id="curved-grad-right" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`rgba(${accent}, 0)`} />
                  <stop offset="10%" stopColor={tint} />
                  <stop offset="90%" stopColor={tint} />
                  <stop offset="100%" stopColor={`rgba(${accent}, 0)`} />
                </linearGradient>
              </defs>
              <path ref={rightBaseRef} className="curved-dashed-lines-base" d={rightPath} pathLength={1} stroke="url(#curved-grad-right)" />
              <path className="curved-dashed-lines-flow" d={rightPath} pathLength={1} stroke="url(#curved-grad-right)" />
            </svg>
            {/* Render icons on right side */}
            {icons
              .filter((icon) => icon.side === "right")
              .map((icon, index) => {
                const positions = getIconPositions("right", height);
                const posIndex = Math.min(index, positions.length - 1);
                const pos = positions[posIndex];
                return (
                  <div
                    key={`right-${index}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: pos.x, top: pos.y, pointerEvents: "auto" }}
                  >
                    {icon.element}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}
