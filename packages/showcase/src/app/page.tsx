import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-1/4 w-[150%] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl -z-10 rounded-[100%]" />
      
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="font-bold text-white tracking-tighter">FD</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">Formular.dev</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <Link href="/docs/introduction" className="hover:text-white transition-colors">Documentation</Link>
          <a href="#paths" className="hover:text-white transition-colors">Integration Paths</a>
          <Link href="/playground" className="hover:text-white transition-colors text-indigo-400">Live Playground</Link>
        </nav>
        <a href="https://github.com/binaryjack/formular.dev" target="_blank" rel="noreferrer" className="text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/5">
          GitHub
        </a>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 py-24 sm:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 border border-indigo-500/20">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          The Ultimate Enterprise Validation Engine
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Bulletproof Forms. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Zero Friction.
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg sm:text-xl text-slate-400 mb-12 leading-relaxed">
          Formular.dev decouples your business logic from your UI. Define your schema once, and integrate seamlessly with any framework or component library using our elegant two-step pattern.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/playground" className="px-8 py-4 rounded-full bg-white text-slate-950 font-semibold hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            Try Live Playground
          </Link>
          <Link href="/docs/introduction" className="px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors">
            Explore Documentation
          </Link>
        </div>
      </main>

      {/* Two Integration Paths Section */}
      <section id="paths" className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Two Paths, One Powerful Engine</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Whether you're using a ready-made adapter or adapting an existing enterprise component library, Formular.dev makes it effortless.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Path 1: Ready Adapter */}
          <div className="rounded-3xl border border-white/10 bg-[#0c0c0f] overflow-hidden flex flex-col shadow-2xl shadow-indigo-500/10 relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />
            <div className="p-8 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-6">
                Path 1: Ready Adapters
              </div>
              <h3 className="text-2xl font-bold mb-3">The "Zero Friction" Way</h3>
              <p className="text-slate-400">Using a pre-built adapter (like Formular Atomos), integration is a simple 2-step process. Define the schema, wrap your form, and drop in the inputs. Validation is handled automatically.</p>
            </div>
            <div className="p-8 bg-[#08080a] flex-1">
              <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
                <code className="language-tsx">
{`const formSchema = f.object({
  id: f.string().required(),
  firstName: f.string().min(2),
  lastName: f.string().min(2)
});

<FormProvider form={formSchema} onSubmit={submit}>
    <Input name="id" />
    <Input name="firstName" />
    <Input name="lastName" />
</FormProvider>`}
                </code>
              </pre>
            </div>
          </div>

          {/* Path 2: Custom Integration */}
          <div className="rounded-3xl border border-white/10 bg-[#0c0c0f] overflow-hidden flex flex-col shadow-2xl shadow-indigo-500/10 relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-3xl rounded-full group-hover:bg-purple-500/10 transition-colors" />
            <div className="p-8 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold tracking-wider uppercase mb-6">
                Path 2: Custom Adapters
              </div>
              <h3 className="text-2xl font-bold mb-3">The "Enterprise" Way</h3>
              <p className="text-slate-400">Building from scratch or adapting existing libraries like shadcn/ui or Material UI? Use our low-level hooks to seamlessly map validation state to your custom components.</p>
            </div>
            <div className="p-8 bg-[#08080a] flex-1">
              <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
                <code className="language-tsx">
{`// Adapt any custom component effortlessly
const { value, error, onChange, onBlur } = 
  useFormularField('firstName');

return (
  <ShadcnInput 
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={!!error}
    helperText={error?.message}
  />
);`}
                </code>
              </pre>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-slate-500 text-sm">
        <p>Built with Next.js & Tailwind CSS. © {new Date().getFullYear()} Formular.dev.</p>
      </footer>
    </div>
  );
}
