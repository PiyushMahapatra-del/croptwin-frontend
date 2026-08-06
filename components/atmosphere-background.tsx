"use client"

import type { CSSProperties } from "react"

/**
 * AtmosphereBackground
 * A soft, warm evening-sky ambient background for the CropTwin AI platform.
 * All elements are non-interactive (pointer-events: none, z-index: 0).
 */
export default function AtmosphereBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden bg-[#F4F1E8]"
    >
      <style>{keyframes}</style>

      {/* Ambient layer — never blocks foreground interaction */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* Soft golden-sage evening cloud gradient across the top ~28%, fading into cream */}
        <div
          className="absolute inset-x-0 top-0 h-[30vh]"
          style={{
            background:
              "linear-gradient(180deg, rgba(209,178,132,0.55) 0%, rgba(157,200,141,0.35) 45%, rgba(244,241,232,0) 100%)",
          }}
        />

        {/* Soft cloud blobs with blurred edges, masked to fade at the bottom */}
        <div
          className="absolute inset-x-0 top-0 h-[32vh]"
          style={{
            WebkitMaskImage:
              "linear-gradient(180deg, #000 60%, transparent 100%)",
            maskImage: "linear-gradient(180deg, #000 60%, transparent 100%)",
          }}
        >
          {CLOUDS.map((c, i) => (
            <svg
              key={i}
              viewBox="0 0 200 80"
              className="absolute"
              style={
                {
                  left: c.left,
                  top: c.top,
                  width: c.width,
                  filter: "blur(14px)",
                  opacity: c.opacity,
                  animation: `drift ${c.dur}s ease-in-out ${c.delay}s infinite alternate`,
                } as CSSProperties
              }
            >
              <ellipse cx="60" cy="45" rx="55" ry="28" fill="#FBF6EA" />
              <ellipse cx="105" cy="35" rx="48" ry="30" fill="#E7D9B8" />
              <ellipse cx="145" cy="48" rx="45" ry="24" fill="#FBF6EA" />
            </svg>
          ))}
        </div>

        {/* Silhouette birds near the upper cloud layer */}
        {BIRDS.map((b, i) => (
          <svg
            key={`bird-${i}`}
            viewBox="0 0 40 16"
            className="absolute"
            style={
              {
                left: b.left,
                top: b.top,
                width: b.width,
                color: "#164A41",
                opacity: b.opacity,
                animation: `fly ${b.dur}s ease-in-out ${b.delay}s infinite alternate, flap ${b.flap}s ease-in-out ${b.delay}s infinite`,
              } as CSSProperties
            }
          >
            <path
              d="M2 12 C10 2, 16 2, 20 8 C24 2, 30 2, 38 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}

const CLOUDS = [
  { left: "-4%", top: "4%", width: 320, opacity: 0.35, dur: 26, delay: 0 },
  { left: "40%", top: "-2%", width: 380, opacity: 0.28, dur: 32, delay: 3 },
  { left: "72%", top: "10%", width: 300, opacity: 0.22, dur: 29, delay: 1.5 },
  { left: "20%", top: "18%", width: 260, opacity: 0.18, dur: 34, delay: 5 },
]

const BIRDS = [
  { left: "18%", top: "12%", width: 34, opacity: 0.4, dur: 18, delay: 0, flap: 1.6 },
  { left: "34%", top: "8%", width: 26, opacity: 0.32, dur: 22, delay: 2, flap: 1.9 },
  { left: "58%", top: "15%", width: 30, opacity: 0.36, dur: 20, delay: 1, flap: 1.7 },
  { left: "76%", top: "6%", width: 22, opacity: 0.28, dur: 24, delay: 3.5, flap: 2.1 },
]

const keyframes = `
@keyframes drift {
  from { transform: translateX(0) translateY(0); }
  to   { transform: translateX(40px) translateY(6px); }
}
@keyframes fly {
  from { transform: translate(0, 0); }
  to   { transform: translate(60px, -14px); }
}
@keyframes flap {
  0%, 100% { transform: scaleY(1); }
  50%      { transform: scaleY(0.6); }
}
@media (prefers-reduced-motion: reduce) {
  [aria-hidden="true"] svg { animation: none !important; }
}
`
