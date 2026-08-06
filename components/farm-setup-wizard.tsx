"use client"

import { useState } from "react"
import {
  Wheat,
  Sprout,
  Flower2,
  Droplets,
  CloudRain,
  Waves,
  Settings2,
  MapPin,
  CheckCircle2,
  Loader2,
} from "lucide-react"

type Data = {
  location: string
  crop: string
  acreage: number
  soil: string
  irrigation: string
  sowingDate: string
  stage: string
}

const CROPS = [
  { id: "Wheat", Icon: Wheat },
  { id: "Rice", Icon: Sprout },
  { id: "Cotton", Icon: Flower2 },
  { id: "Maize", Icon: Wheat },
]
const SOILS = ["Alluvial", "Black", "Red", "Loamy"]
const IRRIGATION = [
  { id: "Drip", Icon: Droplets },
  { id: "Sprinkler", Icon: Waves },
  { id: "Flood", Icon: Waves },
  { id: "Rainfed", Icon: CloudRain },
]
const STAGES = ["Germination", "Vegetative", "Flowering", "Harvest-Ready"]

export default function FarmSetupWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<Data>({
    location: "",
    crop: "",
    acreage: 5,
    soil: "",
    irrigation: "",
    sowingDate: "",
    stage: "",
  })
  const [devOpen, setDevOpen] = useState(false)
  const [webhook, setWebhook] = useState(
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://your-n8n-pro.com/webhook/crop-twin-setup",
  )
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")

  const set = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }))
  const pill = "rounded-full px-4 py-2 text-sm font-medium transition-colors"
  const active = "bg-[#4D774E] text-[#F4F1E8]"
  const idle = "bg-white/60 text-[#164A41] border border-[#9DC88D]/50 hover:bg-[#9DC88D]/20"

  async function submit() {
    setStatus("loading")
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {})
    } finally {
      await new Promise((r) => setTimeout(r, 2000))
      setStatus("done")
    }
  }

  return (
    <div className="z-20 relative max-w-2xl mx-auto shadow-xl rounded-2xl border border-[#9DC88D]/40 bg-[#F4F1E8]/95 backdrop-blur-md p-6">
      {/* Header + dev toggle */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#164A41]">Farm Setup</h2>
          <p className="text-sm text-[#164A41]/60">Step {step} of 6</p>
        </div>
        <button
          onClick={() => setDevOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-full border border-[#D1B284] px-3 py-1.5 text-xs font-medium text-[#164A41] hover:bg-[#D1B284]/20"
        >
          <Settings2 className="h-3.5 w-3.5" /> Dev Mode: n8n Webhook URL
        </button>
      </div>
      {devOpen && (
        <input
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
          placeholder="Paste n8n Pro webhook URL"
          className="mt-3 w-full rounded-lg border border-[#D1B284] bg-white/70 px-3 py-2 text-sm text-[#164A41] outline-none"
        />
      )}

      {/* Progress bar */}
      <div className="mt-4 h-2 w-full rounded-full bg-[#9DC88D]/30">
        <div className="h-full rounded-full bg-[#9DC88D] transition-all" style={{ width: `${(step / 6) * 100}%` }} />
      </div>

      <div className="mt-6 min-h-[220px]">
        {status === "done" ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <CheckCircle2 className="h-14 w-14 text-[#4D774E]" />
            <h3 className="text-lg font-semibold text-[#164A41]">Digital Twin Generated</h3>
            <p className="text-sm text-[#164A41]/60">Your field profile was synced with the n8n Pro engine.</p>
          </div>
        ) : status === "loading" ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#4D774E]" />
            <p className="text-sm font-medium text-[#164A41]">Syncing with n8n Pro Engine...</p>
            <div className="mt-2 w-full space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-[#9DC88D]/40" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#164A41]">Town / Village</label>
                <input
                  value={data.location}
                  onChange={(e) => set({ location: e.target.value })}
                  placeholder="e.g. Nashik"
                  className="w-full rounded-lg border border-[#9DC88D]/60 bg-white/70 px-3 py-2 text-sm text-[#164A41] outline-none"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D1B284]/30 px-3 py-1 text-xs font-medium text-[#164A41]">
                  <MapPin className="h-3.5 w-3.5" /> 19.99°N, 73.78°E
                </span>
              </div>
            )}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {CROPS.map(({ id, Icon }) => (
                  <button
                    key={id}
                    onClick={() => set({ crop: id })}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors ${
                      data.crop === id ? "border-[#164A41] bg-[#4D774E] text-[#F4F1E8]" : "border-[#9DC88D]/50 bg-white/60 text-[#164A41] hover:bg-[#9DC88D]/20"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                    <span className="text-sm font-medium">{id}</span>
                  </button>
                ))}
              </div>
            )}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-medium text-[#164A41]">
                    <span>Area</span>
                    <span>{data.acreage} acres</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={data.acreage}
                    onChange={(e) => set({ acreage: Number(e.target.value) })}
                    className="mt-2 w-full accent-[#4D774E]"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {SOILS.map((s) => (
                    <button key={s} onClick={() => set({ soil: s })} className={`${pill} ${data.soil === s ? "bg-[#D1B284] text-[#164A41]" : idle}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {IRRIGATION.map(({ id, Icon }) => (
                  <button
                    key={id}
                    onClick={() => set({ irrigation: id })}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors ${
                      data.irrigation === id ? "border-[#164A41] bg-[#4D774E] text-[#F4F1E8]" : "border-[#9DC88D]/50 bg-white/60 text-[#164A41] hover:bg-[#9DC88D]/20"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                    <span className="text-sm font-medium">{id}</span>
                  </button>
                ))}
              </div>
            )}
            {step === 5 && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#164A41]">Sowing Date</label>
                <input
                  type="date"
                  value={data.sowingDate}
                  onChange={(e) => set({ sowingDate: e.target.value })}
                  className="w-full rounded-lg border border-[#9DC88D]/60 bg-white/70 px-3 py-2 text-sm text-[#164A41] outline-none"
                />
              </div>
            )}
            {step === 6 && (
              <div className="flex flex-wrap gap-2">
                {STAGES.map((s) => (
                  <button key={s} onClick={() => set({ stage: s })} className={`${pill} ${data.stage === s ? active : idle}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer nav */}
      {status === "idle" && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-[#164A41] disabled:opacity-40"
          >
            Back
          </button>
          {step < 6 ? (
            <button onClick={() => setStep((s) => Math.min(6, s + 1))} className="rounded-full bg-[#4D774E] px-6 py-2.5 text-sm font-medium text-[#F4F1E8] hover:bg-[#164A41]">
              Next Step
            </button>
          ) : (
            <button onClick={submit} className="rounded-full bg-[#4D774E] px-6 py-2.5 text-sm font-semibold text-[#F4F1E8] hover:bg-[#164A41]">
              Generate Digital Twin
            </button>
          )}
        </div>
      )}
    </div>
  )
}
