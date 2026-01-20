"use client"

import { Navbar } from "@/components/navbar"
import { HouseGallery } from "@/components/house-gallery"
import { Footer } from "@/components/footer"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShinyText } from "@/components/ui/shiny-text"
import Image from "next/image"
import { useRef } from "react"
import { Home, Shield, MapPin, Star, Key, Sparkles, Building2, Users, Award, Phone, Mail } from "lucide-react"
import dynamic from 'next/dynamic'

const Hyperspeed = dynamic(() => import('@/components/ui/hyperspeed'), { ssr: false });

export default function HousesPage() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })

    // Parallax effects
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
                        src="/modern-villa-exterior-night.jpg"
                        alt="Luxury Villa Exterior"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    {/* Cinematic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
                    <div className="absolute inset-0 bg-black/30" />
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
                    </motion.div>
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

            {/* Features & Amenities Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
                <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Premium Amenities</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white mb-4">
                            LUXURY <span className="text-primary italic">FEATURES</span>
                        </h2>
                        <div className="h-0.5 w-24 bg-primary/40 mx-auto mt-8" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Home, title: "Fully Furnished", desc: "Premium furniture and decor included" },
                            { icon: Shield, title: "24/7 Security", desc: "Gated communities with round-the-clock protection" },
                            { icon: Sparkles, title: "Modern Design", desc: "Contemporary architecture and interiors" },
                            { icon: Key, title: "Ready to Move", desc: "Immediate occupancy available" },
                            { icon: Building2, title: "Prime Locations", desc: "Best neighborhoods in Addis Ababa" },
                            { icon: Star, title: "Premium Quality", desc: "High-end finishes and materials" },
                            { icon: Users, title: "Concierge Service", desc: "Dedicated property management" },
                            { icon: Award, title: "Verified Properties", desc: "Thoroughly vetted and inspected" },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative p-6 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                                <feature.icon className="w-8 h-8 text-primary mb-4 relative z-10" />
                                <h3 className="text-xl font-serif font-bold text-white mb-2 relative z-10">{feature.title}</h3>
                                <p className="text-sm text-white/60 relative z-10">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location Highlights Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 digital-pattern opacity-5 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Prime Locations</span>
                                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white mb-6">
                                    PRESTIGIOUS <span className="text-primary italic">NEIGHBORHOODS</span>
                                </h2>
                                <div className="h-0.5 w-24 bg-primary/40 mb-8" />
                            </div>
                            <p className="text-lg text-white/70 leading-relaxed max-w-md">
                                Our properties are strategically located in Addis Ababa's most sought-after areas, offering unparalleled access to business districts, international schools, and luxury amenities.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { location: "Bole", desc: "Commercial hub with modern infrastructure" },
                                    { location: "Kazanchis", desc: "Diplomatic quarter with embassies" },
                                    { location: "Entoto", desc: "Hillside views and serene environment" },
                                    { location: "CMC", desc: "Gated communities and family-friendly" },
                                ].map((area, index) => (
                                    <motion.div
                                        key={area.location}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl border border-primary/10 bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-serif font-bold text-white mb-1">{area.location}</h4>
                                            <p className="text-sm text-white/60">{area.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-3xl overflow-hidden border-2 border-primary/20 group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                            <Image
                                src="/luxury-apartment-living-room.jpg"
                                alt="Luxury Apartment Interior"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
                <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Why AutoLink</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white mb-4">
                            EXCEPTIONAL <span className="text-primary italic">SERVICE</span>
                        </h2>
                        <div className="h-0.5 w-24 bg-primary/40 mx-auto mt-8" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Expert Curation",
                                desc: "Each property is carefully selected to meet the highest standards of luxury and quality.",
                                stat: "100+",
                                statLabel: "Properties Vetted"
                            },
                            {
                                title: "Personalized Service",
                                desc: "Dedicated concierge team to assist with every step of your property journey.",
                                stat: "24/7",
                                statLabel: "Support Available"
                            },
                            {
                                title: "Prime Investment",
                                desc: "Properties in the most desirable locations with strong appreciation potential.",
                                stat: "15+",
                                statLabel: "Years Experience"
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
                                    <div className="text-5xl font-serif font-bold text-primary mb-4">{item.stat}</div>
                                    <div className="text-xs uppercase tracking-wider text-white/60 mb-6">{item.statLabel}</div>
                                    <h3 className="text-2xl font-serif font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-white/70 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact/Inquiry Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 digital-pattern opacity-5 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-8 md:px-16 relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Get In Touch</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white mb-4">
                            INQUIRE ABOUT <span className="text-primary italic">PROPERTIES</span>
                        </h2>
                        <div className="h-0.5 w-24 bg-primary/40 mx-auto mt-8" />
                        <p className="text-lg text-white/70 mt-8 max-w-2xl mx-auto">
                            Ready to find your perfect home? Contact our team for personalized property viewings and expert guidance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm hover:border-primary/60 transition-all duration-300"
                        >
                            <Phone className="w-8 h-8 text-primary mb-4" />
                            <h3 className="text-xl font-serif font-bold text-white mb-2">Phone</h3>
                            <p className="text-white/60 mb-4">Call us directly</p>
                            <a href="tel:+251911234567" className="text-primary hover:text-primary/80 transition-colors font-medium">
                                +251 911 234 567
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm hover:border-primary/60 transition-all duration-300"
                        >
                            <Mail className="w-8 h-8 text-primary mb-4" />
                            <h3 className="text-xl font-serif font-bold text-white mb-2">Email</h3>
                            <p className="text-white/60 mb-4">Send us a message</p>
                            <a href="mailto:properties@autolinkethiopia.com" className="text-primary hover:text-primary/80 transition-colors font-medium">
                                properties@autolinkethiopia.com
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
