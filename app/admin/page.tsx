"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Check, X, Trash2, Car, Home, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface PendingItem {
  id: number
  name: string
  price: string
  currency: string
  description: string
  category: string
  images: string[]
  createdAt: string
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
  const [actionLoading, setActionLoading] = useState<number | null>(null)

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
        fetch("/api/cars?pending=true"),
        fetch("/api/houses?pending=true")
      ])
      if (carsRes.ok) setPendingCars(await carsRes.json())
      if (housesRes.ok) setPendingHouses(await housesRes.json())
    } catch (err) {
      console.error("Failed to fetch pending:", err)
    }
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

  const handleApprove = async (id: number, type: "car" | "house") => {
    setActionLoading(id)
    try {
      const endpoint = type === "car" ? "/api/cars" : "/api/houses"
      await fetch(`${endpoint}?id=${id}`, {
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

  const handleReject = async (id: number, type: "car" | "house") => {
    if (!confirm("Are you sure you want to delete this ad?")) return
    setActionLoading(id)
    try {
      const endpoint = type === "car" ? "/api/cars" : "/api/houses"
      await fetch(`${endpoint}?id=${id}`, { method: "DELETE" })
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-serif font-bold text-white"
              >
                Admin <span className="text-primary italic">Dashboard</span>
              </motion.h1>
              <p className="text-white/60 mt-2">Manage pending advertisements</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 border border-primary/30 text-primary font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-primary/10 transition-all"
            >
              Logout
            </button>
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
              {pending.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-primary/20 rounded-3xl p-6 flex flex-col md:flex-row gap-6"
                >
                  <div className="w-full md:w-64 h-48 relative rounded-2xl overflow-hidden bg-neutral-900 flex-shrink-0">
                    {item.images?.[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-white/30">
                        <Image className="w-12 h-12" />
                        No Image
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-white">{item.name}</h3>
                        <p className="text-primary text-xl font-bold mt-1">
                          {item.currency} {item.price}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-wider rounded-full">
                        Pending
                      </span>
                    </div>
                    
                    <p className="text-white/60 mt-3 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center gap-2 mt-4">
                      {item.images?.length > 0 && (
                        <span className="flex items-center gap-1 text-white/40 text-sm">
                          <Image className="w-4 h-4" />
                          {item.images.length} image(s)
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => handleApprove(item.id, activeTab === "cars" ? "car" : "house")}
                        disabled={actionLoading === item.id}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-green-700 transition-all disabled:opacity-50"
                      >
                        {actionLoading === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id, activeTab === "cars" ? "car" : "house")}
                        disabled={actionLoading === item.id}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
