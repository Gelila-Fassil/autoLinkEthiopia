"use client"

import { Navbar } from "@/components/navbar"
import { PremiumCarCard } from "@/components/car-card-premium"
import { InventoryGallery } from "@/components/inventory-gallery"
import { PremiumCarousel } from "@/components/premium-carousel"
import { CinematicGallery } from "@/components/cinematic-gallery"
import { CarRentalSection } from "@/components/car-rental-section"
import { motion } from "framer-motion"
import { ShinyText } from "@/components/ui/shiny-text"
import { Footer } from "@/components/footer"

import { cn } from "@/lib/utils"
import dynamic from 'next/dynamic'

const Hyperspeed = dynamic(() => import('@/components/ui/hyperspeed'), { ssr: false });

const PREMIUM_CARS = [
    {
        id: 101,
        name: "Ferrari SF90 Stradale",
        category: "Hypercar",
        price: "$2,500",
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000",
        year: "2024",
        owner: "Dawit G."
    },
    {
        id: 102,
        name: "Lamborghini Revuelto",
        category: "Supercar",
        price: "$3,200",
        image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=1000",
        year: "2025",
        owner: "Selam T."
    },
    {
        id: 103,
        name: "McLaren 750S Spider",
        category: "Supercar",
        price: "$2,800",
        image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000",
        year: "2024",
        owner: "Abel M."
    },
    {
        id: 104,
        name: "Porsche 911 GT3 RS",
        category: "Track Weapon",
        price: "$2,100",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000",
        year: "2025",
        owner: "Elias K."
    }
]

export default function InventoryPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
            <Navbar />

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .premium-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .premium-scroll::-webkit-scrollbar-track {
          background: rgba(187, 161, 79, 0.05);
          border-radius: 10px;
        }
        .premium-scroll::-webkit-scrollbar-thumb {
          background: rgba(187, 161, 79, 0.3);
          border-radius: 10px;
        }
        .premium-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(187, 161, 79, 0.5);
        }
      `}</style>

            {/* Hero Section */}
            <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden">
                <Hyperspeed className="opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

                <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10 w-full">
                    <div className="space-y-10 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-[1px] w-20 bg-primary" />
                            <span className="text-xs uppercase tracking-[0.6em] text-primary font-bold shadow-primary/20 drop-shadow-md">
                                The Ultimate Collection
                            </span>
                        </motion.div>

                        <div className="space-y-0 relative">
                            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-serif font-medium tracking-tight leading-[0.9] text-white mix-blend-difference">
                                <motion.span
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="block"
                                >
                                    BEYOND
                                </motion.span>
                            </h1>
                            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-primary via-white/90 to-primary">
                                <motion.span
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="block italic"
                                >
                                    <ShinyText speed={4}>POSSIBLE</ShinyText>
                                </motion.span>
                            </h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-white/80 text-2xl md:text-3xl max-w-2xl leading-relaxed font-light font-serif border-l-2 border-primary/50 pl-6 my-8"
                        >
                            Where <span className="text-primary italic">engineering</span> meets <span className="text-white font-bold">art</span>.
                            Experience the pinnacle of automotive perfection.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Premium Selection / Featured Partner Section */}
            <section className="py-32 relative circuit-grid overflow-hidden">
                <div className="absolute inset-0 digital-pattern opacity-20 pointer-events-none" />

                <div className="max-w-[1800px] mx-auto px-8 md:px-16 relative z-10">
                    <div className="flex flex-col items-center text-center mb-20 gap-6">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-white uppercase">
                            PREMIUM SELECTION
                        </h2>
                        <div className="h-0.5 w-24 bg-primary/40 block" />
                    </div>

                    {/* Hero Carousel Component */}
                    <div className="w-full">
                        <PremiumCarousel />
                    </div>
                </div>
            </section>

            {/* Main Inventory Gallery */}
            <section className="py-20 relative circuit-grid">
                <div className="max-w-7xl mx-auto px-8 md:px-16 mb-10">
                    <h3 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.1em] text-white uppercase">
                        STANDARD <span className="text-primary italic">COLLECTION</span>
                    </h3>
                    <div className="h-0.5 w-24 bg-primary/40 mt-6" />
                </div>
                <InventoryGallery />
            </section>

            {/* Car Rental Section */}
            <CarRentalSection />

            {/* Cinematic Gallery Section */}
            <CinematicGallery />

            <Footer />
        </main>
    )
}
