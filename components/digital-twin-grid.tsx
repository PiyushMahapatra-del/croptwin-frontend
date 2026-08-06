"use client"

import { useMemo, useState } from "react"
import { Thermometer, Droplets, CloudRain, Wind, X, CalendarClock, TriangleAlert } from "lucide-react"

type Zone = {
  id: string
  score: number
  moisture: number
  nutrient: "Good" | "Depleted"
  diseaseRisk: number
  yield: number
}

const COLS = ["A", "B", "C", "D", "E"]

function colorFor(score: number) {
  if (score > 0.7) return "#4D774E"
  if (score >= 0.4) return "#EAB308"
  return "#DC2626"
}

function seedZones(): Zone[] {
  const yellow = new Set(["B2", "D1", "C4"])
  const red = new Set(["E3"])
  const zones: Zone[] = []
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const id = `${COLS[c]}${r + 1}`
      const score = red.has(id) ? 0.28 : yellow.has(id) ? 0.55 : 0.75 + Math.random() * 0.2
      zones.push({
        id,
        score,
        moisture: Math.round(40 + Math.random() * 45),
        nutrient: score < 0.5 ? "Depleted" : "Good",
        diseaseRisk: Math.round((1 - score) * 60),
        yield: Number((0.4 + score * 0.9).toFixed(2)),
      })
    }
  }
  return zones
}

export default function DigitalTwinGrid() {
  const [zones, setZones] = useState<Zone[]>(seedZones)
  const [day, setDay] = useState(42)
  const [selected, setSelected] = useState<Zone | null>(null)

  const selectedLive = useMemo(
    () => (selected ? zones.find((z) => z.id === selected.id) ?? selected : null),
    [zones, selected],
  )

  function advanceDay() {
    setDay((d) => d + 1)
    setZones((prev) =>
      prev.map((z) => {
        const moisture = Math.max(5, Math.min(100, z.moisture + (Math.random() * 20 - 10)))
        const score = Math.max(0, Math.min(1, z.score + (Math.random() * 0.1 - 0.05)))
        return { ...z, moisture: Math.round(moisture), score, nutrient: score < 0.5 ? "Depleted" : "Good" }
      }),
    )
  }

  function triggerDrought() {
    setZones((prev) =>
      prev.map((z) => {
        const col = COLS.indexOf(z.id[0])
        if (col <= 1) {
          const score = col === 0 ? 0.25 : 0.5
          return { ...z, score, moisture: Math.round(10 + Math.random() * 15), nutrient: "Depleted", diseaseRisk: Math.round((1 - score) * 60) }
        }
        return z
      }),
    )
  }

  return (
    <section className="relative z-20 mx-auto max-w-4xl rounded-2xl border border-[#9DC88D]/40 bg-[#F4F1E8]/95 p-6 text-left shadow-xl">
      {/* Context + live weather bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#9DC88D]/40 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#164A41]">North Sector Field</h2>
          <p className="text-sm text-[#164A41]/70">{`Day ${day} — Vegetative Stage`}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-full bg-[#164A41] px-4 py-2 text-xs font-medium text-[#F4F1E8]">
          <span className="flex items-center gap-1.5"><Thermometer className="h-4 w-4" />28°C</span>
          <span className="flex items-center gap-1.5"><Droplets className="h-4 w-4" />65%</span>
          <span className="flex items-center gap-1.5"><CloudRain className="h-4 w-4" />Rain in 3 days</span>
          <span className="flex items-center gap-1.5"><Wind className="h-4 w-4" />12 km/h</span>
        </div>
      </header>

      {/* Simulation controls */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={advanceDay}
          className="flex items-center gap-2 rounded-full bg-[#164A41] px-4 py-2 text-sm font-medium text-[#F4F1E8] transition-colors hover:bg-[#4D774E]"
        >
          <CalendarClock className="h-4 w-4" />
          Advance Day (+24h)
        </button>
        <button
          onClick={triggerDrought}
          className="flex items-center gap-2 rounded-full border border-[#DC2626] px-4 py-2 text-sm font-medium text-[#DC2626] transition-colors hover:bg-[#DC2626]/10"
        >
          <TriangleAlert className="h-4 w-4" />
          Trigger Drought Event (Demo)
        </button>
      </div>

      {/* 5x5 farm matrix */}
      <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => setSelected(z)}
            style={{ backgroundColor: colorFor(z.score) }}
            className="flex aspect-square items-center justify-center rounded-lg text-sm font-semibold text-[#F4F1E8] outline-none ring-offset-2 ring-offset-[#F4F1E8] transition-transform hover:scale-[1.04] hover:ring-2 hover:ring-[#9DC88D] focus-visible:ring-2 focus-visible:ring-[#9DC88D]"
            aria-label={`Zone ${z.id}, health score ${z.score.toFixed(2)}`}
          >
            {z.id}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#164A41]/70">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#4D774E]" />Healthy</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#EAB308]" />Needs Attention</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[#DC2626]" />Critical</span>
      </div>

      {/* Cell inspection drawer */}
      {selectedLive && (
        <div className="fixed inset-0 z-30 flex justify-end bg-[#164A41]/40" onClick={() => setSelected(null)}>
          <aside
            className="h-full w-full max-w-sm overflow-y-auto bg-[#F4F1E8] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#164A41]">Zone {selectedLive.id}</h3>
              <button onClick={() => setSelected(null)} aria-label="Close" className="rounded-full p-1 text-[#164A41] hover:bg-[#9DC88D]/30">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="h-4 w-4 rounded-full" style={{ backgroundColor: colorFor(selectedLive.score) }} />
              <span className="text-sm font-medium text-[#164A41]">Health Score: {selectedLive.score.toFixed(2)}</span>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <Stat label="Moisture Level" value={`${selectedLive.moisture}%`} soil />
              <Stat label="Nutrient Status" value={selectedLive.nutrient} soil={selectedLive.nutrient === "Good"} />
              <Stat label="Disease Risk" value={`${selectedLive.diseaseRisk}%`} />
              <Stat label="Expected Yield" value={`${selectedLive.yield} t`} />
            </dl>
          </aside>
        </div>
      )}
    </section>
  )
}

function Stat({ label, value, soil }: { label: string; value: string; soil?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#9DC88D]/40 bg-[#F4F1E8] px-3 py-2">
      <dt className="text-[#164A41]/70">{label}</dt>
      <dd
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          soil ? "bg-[#D1B284] text-[#164A41]" : "bg-[#9DC88D]/40 text-[#164A41]"
        }`}
      >
        {value}
      </dd>
    </div>
  )
}
