"use client"

import { Navbar } from "@/components/navbar"
import { HouseGallery } from "@/components/house-gallery"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { ShinyText } from "@/components/ui/shiny-text"
import dynamic from 'next/dynamic'

const Hyperspeed = dynamic(() => import('@/components/ui/hyperspeed'), { ssr: false });

export default function HousesPage() {
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
      `}</style>

            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
                {/* Background Image/Effect */}
                 <div className="absolute inset-0 bg-[url('/kazanchis-villa.png')] bg-cover bg-center opacity-40 transform scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background pointer-events-none" />
                 <div className="absolute inset-0 bg-black/40 z-0" />
                 
                <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10 w-full">
                    <div className="space-y-8 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-[1px] w-20 bg-primary" />
                            <span className="text-xs uppercase tracking-[0.6em] text-primary font-bold shadow-primary/20 drop-shadow-md">
                                Exclusive Real Estate
                            </span>
                        </motion.div>

                        <div className="space-y-2 relative">
                            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif font-medium tracking-tight leading-[0.9] text-white">
                                <motion.span
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="block"
                                >
                                    LUXURY
                                </motion.span>
                            </h1>
                            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-primary via-white/90 to-primary">
                                <motion.span
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="block italic"
                                >
                                    <ShinyText speed={4}>LIVING SPACES</ShinyText>
                                </motion.span>
                            </h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-white/80 text-xl md:text-2xl max-w-xl leading-relaxed font-light font-serif pl-1"
                        >
                            Discover extraordinary homes in <span className="text-primary">Addis Ababa</span>'s most prestigious neighborhoods.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Main Houses Galery */}
            <section className="py-20 relative circuit-grid">
                 <div className="absolute inset-0 digital-pattern opacity-10 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-8 md:px-16 mb-16 flex flex-col items-center text-center">
                    <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4">Curated Portfolio</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white">
                        AVAILABLE <span className="text-primary italic">RESIDENCES</span>
                    </h2>
                    <div className="h-0.5 w-24 bg-primary/40 mt-8" />
                </div>
                <div className="px-4 md:px-8">
                    <HouseGallery />
                </div>
            </section>

            <Footer />
        </main>
    )
}
