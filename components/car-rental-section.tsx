"use client"

import { motion } from "framer-motion"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { Gauge, Zap, Timer, ArrowRight, Star } from "lucide-react"
import { ShinyText } from "@/components/ui/shiny-text"

const RENTAL_CARS = [
    {
        id: 1,
        name: "Lamborghini Aventador SVJ",
        price: "45,000",
        stats: {
            power: "770 HP",
            speed: "350 KM/H",
            acceleration: "2.8s"
        },
        image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=1000",
        featured: true
    },
    {
        id: 2,
        name: "Rolls-Royce Cullinan",
        price: "65,000",
        stats: {
            power: "563 HP",
            speed: "250 KM/H",
            acceleration: "4.8s"
        },
        image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?auto=format&fit=crop&q=80&w=1000",
        featured: false
    },
    {
        id: 3,
        name: "McLaren 720S",
        price: "38,000",
        stats: {
            power: "710 HP",
            speed: "341 KM/H",
            acceleration: "2.9s"
        },
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000",
        featured: false
    }
]

export function CarRentalSection() {
    return (
        <section className="py-32 relative overflow-hidden bg-black/50">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-[2px] w-12 bg-primary" />
                        <span className="text-primary text-xs uppercase tracking-[0.4em] font-black">Luxury Fleet</span>
                        <div className="h-[2px] w-12 bg-primary" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight"
                    >
                        ELITE <span className="text-primary italic">RENTALS</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mb-8"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-white/60 text-lg max-w-2xl font-light leading-relaxed"
                    >
                        Don't just drive. Command the road with our exclusive collection of
                        supercars and luxury SUVs available for daily and weekly lease.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {RENTAL_CARS.map((car, index) => (
                        <CardContainer key={car.id} className="inter-var group/card">
                            <CardBody className="bg-gradient-to-b from-neutral-900/80 to-black border border-primary/20 w-auto h-auto rounded-3xl p-6 transition-all duration-300 group-hover/card:border-primary/50 group-hover/card:shadow-[0_0_50px_-15px_rgba(187,161,79,0.3)] backdrop-blur-xl relative overflow-hidden">

                                {/* Featured Badge */}
                                {car.featured && (
                                    <div className="absolute top-0 right-0 p-4 z-20">
                                        <div className="bg-primary/90 backdrop-blur-md text-background px-3 py-1 rounded-full flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-background" />
                                            <span className="text-[10px] uppercase font-black tracking-tighter">Recommended</span>
                                        </div>
                                    </div>
                                )}

                                {/* Image Section */}
                                <CardItem
                                    translateZ="100"
                                    rotateX={10}
                                    rotateZ={-2}
                                    className="w-full mt-4"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                                        <img
                                            src={car.image}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                            alt={car.name}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                            <div className="text-white">
                                                <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1">Price / Day</div>
                                                <div className="text-2xl font-serif font-bold tracking-tight">
                                                    {car.price} <span className="text-xs font-sans text-white/60">ETB</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardItem>

                                {/* Content Details */}
                                <div className="mt-8 space-y-6">
                                    <CardItem
                                        translateZ="50"
                                        className="text-2xl font-serif font-bold text-white group-hover/card:text-primary transition-colors"
                                    >
                                        {car.name}
                                    </CardItem>

                                    {/* Stats Grid */}
                                    <CardItem translateZ="60" className="grid grid-cols-3 gap-4 py-4 border-y border-white/5">
                                        <div className="flex flex-col items-center gap-1">
                                            <Zap className="w-4 h-4 text-primary opacity-70" />
                                            <span className="text-[10px] text-white/40 uppercase font-black tracking-tighter">Power</span>
                                            <span className="text-xs text-white font-bold">{car.stats.power}</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 border-x border-white/5">
                                            <Gauge className="w-4 h-4 text-primary opacity-70" />
                                            <span className="text-[10px] text-white/40 uppercase font-black tracking-tighter">Top Speed</span>
                                            <span className="text-xs text-white font-bold">{car.stats.speed}</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <Timer className="w-4 h-4 text-primary opacity-70" />
                                            <span className="text-[10px] text-white/40 uppercase font-black tracking-tighter">0-100</span>
                                            <span className="text-xs text-white font-bold">{car.stats.acceleration}</span>
                                        </div>
                                    </CardItem>

                                    {/* Action Button */}
                                    <CardItem
                                        translateZ="80"
                                        className="w-full pt-2"
                                    >
                                        <button className="w-full py-4 bg-primary/10 hover:bg-primary border border-primary/30 text-primary hover:text-background rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3">
                                            Rent Experience
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                    ))}
                </div>

                {/* Footer Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-20 flex justify-center"
                >
                    <button className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors duration-300">
                        <span className="text-xs uppercase tracking-[0.4em] font-medium">View Full Rental Catalog</span>
                        <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
