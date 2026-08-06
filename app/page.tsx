import React from "react"
import AtmosphereBackground from "@/components/atmosphere-background"
import LithosphereFooter from "@/components/lithosphere-footer"
import InteractiveGrassCanvas from "@/components/interactive-grass-canvas"
import FarmSetupWizard from "@/components/farm-setup-wizard"
import DigitalTwinGrid from "@/components/digital-twin-grid"
import AiActionDrawer from "@/components/ai-action-drawer"
import ScenarioComparison from "@/components/scenario-comparison"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#F4F1E8] text-[#164A41]">
      {/* z-0: Fixed Background Atmosphere Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AtmosphereBackground />
      </div>

      {/* z-10: Foreground Interactive Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        
        {/* Top Navigation Bar */}
        <header className="w-full border-b border-[#9DC88D]/30 bg-[#F4F1E8]/80 backdrop-blur-md px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-[#164A41]">
                🌾 CropTwin <span className="text-[#4D774E]">AI</span>
              </span>
              <span className="rounded-full bg-[#9DC88D]/30 px-2.5 py-0.5 text-xs font-medium text-[#164A41]">
                RL + n8n Pro
              </span>
            </div>
            <div className="text-xs font-semibold text-[#4D774E]">
              🟢 Live Digital Twin Engine
            </div>
          </div>
        </header>

        {/* Main Content Sections Stacked Vertically */}
        <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-12">
          
          {/* Section 1: 6-Step Setup Wizard */}
          <section>
            <FarmSetupWizard />
          </section>

          {/* Section 2: Interactive 5x5 / 8x8 Matrix Grid */}
          <section>
            <DigitalTwinGrid />
          </section>

          {/* Section 3: AI Plain-Language Advice Drawer */}
          <section>
            <AiActionDrawer />
          </section>

          {/* Section 4: 30-Day ROI Comparison */}
          <section>
            <ScenarioComparison />
          </section>
          
        </div>

        {/* Bottom Geological Lithosphere Footer with Grass Border */}
        <div className="w-full mt-20">
          <InteractiveGrassCanvas />
          <LithosphereFooter />
        </div>

      </div>
    </main>
  )
}