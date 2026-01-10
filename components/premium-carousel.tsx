"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Gauge, Trophy, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarProps {
  id: number
  name: string
  category: string
  price: string
  image: string
  year: string
  owner?: string
}

const PREMIUM_CARS = [
  {
    id: 101,
    name: "Lamborghini Revuelto",
    category: "Hypercar",
    price: "$3,200",
    image: "/luxury-sports-car-lamborghini-revuelto-hero.jpg",
    year: "2025",
    owner: "Selam T.",
    stats: { speed: "350 km/h", power: "1001 HP", accel: "2.5s" }
  },
  {
    id: 102,
    name: "Porsche 911 GT3 RS",
    category: "Track Weapon",
    price: "$2,100",
    image: "/white-porsche-911-gt3.jpg",
    year: "2025",
    owner: "Elias K.",
    stats: { speed: "296 km/h", power: "518 HP", accel: "3.2s" }
  },
  {
    id: 103,
    name: "Rolls-Royce Ghost",
    category: "Ultra Luxury",
    price: "$2,800",
    image: "/rolls-royce-ghost-black.jpg",
    year: "2024",
    owner: "Abel M.",
    stats: { speed: "250 km/h", power: "563 HP", accel: "4.6s" }
  },
  {
    id: 104,
    name: "Mercedes-AMG G63",
    category: "Luxury SUV",
    price: "$1,500",
    image: "/black-mercedes-g-wagon.jpg",
    year: "2024",
    owner: "Dawit G.",
    stats: { speed: "220 km/h", power: "577 HP", accel: "4.5s" }
  }
]

export function PremiumCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % PREMIUM_CARS.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + PREMIUM_CARS.length) % PREMIUM_CARS.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }

  const currentCar = PREMIUM_CARS[currentIndex]

  return (
    <div className="relative w-full max-w-[1400px] mx-auto h-[700px] flex items-center justify-center">
      {/* Navigation - Left */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 z-40 p-4 rounded-full border border-primary/20 bg-black/50 backdrop-blur-md text-white hover:bg-primary hover:text-black transition-all duration-300 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Navigation - Right */}
      <button 
        onClick={handleNext}
        className="absolute right-4 z-40 p-4 rounded-full border border-primary/20 bg-black/50 backdrop-blur-md text-white hover:bg-primary hover:text-black transition-all duration-300 group"
      >
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Main Content */}
      <div className="relative w-full h-full overflow-hidden flex items-center px-20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 100, damping: 20, mass: 1.2 }, // Slower, heavier feel
              opacity: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 0.8, ease: "circOut" }
            }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-950/80 border border-white/10 rounded-[3rem] p-8 overflow-hidden backdrop-blur-xl">
              
              {/* Image Section */}
              <div className="relative h-full w-full rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <motion.img 
                  src={currentCar.image} 
                  alt={currentCar.name} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 z-20">
                   <div className="px-4 py-2 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-full">
                      Verified Partner
                   </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-8 pr-8">
                <div className="space-y-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 text-primary font-bold uppercase tracking-[0.2em] text-sm"
                  >
                    <span>{currentCar.year}</span>
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    <span>{currentCar.category}</span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl font-serif font-bold text-white leading-none"
                  >
                    {currentCar.name}
                  </motion.h2>

                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.4 }}
                     className="inline-block"
                  >
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 mt-4">
                      {currentCar.price} <span className="text-sm text-white/50 font-normal">/ day</span>
                    </p>
                  </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-4 border-y border-white/10 py-6"
                >
                  <div className="text-center space-y-1">
                    <Gauge className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold text-white">{currentCar.stats.speed}</p>
                    <p className="text-[10px] uppercase text-white/50">Top Speed</p>
                  </div>
                  <div className="text-center space-y-1 border-x border-white/10">
                    <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold text-white">{currentCar.stats.power}</p>
                    <p className="text-[10px] uppercase text-white/50">Power</p>
                  </div>
                  <div className="text-center space-y-1">
                    <Trophy className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold text-white">{currentCar.stats.accel}</p>
                    <p className="text-[10px] uppercase text-white/50">0-100 km/h</p>
                  </div>
                </motion.div>

                <div className="flex gap-4 pt-4">
                    <button className="flex-1 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors text-sm">
                        View Details
                    </button>
                    <button className="flex-1 py-4 border border-white/20 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors text-sm">
                        Reserver Now
                    </button>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {PREMIUM_CARS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1)
                setCurrentIndex(idx)
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              idx === currentIndex ? "w-8 bg-primary" : "bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  )
}
