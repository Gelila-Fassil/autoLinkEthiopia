"use client"

import { motion } from "framer-motion"
import { RotatingCarShowcase } from "./rotating-car-showcase"
import { ShinyText } from "./ui/shiny-text"
import { SplitText } from "./ui/split-text"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Animated grain texture */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-8 md:px-16 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Description and CTA */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-[9px] uppercase tracking-[0.4em] text-primary font-bold">
                Addis Ababa — Since 2020
              </span>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="text-[clamp(3rem,8vw,7rem)] font-serif font-bold tracking-tighter leading-[0.9]">
                <SplitText delay={0.5} duration={0.03} className="block text-foreground">
                  AUTOLINK
                </SplitText>
              </h1>

              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2rem,6vw,5rem)] font-serif italic leading-none"
              >
                <ShinyText className="text-primary" speed={4}>
                  Ethiopia
                </ShinyText>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.5 }}
              className="space-y-6 max-w-xl"
            >
              <p className="text-lg text-foreground/90 leading-relaxed font-light">
                Experience the pinnacle of automotive excellence and architectural luxury.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                We curate the world's most prestigious automobiles and exclusive residences for discerning clientele in
                Ethiopia.
              </p>

              <div className="flex items-center gap-8 pt-4">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">250+</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Vehicles Sold</div>
                </div>
                <div className="h-12 w-[1px] bg-border" />
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">$50M+</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Total Value</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex flex-col sm:flex-row gap-6 pt-6"
            >
              <motion.a
                href="#spotlight"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-5 bg-primary text-background font-bold uppercase text-xs tracking-[0.3em] overflow-hidden transition-all duration-300"
              >
                <motion.span
                  className="absolute inset-0 bg-accent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="relative z-10">Explore Collection</span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, borderColor: "rgba(212, 175, 55, 1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 border-2 border-primary/50 text-primary font-bold uppercase text-xs tracking-[0.3em] transition-all duration-300"
              >
                Schedule Visit
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Car showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] lg:h-[700px] w-full"
          >
            <RotatingCarShowcase />
          </motion.div>
        </div>
      </div>

      {/* Decorative glowing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] bg-accent rounded-full blur-[160px] pointer-events-none"
      />
    </section>
  )
}
