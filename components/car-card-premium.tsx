"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { cn } from "@/lib/utils" // Assuming cn utility is available here

interface CarProps {
    id: number
    name: string
    category: string
    price: string
    image: string
    year: string
    owner?: string
    isFeatured?: boolean
}

export function PremiumCarCard({ car, isFeatured }: { car: CarProps, isFeatured?: boolean }) {
    return (
        <CardContainer className="inter-var w-full">
            <CardBody className={cn(
                "relative group/card bg-neutral-950 border w-auto h-auto min-h-[520px] p-8 rounded-3xl transition-all duration-500 overflow-hidden hover:scale-110 hover:z-50",
                isFeatured
                    ? "neon-gold-glow animate-neon-pulse-gold border-primary"
                    : "border-primary/20 hover:border-primary/60 hover:shadow-[0_0_50px_-12px_rgba(187,161,79,0.3)]"
            )}>
                {isFeatured && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px] pointer-events-none text-center p-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-serif font-bold text-white tracking-widest leading-tight"
                        >
                            RENT YOUR <span className="text-primary italic">DREAM CAR</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-primary font-bold tracking-[0.2em] mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                        >
                            EARN WITH ANTIGRAVITY
                        </motion.p>
                    </div>
                )}

                {/* Animated Shimmer Border Effect - only for non-featured or as extra for featured */}
                {!isFeatured && (
                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-primary/10 to-transparent animate-[shimmer_4s_infinite_linear]" />
                    </div>
                )}

                <div className="absolute top-0 right-0 p-6 z-20">
                    <CardItem
                        translateZ="50"
                        className="bg-primary/20 backdrop-blur-xl border border-primary/30 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-primary/10"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Verified Partner</span>
                    </CardItem>
                </div>

                <CardItem translateZ="100" className="w-full mt-4 relative">
                    {/* Background Aura/Glow */}
                    <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-75 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />

                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5">
                        <img
                            src={car.image || "/placeholder.svg"}
                            alt={car.name}
                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Reduced gradient opacity for better car visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-60 group-hover/card:opacity-20 transition-opacity duration-500" />
                    </div>
                </CardItem>

                <div className="mt-8 space-y-6">
                    <div className="space-y-2">
                        <CardItem
                            translateZ="60"
                            className="text-3xl font-serif font-bold text-foreground group-hover/card:text-primary transition-colors duration-300"
                        >
                            {car.name}
                        </CardItem>
                        <div className="flex items-center gap-3">
                            <CardItem
                                as="p"
                                translateZ="40"
                                className="text-primary text-[10px] uppercase tracking-[0.2em] font-bold"
                            >
                                {car.year} • {car.category}
                            </CardItem>
                            {car.owner && (
                                <>
                                    <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                                    <CardItem translateZ="30" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                                        By {car.owner}
                                    </CardItem>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-primary/10">
                        <div className="space-y-1">
                            <CardItem translateZ="40" className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
                                Featured Rate
                            </CardItem>
                            <CardItem translateZ="70" className="text-3xl font-serif font-bold gold-gradient text-primary">
                                {car.price} <span className="text-xs text-muted-foreground font-sans font-normal">/day</span>
                            </CardItem>
                        </div>

                        <Link href={`/inventory/${car.id}`}>
                            <CardItem
                                translateZ="80"
                                as="button"
                                className="w-14 h-14 bg-primary text-background rounded-2xl flex items-center justify-center hover:bg-accent transition-all duration-300 shadow-xl shadow-primary/20 group/btn"
                            >
                                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                            </CardItem>
                        </Link>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    )
}
