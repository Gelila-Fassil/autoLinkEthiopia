"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Check, X, Car, Home, Loader2, ChevronDown, ChevronUp, User, Phone, Calendar, Gauge, Settings, Fuel, Layers, Tag, Building2, Bed, Bath, Maximize2, FileText, Eye } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface PendingItem {
  _id: string
  name: string
  fullName: string
  phoneNumber: string
  category: string
  description: string
  price: string
  currency: string
  advertisementType: string
  premium: boolean
  status: string
  images: string[]
  year?: string
  mileage?: string
  speed?: string
  transmission?: string
  fuelType?: string
  bodyType?: string
  condition?: string
  engine?: string
  maintenance?: string
  tags?: string
  houseType?: string
  bedrooms?: string
  bathrooms?: string
  area?: string
  createdAt: string
  [key: string]: unknown
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)
  const [pendingCars, setPendingCars] = useState<PendingItem[]>([])
  const [pendingHouses, setPendingHouses] = useState<PendingItem[]>([])
  const [activeTab, setActiveTab] = useState<"cars" | "houses">("cars")
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAuth")
    if (storedAuth === "true") {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchPending()
    }
  }, [isAuthenticated])

  const fetchPending = async () => {
    try {
      const [carsRes, housesRes] = await Promise.all([
        fetch("/api/ads?pending=true&category=car"),
        fetch("/api/ads?pending=true&category=house")
      ])
      if (carsRes.ok) setPendingCars(await carsRes.json())
      if (housesRes.ok) setPendingHouses(await housesRes.json())
    } catch (err) {
      console.error("Failed to fetch pending:", err)
    }
  }

  const getImageUrl = (image: any) => {
    if (!image) return "/placeholder.svg"
    if (typeof image === 'string') return image
    return image.url || "/placeholder.svg"
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "autolinkUser" && password === "Autolink123") {
      localStorage.setItem("adminAuth", "true")
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
    router.push("/")
  }

  const handleApprove = async (id: string) => {
    setActionLoading(id)
    try {
      await fetch(`/api/ads?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true })
      })
      fetchPending()
    } catch (err) {
      console.error("Failed to approve:", err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return
    setActionLoading(id)
    try {
      await fetch(`/api/ads?id=${id}`, { method: "DELETE" })
      fetchPending()
    } catch (err) {
      console.error("Failed to reject:", err)
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-primary/20 rounded-3xl p-8"
            >
              <h1 className="text-3xl font-serif font-bold text-white mb-2">
                Admin <span className="text-primary italic">Login</span>
              </h1>
              <p className="text-white/60 mb-8">Sign in to manage pending ads</p>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-primary/20 rounded-xl focus:outline-none focus:border-primary/60 transition-all text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-background font-bold uppercase tracking-wider rounded-xl hover:bg-accent transition-all"
                >
                  Login
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  const pending = activeTab === "cars" ? pendingCars : pendingHouses

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-serif font-bold text-white"
              >
                Admin <span className="text-primary italic">Dashboard</span>
              </motion.h1>
              <p className="text-white/60 mt-2">Review and manage pending advertisements</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/ad"
                className="px-6 py-3 bg-primary text-background font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-accent transition-all"
              >
                Place Your Ad
              </a>
              <button
                onClick={handleLogout}
                className="px-6 py-3 border border-primary/30 text-primary font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-primary/10 transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("cars")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${
                activeTab === "cars"
                  ? "bg-primary text-background"
                  : "bg-white/5 border border-primary/20 text-white/60 hover:bg-white/10"
              }`}
            >
              <Car className="w-4 h-4" />
              Cars ({pendingCars.length})
            </button>
            <button
              onClick={() => setActiveTab("houses")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${
                activeTab === "houses"
                  ? "bg-primary text-background"
                  : "bg-white/5 border border-primary/20 text-white/60 hover:bg-white/10"
              }`}
            >
              <Home className="w-4 h-4" />
              Houses ({pendingHouses.length})
            </button>
          </div>

          {pending.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-white/40 text-lg">No pending ads</div>
            </div>
          ) : (
            <div className="grid gap-6">
              {pending.map((item) => {
                const isCar = item.category === "car"
                const isExpanded = expandedId === item._id

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-primary/20 rounded-3xl overflow-hidden"
                  >
                    {/* Preview Header */}
                    <div className="p-6 flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-36 relative rounded-2xl overflow-hidden bg-neutral-900 flex-shrink-0">
                        {item.images?.[0] ? (
                          <Image
                            src={getImageUrl(item.images[0])}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-white/30 text-sm">
                            No Image
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="text-xl font-serif font-bold text-white truncate">{item.name}</h3>
                            <p className="text-primary text-lg font-bold mt-1">
                              {item.currency} {item.price}
                            </p>
                            <p className="text-white/40 text-xs mt-1">
                              {item.advertisementType} &middot; {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.premium && (
                              <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                                Premium
                              </span>
                            )}
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                              Pending
                            </span>
                          </div>
                        </div>

                        <p className="text-white/60 mt-2 text-sm line-clamp-2">{item.description}</p>

                        <div className="flex items-center gap-4 mt-3">
                          <span className="flex items-center gap-1.5 text-white/40 text-xs">
                            <User className="w-3.5 h-3.5" />
                            {item.fullName}
                          </span>
                          <span className="flex items-center gap-1.5 text-white/40 text-xs">
                            <Phone className="w-3.5 h-3.5" />
                            {item.phoneNumber}
                          </span>
                          {item.images?.length > 0 && (
                            <span className="text-white/40 text-xs">
                              {item.images.length} image(s)
                            </span>
                          )}
                        </div>

                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => handleApprove(item._id)}
                            disabled={actionLoading === item._id}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-green-700 transition-all disabled:opacity-50"
                          >
                            {actionLoading === item._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(item._id)}
                            disabled={actionLoading === item._id}
                            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : item._id)}
                            className="flex items-center gap-2 px-5 py-2.5 border border-primary/30 text-primary font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-primary/10 transition-all ml-auto"
                          >
                            <Eye className="w-4 h-4" />
                            {isExpanded ? "Less" : "Details"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-primary/10 px-6 py-6 space-y-6">
                            {/* Seller Info */}
                            <div>
                              <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Seller Information</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <DetailBox label="Full Name" value={item.fullName} />
                                <DetailBox label="Phone Number" value={item.phoneNumber} />
                                <DetailBox label="Advertisement Type" value={item.advertisementType} />
                              </div>
                            </div>

                            {/* Vehicle Details */}
                            {isCar ? (
                              <div>
                                <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Vehicle Details</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <DetailBox label="Year" value={item.year} />
                                  <DetailBox label="Mileage" value={item.mileage ? `${item.mileage} km` : ""} />
                                  <DetailBox label="Speed" value={item.speed ? `${item.speed} km/h` : ""} />
                                  <DetailBox label="Transmission" value={item.transmission} />
                                  <DetailBox label="Fuel Type" value={item.fuelType} />
                                  <DetailBox label="Body Type" value={item.bodyType} />
                                  <DetailBox label="Condition" value={item.condition} />
                                  <DetailBox label="Engine" value={item.engine} />
                                  <DetailBox label="Maintenance" value={item.maintenance} />
                                </div>
                              </div>
                            ) : (
                              <div>
                                <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Property Details</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <DetailBox label="Property Type" value={item.houseType} />
                                  <DetailBox label="Bedrooms" value={item.bedrooms} />
                                  <DetailBox label="Bathrooms" value={item.bathrooms} />
                                  <DetailBox label="Area" value={item.area ? `${item.area} sqm` : ""} />
                                </div>
                              </div>
                            )}

                            {/* Price & Currency */}
                            <div>
                              <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Pricing</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <DetailBox label="Price" value={`${item.currency} ${item.price}`} />
                                <DetailBox label="Currency" value={item.currency} />
                              </div>
                            </div>

                            {/* Description */}
                            <div>
                              <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Description</h4>
                              <div className="p-4 bg-white/5 rounded-xl border border-primary/10">
                                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{item.description}</p>
                              </div>
                            </div>

                            {/* Tags */}
                            {item.tags && (
                              <div>
                                <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.tags.split(/[#, ]+/).filter(Boolean).map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">{tag}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* All Images */}
                            {item.images && item.images.length > 0 && (
                              <div>
                                <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">
                                  Images ({item.images.length})
                                </h4>
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                  {item.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-neutral-900">
                                      <Image
                                        src={getImageUrl(img)}
                                        alt={`Image ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 33vw, 20vw"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function DetailBox({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="p-3 bg-white/5 rounded-xl border border-primary/10">
      <div className="text-[9px] uppercase tracking-[0.2em] text-primary/60 font-bold mb-1">{label}</div>
      <div className="text-white text-sm font-medium truncate">{value}</div>
    </div>
  )
}
