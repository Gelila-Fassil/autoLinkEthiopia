"use client"

import { Navbar } from "@/components/navbar"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Check, Phone, User, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { RotatingCarShowcase } from "@/components/rotating-car-showcase"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Car {
  id: number
  name: string
  fullName: string
  phoneNumber: string
  year: string
  mileage: string
  speed: string
  transmission: string
  fuelType: string
  bodyType: string
  description: string
  price: string
  condition: string
  engine: string
  maintenance: string
  advertisementType: string
  currency: string
  tags: string
  images: string[]
}

const DEFAULT_CAR: Car = {
  id: 0,
  name: "Loading...",
  fullName: "",
  phoneNumber: "",
  year: "",
  mileage: "",
  speed: "",
  transmission: "",
  fuelType: "",
  bodyType: "",
  description: "",
  price: "",
  condition: "",
  engine: "",
  maintenance: "",
  advertisementType: "",
  currency: "ETB",
  tags: "",
  images: []
}

export default function CarDetailPage() {
    const params = useParams()
    const id = params.id as string
    const [car, setCar] = useState<Car>(DEFAULT_CAR)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        async function fetchCar() {
            try {
                const res = await fetch(`/api/ads?id=${id}`)
                if (res.ok) {
                    const data = await res.json()
                    setCar(data)
                } else {
                    setError(true)
                }
            } catch {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchCar()
    }, [id])

    const nextImage = () => {
        if (car.images?.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
        }
    }

    const prevImage = () => {
        if (car.images?.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
        }
    }

    const specs = [
        { label: "Year", value: car.year },
        { label: "Mileage", value: `${car.mileage} km` },
        { label: "Transmission", value: car.transmission },
        { label: "Fuel Type", value: car.fuelType },
        { label: "Body Type", value: car.bodyType },
        { label: "Engine", value: car.engine || "N/A" },
        { label: "Speed", value: car.speed ? `${car.speed} km/h` : "N/A" },
        { label: "Condition", value: car.condition || "N/A" },
    ]

    const features = car.maintenance ? [car.maintenance] : []

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
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

            <div className="pt-40 pb-20 max-w-7xl mx-auto px-8 md:px-16">
                <div className="mb-12">
                    <Link href="/inventory" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-[10px] uppercase tracking-widest font-bold group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Inventory
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-40">
                        <div className="text-primary animate-pulse">Loading...</div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <h2 className="text-2xl font-serif text-white mb-4">Car not found</h2>
                        <Link href="/inventory" className="text-primary hover:underline">
                            Back to Inventory
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <div className="relative aspect-square lg:h-[550px] w-full bg-neutral-900/30 rounded-[40px] overflow-hidden border border-white/5 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
                                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-10" />

                                {car.images && car.images.length > 0 ? (
                                    <>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentImageIndex}
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={car.images[currentImageIndex]}
                                                    alt={`${car.name} - Image ${currentImageIndex + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            </motion.div>
                                        </AnimatePresence>

                                        {car.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all z-20 opacity-0 group-hover:opacity-100"
                                                >
                                                    <ChevronLeft className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all z-20 opacity-0 group-hover:opacity-100"
                                                >
                                                    <ChevronRight className="w-6 h-6" />
                                                </button>
                                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full">
                                                    <span className="text-white/80 text-sm font-medium tabular-nums">
                                                        {currentImageIndex + 1} / {car.images.length}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <RotatingCarShowcase image="/placeholder.svg" />
                                )}

                                <div className="absolute top-6 left-6 z-20">
                                    <div className="px-4 py-1.5 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-primary">{car.advertisementType}</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 z-20">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-bold block">Series Model</span>
                                    <div className="text-3xl font-serif font-bold tracking-tighter text-white/90">{car.year}</div>
                                </div>
                            </div>

                            {car.images && car.images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                    {car.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                                                idx === currentImageIndex
                                                    ? "border-primary ring-1 ring-primary/50 scale-105"
                                                    : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                                            }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${car.name} thumbnail ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="h-1 w-20 bg-primary"
                                />
                                <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-[0.9]">{car.name}</h1>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl font-serif text-primary gold-gradient">
                                        {car.currency} {car.price}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-primary/20">
                                <User className="w-5 h-5 text-primary" />
                                <div>
                                    <div className="text-xs text-white/60 uppercase tracking-wider">Seller</div>
                                    <div className="text-white font-medium">{car.fullName}</div>
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-primary" />
                                    <span className="text-white">{car.phoneNumber}</span>
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed text-xl font-light max-w-xl">
                                {car.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {specs.map((spec, i) => (
                                    <motion.div
                                        key={spec.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.05) }}
                                        className="p-6 bg-neutral-900/50 border border-white/5 rounded-2xl space-y-2 hover:border-primary/20 transition-colors"
                                    >
                                        <div className="text-[9px] uppercase tracking-[0.3em] text-primary font-bold">{spec.label}</div>
                                        <div className="text-xl font-semibold tracking-tight">{spec.value}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {car.tags && (
                                <div className="space-y-4">
                                    <h3 className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-bold">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {car.tags.split(/[#, ]+/).filter(Boolean).map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="flex flex-col sm:flex-row gap-6 pt-10"
                            >
                                <a 
                                    href={`tel:${car.phoneNumber}`}
                                    className="flex-1 px-12 py-6 bg-primary text-background font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-accent transition-all shadow-xl shadow-primary/10 text-center rounded-full"
                                >
                                    Call Seller
                                </a>
                                <button className="flex-1 px-12 py-6 border-2 border-primary/30 text-primary font-bold uppercase text-[10px] tracking-[0.4em] hover:border-primary transition-all rounded-full">
                                    Request Viewing
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </div>

            <footer className="py-24 border-t border-border bg-background mt-20">
                <div className="max-w-7xl mx-auto px-8 md:px-16 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">© 2025 Autolink Ethiopia. All Rights Reserved.</p>
                </div>
            </footer>
        </main>
    )
}
