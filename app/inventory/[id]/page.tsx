"use client"

import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Info, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { RotatingCarShowcase } from "@/components/rotating-car-showcase"

export default function CarDetailPage() {
    const params = useParams()
    const id = params.id as string

    // Mock data - in a real app this would be fetched
    const carData: Record<string, any> = {
        "1": {
            name: "Mercedes-Benz G63 AMG",
            price: "$285,000",
            year: "2025",
            category: "Luxury SUV",
            image: "/black-mercedes-g-wagon.jpg",
            description: "The Mercedes-Benz G-Class, sometimes colloquially called the G-Wagen, is a mid-size four-wheel drive luxury SUV. The G63 AMG variant offers unparalleled power and prestige.",
            specs: [
                { label: "Engine", value: "4.0L V8 Biturbo" },
                { label: "Horsepower", value: "577 hp" },
                { label: "0-60 mph", value: "4.5s" },
                { label: "Transmission", value: "9-Speed Auto" }
            ],
            features: ["AMG Night Package", "Nappa Leather", "Burmester Sound", "Active Distance Assist"]
        },
        "101": {
            name: "Ferrari SF90 Stradale",
            price: "$2,500",
            year: "2024",
            category: "Hypercar",
            image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000",
            description: "The SF90 Stradale is the first ever Ferrari to feature PHEV (Plug-in Hybrid Electric Vehicle) architecture. It represents a new paradigm for performance and technology.",
            specs: [
                { label: "Engine", value: "4.0L V8 Hybrid" },
                { label: "Combined HP", value: "986 hp" },
                { label: "0-60 mph", value: "2.5s" },
                { label: "Top Speed", value: "211 mph" }
            ],
            features: ["Assetto Fiorano Pack", "Carbon Fiber Wheels", "Digital Cockpit", "eManettino Controls"]
        }
    }

    const car = carData[id] || carData["1"] // Fallback to G-Wagon

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navbar />

            <div className="pt-40 pb-20 max-w-7xl mx-auto px-8 md:px-16">
                <div className="mb-12">
                    <Link href="/inventory" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-[10px] uppercase tracking-widest font-bold group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Inventory
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* 3D Showcase */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-square lg:h-[650px] w-full bg-neutral-900/30 rounded-[40px] overflow-hidden border border-white/5 group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />

                        {/* Visual effects overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-10" />

                        <RotatingCarShowcase image={car.image} />

                        <div className="absolute top-10 left-10 z-20">
                            <div className="px-4 py-1.5 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-primary">{car.category}</span>
                            </div>
                        </div>

                        <div className="absolute bottom-12 left-12 z-20 space-y-2">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-bold block">Series Model</span>
                            <div className="text-5xl font-serif font-bold tracking-tighter">{car.year}</div>
                        </div>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-16"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="h-1 w-20 bg-primary"
                            />
                            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-[0.9]">{car.name}</h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-serif text-primary gold-gradient">{car.price}</span>
                                {Number(id) >= 100 && <span className="text-muted-foreground text-sm font-sans">/ day</span>}
                            </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-xl font-light max-w-xl">
                            {car.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {car.specs.map((spec: any, i: number) => (
                                <motion.div
                                    key={spec.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + (i * 0.1) }}
                                    className="p-8 bg-neutral-900/50 border border-white/5 rounded-3xl space-y-3 hover:border-primary/20 transition-colors"
                                >
                                    <div className="text-[9px] uppercase tracking-[0.3em] text-primary font-bold">{spec.label}</div>
                                    <div className="text-2xl font-semibold tracking-tight">{spec.value}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-bold">Standard Excellence</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                {car.features.map((feature: string, i: number) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 + (i * 0.05) }}
                                        className="flex items-center gap-4 text-sm"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-foreground/80 font-medium">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="flex flex-col sm:flex-row gap-6 pt-10"
                        >
                            <button className="flex-1 px-12 py-6 bg-primary text-background font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-accent transition-all shadow-xl shadow-primary/10">
                                Proceed to Inquiry
                            </button>
                            <button className="flex-1 px-12 py-6 border-2 border-primary/30 text-primary font-bold uppercase text-[10px] tracking-[0.4em] hover:border-primary transition-all">
                                Request Viewing
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <footer className="py-24 border-t border-border bg-background mt-20">
                <div className="max-w-7xl mx-auto px-8 md:px-16 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">© 2025 Autolink Ethiopia. All Rights Reserved.</p>
                </div>
            </footer>
        </main>
    )
}
