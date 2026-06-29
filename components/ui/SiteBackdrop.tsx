import type { CSSProperties } from "react";

export default function SiteBackdrop() {
  return (
    <div aria-hidden className="site-backdrop">
      <div className="site-backdrop__grid" />
      <div className="site-backdrop__scan" />
      <div className="site-backdrop__orb site-backdrop__orb--main" />
      <div className="site-backdrop__orb site-backdrop__orb--soft" />
      <div className="site-backdrop__glow site-backdrop__glow--left" />
      <div className="site-backdrop__glow site-backdrop__glow--right" />
      <div className="site-backdrop__nodes">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} style={{ "--i": index } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
