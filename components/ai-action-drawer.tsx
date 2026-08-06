"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Sparkles,
  Droplets,
  TrendingUp,
  IndianRupee,
  Check,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react"

type Status = "idle" | "applying" | "applied"

export default function AiActionDrawer() {
  const [status, setStatus] = useState<Status>("idle")
  const [showIgnoreTip, setShowIgnoreTip] = useState(false)

  function handleApply() {
    if (status === "applying") return
    setStatus("applying")
    setTimeout(() => setStatus("applied"), 1600)
  }

  return (
    <div className="z-20 relative max-w-2xl mx-auto shadow-xl rounded-2xl border border-[#9DC88D]/40 bg-[#F4F1E8]/95 backdrop-blur-md p-6 text-left">
      {/* 1. Anomaly alert banner */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#D1B284]/50 bg-[#D1B284]/15 px-4 py-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D1B284] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D1B284]" />
        </span>
        <div className="flex items-center gap-2 text-sm font-medium text-[#164A41]">
          <AlertTriangle className="h-4 w-4 text-[#D1B284]" aria-hidden />
          <span>Attention Needed: Western 4 cells dropping in moisture rapidly.</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-[#4D774E]" aria-hidden />
        <span className="rounded-full bg-[#9DC88D]/25 px-2.5 py-1 text-xs font-medium text-[#4D774E]">
          Trained RL Policy + Gemini Language Layer
        </span>
      </div>

      {/* 2. LLM plain-language advice box */}
      <div className="mt-4 rounded-xl border border-[#9DC88D]/40 bg-white/60 p-4">
        <h2 className="text-base font-semibold text-[#164A41]">Recommended action</h2>
        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-[#164A41]/80">
          Irrigate the western 4 cells today. Rain is predicted in 3 days so skip the eastern half.
          This will save 1,200 L of water and protect yield from dropping.
        </p>
      </div>

      {/* 3. The value trio */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#9DC88D]/50 bg-[#9DC88D]/15 p-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#4D774E]">
            <Droplets className="h-3.5 w-3.5" aria-hidden />
            Water Saved
          </div>
          <p className="mt-1.5 text-2xl font-semibold text-[#164A41]">1,200 L</p>
        </div>
        <div className="rounded-xl border border-[#9DC88D]/50 bg-[#9DC88D]/15 p-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#4D774E]">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            Yield Protected
          </div>
          <p className="mt-1.5 text-2xl font-semibold text-[#4D774E]">+0.4 T/Acre</p>
        </div>
        <div className="rounded-xl border border-[#D1B284]/60 bg-[#D1B284]/20 p-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#164A41]/70">
            <IndianRupee className="h-3.5 w-3.5" aria-hidden />
            Net Profit Impact
          </div>
          <p className="mt-1.5 text-2xl font-semibold text-[#164A41]">+3,500</p>
        </div>
      </div>

      {/* Success banner */}
      {status === "applied" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#4D774E]/40 bg-[#4D774E]/15 px-4 py-3 text-sm font-medium text-[#164A41]">
          <CheckCircle2 className="h-4 w-4 text-[#4D774E]" aria-hidden />
          Western zone irrigated. Farm state updated and moisture recovering.
        </div>
      )}

      {/* 4. Farmer feedback actions */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleApply}
          disabled={status === "applying" || status === "applied"}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#4D774E] px-6 py-3 text-sm font-medium text-[#F4F1E8] transition-colors hover:bg-[#164A41] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "applying" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Updating Farm State...
            </>
          ) : status === "applied" ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Advice Applied
            </>
          ) : (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Apply AI Advice (Simulate Action)
            </>
          )}
        </button>

        <div
          className="relative flex-1"
          onMouseEnter={() => setShowIgnoreTip(true)}
          onMouseLeave={() => setShowIgnoreTip(false)}
        >
          <button
            onFocus={() => setShowIgnoreTip(true)}
            onBlur={() => setShowIgnoreTip(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#164A41]/25 bg-transparent px-6 py-3 text-sm font-medium text-[#164A41] transition-colors hover:bg-[#164A41]/5"
          >
            <X className="h-4 w-4" aria-hidden />
            Ignore / Wait
          </button>
          {showIgnoreTip && (
            <div
              role="tooltip"
              className="absolute -top-12 left-1/2 z-30 w-64 -translate-x-1/2 rounded-lg bg-[#164A41] px-3 py-2 text-center text-xs font-medium text-[#F4F1E8] shadow-lg"
            >
              Ignoring may increase disease risk over 7 days.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
