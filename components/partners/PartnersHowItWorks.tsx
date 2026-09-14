"use client";

import { useRef } from "react";
import { gsap, useGSAP, refreshAfterFonts, whenScrollAtTop } from "./scroll/gsapCore";
import { useTranslation } from "@/lib/LanguageContext";
import { Pin } from "lucide-react";

const STEP_COLORS = ["#f97316", "#6366f1", "#22c55e"];

const steps = [
  { num: "01", titleKey: "partners.how.step1.title", descKey: "partners.how.step1.desc" },
  { num: "02", titleKey: "partners.how.step2.title", descKey: "partners.how.step2.desc" },
  { num: "03", titleKey: "partners.how.step3.title", descKey: "partners.how.step3.desc" },
];

/* Final tilt of each pinned card (deg) and the extra angle it swings from. */
const DESKTOP_ROT = [-6, 6, -5];
const MOBILE_ROT = [-5, 4, -4];

/**
 * One dashed link between two pinned cards: a mask path "draws" over the
 * dashed stroke while a glowing comet rides the same geometry, so the line
 * appears to be traced by the comet.
 */
function addDashLink(
  tl: gsap.core.Timeline,
  at: number,
  dur: number,
  mainPath: SVGPathElement,
  maskPath: SVGPathElement,
  comet: SVGCircleElement,
  glow: SVGCircleElement,
) {
  const L = mainPath.getTotalLength();
  const proxy = { p: 0 };

  tl.fromTo(
    maskPath,
    { strokeDasharray: L, strokeDashoffset: L + 2 },
    { strokeDashoffset: 0, duration: dur, ease: "none" },
    at,
  );

  tl.fromTo(proxy, { p: 0 }, {
    p: 1,
    duration: dur,
    ease: "power1.inOut",
    onUpdate: () => {
      const pt = mainPath.getPointAtLength(proxy.p * L);
      gsap.set(comet, { attr: { cx: pt.x, cy: pt.y } });
      gsap.set(glow, { attr: { cx: pt.x, cy: pt.y } });
    },
  }, at);

  tl.fromTo([comet, glow], { opacity: 0 }, { opacity: 1, duration: dur * 0.2, ease: "none" }, at)
    .to(comet, { scale: 1.9, transformOrigin: "center", duration: dur * 0.25, ease: "power2.in" }, at + dur * 0.7)
    .to([comet, glow], { opacity: 0, duration: dur * 0.2, ease: "power1.out" }, at + dur * 0.8);
}

/** Card slams onto the board: pin stamps first, then the card swings to rest. */
function addPinnedCard(
  tl: gsap.core.Timeline,
  card: HTMLElement,
  pin: Element,
  at: number,
  swingDur: number,
  finalRot: number,
) {
  tl.fromTo(
    pin,
    { opacity: 0, y: -32, scale: 1.8 },
    { opacity: 1, y: 0, scale: 1, duration: swingDur * 0.4, ease: "power2.in" },
    at,
  ).fromTo(
    card,
    { opacity: 0, rotation: finalRot - 16, y: -44 },
    {
      opacity: 1,
      rotation: finalRot,
      y: 0,
      duration: swingDur,
      ease: "back.out(1.6)",
      transformOrigin: "50% 0%",
    },
    at + swingDur * 0.1,
  );
}

