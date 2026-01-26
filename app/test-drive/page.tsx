"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShinyText } from "@/components/ui/shiny-text"
import Image from "next/image"
import { useRef, useState } from "react"
import { Calendar, Clock, Car, MapPin, User, Phone, Mail, Send } from "lucide-react"

const AVAILABLE_CARS = [
    { id: 1, name: "Mercedes-Benz G63 AMG", category: "Luxury SUV" },
    { id: 2, name: "Porsche 911 GT3", category: "Sports Car" },
    { id: 3, name: "Range Rover SV", category: "Luxury SUV" },
    { id: 4, name: "Rolls-Royce Ghost", category: "Ultra Luxury" },
    { id: 5, name: "Bentley Continental GT", category: "Grand Tourer" },
    { id: 6, name: "BMW M8 Competition", category: "Sports Car" },
]

export default function TestDrivePage() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })

    // Parallax effects
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    const [makeModel, setMakeModel] = useState("")
    const [year, setYear] = useState("")
    const [price, setPrice] = useState("")
    const [condition, setCondition] = useState("Used")

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
            <section
                ref={heroRef}
                className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-black"
            >
                {/* Cinematic Background Image */}
                <motion.div
                    style={{ y: bgY, opacity: opacity }}
                    className="absolute inset-0 z-0 h-[120%]"
                >
                    <Image
                        src="/luxury-sports-car-lamborghini-revuelto-hero.jpg"
                        alt="Luxury Sports Car"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    {/* Cinematic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10 w-full">
                    <motion.div
                        style={{ y: textY }}
                        className="space-y-8 max-w-4xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-[1px] w-20 bg-primary" />
                            <span className="text-xs uppercase tracking-[0.6em] text-primary font-bold shadow-primary/20 drop-shadow-md">
                                Sell Your Vehicle
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
                                    PLACE YOUR
                                </motion.span>
                            </h1>
                            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-primary via-white/90 to-primary">
                                <motion.span
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="block italic"
                                >
                                    <ShinyText speed={4}>PREMIUM AD</ShinyText>
                                </motion.span>
                            </h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-white/80 text-xl md:text-2xl max-w-xl leading-relaxed font-light font-serif pl-1"
                        >
                            Reach thousands of luxury car enthusiasts. List your vehicle on Ethiopia's most exclusive automotive marketplace.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 digital-pattern opacity-5 pointer-events-none" />
                <div className="max-w-5xl mx-auto px-8 md:px-16 relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4 block">List Your Vehicle</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white mb-4">
                            SUBMIT YOUR <span className="text-primary italic">LISTING</span>
                        </h2>
                        <div className="h-0.5 w-24 bg-primary/40 mx-auto mt-8" />
                        <p className="text-lg text-white/70 mt-8 max-w-2xl mx-auto">
                            Fill out the form below to place your ad. Our team will review and publish your listing within 24 hours.
                        </p>
                    </div>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8 p-8 md:p-12 rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm"
                    >
                        {/* Personal Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="w-6 h-6 text-primary" />
                                <h3 className="text-2xl font-serif font-bold text-white">Contact Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-white/70 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-white/70 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="john.doe@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="+251 911 234 567"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Details */}
                        <div className="space-y-6 pt-6 border-t border-primary/20">
                            <div className="flex items-center gap-3 mb-6">
                                <Car className="w-6 h-6 text-primary" />
                                <h3 className="text-2xl font-serif font-bold text-white">Vehicle Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="makeModel" className="block text-sm font-medium text-white/70 mb-2">
                                        Make & Model *
                                    </label>
                                    <div className="relative">
                                        <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                        <input
                                            type="text"
                                            id="makeModel"
                                            name="makeModel"
                                            required
                                            value={makeModel}
                                            onChange={(e) => setMakeModel(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="e.g. Mercedes-Benz G63"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="year" className="block text-sm font-medium text-white/70 mb-2">
                                        Year *
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                        <input
                                            type="number"
                                            id="year"
                                            name="year"
                                            required
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="2024"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-white/70 mb-2">
                                        Asking Price (ETB) *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 font-bold text-sm">ETB</div>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            required
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full pl-16 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="4,500,000"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="condition" className="block text-sm font-medium text-white/70 mb-2">
                                        Vehicle Condition *
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="condition"
                                            name="condition"
                                            required
                                            value={condition}
                                            onChange={(e) => setCondition(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="New" className="bg-neutral-900">Brand New</option>
                                            <option value="Used" className="bg-neutral-900">Used</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-6 pt-6 border-t border-primary/20">
                            <div className="flex items-center gap-3 mb-6">
                                <MapPin className="w-6 h-6 text-primary" />
                                <h3 className="text-2xl font-serif font-bold text-white">Location & Details</h3>
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-white/70 mb-2">
                                    Vehicle Location
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="e.g. Bole, Addis Ababa"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-white/70 mb-2">
                                    Vehicle Description & Features
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    placeholder="Describe your vehicle's condition, features, and history..."
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-primary text-background hover:bg-accent font-bold text-sm uppercase tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(187,161,79,0.5)] mt-8"
                        >
                            <Send className="w-5 h-5" />
                            Submit Ad
                        </motion.button>
                    </motion.form>
                </div>
            </section>

            {/* Information Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
                <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Selling with Us</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white mb-4">
                            THE AUTOLINK <span className="text-primary italic">ADVANTAGE</span>
                        </h2>
                        <div className="h-0.5 w-24 bg-primary/40 mx-auto mt-8" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Premium Visibility",
                                desc: "Showcase your vehicle to a curated audience of high-end buyers and collectors.",
                                icon: User
                            },
                            {
                                title: "Professional Support",
                                desc: "Our team assists with professional photography and listing optimization.",
                                icon: Calendar
                            },
                            {
                                title: "Fast Turnaround",
                                desc: "Connect with verified buyers quickly through our extensive network.",
                                icon: Car
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative p-8 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black hover:border-primary/60 transition-all duration-300 group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                                <div className="relative z-10">
                                    <item.icon className="w-10 h-10 text-primary mb-6" />
                                    <h3 className="text-2xl font-serif font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-white/70 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}


