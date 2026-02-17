import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Zap,
  Clock,
  Layers,
  ChevronRight,
  Smartphone,
  Shield,
  Link as LinkIcon
} from 'lucide-react';

/**
 * RELAYOPS LANDING PAGE
 * Vision: The central nervous system for team collaboration.
 * Concept: The "Baton Pass" - seamless transitions and proactive orchestration.
 */

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <Zap size={18} className="text-white fill-current" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">RelayOps</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="#features" className="hover:text-cyan-400 transition-colors">Platform</a>
        <a href="#vision" className="hover:text-cyan-400 transition-colors">Our Vision</a>
        <a href="#mobile" className="hover:text-cyan-400 transition-colors">Mobile</a>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-medium text-white hover:text-cyan-400 transition-colors">
          <button> Login </button>
        </Link>
        <Link to="/signup" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <button> Get Started </button>
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6 inline-block">
          The Future of Team Flow
        </span>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-8">
          The Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Handover.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed mb-10">
          RelayOps is the intelligent backbone for teams. We turn scattered chaos into proactive orchestration, ensuring you stay ahead rather than constantly reacting.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2">
              Start Your Relay <ChevronRight size={20} />
            </button>
          </Link>
          <a href="videolink" target="_blank" rel="noopener noreferrer">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-bold text-lg hover:bg-white/10 transition-colors">
              Watch Demo
            </button>
          </a>
        </div>
      </motion.div>
    </div>

    {/* Background Glows */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
  </section>
);

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-cyan-500/50 transition-all duration-500 group"
  >
    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-cyan-400" size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-sm italic">{description}</p>
  </motion.div>
);

const BatonPassSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="features" ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">Orchestrate Intelligently</h2>
          <p className="text-zinc-400">Solving the headaches that slow teams down.</p>
        </div>

        <div className="relative">
          {/* Central Progress Line (The Baton Track) */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-zinc-800 -translate-x-1/2 hidden md:block">
            <motion.div
              style={{ height: pathHeight }}
              className="w-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
            />
          </div>

          <div className="space-y-32">
            <BatonFeature
              side="left"
              icon={Layers}
              title="Unified Backbone" desc="No more scattered information. We act as a central nervous system for your files, chats, and decisions."
            />
            <BatonFeature
              side="right"
              icon={Clock}
              title="Predictive Momentum" desc="Catch potential issues early. RelayOps surfaces threats before they become 'deadline surprises'."
            />
            <BatonFeature
              side="left"
              icon={Smartphone}
              title="On-the-Go Agility" desc="A mobile MVP designed for quick interactions, ensuring you stay aligned while away from your desk."
            />
            <BatonFeature
              side="right"
              icon={MessageSquare}
              title="Threaded Clarity" desc="Contextual discussions that stay within the project lane, so updates never get buried in email."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const BatonFeature = ({ side, title, desc, icon: Icon }) => (
  <div className={`flex items-center justify-between w-full ${side === 'right' ? 'flex-row-reverse' : ''}`}>
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-[42%] group"
    >
      <div className="p-8 rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 group-hover:border-cyan-500/30 transition-all duration-500">
        <Icon className="text-cyan-500 mb-6" size={32} />
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-zinc-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
    <div className="hidden md:block w-1/2"></div>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-cyan-500/30 selection:text-cyan-400 font-sans">
      {/* Custom Cursor Overlay could be added here */}
      <Navbar />
      <Hero />

      {/* Grid of MVP Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={LayoutDashboard}
            title="Visualize Progress"
            description="Clear, intuitive progress tracking to eliminate 'Unclear Progress'."
            delay={0.1}
          />
          <FeatureCard
            icon={Smartphone}
            title="Mobile Friendly"
            description="A lightweight 'command center' built for high-speed, on-the-go interactions."
            delay={0.2}
          />
          <FeatureCard
            icon={Shield}
            title="Resource Harmony"
            description="Balanced workloads that prevent team members from being overworked or underutilized."
            delay={0.3}
          />
        </div>
      </section>

      <BatonPassSection />

      {/* Footer / Final CTA */}
      <footer className="border-t border-white/5 py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to run smarter?</h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto">
            Join the teams moving from reactive chaos to proactive orchestration.
          </p>
          <Link to="/signup">
            <button className="px-10 py-4 rounded-full bg-white text-black font-extrabold text-lg hover:bg-cyan-400 hover:scale-105 transition-all">
              Get Started Now
            </button>
          </Link>
          <div className="mt-20 text-xs text-zinc-700 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} RelayOps — Continuous Improvement. Total Alignment.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
