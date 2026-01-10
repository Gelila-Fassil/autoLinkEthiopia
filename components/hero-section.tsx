"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-black"
    >
      {/* Cinematic Background Image */}
      <motion.div 
        style={{ y: bgY, opacity: opacity }}
        className="absolute inset-0 z-0 h-[120%]"
      >
        <Image
          src="/hero-luxury.png"
          alt="Luxury Rolls Royce Spectre in concrete gallery"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        <div className="absolute inset-0 bg-black/20" /> {/* General dimming for text contrast */}
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 pt-32 md:px-12 lg:px-24">
        <motion.div 
          style={{ y: textY }}
          className="max-w-4xl space-y-8"
        >
          {/* Subtle Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <div className="h-[1px] w-12 bg-primary/60" />
            <span className="text-sm font-medium uppercase tracking-[0.4em] text-primary/80">
              Est. 2020 · Addis Ababa
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl font-medium tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[7rem] leading-[1.1]"
            >
              The Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white/80 to-primary">Excellence.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-xl text-lg font-light leading-relaxed text-white/70 sm:text-xl"
          >
            Curating the finest collection of luxury automobiles and investment-grade properties for Ethiopia's elite.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative z-50 flex flex-wrap gap-6 pt-4"
          >
            <a
              href="#inventory"
              className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              <span>Explore Stock</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a
              href="#contact"
              className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/40"
            >
              <span>Concierge</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 hidden text-right md:block"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-white/30">
          Scroll to Discover
        </p>
        <div className="mt-4 flex justify-end">
           <div className="h-16 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}