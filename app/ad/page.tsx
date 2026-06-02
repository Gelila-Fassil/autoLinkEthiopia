"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Car,
    Home,
    Upload,
    CreditCard,
    CheckCircle2,
    ChevronRight,
    Plus,
    Info,
    DollarSign,
    Tag,
    Settings,
    Fuel,
    Gauge,
    Calendar,
    Layers,
    FileText,
    X,
    Loader2
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function AdPage() {
    const [activeTab, setActiveTab] = useState<"car" | "house">("car")
    const [images, setImages] = useState<any[]>([])
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState("")
    const [receipt, setReceipt] = useState<any>("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const receiptInputRef = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState({
        name: "",
        fullName: "",
        phoneNumber: "",
        year: "2022",
        mileage: "50000",
        speed: "120",
        transmission: "Automatic",
        fuelType: "Petrol",
        bodyType: "Truck",
        description: "",
        price: "1000",
        condition: "Excellent",
        engine: "3.8L V6",
        maintenance: "Frequent",
        advertisementType: "For Sale",
        currency: "ETB",
        tags: "#Ford #F150 #2022",
        premium: false,
        // House specific
        houseType: "Apartment",
        bedrooms: "3",
        bathrooms: "2",
        area: "250",
    })

    async function tryUpload(base64: string): Promise<string | null> {
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64, type: activeTab })
            })
            if (res.ok) {
                const data = await res.json()
                return data.asset
            }
            const err = await res.json()
            console.error('Upload API error:', err)
        } catch (err) {
            console.error('Upload failed:', err)
        }
        return null
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        setUploadError("")
        setUploading(true)
        const uploadedImages: any[] = []
        let hasError = false

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const reader = new FileReader()

            let base64: string
            try {
                base64 = await new Promise<string>((resolve, reject) => {
                    reader.onload = () => resolve(reader.result as string)
                    reader.onerror = () => reject(new Error("Failed to read file"))
                    reader.readAsDataURL(file)
                })
            } catch {
                hasError = true
                continue
            }

            const img = new Image()
            const canCompress = await new Promise<boolean>(ok => {
                img.onload = () => ok(true)
                img.onerror = () => ok(false)
                img.src = base64
            })

            if (canCompress) {
                let w = img.width, h = img.height
                const maxW = 1920
                if (w > maxW || h > maxW) {
                    const ratio = Math.min(maxW / w, maxW / h)
                    w = Math.round(w * ratio)
                    h = Math.round(h * ratio)
                }
                const canvas = document.createElement('canvas')
                canvas.width = w
                canvas.height = h
                const ctx = canvas.getContext('2d')!
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, w, h)
                ctx.drawImage(img, 0, 0, w, h)
                const compressed = canvas.toDataURL('image/jpeg', 0.8)

                const result = await tryUpload(compressed)
                if (result) {
                    uploadedImages.push(result)
                } else {
                    const fallback = await tryUpload(base64)
                    if (fallback) uploadedImages.push(fallback)
                    else hasError = true
                }
            } else {
                const result = await tryUpload(base64)
                if (result) uploadedImages.push(result)
                else hasError = true
            }
        }

        setImages(prev => [...prev, ...uploadedImages])
        if (hasError) {
            setUploadError("Some images failed to upload. Try a different file format or smaller image.")
        }
        setUploading(false)
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleUpload = async (type: string) => {
        if (type === "receipt") {
            receiptInputRef.current?.click()
        }
    }

    const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const reader = new FileReader()
        
        const base64 = await new Promise<string>((resolve) => {
            reader.onload = () => {
                resolve(reader.result as string)
            }
            reader.readAsDataURL(file)
        })

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64, type: 'receipt' })
            })
            if (res.ok) {
                const data = await res.json()
                setReceipt(data.asset)
            }
        } catch (err) {
            console.error('Upload failed:', err)
        }
        setUploading(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as any
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        const response = await fetch('/api/ads', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                ...formData, 
                images: images,
                category: activeTab,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Success! ${activeTab === "car" ? "Car" : "House"} "${formData.name}" has been submitted for review.`);
            setFormData({
                name: "",
                fullName: "",
                phoneNumber: "",
                year: "2022",
                mileage: "50000",
                speed: "120",
                transmission: "Automatic",
                fuelType: "Petrol",
                bodyType: "Truck",
                description: "",
                price: "1000",
                condition: "Excellent",
                engine: "3.8L V6",
                maintenance: "Frequent",
                advertisementType: "For Sale",
                currency: "ETB",
                tags: "#Ford #F150 #2022",
                premium: false,
                houseType: "Apartment",
                bedrooms: "3",
                bathrooms: "2",
                area: "250",
            })
            setImages([])
        } else {
            const errorData = await response.json();
            alert("Error: " + (errorData.error || "Failed to submit ad"));
        }
    } catch (error) {
        console.error("Submission error:", error);
        alert("Network error. Please try again.");
    }
};

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 md:px-8">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4"
                    >
                        Manage <span className="text-primary italic">Products</span>
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100px" }}
                        className="h-1 bg-primary mb-8"
                    ></motion.div>
                </div>

                {/* Form Toggle */}
                <div className="flex flex-wrap gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab("car")}
                        className={cn(
                            "flex items-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300",
                            activeTab === "car"
                                ? "bg-primary text-background shadow-[0_0_30px_rgba(187,161,79,0.5)] border-2 border-primary"
                                : "bg-white/5 border-2 border-primary/20 text-primary/70 hover:bg-white/10"
                        )}
                    >
                        <Car className="w-5 h-5" />
                        Create Cars
                    </button>
                    <button
                        onClick={() => setActiveTab("house")}
                        className={cn(
                            "flex items-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300",
                            activeTab === "house"
                                ? "bg-primary text-background shadow-[0_0_30px_rgba(187,161,79,0.5)] border-2 border-primary"
                                : "bg-white/5 border-2 border-primary/20 text-primary/70 hover:bg-white/10"
                        )}
                    >
                        <Home className="w-5 h-5" />
                        Create House
                    </button>
                </div>

                {/* Form Grid */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Core Info */}
                    <div className="space-y-8">
                        <section className="bg-white/5 border border-primary/20 rounded-3xl p-8 dashboard-glass">
                            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                <Info className="w-5 h-5" />
                                {activeTab === "car" ? "General Information" : "Property Details"}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-white/70 mb-2">Name *</label>
                                    <input
                                        name="name"
                                        required
                                        placeholder={activeTab === "car" ? "New Car Listing" : "New House Listing"}
                                        className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Full Name *</label>
                                    <input
                                        name="fullName"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Phone Number *</label>
                                    <input
                                        name="phoneNumber"
                                        required
                                        placeholder="+251 9XX XXX XXX"
                                        className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {activeTab === "car" ? (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Year</label>
                                            <input
                                                name="year"
                                                type="number"
                                                placeholder="2022"
                                                className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Mileage *</label>
                                            <input
                                                name="mileage"
                                                required
                                                placeholder="50000"
                                                className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Speed</label>
                                            <input
                                                name="speed"
                                                placeholder="120"
                                                className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="col-span-1 md:col-span-2">
                                            <label className="block text-sm font-medium text-white/70 mb-4">Property Type</label>
                                            <div className="flex flex-wrap gap-4">
                                                {["Apartment", "Guest House", "Villa", "Office"].map(opt => (
                                                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="houseType"
                                                            value={opt}
                                                            checked={formData.houseType === opt}
                                                            className="hidden"
                                                            onChange={handleInputChange}
                                                        />
                                                        <div className={cn(
                                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                                            formData.houseType === opt ? "border-primary bg-primary" : "border-primary/40 group-hover:border-primary"
                                                        )}>
                                                            {formData.houseType === opt && <div className="w-2 h-2 rounded-full bg-background" />}
                                                        </div>
                                                        <span className={formData.houseType === opt ? "text-white" : "text-white/60"}>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Bedrooms</label>
                                            <input name="bedrooms" type="number" placeholder="3" value={formData.bedrooms} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Bathrooms</label>
                                            <input name="bathrooms" type="number" placeholder="2" value={formData.bathrooms} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Total Area (sqm)</label>
                                            <input name="area" type="number" placeholder="250" value={formData.area} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>

                        {activeTab === "car" && (
                            <section className="bg-white/5 border border-primary/20 rounded-3xl p-8 dashboard-glass">
                                <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                    <Settings className="w-5 h-5" />
                                    Specifications
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-4">Transmission</label>
                                        <div className="flex gap-4">
                                            {["Automatic", "Manual"].map(opt => (
                                                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="transmission"
                                                        value={opt}
                                                        checked={formData.transmission === opt}
                                                        className="hidden"
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                                        formData.transmission === opt ? "border-primary bg-primary" : "border-primary/40 group-hover:border-primary"
                                                    )}>
                                                        {formData.transmission === opt && <div className="w-2 h-2 rounded-full bg-background" />}
                                                    </div>
                                                    <span className={formData.transmission === opt ? "text-white" : "text-white/60"}>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-4">Fuel Type</label>
                                        <div className="flex flex-wrap gap-4">
                                            {["Diesel", "Petrol", "Electric", "Hybrid"].map(opt => (
                                                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="fuelType"
                                                        value={opt}
                                                        checked={formData.fuelType === opt}
                                                        className="hidden"
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                                        formData.fuelType === opt ? "border-primary bg-primary" : "border-primary/40 group-hover:border-primary"
                                                    )}>
                                                        {formData.fuelType === opt && <div className="w-2 h-2 rounded-full bg-background" />}
                                                    </div>
                                                    <span className={formData.fuelType === opt ? "text-white" : "text-white/60"}>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-4">Body Type</label>
                                        <div className="flex flex-wrap gap-4">
                                            {["Truck", "SUV", "Sedan", "Hatchback", "Minivan"].map(opt => (
                                                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="bodyType"
                                                        value={opt}
                                                        checked={formData.bodyType === opt}
                                                        className="hidden"
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                                        formData.bodyType === opt ? "border-primary bg-primary" : "border-primary/40 group-hover:border-primary"
                                                    )}>
                                                        {formData.bodyType === opt && <div className="w-2 h-2 rounded-full bg-background" />}
                                                    </div>
                                                    <span className={formData.bodyType === opt ? "text-white" : "text-white/60"}>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        <section className="bg-white/5 border border-primary/20 rounded-3xl p-8 dashboard-glass">
                            <label className="block text-sm font-medium text-white/70 mb-2">Description *</label>
                            <textarea
                                name="description"
                                required
                                rows={5}
                                placeholder="Describe your product here..."
                                className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20 resize-none"
                                onChange={handleInputChange}
                            ></textarea>
                        </section>
                    </div>

                    {/* Right Column: Uploads & Payment Details */}
                    <div className="space-y-8">
                        <section className="bg-white/5 border border-primary/20 rounded-3xl p-8 dashboard-glass">
                            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                <Upload className="w-5 h-5" />
                                {activeTab === "car" ? "Car Images" : "House Images"}
                            </h2>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                            {images.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {images.map((url, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-neutral-900">
                                            <Image src={url} alt={`Upload ${idx + 1}`} fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div
                                className="border-2 border-dashed border-primary/30 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:bg-primary/5 transition-all cursor-pointer group"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {uploading ? (
                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Plus className="w-8 h-8 text-primary" />
                                        </div>
                                        <p className="text-white/60 font-medium text-center">Add More Images</p>
                                    </>
                                )}
                            </div>

                            <div className="mt-6 flex flex-col gap-4">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full py-4 bg-primary text-background font-bold rounded-xl uppercase tracking-wider text-sm transition-all hover:bg-accent"
                                    disabled={uploading}
                                >
                                    {uploading ? "Uploading..." : `Choose ${activeTab === "car" ? "Car" : "House"} Images`}
                                </button>
                                {uploadError && (
                                    <p className="text-xs text-red-500 text-center">{uploadError}</p>
                                )}
                                <p className="text-xs text-white/40 text-center">You can upload multiple images.</p>
                                <p className="text-[10px] text-white/40 text-center uppercase tracking-tighter">Images are automatically compressed before upload.</p>
                            </div>
                        </section>

                        <section className="bg-white/5 border border-primary/20 rounded-3xl p-8 dashboard-glass">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-xl font-bold text-primary uppercase tracking-tight">Payment Information</h2>
                            </div>

                            <div className="bg-white/5 border border-primary/10 rounded-2xl p-6 mb-6">
                                <p className="text-sm text-white/60 mb-6 font-medium leading-relaxed">
                                    Please deposit the ad&apos;s fee <span className="text-primary font-bold">(3,000 ETB)</span> through our account below:
                                </p>

                                <div className="bg-white/5 border border-primary/10 rounded-xl p-5 space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Payment Method</span>
                                        <span className="text-white font-bold text-lg">TeleBirr</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Phone Number</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary font-bold text-xl tracking-wider">+251 904945786</span>
                                            <button type="button" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                <FileText className="w-4 h-4 text-primary/60" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Account Holder Name</span>
                                        <span className="text-white font-bold">Getaneh</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-white/70 mb-2">Payment Receipt (Optional)</label>
                                <input
                                    ref={receiptInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleReceiptUpload}
                                    className="hidden"
                                />
                                {receipt && (
                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900">
                                        <Image src={receipt} alt="Receipt" fill className="object-contain" />
                                        <button
                                            type="button"
                                            onClick={() => setReceipt("")}
                                            className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                <div
                                    className="border-2 border-dashed border-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-primary/5 transition-all cursor-pointer group"
                                    onClick={() => handleUpload("receipt")}
                                >
                                    <Upload className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors" />
                                    <p className="text-xs text-white/40 text-center font-medium">Click to upload payment receipt</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleUpload("receipt")}
                                    className="w-full py-4 bg-primary/10 border-2 border-primary/20 text-primary font-bold rounded-xl uppercase tracking-wider text-xs transition-all hover:bg-primary/20"
                                >
                                    {uploading ? "Uploading..." : "Choose Receipt File"}
                                </button>
                            </div>
                        </section>

                        <section className="bg-white/5 border border-primary/20 rounded-3xl p-8 dashboard-glass">
                            <div className="grid grid-cols-2 gap-6">
                                {activeTab === "car" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Condition</label>
                                            <input name="condition" value={formData.condition} className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Engine</label>
                                            <input name="engine" value={formData.engine} className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-white/70 mb-2">Maintenance</label>
                                            <input name="maintenance" value={formData.maintenance} className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white" />
                                        </div>
                                    </>
                                )}

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-white/70 mb-2">Price *</label>
                                    <input name="price" value={formData.price} className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white" />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-white/70 mb-4">Advertisement Type</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {["For Sale", "For Rent"].map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, advertisementType: opt }))}
                                                className={cn(
                                                    "py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2",
                                                    formData.advertisementType === opt
                                                        ? "bg-primary text-background shadow-lg shadow-primary/20"
                                                        : "bg-white/5 border border-primary/20 text-white/60 hover:bg-white/10"
                                                )}
                                            >
                                                {formData.advertisementType === opt && <CheckCircle2 className="w-4 h-4" />}
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-white/70 mb-4">Listing Type</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, premium: false }))}
                                            className={cn(
                                                "py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2",
                                                !formData.premium
                                                    ? "bg-primary text-background shadow-lg shadow-primary/20"
                                                    : "bg-white/5 border border-primary/20 text-white/60 hover:bg-white/10"
                                            )}
                                        >
                                            {!formData.premium && <CheckCircle2 className="w-4 h-4" />}
                                            Standard
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, premium: true }))}
                                            className={cn(
                                                "py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2",
                                                formData.premium
                                                    ? "bg-primary text-background shadow-lg shadow-primary/20"
                                                    : "bg-white/5 border border-primary/20 text-white/60 hover:bg-white/10"
                                            )}
                                        >
                                            {formData.premium && <CheckCircle2 className="w-4 h-4" />}
                                            Premium
                                        </button>
                                    </div>
                                    <p className="text-xs text-white/40 mt-2">
                                        {formData.premium
                                            ? "Premium ads appear in the featured carousel section."
                                            : "Standard ads appear in the regular listing grid."}
                                    </p>
                                </div>

                                <div className="col-span-2">
                                    <div className="w-full flex items-center justify-between p-4 bg-white/5 border border-primary/10 rounded-xl">
                                        <span className="text-white/60 text-sm">Service Price</span>
                                        <span className="text-primary font-bold text-lg">3,000 ETB</span>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-white/70 mb-4">Currency</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["ETB", "USD", "EUR", "GBP"].map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, currency: opt }))}
                                                className={cn(
                                                    "px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2",
                                                    formData.currency === opt
                                                        ? "bg-primary text-background"
                                                        : "bg-white/5 border border-primary/20 text-white/60"
                                                )}
                                            >
                                                {formData.currency === opt && <CheckCircle2 className="w-3 h-3" />}
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-white/70 mb-2">Tags</label>
                                    <input
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white placeholder:text-white/20"
                                    />
                                </div>
                            </div>
                        </section>

                        <button
                            type="submit"
                            className="w-full py-5 bg-primary text-background font-bold uppercase tracking-[0.4em] rounded-2xl hover:bg-accent hover:shadow-[0_0_50px_rgba(187,161,79,0.5)] transition-all duration-500 transform active:scale-[0.98] group flex items-center justify-center gap-3"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
