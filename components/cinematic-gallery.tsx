"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const GALLERY_IMAGES = [
  "/luxury-sports-car-lamborghini-revuelto-hero.jpg",
  "/bentley-continental-gt-white.jpg",
  "/black-mercedes-g-wagon.jpg",
  "/white-porsche-911-gt3.jpg",
  "/gold-range-rover.jpg",
  "/rolls-royce-ghost-black.jpg",
  "/bmw-m8-competition-black.jpg",
  "/futuristic_luxury_concept_car_dark.png",
  "/hero-luxury.png",
  "/luxury-apartment-living-room.jpg",
  "/modern-villa-exterior-night.jpg",
]

// Duplicate images multiple times for seamless infinite loop
const createInfiniteImages = (images: string[]) => {
  // Duplicate twice; we animate by exactly one set height for a seamless loop.
  return [...images, ...images]
}

const Column = ({ images, direction = "up" }: { images: string[], direction?: "up" | "down" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [oneSetHeight, setOneSetHeight] = useState<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const totalHeight = containerRef.current.getBoundingClientRect().height
    // We render exactly 2 sets (see createInfiniteImages), so divide by 2.
    const computedOneSetHeight = totalHeight / 2
    if (Number.isFinite(computedOneSetHeight)) {
      setOneSetHeight(computedOneSetHeight)
    }
  }, [images.length])

  const animate = oneSetHeight
    ? {
        // For downward motion, start offset upward so we never reveal an empty gap at the top.
        y: direction === "up"
          ? [0, -oneSetHeight]
          : [-oneSetHeight, 0]
      }
    : undefined

  const transition = oneSetHeight
    ? {
        duration: 120,
        repeat: Infinity,
        ease: "linear",
        delay: 0,
      } as const
    : undefined

  return (
    <motion.div 
      ref={containerRef}
      className="flex flex-col gap-4 w-full relative min-w-[250px]"
      animate={animate}
      transition={transition}
    >
      {/* Render images multiple times for seamless infinite loop */}
      {images.map((src, i) => (
        <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden group shadow-2xl border border-white/10 flex-shrink-0">
          <motion.img
            src={src}
            alt="Gallery item"
            className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110"
          />
          <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/80 rounded-xl transition-all duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[inset_0_0_30px_rgba(187,161,79,0.3)]" />
        </div>
      ))}
    </motion.div>
  )
}

export function CinematicGallery() {
  const infiniteImages1 = createInfiniteImages(GALLERY_IMAGES)
  const infiniteImages2 = createInfiniteImages(GALLERY_IMAGES)
  const infiniteImages3 = createInfiniteImages(GALLERY_IMAGES)
  const infiniteImages4 = createInfiniteImages(GALLERY_IMAGES)

  return (
    <section className="py-32 bg-background overflow-hidden relative">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
         <div className="mb-24 text-center space-y-4">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="text-5xl md:text-7xl font-serif font-black text-white uppercase tracking-tighter"
             >
               Visual <span className="text-primary italic font-light">Symphony</span>
             </motion.h2>
             <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm font-medium">Automotive Artistry in Motion</p>
         </div>

         <div className="h-[120vh] overflow-hidden rounded-[3rem] bg-zinc-900/10 border border-primary/10 backdrop-blur-sm p-4 md:p-8 relative">
             <div className="flex gap-4 md:gap-8 -mt-[25vh]">
                <Column images={infiniteImages1} direction="up" />
                <Column images={infiniteImages2} direction="down" />
                <Column images={infiniteImages3} direction="up" />
                <div className="hidden lg:block w-full">
                     <Column images={infiniteImages4} direction="down" />
                </div>
            </div>
         </div>

         <div className="mt-20 flex flex-col items-center justify-center space-y-8 text-center bg-gradient-to-b from-transparent to-black/40 p-12 rounded-3xl border border-white/5 mx-auto max-w-4xl backdrop-blur-sm">
             <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">Experience <span className="text-primary italic">Excellence</span></h3>
                <p className="text-muted-foreground max-w-lg mx-auto">Witness the finest collection of luxury automobiles in person. Schedule your private viewing today.</p>
             </div>
             <button className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(187,161,79,0.3)]">
                Book Private Viewing
             </button>
         </div>
      </div>
      
      {/* Overlay Gradients to hide scroll edges */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}
