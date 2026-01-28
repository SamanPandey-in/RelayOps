import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Wrench,
  Calendar,
  Users,
  BarChart3,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import Button from '@mui/material/Button';
import { Logo, ThemeToggle } from '../components';

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Wrench size={24} />,
      title: 'One-Click Asset Intelligence',
      description: "Never hunt for data again. Our 'Smart Button' technology provides an instant, filtered history of every repair.",
    },
    {
      icon: <Users size={24} />,
      title: 'Team Management',
      description: 'Organize specialized teams and assign maintenance tasks efficiently.',
    },
    {
      icon: <Calendar size={24} />,
      title: 'Smart Scheduling',
      description: 'Schedule preventive maintenance and never miss critical service dates.',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Insights & Reports',
      description: 'Get actionable insights with comprehensive maintenance analytics.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Warranty Management',
      description: 'Track warranty information and ensure timely claims.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications and status updates.',
    },
  ];

  const stats = [
    { value: '40%', label: 'Reduction in Downtime', icon: <TrendingUp size={24} /> },
    { value: '500+', label: 'Companies Trust Us', icon: <Users size={24} /> },
    { value: '99.9%', label: 'System Uptime', icon: <Clock size={24} /> },
    { value: '4.9/5', label: 'Customer Rating', icon: <Award size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Navigation */}
      <nav className="border-b fixed w-full top-0 z-50 bg-[var(--color-surface)] border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="text">Login</Button>
              </Link>
              <Link to="/auth">
                <Button variant='contained' color="primary">Get Started</Button>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 bg-[var(--color-bg)]">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--color-primary)] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-border)]">
              <Zap size={16} />
              <span>Trusted by 500+ companies worldwide</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight" style={{ color: 'var(--text)' }}>
              Fix Breakdowns
              <span className="block mt-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] bg-clip-text text-transparent">
                Before They Break You
              </span>
            </h1>

            <p className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Centrailze assets, automate maintainance requests, and keep teams moving with real-time visibility
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/auth">
                <Button
                  size="large"
                  variant="contained"
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl"
                  endIcon={<ArrowRight size={20} />}
                >
                  Start Managing Assets
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="large" variant="outlined" className="w-full sm:w-auto">
                  Explore Workflow
                </Button>
              </Link>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
              {stats.map((stat, index) => (
                <div className="rounded-xl p-6 border bg-[var(--color-surface)] border-[var(--color-border)]">
                  <div className="flex justify-center mb-3 text-[var(--color-primary)]">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 dark:bg-black" style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text)' }}>
              POWERFUL FEATURES
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4" style={{ color: 'var(--text)' }}>
              Everything you need to manage maintenance
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Powerful features designed to make equipment maintenance simple and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border bg-[var(--color-surface)] border-[var(--color-border)] hover:shadow-2xl transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom right, var(--primary-100), transparent)' }}></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 text-[var(--color-primary)]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-20" style={{ background: 'var(--secondary-300)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: 'var(--card)', color: 'var(--text)' }}>
                PROVEN RESULTS
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6 leading-tight" style={{ color: 'var(--text)' }}>
                Reduce costs and increase efficiency
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                GearGuard helps organizations optimize their maintenance operations and maximize equipment uptime with data-driven insights and automation.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { text: 'Zero-Gap Compliance: Ensure every asset meets 100% of regulatory safety standards automatically.' },
                  { text: 'Zero-Manual Entry: Intelligent Auto-Fill pulls equipment history instantly.' },
                  { text: 'Predictive Cost Shield: Identify failing assets algorithms before catastrophic failures.' },
                  { text: 'Technician Autonomy: Mobile-first workflows for duration and completion recording.' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg p-4 border bg-[var(--color-surface)] border-[var(--color-border)]">
                    <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: 'var(--bg-muted)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--text)', backgroundColor: 'var(--bg-muted)' }} />
                    </div>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/auth">
                <Button size="large" variant="contained" color="primary" className="shadow-lg">
                  Get Started Now
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl p-1 shadow-2xl" style={{ backgroundColor: 'var(--card)' }}>
                <div className="rounded-3xl p-8" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: 'var(--bg-muted)' }}>
                      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp size={32} className="text-white" />
                      </div>
                      <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>99.9%</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Asset Reliability</p>
                    </div>
                    <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: 'var(--bg-muted)' }}>
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users size={32} className="text-white" />
                      </div>
                      <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>95%</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Team Utilization</p>
                    </div>
                    <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: 'var(--bg-muted)' }}>
                      <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock size={32} className="text-white" />
                      </div>
                      <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>1.2h</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>MTTR</p>
                    </div>
                    <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: 'var(--bg-muted)' }}>
                      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield size={32} className="text-white" />
                      </div>
                      <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>$0</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Cost of Inaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--primary-700)', color: 'var(--text)' }}>
        <div className="absolute inset-0 opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-display font-bold  mb-6">
            Ready to optimize your maintenance?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of companies already using GearGuard to streamline their operations and reduce costs.
          </p>
          <Link to="/auth">
            <Button variant='contained' color="primary">
              Join In Now!!
            </Button>
          </Link>
          <p className="mt-6 text-sm">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16" style={{ backgroundColor: 'var(--secondary-900)', color: 'var(--text)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Logo />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The ultimate maintenance tracking solution for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-gray-400" style={{ borderColor: 'var(--border)' }}>
            <p>&copy; {new Date().getFullYear()} RelayOps. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
