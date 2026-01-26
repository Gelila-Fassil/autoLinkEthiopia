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
    const [makeModel, setMakeModel] = useState("")
    const [year, setYear] = useState("")
    const [price, setPrice] = useState("")
    const [condition, setCondition] = useState("Used")

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
        console.log({ makeModel, year, price, condition })
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
                                        Place Your <span className="text-primary italic">Ad</span>
                                    </h2>
                                    <p className="text-white/60">
                                        Fill out the details below to list your vehicle on our platform.
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

                                    {/* Vehicle Detail: Make & Model */}
                                    <div>
                                        <label htmlFor="makeModel" className="block text-sm font-medium text-white/70 mb-2">
                                            Make & Model *
                                        </label>
                                        <div className="relative">
                                            <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                                            <input
                                                type="text"
                                                id="makeModel"
                                                required
                                                value={makeModel}
                                                onChange={(e) => setMakeModel(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="e.g. Toyota Corolla"
                                            />
                                        </div>
                                    </div>

                                    {/* Year and Price */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="year" className="block text-sm font-medium text-white/70 mb-2">
                                                Year *
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                                                <input
                                                    type="number"
                                                    id="year"
                                                    required
                                                    value={year}
                                                    onChange={(e) => setYear(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                                    placeholder="2024"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-white/70 mb-2">
                                                Asking Price (ETB) *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50 font-bold text-xs">ETB</div>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    required
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-primary/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                                                    placeholder="4,500,000"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Condition */}
                                    <div>
                                        <label htmlFor="condition" className="block text-sm font-medium text-white/70 mb-2">
                                            Vehicle Condition *
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="condition"
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

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-primary text-background hover:bg-accent font-bold text-sm uppercase tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(187,161,79,0.5)] mt-6"
                                    >
                                        <Send className="w-5 h-5" />
                                        Submit Ad
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

