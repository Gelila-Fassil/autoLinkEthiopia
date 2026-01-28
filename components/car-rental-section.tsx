"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { Gauge, Zap, Timer, ArrowRight, Star } from "lucide-react"
import { ShinyText } from "@/components/ui/shiny-text"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const RENTAL_CARS = [
    {
        id: 1,
        name: "Lamborghini Aventador SVJ",
        category: "Exotic Supercar",
        price: "45,000",
        year: "2024",
        image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=1000",
        featured: true
    },
    {
        id: 2,
        name: "Rolls-Royce Cullinan",
        category: "Luxury SUV",
        price: "65,000",
        year: "2024",
        image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?auto=format&fit=crop&q=80&w=1000",
        featured: false
    },
    {
        id: 3,
        name: "McLaren 720S",
        category: "Supercar",
        price: "38,000",
        year: "2024",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000",
        featured: false
    },
    {
        id: 4,
        name: "Ferrari SF90 Stradale",
        category: "Hypercar",
        price: "55,000",
        year: "2025",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000",
        featured: true
    },
    {
        id: 5,
        name: "Aston Martin Valkyrie",
        category: "Hypercar",
        price: "75,000",
        year: "2024",
        image: "https://images.unsplash.com/photo-1603584173870-7f1efd9a1645?auto=format&fit=crop&q=80&w=1000",
        featured: false
    },
    {
        id: 6,
        name: "Porsche 911 GT3 RS",
        category: "Track Car",
        price: "32,000",
        year: "2024",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
        featured: false
    },
    {
        id: 7,
        name: "Bentley Continental GT",
        category: "Grand Tourer",
        price: "42,000",
        year: "2024",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1000",
        featured: false
    },
    {
        id: 8,
        name: "Range Rover SV",
        category: "Luxury SUV",
        price: "28,000",
        year: "2024",
        image: "https://images.unsplash.com/photo-1606148349152-441147575306?auto=format&fit=crop&q=80&w=1000",
        featured: false
    }
]

export function CarRentalSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const { scrollXProgress } = useScroll({
        container: scrollContainerRef
    })

    const scaleX = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <section className="py-32 relative overflow-hidden bg-black/50">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-8 md:px-16 relative z-10">
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
                        car for <span className="text-primary italic">rental</span>
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

                {/* Side Scrolling Container */}
                <div className="relative w-full">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 no-scrollbar -mx-4 scroll-smooth"
                    >
                        {RENTAL_CARS.map((car, index) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[380px]"
                            >
                                <CardContainer className="inter-var w-full h-full" containerClassName="py-0">
                                    <CardBody className="relative group/card w-full h-full min-h-[360px] p-4 rounded-3xl transition-all duration-500 hover:-translate-y-3 flex flex-col bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-2 border-primary/30 hover:border-primary/80 shadow-[0_0_60px_-20px_rgba(187,161,79,0.2)] hover:shadow-[0_0_100px_-20px_rgba(187,161,79,0.5)] backdrop-blur-sm">
                                        {/* Animated gradient overlay */}
                                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        {/* Shimmer border effect */}
                                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent gold-shimmer" />
                                        </div>

                                        <CardItem translateZ="50" className="w-full relative z-10">
                                            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-neutral-800 to-black group-hover/card:border-primary/60 transition-all duration-500">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                                <Image
                                                    src={car.image}
                                                    alt={car.name}
                                                    fill
                                                    className="object-cover group-hover/card:scale-110 transition-transform duration-700 font-bold"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                {car.featured && (
                                                    <div className="absolute top-4 right-4 z-20 bg-primary text-background px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                                        Recommended
                                                    </div>
                                                )}
                                                <div className="absolute bottom-4 left-4 z-20 bg-black/80 backdrop-blur-md text-primary px-4 py-2 rounded-full text-xs font-bold border border-primary/30">
                                                    {car.year}
                                                </div>
                                            </div>
                                        </CardItem>

                                        <div className="mt-6 space-y-4 relative z-10 flex flex-col flex-1">
                                            <div className="space-y-3">
                                                <CardItem
                                                    translateZ="40"
                                                    className="text-xl md:text-2xl font-serif font-bold text-white group-hover/card:text-primary transition-colors duration-300"
                                                >
                                                    {car.name}
                                                </CardItem>
                                                <CardItem
                                                    as="p"
                                                    translateZ="30"
                                                    className="text-primary text-sm uppercase tracking-[0.3em] font-bold flex items-center gap-3"
                                                >
                                                    <span className="w-12 h-px bg-primary/50" />
                                                    <span>{car.category}</span>
                                                </CardItem>
                                            </div>

                                            <div className="flex flex-col gap-4 pt-6 border-t-2 border-primary/20 group-hover/card:border-primary/60 transition-colors duration-300 mt-auto">
                                                <div className="flex justify-between items-center w-full">
                                                    <CardItem
                                                        translateZ="30"
                                                        className="text-white flex flex-col"
                                                    >
                                                        <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1">Price / Day</span>
                                                        <span className="text-xl font-serif font-bold tracking-tight">
                                                            {car.price} <span className="text-xs font-sans text-white/60">ETB</span>
                                                        </span>
                                                    </CardItem>
                                                </div>

                                                <Link href={`/inventory/${car.id}`} className="w-full">
                                                    <CardItem
                                                        translateZ="40"
                                                        as="button"
                                                        className="w-full py-4 bg-primary text-background hover:bg-white font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group/btn hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(187,161,79,0.5)]"
                                                    >
                                                        Book Rental
                                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                                    </CardItem>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-50 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </CardBody>
                                </CardContainer>
                            </motion.div>
                        ))}
                    </div>

                    {/* Scroll Indicator */}
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <div className="h-[2px] w-48 bg-white/10 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-primary"
                                style={{ scaleX, transformOrigin: "0%" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-20 flex justify-center"
                >
                    <Link href="/inventory" className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors duration-300">
                        <span className="text-xs uppercase tracking-[0.4em] font-medium">View Full Rental Catalog</span>
                        <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
