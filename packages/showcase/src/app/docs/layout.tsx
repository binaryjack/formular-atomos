import React from "react";
import Link from "next/link";

export default function DocsLayout({ children }: { children: React.ReactNode | any }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <header className="px-8 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="font-bold text-white tracking-tighter">FD</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">Formular.dev</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/playground" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Live Playground
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/5 p-8 overflow-y-auto max-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="space-y-8">
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm tracking-wide uppercase">Getting Started</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/docs/introduction" className="hover:text-white transition-colors">Introduction</Link></li>
                <li><Link href="/docs/validation" className="hover:text-white transition-colors">Validation Engine</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm tracking-wide uppercase">Integration Paths</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/docs/ready-adapters" className="hover:text-white transition-colors">Path 1: Ready Adapters</Link></li>
                <li><Link href="/docs/custom-adapters" className="hover:text-white transition-colors">Path 2: Custom Adapters</Link></li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12 lg:p-16 overflow-x-hidden">
          <div className="prose prose-invert prose-indigo max-w-3xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
