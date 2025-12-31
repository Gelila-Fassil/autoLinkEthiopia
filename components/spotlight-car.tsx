"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Gauge, Zap, Trophy, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { ShinyText } from "./ui/shiny-text"

export function SpotlightCar() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      id="spotlight"
      className="relative min-h-screen flex items-center overflow-hidden py-32 bg-background"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <motion.div style={{ opacity }} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold border-l-2 border-primary pl-4">
                Exclusive Selection
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-foreground">
                Futuristic <br />
                <span className="text-primary italic">Excellence</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              The Autolink Genesis – A masterpiece of bespoke automotive engineering,
              redefining luxury for the modern era.
            </p>

            <div className="grid grid-cols-3 gap-8 pt-6">
              <div className="space-y-1">
                <Gauge className="w-5 h-5 text-primary" />
                <div className="text-2xl font-serif font-bold text-foreground">1250</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">HP</div>
              </div>
              <div className="space-y-1">
                <Zap className="w-5 h-5 text-primary" />
                <div className="text-2xl font-serif font-bold text-foreground">1.9s</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">0-100</div>
              </div>
              <div className="space-y-1">
                <Trophy className="w-5 h-5 text-primary" />
                <div className="text-2xl font-serif font-bold text-foreground">380</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">KPH</div>
              </div>
            </div>

            <div className="pt-6">
              <button className="px-10 py-4 bg-primary text-background font-bold uppercase text-[11px] tracking-[0.3em] rounded-full hover:bg-white transition-all duration-300 shadow-xl">
                Register Interest
              </button>
            </div>
          </div>

          <motion.div style={{ y }} className="relative">
            <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              <img
                src="/futuristic_luxury_concept_car_dark.png"
                alt="Autolink Genesis"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function CardItem({ children, className, translateZ }: any) {
  return (
    <div
      className={className}
      style={{
        transform: `translateZ(${translateZ}px)`
      }}
    >
      {children}
    </div>
  )
}
