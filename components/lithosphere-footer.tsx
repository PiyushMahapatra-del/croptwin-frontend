import type { CSSProperties } from "react"

// Dry-earth crack texture, inlined as a data URI so it needs no network request.
const CRACK_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.1'%3E%3Cpath d='M0 60 L48 74 L92 58 L140 80 L188 62 L240 84'/%3E%3Cpath d='M20 0 L34 46 L18 92 L40 140 L26 188 L44 240'/%3E%3Cpath d='M120 0 L134 50 L118 104 L138 150 L124 200 L140 240'/%3E%3Cpath d='M92 58 L118 104 L96 150 L120 200'/%3E%3Cpath d='M140 80 L138 150 L172 190'/%3E%3Cpath d='M0 160 L60 172 L110 156 L168 178 L240 162'/%3E%3Cpath d='M200 0 L214 60 L198 120 L220 180 L206 240'/%3E%3C/g%3E%3C/svg%3E\")"

const NAV_GROUPS: { heading: string; links: string[] }[] = [
  { heading: "Platform", links: ["Digital Twin", "Soil Health", "Yield Forecast"] },
  { heading: "Company", links: ["About", "Careers", "Contact"] },
  { heading: "Resources", links: ["Docs", "API", "Support"] },
]

// Slightly irregular clip edges give each stratum an organic, geological seam.
const strata: {
  bg: string
  color: string
  clip?: string
  className: string
}[] = [
  {
    // Layer 1 — Topsoil / Crust
    bg: "linear-gradient(180deg, #164A41 0%, #123A33 55%, #2C2620 100%)",
    color: "#E8DCCA",
    className: "pt-14 pb-20",
  },
  {
    // Layer 2 — Subsoil
    bg: "linear-gradient(180deg, #4D774E 0%, #6A6249 60%, #7A6B58 100%)",
    color: "#F4F1E8",
    clip: "polygon(0 8px, 7% 0, 22% 10px, 41% 2px, 60% 12px, 78% 3px, 92% 11px, 100% 2px, 100% 100%, 0 100%)",
    className: "-mt-3 pt-10 pb-14",
  },
  {
    // Layer 3 — Parent Material
    bg: "linear-gradient(180deg, #D1B284 0%, #C3A576 100%)",
    color: "#3B2F2F",
    clip: "polygon(0 10px, 12% 2px, 30% 12px, 50% 3px, 68% 13px, 86% 4px, 100% 11px, 100% 100%, 0 100%)",
    className: "-mt-3 pt-8 pb-10",
  },
  {
    // Layer 4 — Bedrock / Bottom
    bg: "linear-gradient(180deg, #E8DCCA 0%, #F4F1E8 100%)",
    color: "#7A6B58",
    clip: "polygon(0 9px, 16% 1px, 38% 11px, 58% 2px, 80% 12px, 100% 3px, 100% 100%, 0 100%)",
    className: "-mt-3 pt-6 pb-6",
  },
]

function crackStyle(opacity: number): CSSProperties {
  return {
    backgroundImage: CRACK_TEXTURE,
    backgroundSize: "240px 240px",
    backgroundBlendMode: "overlay",
    opacity,
  }
}

export default function LithosphereFooter() {
  return (
    <footer className="relative w-full overflow-hidden font-sans">
      {/* Layer 1 — Topsoil / Crust: primary content lives here for contrast */}
      <div
        className={`relative ${strata[0].className}`}
        style={{ background: strata[0].bg, color: strata[0].color }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={crackStyle(0.18)}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              <p className="text-lg font-semibold tracking-tight">CropTwin AI</p>
              <p className="mt-2 text-sm leading-relaxed text-[#E8DCCA]/70">
                A living digital twin for your fields — soil, growth, and yield in
                one intelligence layer.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#9DC88D]/40 bg-[#0F2E29]/60 px-4 py-2 text-xs font-medium text-[#E8DCCA]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5BD08A] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#5BD08A]" />
                </span>
                Connected to n8n Pro Engine
              </span>
            </div>

            <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {NAV_GROUPS.map((group) => (
                <div key={group.heading} className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9DC88D]">
                    {group.heading}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {group.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-[#E8DCCA]/80 transition-colors hover:text-[#E8DCCA]"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Layer 2 — Subsoil: copyright + secondary links */}
      <div
        className={`relative ${strata[1].className}`}
        style={{ background: strata[1].bg, color: strata[1].color, clipPath: strata[1].clip }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={crackStyle(0.15)}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm sm:flex-row">
          <p className="text-[#F4F1E8]/85">
            &copy; {new Date().getFullYear()} CropTwin AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[#F4F1E8]/85">
            <a href="#" className="transition-colors hover:text-[#F4F1E8]">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-[#F4F1E8]">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-[#F4F1E8]">
              Status
            </a>
          </div>
        </div>
      </div>

      {/* Layer 3 — Parent Material */}
      <div
        className={`relative ${strata[2].className}`}
        style={{ background: strata[2].bg, color: strata[2].color, clipPath: strata[2].clip }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={crackStyle(0.2)}
        />
        <p className="relative mx-auto max-w-6xl px-6 text-center text-xs uppercase tracking-[0.28em] text-[#3B2F2F]/60">
          Parent Material
        </p>
      </div>

      {/* Layer 4 — Bedrock / Bottom */}
      <div
        className={`relative ${strata[3].className}`}
        style={{ background: strata[3].bg, color: strata[3].color, clipPath: strata[3].clip }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={crackStyle(0.15)}
        />
        <p className="relative mx-auto max-w-6xl px-6 text-center text-xs uppercase tracking-[0.28em] text-[#7A6B58]/60">
          Bedrock
        </p>
      </div>
    </footer>
  )
}
