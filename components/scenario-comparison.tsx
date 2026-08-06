"use client"

import { useState } from "react"
import { FastForward, Droplets, Sprout, Wheat, TrendingUp, Award, Loader2 } from "lucide-react"

type Strategy = {
  id: "a" | "b" | "c"
  name: string
  tag: string
  water: number // liters
  cost: number // INR
  yield: number // tons
  profit: number // INR
  winner?: boolean
}

const STRATEGIES: Strategy[] = [
  {
    id: "a",
    name: "Traditional Habit",
    tag: "Baseline",
    water: 480000,
    cost: 62000,
    yield: 3.8,
    profit: 148000,
  },
  {
    id: "b",
    name: "CropTwin AI",
    tag: "Best ROI",
    water: 312000,
    cost: 41000,
    yield: 4.6,
    profit: 219000,
    winner: true,
  },
  {
    id: "c",
    name: "Minimal Intervention",
    tag: "Risky",
    water: 205000,
    cost: 24000,
    yield: 2.9,
    profit: 96000,
  },
]

const fmtInt = (n: number) => n.toLocaleString("en-IN")

type MetricRow = {
  label: string
  icon: typeof Droplets
  get: (s: Strategy) => string
  highlight?: boolean
}

const METRICS: MetricRow[] = [
  { label: "Total Water Used", icon: Droplets, get: (s) => `${fmtInt(s.water)} L`, highlight: true },
  { label: "Fertilizer & Input Cost", icon: Sprout, get: (s) => `₹${fmtInt(s.cost)}` },
  { label: "Projected Yield", icon: Wheat, get: (s) => `${s.yield.toFixed(1)} T` },
  { label: "Net Estimated Profit", icon: TrendingUp, get: (s) => `₹${fmtInt(s.profit)}`, highlight: true },
]

export default function ScenarioComparison() {
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle")
  const [progress, setProgress] = useState(0)

  const runSimulation = () => {
    setPhase("loading")
    setProgress(0)
    const start = Date.now()
    const duration = 2000
    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (elapsed < duration) {
        requestAnimationFrame(tick)
      } else {
        setPhase("done")
      }
    }
    requestAnimationFrame(tick)
  }

  return (
    <section className="z-20 relative max-w-5xl mx-auto shadow-xl rounded-2xl border border-[#9DC88D]/40 bg-[#F4F1E8]/95 p-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4D774E]">Scenario Engine</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#164A41]">Strategy comparison</h2>
          <p className="mt-1 text-sm text-[#164A41]/70">
            Project a full month forward and compare three farming strategies side by side.
          </p>
        </div>
        <button
          onClick={runSimulation}
          disabled={phase === "loading"}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#164A41] px-5 py-3 text-sm font-medium text-[#F4F1E8] transition-colors hover:bg-[#4D774E] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {phase === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <FastForward className="h-4 w-4" aria-hidden />
          )}
          Fast-Forward 30 Days (Run Simulation)
        </button>
      </div>

      {phase === "loading" && (
        <div className="mt-8 rounded-xl border border-[#9DC88D]/50 bg-white/40 p-6">
          <p className="text-sm font-medium text-[#164A41]">
            Simulating 30 days of weather, moisture, and RL agent actions...
          </p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#9DC88D]/30">
            <div
              className="h-full rounded-full bg-[#4D774E] transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="mt-2 text-right text-xs font-medium text-[#4D774E]">{progress}%</p>
        </div>
      )}

      {phase === "idle" && (
        <div className="mt-8 rounded-xl border border-dashed border-[#9DC88D]/60 bg-white/30 p-10 text-center">
          <p className="text-sm text-[#164A41]/60">
            Run the simulation to reveal water use, input cost, yield, and net profit for each strategy.
          </p>
        </div>
      )}

      {phase === "done" && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STRATEGIES.map((s) => {
            const isWinner = !!s.winner
            return (
              <div
                key={s.id}
                className={`relative flex flex-col rounded-xl bg-white/60 p-5 transition-shadow ${
                  isWinner
                    ? "border-2 border-[#4D774E] shadow-lg shadow-[#4D774E]/15"
                    : "border border-[#9DC88D]/40"
                }`}
              >
                {isWinner && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#4D774E] px-3 py-1 text-xs font-semibold text-[#F4F1E8]">
                    <Award className="h-3.5 w-3.5" aria-hidden />
                    Recommended
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${isWinner ? "text-[#4D774E]" : "text-[#164A41]"}`}>
                    {s.name}
                  </h3>
                </div>
                <span
                  className={`mt-1 inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    isWinner ? "bg-[#4D774E]/10 text-[#4D774E]" : "bg-[#D1B284]/25 text-[#164A41]"
                  }`}
                >
                  {s.tag}
                </span>

                <dl className="mt-4 flex flex-col gap-3">
                  {METRICS.map((m) => {
                    const Icon = m.icon
                    const emphasize = isWinner && m.highlight
                    return (
                      <div key={m.label} className="flex items-center justify-between gap-2">
                        <dt className="flex items-center gap-2 text-xs text-[#164A41]/70">
                          <Icon className="h-4 w-4 text-[#9DC88D]" aria-hidden />
                          {m.label}
                        </dt>
                        <dd
                          className={`text-sm font-semibold ${
                            emphasize ? "text-[#4D774E]" : "text-[#164A41]"
                          }`}
                        >
                          {m.get(s)}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
