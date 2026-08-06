import AtmosphereBackground from "@/components/atmosphere-background"
import InteractiveGrassCanvas from "@/components/interactive-grass-canvas"
import LithosphereFooter from "@/components/lithosphere-footer"

export default function Home() {
  return (
    <>
      <AtmosphereBackground />

      {/* Foreground container sits above the fixed background layer */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        <main className="flex flex-1 flex-col items-center justify-start px-6 pt-28 pb-24 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#4D774E]">
          CropTwin AI
        </p>
        <h1 className="mt-4 max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-[#164A41] sm:text-5xl">
          A living digital twin for your fields
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-[#164A41]/70">
          Simulate growth, monitor soil health, and forecast yield with an
          agricultural intelligence platform tuned to your land.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="rounded-full bg-[#164A41] px-6 py-3 text-sm font-medium text-[#F4F1E8] transition-colors hover:bg-[#4D774E]">
            Launch dashboard
          </button>
          <button className="rounded-full border border-[#4D774E]/40 bg-transparent px-6 py-3 text-sm font-medium text-[#164A41] transition-colors hover:bg-[#9DC88D]/20">
            Watch demo
          </button>
        </div>
        </main>

        <InteractiveGrassCanvas />
        <LithosphereFooter />
      </div>
    </>
  )
}
