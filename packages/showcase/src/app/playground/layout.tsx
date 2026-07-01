"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlaygroundLayout({
  children,
}: {
  children: any;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "React (@formular/atomos)", path: "/playground/react", doc: "https://react.dev" },
    { name: "Vue.js (Composition API)", path: "/playground/vue", doc: "https://vuejs.org" },
    { name: "Svelte (Stores)", path: "/playground/svelte", doc: "https://svelte.dev" },
    { name: "Solid JS (Signals)", path: "/playground/solid", doc: "https://solidjs.com" },
    { name: "Synetics (Signals)", path: "/playground/synetics", doc: "https://github.com/binaryjack/synetics.dev" },
    { name: "Angular (Reactive)", path: "/playground/angular", doc: "https://angular.io" },
    { name: "Vanilla JS (DOM API)", path: "/playground/vanilla", doc: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" },
  ];

  const uiVendors = [
    { name: "Shadcn UI", path: "/playground/shadcn", doc: "https://ui.shadcn.com" },
    { name: "Material UI (MUI)", path: "/playground/mui", doc: "https://mui.com" },
    { name: "Ant Design", path: "/playground/ant-design", doc: "https://ant.design" },
    { name: "Chakra UI", path: "/playground/chakra", doc: "https://chakra-ui.com" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex flex-col selection:bg-indigo-500/30">
      {/* Header */}
      <header className="px-8 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="font-bold text-white tracking-tighter">FD</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">Formular.dev Playground</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
          Back to Home
        </Link>
      </header>

      {/* Workspace: Sidebar + Main Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 md:p-8 gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[#0c0c0f] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4 md:sticky md:top-24">
            <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">Frameworks</div>
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.path || (item.path === "/playground/react" && pathname === "/playground");
                return (
                  <div key={item.path} className="flex items-center gap-2">
                    <Link
                      href={item.path}
                      className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 block border ${
                        isActive
                          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-md shadow-indigo-500/5 font-semibold"
                          : "text-slate-400 border-transparent hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </Link>
                    <a href={item.doc} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-400 p-2" title="Official Documentation">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                );
              })}
            </nav>
            
            <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mt-6 mb-4">UI Libraries (React)</div>
            <nav className="flex flex-col gap-1.5">
              {uiVendors.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <div key={item.path} className="flex items-center gap-2">
                    <Link
                      href={item.path}
                      className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 block border ${
                        isActive
                          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-md shadow-indigo-500/5 font-semibold"
                          : "text-slate-400 border-transparent hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </Link>
                    <a href={item.doc} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-400 p-2" title="Official Documentation">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                );
              })}
            </nav>
            <div className="border-t border-white/5 pt-4 text-xs text-slate-500 space-y-1.5 leading-relaxed">
              <span className="font-semibold text-slate-400 block">Framework Agnostic</span>
              Formular.dev uses a core schema-first engine (`formular.dev`) that runs independently of the view layer. Adapters synchronize the state bidirectionally.
            </div>
          </div>
        </aside>

        {/* Main playground content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
