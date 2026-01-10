"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-2xl font-serif font-bold tracking-tight">
          <span className="text-primary italic">A</span>
          <span className="tracking-[0.2em]">UTOLINK</span>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">© 2025 Autolink Ethiopia. All Rights Reserved.</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-primary transition-colors">Telegram</Link>
        </div>
      </div>
    </footer>
  )
}
