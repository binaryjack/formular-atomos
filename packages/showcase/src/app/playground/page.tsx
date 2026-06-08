"use client";

import React, { useState } from "react";
import Link from "next/link";
import { f } from "formular.dev";
import { 
  FAProvider, 
  FAInput, 
  FAEmail, 
  FAPassword,
  FAButton
} from "@formular/atomos";

const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});

export default function PlaygroundPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    setSubmittedData(data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Form submitted successfully:", data);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
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

      <main className="max-w-7xl mx-auto p-8 md:p-16 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Form */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Live Demo: Registration</h1>
            <p className="text-slate-400">
              Try filling out the form below. Notice the instant validation, strict schema checking, and fully accessible inputs powered natively by Formular.dev and @formular/atomos.
            </p>
          </div>

          <div className="bg-[#0c0c0f] border border-white/10 rounded-2xl p-8 shadow-xl">
            <FAProvider formName="register" form={signUpSchema} onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FAInput id="firstName" placeholder="Jane" />
                <FAInput id="lastName" placeholder="Doe" />
              </div>
              
              <div className="mb-4">
                <FAEmail id="email" placeholder="jane.doe@example.com" />
              </div>

              <div className="mb-6">
                <FAPassword id="password" placeholder="••••••••" />
              </div>

              <FAButton type="submit" className="w-full">
                Create Account
              </FAButton>
            </FAProvider>
          </div>
        </div>

        {/* Right Column: Code & State */}
        <div className="flex-1 space-y-6">
          <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
            <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">Schema Definition</div>
            <pre className="text-sm text-indigo-300 font-mono overflow-x-auto">
{`const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});`}
            </pre>
          </div>

          <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 overflow-hidden">
            <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-4">Submitted State</div>
            <pre className="text-sm text-emerald-400 font-mono overflow-x-auto min-h-[100px]">
              {submittedData ? JSON.stringify(submittedData, null, 2) : "// Submit the form to see the validated payload"}
            </pre>
          </div>
        </div>

      </main>
    </div>
  );
}
