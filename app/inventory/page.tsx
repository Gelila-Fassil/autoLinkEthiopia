"use client"

import { Navbar } from "@/components/navbar"
import { PremiumCarCard } from "@/components/car-card-premium"
import { InventoryGallery } from "@/components/inventory-gallery"
import { motion } from "framer-motion"
import { ShinyText } from "@/components/ui/shiny-text"
import { SplitText } from "@/components/ui/split-text"
import { cn } from "@/lib/utils"
import dynamic from 'next/dynamic'

const Hyperspeed = dynamic(() => import('@/components/ui/hyperspeed'), { ssr: false });

const PREMIUM_CARS = [
    {
        id: 101,
        name: "Ferrari SF90 Stradale",
        category: "Hypercar",
        price: "$2,500",
        image: "/ferrari-sf90.jpg",
        year: "2024",
        owner: "Dawit G."
    },
    {
        id: 102,
        name: "Lamborghini Revuelto",
        category: "Supercar",
        price: "$3,200",
        image: "/lamborghini-revuelto.jpg",
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
                            <div className="h-[1px] w-12 bg-primary" />
                            <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold">
                                Automotive Gallery
                            </span>
                        </motion.div>

                        <div className="space-y-4">
                            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-serif font-bold tracking-tighter leading-[0.8]">
                                <SplitText delay={0.1} duration={0.03} className="text-foreground">CAR</SplitText><br />
                                <motion.span
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2, delay: 0.6 }}
                                    className="text-primary italic block mt-4"
                                >
                                    <ShinyText speed={3}>COLLECTION</ShinyText>
                                </motion.span>
                            </h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="text-muted-foreground text-xl max-w-xl leading-relaxed font-light"
                        >
                            A high-tech curated gallery showcasing Ethiopia's most prestigious automobiles. From verified partner listings to our official showroom.
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

                    {/* Symmetrical 3-Card Layout */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 max-w-[1600px] mx-auto px-4">
                        {/* Left Card */}
                        <div className="w-full lg:w-1/3 transition-all duration-500 hover:z-20">
                            <PremiumCarCard car={PREMIUM_CARS[0]} />
                        </div>

                        {/* Central Featured Card */}
                        <div className="w-full lg:w-1/3 z-10 scale-105">
                            <PremiumCarCard car={PREMIUM_CARS[1]} isFeatured={true} />
                        </div>

                        {/* Right Card */}
                        <div className="w-full lg:w-1/3 transition-all duration-500 hover:z-20">
                            <PremiumCarCard car={PREMIUM_CARS[2]} />
                        </div>
                    </div>

                    {/* Featured CTA and Indicators */}
                    <div className="mt-20 flex flex-col items-center gap-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-4 bg-primary text-background font-bold uppercase tracking-[0.2em] rounded-md shadow-[0_0_20px_rgba(187,161,79,0.4)] hover:shadow-[0_0_30px_rgba(187,161,79,0.6)] transition-all duration-300"
                        >
                            VIEW DETAILS
                        </motion.button>

                        {/* Carousel Dots */}
                        <div className="flex gap-3">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full border border-primary/40",
                                        i === 2 ? "bg-primary shadow-[0_0_8px_#bba14f]" : "bg-transparent"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Inventory Gallery */}
            <section className="py-40 relative circuit-grid">
                <div className="max-w-7xl mx-auto px-8 md:px-16 mb-20">
                    <h3 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.1em] text-white uppercase">
                        STANDARD <span className="text-primary italic">COLLECTION</span>
                    </h3>
                    <div className="h-0.5 w-24 bg-primary/40 mt-6" />
                </div>
                <InventoryGallery />
            </section>


            <footer className="py-24 border-t border-border bg-background">
                <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-2xl font-serif font-bold tracking-tight">
                        <span className="text-primary italic">A</span>
                        <span className="tracking-[0.2em]">UTOLINK</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">© 2025 Autolink Ethiopia. All Rights Reserved.</p>
                    <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                        <a href="#" className="hover:text-primary transition-colors">Telegram</a>
                    </div>
                </div>
            </footer>
        </main>
    )
}
