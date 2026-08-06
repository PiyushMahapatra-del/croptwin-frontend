"use client"

import { useEffect, useRef } from "react"

type Blade = {
  x: number
  height: number
  width: number
  baseColor: string
  tipColor: string
  angle: number // current bend angle (radians)
  velocity: number // angular velocity for spring physics
}

const PRIMARY = "#4D774E" // rich leaf green
const HIGHLIGHT = "#9DC88D" // soft sage
const SHADOW = "#164A41" // forest brown

const PROXIMITY = 120 // px threshold for cursor influence
const MAX_BEND = 0.9 // max lean in radians
const STIFFNESS = 0.08 // spring pull back toward upright
const DAMPING = 0.82 // velocity damping

export default function InteractiveGrassCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bladesRef = useRef<Blade[]>([])
  const mouseRef = useRef<{ x: number; active: boolean }>({ x: -9999, active: false })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    const CANVAS_HEIGHT = 60

    const buildBlades = () => {
      width = canvas.clientWidth
      canvas.width = width * dpr
      canvas.height = CANVAS_HEIGHT * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Dense natural row: 70-90 blades across the width
      const count = Math.max(70, Math.min(90, Math.round(width / 14)))
      const blades: Blade[] = []
      for (let i = 0; i < count; i++) {
        // jitter each blade's x so it isn't a synthetic comb
        const x = (width / count) * (i + 0.5) + (Math.random() - 0.5) * 6
        blades.push({
          x,
          height: 25 + Math.random() * 20, // 25-45px
          width: 2.4 + Math.random() * 1.8,
          baseColor: Math.random() > 0.5 ? PRIMARY : SHADOW,
          tipColor: Math.random() > 0.35 ? HIGHLIGHT : PRIMARY,
          angle: (Math.random() - 0.5) * 0.08, // slight natural variance
          velocity: 0,
        })
      }
      bladesRef.current = blades
    }

    const drawBlade = (b: Blade) => {
      const baseY = CANVAS_HEIGHT
      // Bezier control mapped along the bend angle
      const tipX = b.x + Math.sin(b.angle) * b.height
      const tipY = baseY - Math.cos(b.angle) * b.height
      const ctrlX = b.x + Math.sin(b.angle) * b.height * 0.5
      const ctrlY = baseY - b.height * 0.55

      const grad = ctx.createLinearGradient(b.x, baseY, tipX, tipY)
      grad.addColorStop(0, b.baseColor)
      grad.addColorStop(1, b.tipColor)

      ctx.beginPath()
      ctx.moveTo(b.x - b.width / 2, baseY)
      ctx.quadraticCurveTo(ctrlX - b.width / 4, ctrlY, tipX, tipY)
      ctx.quadraticCurveTo(ctrlX + b.width / 4, ctrlY, b.x + b.width / 2, baseY)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, CANVAS_HEIGHT)
      const mouse = mouseRef.current
      for (const b of bladesRef.current) {
        // target rest angle
        let target = 0
        if (mouse.active) {
          const dx = mouse.x - b.x
          if (Math.abs(dx) < PROXIMITY) {
            const strength = 1 - Math.abs(dx) / PROXIMITY
            // lean AWAY from cursor: sign opposite of dx direction
            target = -Math.sign(dx) * MAX_BEND * strength
          }
        }
        // spring physics toward target
        const force = (target - b.angle) * STIFFNESS
        b.velocity = (b.velocity + force) * DAMPING
        b.angle += b.velocity
        drawBlade(b)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, active: true }
    }
    const onLeave = () => {
      mouseRef.current.active = false
    }

    buildBlades()
    tick()
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseout", onLeave)
    const onResize = () => buildBlades()
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", onLeave)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-10 -mb-px w-full select-none"
      style={{ height: 60 }}
    >
      <canvas ref={canvasRef} className="block h-[60px] w-full" />
    </div>
  )
}
