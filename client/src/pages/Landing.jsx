import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, LayoutDashboard, Clock, Layers, MessageSquare, Shield, Smartphone, ChevronRight } from 'lucide-react';

/**
 * HEED MONOCHROME LANDING PAGE
 * "Stop Reacting. Start Heeding."
 */

const Navbar = () => (
  <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link className="flex items-center gap-2 group" to="/">
          <div className="size-8 bg-white rounded-lg flex items-center justify-center text-black">
            <Zap size={20} className="fill-current" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight uppercase">HEED</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#features">Platform</a>
          <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#features">Features</a>
          <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#pricing">Pricing</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/login" className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-colors px-4">
          Sign In
        </Link>
        <Link to="/signup">
          <div className="size-8 bg-white rounded-lg flex items-center justify-center text-black hover:scale-105 transition-transform cursor-pointer">
            <Zap size={20} className="fill-current" />
          </div>
        </Link>
      </div>
    </div>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10 transition-all group hover:border-white/50">
    <div className="size-12 rounded-lg flex items-center justify-center mb-6 transition-all bg-white/10 text-white group-hover:bg-white group-hover:text-black">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const Landing = () => {
  return (
    <div className="bg-black text-slate-300 antialiased selection:bg-white/30 selection:text-white min-h-screen">
      {/* Premium Top Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none z-0">
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[120%] h-full bg-white/5 blur-[120px] rounded-[100%]"></div>
      </div>

      <Navbar />

      <main className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="hero-gradient-text text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
            Stop Reacting.<br />Start Heeding.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-display">
            The central nervous system for your team. HEED orchestrates tasks, communication, and resources so you catch issues before they become problems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full min-w-[200px] bg-white hover:bg-white/90 text-black font-bold py-4 px-8 rounded-lg transition-all text-lg shadow-xl">
                Get Started for Free
              </button>
            </Link>
            <button className="w-full sm:w-auto min-w-[200px] bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-8 rounded-lg transition-all text-lg backdrop-blur-sm">
              Watch the Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-24 max-w-6xl mx-auto px-6 relative">
          <div className="rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden dashboard-glow">
            <div className="h-10 border-b border-white/10 bg-[#111] flex items-center px-4 gap-2">
              <div className="size-2.5 rounded-full bg-red-500/50"></div>
              <div className="size-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="size-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Sidebar Mock */}
              <div className="md:col-span-3 space-y-6">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Project Health</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Alpha Core</span>
                      <span className="text-green-400 font-mono">98%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-[98%] h-full bg-green-400"></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Edge API</span>
                      <span className="text-yellow-400 font-mono">64%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-[64%] h-full bg-yellow-400"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main Area Mock */}
              <div className="md:col-span-6 space-y-6">
                <div className="p-4 rounded-lg border relative overflow-hidden group bg-white/5 border-white/10">
                  <div className="absolute top-0 right-0 p-4 opacity-20 text-white">
                    <Shield size={36} />
                  </div>
                  <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-white">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-white"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Predictive Risk Alert
                  </h3>
                  <p className="text-white font-medium mb-1">Potential delay detected in "Q3 Launch"</p>
                  <p className="text-slate-400 text-sm">Velocity has dropped by 14% over the last 48 hours. Buffer reduced to 2 days.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-white/5 rounded-lg border border-white/10 p-4 flex flex-col justify-between">
                    <span className="text-slate-500 text-xs font-bold uppercase">Tasks Resolved</span>
                    <span className="text-3xl font-bold text-white tracking-tight">248</span>
                  </div>
                  <div className="h-32 bg-white/5 rounded-lg border border-white/10 p-4 flex flex-col justify-between">
                    <span className="text-slate-500 text-xs font-bold uppercase">Live Resources</span>
                    <span className="text-3xl font-bold text-white tracking-tight">12/14</span>
                  </div>
                </div>
              </div>
              {/* Right Mock */}
              <div className="md:col-span-3">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 h-full">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Team Load</h3>
                  <div className="flex items-end gap-2 h-40">
                    {[40, 70, 90, 55, 30, 40, 70, 90, 55, 30].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/10 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for High-Velocity Teams</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">HEED transforms fragmented data into actionable foresight, keeping your projects on course without the micromanagement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={LayoutDashboard}
              title="Intelligent Backbone"
              description="The central hub for files and high-level decisions. Centralize your team's knowledge to ensure every action is informed and every resource accounted for."
            />
            <FeatureCard
              icon={Shield}
              title="Zero Surprises"
              description="Our proactive notification system identifies deadline risks before they escalate, giving your team the buffer needed to stay on track."
            />
            <FeatureCard
              icon={Clock}
              title="Resource Harmony"
              description="Visual task tracker that balances team capacity in real-time. Automatically re-route tasks when a team member is overloaded."
            />
          </div>
        </div>
      </section>

      {/* Bento / Secondary Value Prop */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Decisions, not just discussions.</h2>
            <div className="space-y-6">
              {[
                { title: "Contextual Search", desc: "Find the 'why' behind any decision across your entire workspace instantly." },
                { title: "Risk Mitigation", desc: "Identify project bottlenecks 72 hours before they occur using predictive AI." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 text-white">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center p-12 overflow-hidden">
              <div className="w-full aspect-video bg-black rounded-lg border border-white/10 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <p className="text-white font-mono text-sm">Initializing Proactive Core...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Scales with your ambition</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Choose the plan that fits your team's needs. All plans include our core predictive engine.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <PlanCard
              title="Starter"
              price="$0"
              desc="Perfect for side projects and small teams."
              features={["Up to 5 active projects", "Basic risk detection", "Community support"]}
              btnText="Get Started"
            />
            {/* Pro */}
            <PlanCard
              title="Pro"
              price="$19"
              desc="Everything your growing team needs to stay proactive."
              features={["Unlimited projects", "Advanced Predictive AI", "Priority email support", "Custom integrations"]}
              btnText="Start Free Trial"
              highlighted
            />
            {/* Enterprise */}
            <PlanCard
              title="Enterprise"
              price="Custom"
              desc="Security and support for large organizations."
              features={["SAML/SSO Authentication", "Dedicated Account Manager", "Custom SLA & Contracts", "On-premise deployment"]}
              btnText="Talk to Sales"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl p-12 md:p-20 text-center relative overflow-hidden bg-zinc-900/50 border border-white/10">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white, transparent)' }}></div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10">Ready to lead, not follow?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10">Join 2,000+ proactive engineering teams using HEED to stay ahead of the curve.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full px-10 py-4 bg-white font-bold rounded-xl hover:bg-slate-100 transition-colors text-lg text-black">
                Start Your Trial
              </button>
            </Link>
            <button className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="size-6 bg-white rounded flex items-center justify-center text-black">
                  <Zap size={14} className="fill-current" />
                </div>
                <span className="text-white font-bold text-lg tracking-tight">HEED</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Orchestrating the future of collaborative productivity.</p>
            </div>
            {["Product", "Company", "Connect"].map((col, i) => (
              <div key={i}>
                <h5 className="text-white font-bold text-sm mb-6">{col}</h5>
                <ul className="space-y-4 text-sm text-slate-500">
                  {col === "Product" && ["Platform", "Alerts", "Integrations", "Security"].map(link => <li key={link}><a className="hover:text-white transition-colors" href="#">{link}</a></li>)}
                  {col === "Company" && ["About", "Blog", "Careers", "Privacy"].map(link => <li key={link}><a className="hover:text-white transition-colors" href="#">{link}</a></li>)}
                  {col === "Connect" && ["Twitter", "LinkedIn", "YouTube", "Contact"].map(link => <li key={link}><a className="hover:text-white transition-colors" href="#">{link}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-slate-600 gap-4">
            <p>© {new Date().getFullYear()} HEED Platforms Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-white transition-colors" href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const PlanCard = ({ title, price, desc, features, btnText, highlighted = false }) => (
  <div className={`p-8 rounded-2xl bg-[#0A0A0A] border ${highlighted ? 'border-primary border-2' : 'border-white/10'} flex flex-col relative`}>
    {highlighted && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
        Most Popular
      </div>
    )}
    <div className="mb-8">
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">{price}</span>
        {price !== "Custom" && <span className="text-slate-500 text-sm">/month</span>}
      </div>
      <p className="text-slate-400 text-sm mt-4">{desc}</p>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
          <Zap size={14} className="text-white" />
          {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 px-6 rounded-lg font-bold transition-all border ${highlighted ? 'bg-white text-black shadow-lg hover:bg-slate-100' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
      {btnText}
    </button>
  </div>
);

export default Landing;
