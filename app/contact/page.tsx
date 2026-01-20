"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShinyText } from "@/components/ui/shiny-text"
import Image from "next/image"
import { useRef } from "react"
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react"

export default function ContactPage() {
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
                        src="/luxury-apartment-living-room.jpg"
                        alt="Luxury Interior"
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
                                Get In Touch
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
                                    CONNECT
                                </motion.span>
                            </h1>
                            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-primary via-white/90 to-primary">
                                <motion.span
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="block italic"
                                >
                                    <ShinyText speed={4}>WITH US</ShinyText>
                                </motion.span>
                            </h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-white/80 text-xl md:text-2xl max-w-xl leading-relaxed font-light font-serif pl-1"
                        >
                            Experience personalized service and expert guidance for all your luxury automotive and real estate needs.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
                <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Contact Information</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white mb-4">
                            HOW TO <span className="text-primary italic">REACH US</span>
                        </h2>
                        <div className="h-0.5 w-24 bg-primary/40 mx-auto mt-8" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Phone,
                                title: "Phone",
                                content: "+251 911 234 567",
                                link: "tel:+251911234567",
                                desc: "Call us directly"
                            },
                            {
                                icon: Mail,
                                title: "Email",
                                content: "info@autolinkethiopia.com",
                                link: "mailto:info@autolinkethiopia.com",
                                desc: "Send us a message"
                            },
                            {
                                icon: MapPin,
                                title: "Location",
                                content: "Bole, Addis Ababa",
                                link: "#",
                                desc: "Visit our showroom"
                            },
                            {
                                icon: Clock,
                                title: "Hours",
                                content: "Mon - Sat: 9AM - 7PM",
                                link: "#",
                                desc: "Business hours"
                            },
                        ].map((item, index) => (
                            <motion.a
                                key={item.title}
                                href={item.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 block"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                                <item.icon className="w-8 h-8 text-primary mb-4 relative z-10" />
                                <h3 className="text-xl font-serif font-bold text-white mb-2 relative z-10">{item.title}</h3>
                                <p className="text-sm text-white/60 mb-2 relative z-10">{item.desc}</p>
                                <p className="text-primary font-medium relative z-10 group-hover:text-primary/80 transition-colors">{item.content}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 digital-pattern opacity-5 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-8 md:px-16 relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Send a Message</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white mb-4">
                            GET IN <span className="text-primary italic">TOUCH</span>
                        </h2>
                        <div className="h-0.5 w-24 bg-primary/40 mx-auto mt-8" />
                        <p className="text-lg text-white/70 mt-8 max-w-2xl mx-auto">
                            Fill out the form below and our team will get back to you within 24 hours.
                        </p>
                    </div>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 p-8 rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-white/70 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-white/70 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="john.doe@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="+251 911 234 567"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="How can we help you?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="Tell us about your inquiry..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-primary text-background hover:bg-accent font-bold text-sm uppercase tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(187,161,79,0.5)]"
                        >
                            <Send className="w-5 h-5" />
                            Send Message
                        </motion.button>
                    </motion.form>
                </div>
            </section>

            {/* Additional Information Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
                <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[500px] rounded-3xl overflow-hidden border-2 border-primary/20 group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                            <Image
                                src="/bole-penthouse.png"
                                alt="AutoLink Showroom"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="space-y-8">
                            <div>
                                <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Visit Us</span>
                                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.05em] text-white mb-6">
                                    OUR <span className="text-primary italic">SHOWROOM</span>
                                </h2>
                                <div className="h-0.5 w-24 bg-primary/40 mb-8" />
                            </div>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Experience our curated collection of luxury vehicles and premium properties in person. Our showroom is designed to provide an immersive experience where you can explore our inventory in a sophisticated environment.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-xl border border-primary/10 bg-white/5">
                                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-serif font-bold text-white mb-1">Address</h4>
                                        <p className="text-sm text-white/60">Bole Sub-City, Addis Ababa, Ethiopia</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl border border-primary/10 bg-white/5">
                                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-serif font-bold text-white mb-1">Opening Hours</h4>
                                        <p className="text-sm text-white/60">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                                        <p className="text-sm text-white/60">Sunday: By Appointment Only</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl border border-primary/10 bg-white/5">
                                    <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-serif font-bold text-white mb-1">Appointments</h4>
                                        <p className="text-sm text-white/60">Schedule a private viewing or consultation at your convenience.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}


