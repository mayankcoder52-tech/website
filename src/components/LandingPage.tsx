import { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Shield, Zap, Code, Award, CheckCircle2, ChevronDown, MessageSquare, Compass, Play, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Globe3D from './Globe3D';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [typingText, setTypingText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  const heroStrings = [
    'the future of algorithmic mastery.',
    'AI-powered technical interview preparation.',
    'real-time coding metrics and roadmap generation.',
    'next-generation competitive contest forecasting.'
  ];

  // Typing animation effect
  useEffect(() => {
    let currentText = heroStrings[textIndex];
    let charIndex = 0;
    let isDeleting = false;
    let intervalId: any;

    const tick = () => {
      if (!isDeleting) {
        setTypingText(currentText.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          clearInterval(intervalId);
          setTimeout(() => {
            intervalId = setInterval(tick, 40);
          }, 2000); // Wait before starting delete
        }
      } else {
        setTypingText(currentText.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setTextIndex((prev) => (prev + 1) % heroStrings.length);
          clearInterval(intervalId);
          setTimeout(() => {
            intervalId = setInterval(tick, 80);
          }, 500); // Wait before typing next
        }
      }
    };

    intervalId = setInterval(tick, 80);
    return () => clearInterval(intervalId);
  }, [textIndex]);

  const pricingPlans = [
    {
      name: 'Starter Forge',
      description: 'Ideal for computer science students and independent developers embarking on their coding journey.',
      price: billingCycle === 'monthly' ? 0 : 0,
      features: [
        'Access to standard problems suite',
        'Basic AI Assistant debug requests (10/day)',
        'Personal dashboard tracking metrics',
        'Standard leaderboard participation',
        'Daily activity heatmaps',
      ],
      cta: 'Forge Free Account',
      popular: false,
    },
    {
      name: 'Pro Alchemist',
      description: 'Engineered for dedicated engineers targeting FAANG+ organizations and elite contest tiers.',
      price: billingCycle === 'monthly' ? 24 : 19,
      features: [
        'Unlimited access to all elite problems',
        'Deep Gemini Pro-powered AI Mentor (Unlimited)',
        'Full Personalized Roadmap Generator',
        'Interactive Resume ATS Scanner & Analyzer',
        'GitHub Repository Style & Security Audits',
        'Contest and Rating Predictor Analytics',
        'Advanced achievements and global rankings',
      ],
      cta: 'Initiate Free Trial',
      popular: true,
    },
    {
      name: 'Nexus Enterprise',
      description: 'Bespoke integration for top-tier bootcamps, universities, and enterprise engineering departments.',
      price: 'Custom',
      features: [
        'Custom workspace environments & problems',
        'Dedicated secure Gemini enterprise channels',
        'Advanced group analytics and monitoring',
        'SLA guaranteed runtime metrics',
        'SSO, LDAP, and custom role authentications',
        'Priority 24/7/365 engineering support',
      ],
      cta: 'Contact Enterprise Sales',
      popular: false,
    },
  ];

  const faqs = [
    {
      q: 'How does the AI Contest Predictor predict rating changes?',
      a: 'The CodeForge AI Contest Engine runs deep analytical neural nets based on your historic solving speed, accuracy distribution, category comfort levels, and historical performance curves. It compiles this with active participant matrices to output incredibly precise rating predictions before contests conclude.',
    },
    {
      q: 'Can I integrate my real-world GitHub account?',
      a: 'Absolutely! Our GitHub Repository Analyzer establishes OAuth protocols to securely scan your code bases, analyzing modularity, complexity indices, unit testing coverage, styling standards, and identifying security vulnerabilities with detailed refactoring suggestions.',
    },
    {
      q: 'What AI models power the Mentor and Analyzers?',
      a: 'We leverage the cutting-edge Google Gemini family of models (including gemini-3.5-flash) hosted entirely server-side. This ensures highly responsive, low-latency code compilations, smart roadmapping, and deep pedagogical debugging explanations.',
    },
    {
      q: 'Is there a trial available for the Pro Alchemist tier?',
      a: 'Yes! We offer a full-featured 14-day trial of the Pro Alchemist tier. You can experience the AI Mentor, GitHub Scanners, and interactive Career Roadmaps without entering payment credentials initially.',
    },
  ];

  return (
    <div id="landing-page" className="relative w-full overflow-hidden bg-[#050505] text-[#F9FAFB] font-sans select-none">
      
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="font-black text-white text-lg">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CODEFORGE<span className="text-blue-500">AI</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#timeline" className="hover:text-white transition-colors">Workflow</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onGetStarted}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={onGetStarted}
              className="px-5 py-2 text-sm font-semibold bg-white text-black rounded-full hover:bg-gray-200 shadow-xl shadow-white/5 transition-all cursor-pointer flex items-center gap-1.5"
            >
              Launch Terminal
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Massive Hero Section */}
      <section className="relative min-h-[90vh] flex items-center max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 z-10">
        
        {/* Left Typography Box */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 w-fit text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v2.0 Architecture Release
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter text-white">
            THE OS FOR <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              AI ENGINEERING
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
            The world's premier AI technical development suite. Real-time interview prep, predictive algorithmic training, active resume diagnostics, and autonomous learning roadmaps.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onGetStarted}
              className="h-14 px-8 bg-blue-600 rounded-xl font-bold text-base hover:bg-blue-500 shadow-2xl shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                const target = document.getElementById('features');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="h-14 px-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl font-bold text-base hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current text-blue-400" />
              Explore Capabilities
            </button>
          </div>

          {/* Interactive Live Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-800/80 max-w-md">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">50M+</div>
              <div className="text-xs text-gray-500 tracking-wider uppercase mt-1 font-mono">Lines Analyzed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">99.4%</div>
              <div className="text-xs text-gray-500 tracking-wider uppercase mt-1 font-mono">Predict Accuracy</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">124ms</div>
              <div className="text-xs text-gray-500 tracking-wider uppercase mt-1 font-mono">Average Latency</div>
            </div>
          </div>
        </div>

        {/* Right 3D Globe Frame */}
        <div className="lg:col-span-5 h-[400px] sm:h-[450px] lg:h-[500px] flex items-center justify-center relative">
          
          {/* Floating Glass Code Card */}
          <div className="absolute top-4 left-4 z-20 p-4 bg-gray-900/80 backdrop-blur-md border border-indigo-500/30 rounded-xl max-w-[210px] hidden sm:block shadow-2xl">
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono mb-2">
              <Terminal className="w-3.5 h-3.5" />
              forge_predict.py
            </div>
            <pre className="text-[10px] text-gray-400 font-mono overflow-hidden">
              <code>{`def compute_odds(solved, streak):
  entropy = sum([x**2 for x in solved])
  return entropy * Math.exp(streak)

# Target: CodeForces Div.2`}</code>
            </pre>
          </div>

          {/* Floating Action Stats */}
          <div className="absolute bottom-6 right-4 z-20 p-4 bg-gray-900/80 backdrop-blur-md border border-pink-500/20 rounded-xl hidden sm:block shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-white">CONTEST ACTIVE</span>
            </div>
            <div className="text-[10px] text-gray-400 font-mono">Global users predicted: <strong className="text-indigo-400">14,204</strong></div>
          </div>

          <Globe3D />
        </div>
      </section>

      {/* 3. Trusted By Infinite Scrolling Banner */}
      <section className="py-12 border-t border-b border-gray-800/70 bg-[#060b18]/40 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Fostering top engineering talent trusted by global visionaries
          </span>
        </div>
        <div className="flex w-[200%] gap-12 select-none pointer-events-none opacity-40">
          <div className="flex justify-around items-center w-full animate-marquee">
            <span className="text-lg font-bold tracking-widest text-white">GOOGLE</span>
            <span className="text-lg font-bold tracking-widest text-white">META</span>
            <span className="text-lg font-bold tracking-widest text-white">STRIPE</span>
            <span className="text-lg font-bold tracking-widest text-white">OPENAI</span>
            <span className="text-lg font-bold tracking-widest text-white">NVIDIA</span>
            <span className="text-lg font-bold tracking-widest text-white">MICROSOFT</span>
            <span className="text-lg font-bold tracking-widest text-white">ATLASSIAN</span>
          </div>
          <div className="flex justify-around items-center w-full animate-marquee">
            <span className="text-lg font-bold tracking-widest text-white">GOOGLE</span>
            <span className="text-lg font-bold tracking-widest text-white">META</span>
            <span className="text-lg font-bold tracking-widest text-white">STRIPE</span>
            <span className="text-lg font-bold tracking-widest text-white">OPENAI</span>
            <span className="text-lg font-bold tracking-widest text-white">NVIDIA</span>
            <span className="text-lg font-bold tracking-widest text-white">MICROSOFT</span>
            <span className="text-lg font-bold tracking-widest text-white">ATLASSIAN</span>
          </div>
        </div>
      </section>

      {/* 4. Modular Features Bento Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 text-center space-y-16">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Unrivaled capabilities for elite engineering
          </h2>
          <p className="text-gray-400">
            Engineered to accelerate computational expertise, streamline system evaluations, and cultivate core mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: AI Mentor */}
          <div className="group relative p-8 bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl hover:border-indigo-500/40 transition-all hover:translate-y-[-4px] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all" />
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl w-fit mb-6">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">AI Mentor Playground</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Engage with an autonomous algorithmic coach. Receive detailed debugging support, step-by-step space complexity evaluations, and coding advice.
            </p>
          </div>

          {/* Card 2: Contest Predictor */}
          <div className="group relative p-8 bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl hover:border-violet-500/40 transition-all hover:translate-y-[-4px] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all" />
            <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl w-fit mb-6">
              <Zap className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">Rating Forecast Analytics</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Evaluate real-time problem metrics, virtual contest rankings, and predictive rating changes based on historical patterns and current solving telemetry.
            </p>
          </div>

          {/* Card 3: Personalized Roadmapping */}
          <div className="group relative p-8 bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl hover:border-pink-500/40 transition-all hover:translate-y-[-4px] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all" />
            <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl w-fit mb-6">
              <Compass className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Dynamic AI Roadmaps</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Generate fully detailed career roadmaps. Specify targeted paths (Frontend, Systems, Devops) and watch AI forge curated curriculum nodes.
            </p>
          </div>

          {/* Card 4: Resume Analyzer */}
          <div className="group relative p-8 bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl hover:border-sky-500/40 transition-all hover:translate-y-[-4px] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all" />
            <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl w-fit mb-6">
              <Shield className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">ATS Analyzer & Scanners</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Upload or input your resume to receive rigorous ATS scoring indexations, bullet optimization parameters, and comprehensive structure reports.
            </p>
          </div>

          {/* Card 5: GitHub Analyzer */}
          <div className="group relative p-8 bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl hover:border-emerald-500/40 transition-all hover:translate-y-[-4px] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-fit mb-6">
              <Code className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Repository Quality Audits</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Execute OAuth repository imports to trace coding patterns, evaluate cyclomatic complexity parameters, and secure modular security scans.
            </p>
          </div>

          {/* Card 6: Gamified Achievements */}
          <div className="group relative p-8 bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl hover:border-amber-500/40 transition-all hover:translate-y-[-4px] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all" />
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl w-fit mb-6">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Elite Gamified Ascent</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advance through tiers, stack dynamic XP values, conquer high-tier achievements, and benchmark your ranking on the live community global leaderboard.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Workflow/Timeline Timeline */}
      <section id="timeline" className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-800/80">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How CodeForge Accelerates Your Skillsets</h2>
          <p className="text-gray-400 text-sm sm:text-base">
            From establishing foundational code patterns to climbing elite competitive leagues and conquering complex interviews.
          </p>
        </div>

        <div className="relative border-l border-indigo-500/30 max-w-3xl mx-auto pl-8 sm:pl-12 space-y-16">
          
          <div className="relative">
            <div className="absolute -left-[41px] sm:-left-[57px] top-1 p-2 bg-indigo-950 border border-indigo-500/30 rounded-lg shadow-xl">
              <Terminal className="w-4 h-4 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">01. Establish Code Profiles</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sign up, import your current portfolio, and execute immediate problem diagnostic tests. Establish baseline levels in arrays, matrices, dynamic programming, and systems design.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[41px] sm:-left-[57px] top-1 p-2 bg-violet-950 border border-violet-500/30 rounded-lg shadow-xl">
              <Compass className="w-4 h-4 text-violet-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">02. Assemble Curated Roadmaps</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Input targeted career aspirations or technical skills. Watch Gemini forge dynamic node maps with highly detailed educational documentation, recommended reference repos, and practice loops.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[41px] sm:-left-[57px] top-1 p-2 bg-pink-950 border border-pink-500/30 rounded-lg shadow-xl">
              <MessageSquare className="w-4 h-4 text-pink-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">03. Train with AI Mentoring</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Face coding tasks. If blocks arise, engage our real-time AI Mentor. Secure precise explanations of computational runtime, step-by-step space optimizations, or clean pseudocode.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[41px] sm:-left-[57px] top-1 p-2 bg-emerald-950 border border-emerald-500/30 rounded-lg shadow-xl">
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">04. Triumph in Elite Contests</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Compete in high-stakes virtual matches. Analyze predictive scoring changes, complete problem grids under rigorous speed constraints, and rank among top players globally.
            </p>
          </div>

        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-800/80">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Loved by the world's finest developers</h2>
          <p className="text-gray-400">
            See how top-tier engineers, competitors, and leaders accelerated their paths with CodeForge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-8 bg-gray-900/20 border border-gray-800 rounded-2xl relative flex flex-col justify-between">
            <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
              "The AI Mentor on CodeForge completely replaced my tedious Google searches. The runtime breakdowns are extremely exact, letting me conquer my Google technical loops with massive confidence."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500" />
              <div>
                <h4 className="text-sm font-bold text-white">Alexander Cho</h4>
                <p className="text-xs text-gray-500">Staff Software Engineer, OpenAI</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-900/20 border border-gray-800 rounded-2xl relative flex flex-col justify-between">
            <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
              "The personalized career roadmap generated by Gemini steered me straight into full-stack architecture. The node structures are incredibly precise and actionable."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-teal-500" />
              <div>
                <h4 className="text-sm font-bold text-white">Seraphina Ross</h4>
                <p className="text-xs text-gray-500">Lead Frontend Engineer, Vercel</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-900/20 border border-gray-800 rounded-2xl relative flex flex-col justify-between">
            <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
              "The predictive contest engines on CodeForge are ridiculously precise. My final Div. 1 rating outcomes were predicted down to a margin of single digits. Absolutely legendary!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-pink-500" />
              <div>
                <h4 className="text-sm font-bold text-white">Dmitri Volkov</h4>
                <p className="text-xs text-gray-500">Grandmaster, CodeForces</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Pricing Tiers */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-800/80 text-center space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Simple, predictable pricing plans</h2>
          <p className="text-gray-400">
            Unlock the next spectrum of your computer science capability. Change or cancel tiers whenever you desire.
          </p>

          {/* Toggle Button */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-semibold' : 'text-gray-500'}`}>Monthly Billing</span>
            <button
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-12 h-6 bg-indigo-600 rounded-full p-1 transition-colors flex items-center cursor-pointer"
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-white font-semibold' : 'text-gray-500'}`}>
              Yearly Billing
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 bg-gray-900/30 backdrop-blur-md border rounded-2xl flex flex-col justify-between ${
                plan.popular ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.15)]' : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 rounded-full text-white text-[10px] font-extrabold tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 h-12">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white">
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'number' && (
                    <span className="text-gray-500 text-sm">/ month</span>
                  )}
                </div>

                <div className="space-y-4 mb-10">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onGetStarted}
                className={`w-full py-3 px-4 text-xs font-semibold rounded-lg tracking-wider transition-all duration-300 active:scale-95 cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-xl'
                    : 'bg-gray-800/80 text-gray-200 hover:bg-gray-700 hover:text-white border border-gray-700/80'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Accordion FAQs */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-24 border-t border-gray-800/80 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm">
            Answers to common questions regarding system setup, security frameworks, and AI structures.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-800 bg-gray-900/10 rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left text-sm font-bold text-white hover:bg-gray-800/20 transition-all cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-indigo-400 transition-transform duration-300 ${
                    activeFaq === i ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeFaq === i ? 'max-h-40 border-t border-gray-800/80 p-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final CTA Banner */}
      <section className="relative overflow-hidden border-t border-gray-800/80">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-violet-950/20 to-[#030712] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 py-24 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Elevate your algorithmic craftsmanship today
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Forge an elite portfolio, accelerate problem training speeds, secure Gemini code mentors, and level your full-stack capability.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg hover:from-indigo-500 hover:to-violet-500 shadow-2xl transition-all active:scale-95 cursor-pointer"
          >
            Enter CodeForge Workspace Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="border-t border-gray-800 bg-[#010309] text-gray-500 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold tracking-wider">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              CODEFORGE AI
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-[240px]">
              The premium algorithmic development engine powered by state of the art server-side Gemini.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-300">Workspace</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={onGetStarted} className="hover:text-white text-left cursor-pointer">Live Dashboard</button></li>
              <li><button onClick={onGetStarted} className="hover:text-white text-left cursor-pointer">AI Mentor Workspace</button></li>
              <li><button onClick={onGetStarted} className="hover:text-white text-left cursor-pointer">Virtual Contests</button></li>
              <li><button onClick={onGetStarted} className="hover:text-white text-left cursor-pointer">ATS Analyzer</button></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-300">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white">Capabilities</a></li>
              <li><a href="#timeline" className="hover:text-white">Workflows</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing Structure</a></li>
              <li><a href="#faq" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-300">Security & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white">SOC-2 Certified</li>
              <li className="hover:text-white">Privacy Parameters</li>
              <li className="hover:text-white">Terms of Deployment</li>
              <li className="hover:text-white">Data Encryption Protocols</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-gray-900/80 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <div>&copy; {new Date().getFullYear()} CodeForge AI Inc. All rights reserved. Built with Gemini.</div>
          <div className="flex gap-6">
            <span className="hover:text-white">Status: Full Operations</span>
            <span className="hover:text-white">Port Integration</span>
            <span className="hover:text-white">SOC-2 Type II Verified</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