export function PartnersHowItWorks() {
  const { t } = useTranslation();
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scopeRef.current) return;
      const q = gsap.utils.selector(scopeRef);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".step-item, .how-stage, .connector-mobile"), { opacity: 1, clearProps: "transform" });
      });

      let gateCleanup: (() => void) | null = null;

      // Desktop: the board scrolls with the page; once it rides into view the
      // chain plays as one sequence — card pins in, comet traces the thread to
      // the next card, that card pins in, and so on down the board.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gateCleanup = whenScrollAtTop(scopeRef.current, () => {
          const cards = q<HTMLElement>(".how-stage .step-item");
          const pins = q<HTMLElement>(".how-stage .step-pin");
          const mainPaths = q<SVGPathElement>(".how-stage .link-path");
          const maskPaths = q<SVGPathElement>(".how-stage .link-mask");
          const comets = q<SVGCircleElement>(".how-stage .link-comet");
          const glows = q<SVGCircleElement>(".how-stage .link-comet-glow");

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: scopeRef.current, start: "top 72%", once: true },
          });

          tl.fromTo(
            ".how-title",
            { opacity: 0, y: 26, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 },
            0,
          );

          const slot = 0.95;
          cards.forEach((card, i) => {
            const at = 0.15 + i * slot;
            addPinnedCard(tl, card, pins[i], at, 0.7, DESKTOP_ROT[i]);
            if (i < mainPaths.length) {
              addDashLink(tl, at + 0.55, 0.7, mainPaths[i], maskPaths[i], comets[i], glows[i]);
            }
          });

          // Finale: the pinned cards sway together, like a board nudged once.
          cards.forEach((card, i) => {
            tl.to(card, { rotation: DESKTOP_ROT[i] + 1.8, duration: 0.35, ease: "sine.inOut" }, 3.2 + i * 0.08).to(
              card,
              { rotation: DESKTOP_ROT[i], duration: 0.5, ease: "sine.inOut" },
              3.55 + i * 0.08,
            );
          });
        });
      });

      // Mobile: zig-zag cards play as a timed sequence once scrolled into view.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gateCleanup = whenScrollAtTop(scopeRef.current, () => {
          const cards = q<HTMLElement>(".how-mobile .step-item");
          const pins = q<HTMLElement>(".how-mobile .step-pin");
          const mainPaths = q<SVGPathElement>(".how-mobile .link-path");
          const maskPaths = q<SVGPathElement>(".how-mobile .link-mask");
          const comets = q<SVGCircleElement>(".how-mobile .link-comet");
          const glows = q<SVGCircleElement>(".how-mobile .link-comet-glow");

          const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.5 },
            scrollTrigger: { trigger: scopeRef.current, start: "top 65%" },
          });

          tl.fromTo(
            ".how-title",
            { opacity: 0, y: 24, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 },
            0,
          );

          const slot = 1.0;
          cards.forEach((card, i) => {
            const at = 0.25 + i * slot;
            addPinnedCard(tl, card, pins[i], at, 0.55, MOBILE_ROT[i]);
            if (i < mainPaths.length) {
              addDashLink(tl, at + 0.5, 0.4, mainPaths[i], maskPaths[i], comets[i], glows[i]);
            }
          });

          // Threads keep breathing softly after the sequence finishes.
          tl.eventCallback("onComplete", () => {
            gsap.to(mainPaths, { opacity: 0.45, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
          });
        });
      });

      refreshAfterFonts();
      return () => {
        gateCleanup?.();
        mm.revert();
      };
    },
    { scope: scopeRef },
  );

  return (
    <section ref={scopeRef} className="px-4 py-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="how-title mb-10 text-center text-3xl font-bold text-foreground sm:text-4xl">
          {t("partners.how.title")}
        </h2>

        {/* Desktop: pinned board with zig-zag cards */}
        <div className="how-stage relative hidden h-[600px] md:block">
          {/* Ruled-lines board background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 96px)",
            }}
          />

          {/* Dashed threads between cards (revealed by the comet) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1152 600"
            preserveAspectRatio="none"
          >
            <defs>
              <mask id="how-mask-d0">
                <path className="link-mask" d="M 380 110 C 490 120, 540 205, 648 220" stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
              </mask>
              <mask id="how-mask-d1">
                <path className="link-mask" d="M 690 325 C 640 400, 560 375, 470 345" stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
              </mask>
            </defs>
            <path className="link-path" d="M 380 110 C 490 120, 540 205, 648 220" stroke="#a1a1aa" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="10 9" fill="none" mask="url(#how-mask-d0)" vectorEffect="non-scaling-stroke" />
            <path className="link-path" d="M 690 325 C 640 400, 560 375, 470 345" stroke="#a1a1aa" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="10 9" fill="none" mask="url(#how-mask-d1)" vectorEffect="non-scaling-stroke" />
            <circle className="link-comet-glow" r="11" fill={STEP_COLORS[0]} opacity="0" />
            <circle className="link-comet" r="4.5" fill={STEP_COLORS[0]} opacity="0" />
            <circle className="link-comet-glow" r="11" fill={STEP_COLORS[1]} opacity="0" />
            <circle className="link-comet" r="4.5" fill={STEP_COLORS[1]} opacity="0" />
          </svg>

          {steps.map((step, i) => (
            <div
              key={step.num}
              className="step-item absolute w-[300px] xl:w-[330px]"
              style={{ left: `${["4%", "56%", "12%"][i]}`, top: `${["2%", "20%", "46%"][i]}`, transform: `rotate(${DESKTOP_ROT[i]}deg)` }}
            >
              <div
                className="relative rounded-[32px] border border-white/[0.06] bg-white/[0.02] p-2.5 shadow-2xl shadow-black/50"
                style={{ boxShadow: `0 24px 60px rgba(0,0,0,0.55), 0 0 46px ${STEP_COLORS[i]}1f` }}
              >
                <span aria-hidden className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Pin className="step-pin" size={28} fill="currentColor" strokeWidth={1.5} style={{ color: STEP_COLORS[i] }} />
                </span>

                <div
                  className="rounded-3xl border bg-[#0d0d10]/90 p-5"
                  style={{ borderColor: `${STEP_COLORS[i]}59` }}
                >
                  <div className="text-4xl font-bold" style={{ color: STEP_COLORS[i] }}>
                    {step.num}
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-foreground">{t(step.titleKey)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.descKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical zig-zag */}
        <div className="how-mobile flex flex-col md:hidden">
          {steps.map((step, i) => (
            <div key={step.num} className="contents">
              {i > 0 && (
                <div className="connector-mobile relative h-14 w-full">
                  <svg
                    aria-hidden
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 360 56"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <mask id={`how-mask-m${i}`}>
                        <path
                          className="link-mask"
                          d={i % 2 === 1 ? "M 60 0 C 60 28, 290 28, 290 56" : "M 290 0 C 290 28, 70 28, 70 56"}
                          stroke="#fff"
                          strokeWidth="14"
                          strokeLinecap="round"
                          fill="none"
                          vectorEffect="non-scaling-stroke"
                        />
                      </mask>
                    </defs>
                    <path
                      className="link-path"
                      d={i % 2 === 1 ? "M 60 0 C 60 28, 290 28, 290 56" : "M 290 0 C 290 28, 70 28, 70 56"}
                      stroke="#a1a1aa"
                      strokeOpacity="0.55"
                      strokeWidth="2"
                      strokeDasharray="10 9"
                      fill="none"
                      mask={`url(#how-mask-m${i})`}
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle className="link-comet-glow" r="10" fill={STEP_COLORS[i - 1]} opacity="0" />
                    <circle className="link-comet" r="4" fill={STEP_COLORS[i - 1]} opacity="0" />
                  </svg>
                </div>
              )}

              <div
                className={`step-item w-[270px] ${i % 2 === 1 ? "self-end mr-2" : "self-start ml-2"}`}
                style={{ transform: `rotate(${MOBILE_ROT[i]}deg)` }}
              >
                <div className="relative rounded-[26px] border border-white/[0.06] bg-white/[0.02] p-2.5 shadow-xl shadow-black/50">
                  <span aria-hidden className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Pin className="step-pin" size={22} fill="currentColor" strokeWidth={1.5} style={{ color: STEP_COLORS[i] }} />
                  </span>
                  <div
                    className="rounded-[20px] border bg-[#0d0d10]/90 p-5"
                    style={{ borderColor: `${STEP_COLORS[i]}59` }}
                  >
                    <div className="text-4xl font-bold" style={{ color: STEP_COLORS[i] }}>
                      {step.num}
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-foreground">{t(step.titleKey)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.descKey)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
