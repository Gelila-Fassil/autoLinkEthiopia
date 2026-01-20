"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Car, Calendar, Clock, User, Phone, Mail, Send } from "lucide-react"
import { useState, useEffect } from "react"

const AVAILABLE_CARS = [
    { id: 1, name: "Mercedes-Benz G63 AMG", category: "Luxury SUV" },
    { id: 2, name: "Porsche 911 GT3", category: "Sports Car" },
    { id: 3, name: "Range Rover SV", category: "Luxury SUV" },
    { id: 4, name: "Rolls-Royce Ghost", category: "Ultra Luxury" },
    { id: 5, name: "Bentley Continental GT", category: "Grand Tourer" },
    { id: 6, name: "BMW M8 Competition", category: "Sports Car" },
]

interface TestDriveModalProps {
    isOpen: boolean
    onClose: () => void
}

export function TestDriveModal({ isOpen, onClose }: TestDriveModalProps) {
    const [selectedCar, setSelectedCar] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log({ selectedCar, selectedDate, selectedTime })
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div
                            className="relative w-full max-w-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-2 border-primary/30 rounded-3xl shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-primary/20 hover:bg-white/10 hover:border-primary/60 transition-all z-10"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            {/* Content */}
                            <div className="p-8 md:p-12">
                                {/* Header */}
                                <div className="mb-8">
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                                        Book Your <span className="text-primary italic">Test Drive</span>
                                    </h2>
                                    <p className="text-white/60">
                                        Fill out the form below and we'll get back to you within 24 hours.
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name and Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                                                Email *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                                            <input
                                                type="tel"
                                                id="phone"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="+251 911 234 567"
                                            />
                                        </div>
                                    </div>

                                    {/* Vehicle Selection */}
                                    <div>
                                        <label htmlFor="vehicle" className="block text-sm font-medium text-white/70 mb-2">
                                            Select Vehicle *
                                        </label>
                                        <div className="relative">
                                            <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                                            <select
                                                id="vehicle"
                                                required
                                                value={selectedCar}
                                                onChange={(e) => setSelectedCar(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-neutral-900">Choose a vehicle...</option>
                                                {AVAILABLE_CARS.map((car) => (
                                                    <option key={car.id} value={car.id} className="bg-neutral-900">
                                                        {car.name} - {car.category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Date and Time */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="date" className="block text-sm font-medium text-white/70 mb-2">
                                                Preferred Date *
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                                                <input
                                                    type="date"
                                                    id="date"
                                                    required
                                                    value={selectedDate}
                                                    onChange={(e) => setSelectedDate(e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all [color-scheme:dark]"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="time" className="block text-sm font-medium text-white/70 mb-2">
                                                Preferred Time *
                                            </label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                                                <select
                                                    id="time"
                                                    required
                                                    value={selectedTime}
                                                    onChange={(e) => setSelectedTime(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" className="bg-neutral-900">Select time...</option>
                                                    <option value="09:00" className="bg-neutral-900">9:00 AM</option>
                                                    <option value="10:00" className="bg-neutral-900">10:00 AM</option>
                                                    <option value="11:00" className="bg-neutral-900">11:00 AM</option>
                                                    <option value="12:00" className="bg-neutral-900">12:00 PM</option>
                                                    <option value="13:00" className="bg-neutral-900">1:00 PM</option>
                                                    <option value="14:00" className="bg-neutral-900">2:00 PM</option>
                                                    <option value="15:00" className="bg-neutral-900">3:00 PM</option>
                                                    <option value="16:00" className="bg-neutral-900">4:00 PM</option>
                                                    <option value="17:00" className="bg-neutral-900">5:00 PM</option>
                                                    <option value="18:00" className="bg-neutral-900">6:00 PM</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-primary text-background hover:bg-accent font-bold text-sm uppercase tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(187,161,79,0.5)] mt-6"
                                    >
                                        <Send className="w-5 h-5" />
                                        Book Test Drive
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

