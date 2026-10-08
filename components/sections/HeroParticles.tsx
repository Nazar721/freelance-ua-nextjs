"use client";

import { motion } from "framer-motion";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9973 + 7.13) * 10000;
  return x - Math.floor(x);
}

const round4 = (n: number) => Math.round(n * 10000) / 10000;

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: round4(seededRandom(i) * 100),
  y: round4(seededRandom(i + 20) * 100),
  size: Math.round((2 + seededRandom(i + 40) * 3) * 100) / 100,
  duration: 4 + seededRandom(i + 60) * 6,
  delay: seededRandom(i + 80) * 4,
}));

export default function HeroParticles() {
  return (
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-accent"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.5, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
  );
}
