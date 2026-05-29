import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Waves, Fish, Shield, FlaskConical, TrendingUp, Users, Microscope,
  Dna, BookOpen, ChevronDown, ChevronRight, Search, Bell, Menu, X,
  Play, Star, Clock, Award, Zap, Target, BarChart3, Droplets,
  Thermometer, Wind, Activity, CheckCircle, Circle, ArrowRight,
  Brain, Leaf, Globe, Lock, ChevronLeft, Home, GraduationCap,
  LayoutDashboard, Settings, LogOut, Beaker, ScanLine, Wifi,
  BarChart2, Cpu, Anchor, Compass, Map, Gauge, Radio, Layers,
  Trophy, Flame, BookMarked, Telescope, AlignLeft
} from "lucide-react";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const colors = {
  ocean0: "#00060F",
  ocean1: "#000D1A",
  ocean2: "#001428",
  ocean3: "#002040",
  surface: "rgba(0,20,45,0.6)",
  surfaceHigh: "rgba(0,30,65,0.8)",
  glass: "rgba(0,180,220,0.06)",
  glassHover: "rgba(0,200,255,0.10)",
  primary: "#00D4FF",
  primaryGlow: "rgba(0,212,255,0.35)",
  secondary: "#0066FF",
  accent: "#00FFB3",
  accentGlow: "rgba(0,255,179,0.3)",
  gold: "#FFB800",
  purple: "#8B5CF6",
  coral: "#FF6B6B",
  border: "rgba(0,212,255,0.15)",
  borderHigh: "rgba(0,212,255,0.35)",
  textPrimary: "#E8F4FF",
  textSecondary: "rgba(180,220,255,0.7)",
  textMuted: "rgba(120,170,210,0.5)",
};

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&family=Rajdhani:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #00D4FF;
    --accent: #00FFB3;
    --gold: #FFB800;
    --purple: #8B5CF6;
    --coral: #FF6B6B;
  }

  html { scroll-behavior: smooth; }

  body {
    background: #000D1A;
    color: #E8F4FF;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    cursor: default;
  }

  h1, h2, h3, h4, h5, .font-display { font-family: 'Oxanium', sans-serif; }
  .font-mono { font-family: 'Rajdhani', sans-serif; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000D1A; }
  ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }

  .glass {
    background: rgba(0,20,45,0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0,212,255,0.12);
  }

  .glow-primary { box-shadow: 0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1); }
  .glow-accent  { box-shadow: 0 0 20px rgba(0,255,179,0.3), 0 0 60px rgba(0,255,179,0.1); }
  .glow-gold    { box-shadow: 0 0 20px rgba(255,184,0,0.3); }

  .text-gradient-primary {
    background: linear-gradient(135deg, #00D4FF, #0066FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-gradient-accent {
    background: linear-gradient(135deg, #00FFB3, #00D4FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-gradient-gold {
    background: linear-gradient(135deg, #FFB800, #FF8C00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .grid-bg {
    background-image:
      linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  .ocean-wave {
    animation: waveMove 8s ease-in-out infinite;
  }

  @keyframes waveMove {
    0%, 100% { transform: translateX(0) scaleY(1); }
    50% { transform: translateX(-20px) scaleY(1.05); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-15px) rotate(5deg); }
    66% { transform: translateY(-8px) rotate(-3deg); }
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes ripple {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
  }

  @keyframes rotate360 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes dataFlow {
    0% { transform: translateY(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-200px); opacity: 0; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
  .animate-ripple { animation: ripple 2s ease-out infinite; }
  .animate-blink { animation: blink 1s step-end infinite; }

  .btn-primary {
    background: linear-gradient(135deg, #00D4FF, #0066FF);
    color: #000D1A;
    font-weight: 700;
    font-family: 'Oxanium', sans-serif;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.4s ease;
  }

  .btn-primary:hover::before { left: 100%; }
  .btn-primary:hover {
    box-shadow: 0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,100,255,0.2);
    transform: translateY(-2px);
  }

  .btn-ghost {
    background: transparent;
    border: 1px solid rgba(0,212,255,0.3);
    color: #00D4FF;
    font-family: 'Oxanium', sans-serif;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
  }

  .btn-ghost:hover {
    background: rgba(0,212,255,0.1);
    border-color: rgba(0,212,255,0.6);
    box-shadow: 0 0 20px rgba(0,212,255,0.2);
  }

  .card-hover {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card-hover:hover {
    transform: translateY(-8px) scale(1.01);
    border-color: rgba(0,212,255,0.4);
    box-shadow: 0 20px 60px rgba(0,212,255,0.15), 0 0 40px rgba(0,212,255,0.08);
  }

  .sidebar-active {
    background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,100,255,0.1));
    border-left: 2px solid #00D4FF;
    color: #00D4FF;
  }

  .gauge-fill {
    transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// ─── ANIMATED COUNTER ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── FLOATING BUBBLE ───────────────────────────────────────────────────────────
function Bubble({ size, x, y, delay, opacity }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: `${x}%`, top: `${y}%`,
        background: `radial-gradient(circle at 30% 30%, rgba(0,212,255,${opacity * 1.5}), rgba(0,100,255,${opacity}))`,
        border: `1px solid rgba(0,212,255,${opacity * 2})`,
        boxShadow: `0 0 ${size * 0.5}px rgba(0,212,255,${opacity})`,
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.1, 1],
        opacity: [opacity, opacity * 2, opacity],
      }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── PARTICLE FIELD ────────────────────────────────────────────────────────────
function ParticleField() {
  const bubbles = [
    { size: 80, x: 10, y: 20, delay: 0, opacity: 0.06 },
    { size: 40, x: 85, y: 15, delay: 1, opacity: 0.08 },
    { size: 120, x: 70, y: 60, delay: 2, opacity: 0.04 },
    { size: 25, x: 20, y: 70, delay: 0.5, opacity: 0.1 },
    { size: 60, x: 50, y: 85, delay: 1.5, opacity: 0.06 },
    { size: 35, x: 90, y: 45, delay: 3, opacity: 0.08 },
    { size: 90, x: 35, y: 40, delay: 2.5, opacity: 0.04 },
    { size: 20, x: 60, y: 25, delay: 0.8, opacity: 0.12 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b, i) => <Bubble key={i} {...b} />)}
    </div>
  );
}

// ─── OCEAN BACKGROUND ──────────────────────────────────────────────────────────
function OceanBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 120% 80% at 50% -20%, #002040 0%, #000D1A 50%, #000608 100%)"
      }} />
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      {/* Glow orbs */}
      <div style={{
        position: "absolute", width: 600, height: 600,
        left: "-10%", top: "10%",
        background: "radial-gradient(circle, rgba(0,100,255,0.08) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "pulse-glow 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 800, height: 800,
        right: "-15%", top: "30%",
        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "pulse-glow 10s ease-in-out infinite 2s",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500,
        left: "40%", bottom: "5%",
        background: "radial-gradient(circle, rgba(0,255,179,0.05) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "pulse-glow 12s ease-in-out infinite 4s",
      }} />
      {/* Scanline effect */}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.008) 2px, rgba(0,212,255,0.008) 4px)",
        pointerEvents: "none"
      }} />
    </div>
  );
}

// ─── SVG WAVE DIVIDER ──────────────────────────────────────────────────────────
function WaveDivider({ flip = false }) {
  return (
    <div style={{ transform: flip ? "scaleY(-1)" : "none", marginTop: -1 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block" }}>
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,212,255,0.15)" />
            <stop offset="50%" stopColor="rgba(0,100,255,0.1)" />
            <stop offset="100%" stopColor="rgba(0,255,179,0.08)" />
          </linearGradient>
        </defs>
        <path
          className="ocean-wave"
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="url(#waveGrad)"
        />
        <path
          d="M0,55 C360,20 720,75 1080,45 C1260,30 1380,60 1440,55 L1440,80 L0,80 Z"
          fill="rgba(0,212,255,0.05)"
          style={{ animation: "waveMove 10s ease-in-out infinite 1s" }}
        />
      </svg>
    </div>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = ["Beranda", "Kurikulum", "Dashboard", "Referensi", "Tentang"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(0,10,25,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 8, padding: "8px", color: "#00D4FF", cursor: "pointer", display: "flex" }}
            >
              <Menu size={18} />
            </motion.button>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "linear-gradient(135deg, #00D4FF, #0066FF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(0,212,255,0.4)",
              }}>
                <Anchor size={20} color="#000D1A" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "0.08em", lineHeight: 1 }}>
                  <span className="text-gradient-primary">AQUA</span>
                  <span style={{ color: "#E8F4FF" }}>ACADEMY</span>
                </div>
                <div style={{ fontSize: 9, color: "rgba(0,212,255,0.6)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.2em", lineHeight: 1, marginTop: 2 }}>
                  PLATFORM EDUKASI PERIKANAN
                </div>
              </div>
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
            {navLinks.map((link) => (
              <motion.button
                key={link}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveSection(link)}
                style={{
                  background: activeSection === link ? "rgba(0,212,255,0.1)" : "transparent",
                  border: "none",
                  borderBottom: activeSection === link ? "2px solid #00D4FF" : "2px solid transparent",
                  color: activeSection === link ? "#00D4FF" : "rgba(180,220,255,0.6)",
                  padding: "8px 16px",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {link}
              </motion.button>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: 8, padding: "8px 10px",
                color: "rgba(0,212,255,0.7)", cursor: "pointer", display: "flex",
              }}
            >
              <Search size={16} />
            </motion.button>

            <div style={{ position: "relative" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: 8, padding: "8px 10px",
                  color: "rgba(0,212,255,0.7)", cursor: "pointer", display: "flex",
                }}
              >
                <Bell size={16} />
              </motion.button>
              <div style={{
                position: "absolute", top: -4, right: -4,
                width: 16, height: 16, borderRadius: "50%",
                background: "#FF6B6B", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 700, color: "#fff",
                boxShadow: "0 0 8px rgba(255,107,107,0.6)",
              }}>3</div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              style={{ padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13 }}
            >
              Mulai Belajar
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ open, setOpen, activeMenu, setActiveMenu }) {
  const menuItems = [
    { icon: Home, label: "Beranda", id: "home" },
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: BookOpen, label: "Semua Materi", id: "materi", badge: "82" },
    {
      icon: Waves, label: "Produksi & Budidaya", id: "produksi",
      sub: ["Sistem Budidaya", "Kualitas Air", "Manajemen Produksi", "Teknologi Modern"],
      color: "#00D4FF",
    },
    {
      icon: Shield, label: "Kesehatan & Lingkungan", id: "kesehatan",
      sub: ["Penyakit Ikan", "Diagnosis & Obat", "Lingkungan Perairan"],
      color: "#00FFB3",
    },
    {
      icon: Dna, label: "Biologi & Nutrisi", id: "biologi",
      sub: ["Biologi Organisme", "Nutrisi & Pakan", "Genetika"],
      color: "#8B5CF6",
    },
    {
      icon: TrendingUp, label: "Bisnis & Ekonomi", id: "bisnis",
      sub: ["Ekonomi Usaha", "Sosial & Kebijakan", "Pengolahan Produk"],
      color: "#FFB800",
    },
    { icon: Brain, label: "Quiz Interaktif", id: "quiz", badge: "68" },
    { icon: Trophy, label: "Progress Saya", id: "progress" },
    { icon: BookMarked, label: "Referensi Ilmiah", id: "referensi" },
  ];

  const [expandedItem, setExpandedItem] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 49,
              background: "rgba(0,5,15,0.6)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Sidebar panel */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed", top: 0, left: 0, bottom: 0,
              width: 300, zIndex: 50,
              background: "rgba(0,8,20,0.97)",
              backdropFilter: "blur(30px)",
              borderRight: "1px solid rgba(0,212,255,0.12)",
              display: "flex", flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "20px 20px 16px",
              borderBottom: "1px solid rgba(0,212,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: 16 }}>
                <span className="text-gradient-primary">AQUA</span>
                <span style={{ color: "#E8F4FF" }}>ACADEMY</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                style={{
                  background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)",
                  borderRadius: 8, padding: 6, color: "#FF6B6B", cursor: "pointer", display: "flex",
                }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* User card */}
            <div style={{
              margin: "16px", padding: "16px",
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.1)",
              borderRadius: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff",
                  boxShadow: "0 0 15px rgba(0,212,255,0.3)",
                }}>M</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#E8F4FF" }}>Mahasiswa Perikanan</div>
                  <div style={{ fontSize: 11, color: "rgba(0,212,255,0.7)", fontFamily: "'Rajdhani', sans-serif" }}>Semester 5 · IPB University</div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(180,220,255,0.5)", marginBottom: 6, fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.06em" }}>
                  <span>PROGRESS KESELURUHAN</span><span style={{ color: "#00FFB3" }}>34%</span>
                </div>
                <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "34%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #00D4FF, #00FFB3)" }}
                  />
                </div>
              </div>
            </div>

            {/* Menu */}
            <div style={{ padding: "0 12px", flex: 1 }}>
              {menuItems.map((item) => (
                <div key={item.id}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      setActiveMenu(item.id);
                      if (item.sub) setExpandedItem(expandedItem === item.id ? null : item.id);
                    }}
                    className={activeMenu === item.id ? "sidebar-active" : ""}
                    style={{
                      width: "100%", display: "flex", alignItems: "center",
                      gap: 12, padding: "10px 12px", borderRadius: 8,
                      border: "none", background: "transparent",
                      color: activeMenu === item.id ? "#00D4FF" : "rgba(180,220,255,0.6)",
                      cursor: "pointer", fontSize: 13, fontWeight: 500,
                      marginBottom: 2, transition: "all 0.2s ease",
                    }}
                  >
                    <item.icon size={16} style={{ flexShrink: 0, color: item.color || "inherit" }} />
                    <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        fontSize: 10, padding: "2px 7px", borderRadius: 20,
                        background: "rgba(0,212,255,0.15)",
                        color: "#00D4FF", fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                      }}>{item.badge}</span>
                    )}
                    {item.sub && (
                      <motion.span animate={{ rotate: expandedItem === item.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={14} />
                      </motion.span>
                    )}
                  </motion.button>

                  {/* Submenu */}
                  <AnimatePresence>
                    {item.sub && expandedItem === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden", paddingLeft: 28, marginBottom: 4 }}
                      >
                        {item.sub.map((sub) => (
                          <motion.button
                            key={sub}
                            whileHover={{ x: 4, color: "#00D4FF" }}
                            style={{
                              display: "flex", alignItems: "center", gap: 8,
                              width: "100%", padding: "7px 12px", borderRadius: 6,
                              border: "none", background: "transparent",
                              color: "rgba(140,190,230,0.5)",
                              fontSize: 12, cursor: "pointer", textAlign: "left",
                              fontWeight: 400,
                            }}
                          >
                            <div style={{
                              width: 4, height: 4, borderRadius: "50%",
                              background: item.color || "#00D4FF", flexShrink: 0,
                            }} />
                            {sub}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Bottom */}
            <div style={{ padding: 16, borderTop: "1px solid rgba(0,212,255,0.08)" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 12px", borderRadius: 8, border: "none",
                  background: "rgba(255,107,107,0.06)", cursor: "pointer",
                  color: "rgba(255,107,107,0.7)", fontSize: 13,
                }}
              >
                <LogOut size={16} /><span>Keluar</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── HERO SECTION ──────────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const tags = ["Akuakultur Modern", "Kesehatan Ikan", "Nutrisi Biota", "Bisnis Perikanan", "IoT Tambak"];

  return (
    <section ref={ref} style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: 80,
    }}>
      <ParticleField />

      {/* Decorative rings */}
      {[200, 350, 500].map((size, i) => (
        <div key={i} style={{
          position: "absolute",
          right: `${-10 + i * 2}%`,
          top: "50%",
          transform: "translateY(-50%)",
          width: size, height: size,
          borderRadius: "50%",
          border: `1px solid rgba(0,212,255,${0.08 - i * 0.02})`,
          animation: `rotate360 ${20 + i * 8}s linear infinite`,
        }} />
      ))}

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>

            {/* Left content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "6px 16px 6px 8px", borderRadius: 100,
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  marginBottom: 28,
                }}
              >
                <div style={{
                  padding: "3px 8px", borderRadius: 100,
                  background: "linear-gradient(135deg, #00D4FF, #0066FF)",
                  fontSize: 9, fontFamily: "'Oxanium', sans-serif",
                  fontWeight: 700, color: "#000D1A", letterSpacing: "0.1em",
                }}>NEW</div>
                <span style={{ fontSize: 12, color: "rgba(0,212,255,0.8)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: "0.06em" }}>
                  Platform Edukasi Perikanan #1 Indonesia
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{
                  fontFamily: "'Oxanium', sans-serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}
              >
                <span style={{ color: "#E8F4FF" }}>Kuasai Ilmu</span>
                <br />
                <span className="text-gradient-primary">Perikanan & Akuakultur</span>
                <br />
                <span style={{ color: "#E8F4FF" }}>Modern Indonesia</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{
                  fontSize: 16, lineHeight: 1.8,
                  color: "rgba(180,220,255,0.7)",
                  marginBottom: 32, maxWidth: 480,
                }}
              >
                Platform akademik berbasis riset dengan <strong style={{ color: "#00FFB3" }}>82 topik</strong> terstruktur,
                referensi dari <strong style={{ color: "#00D4FF" }}>FAO & jurnal internasional</strong>,
                dan quiz interaktif untuk mahasiswa perikanan.
              </motion.p>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}
              >
                {tags.map((tag, i) => (
                  <span key={tag} style={{
                    padding: "5px 12px", borderRadius: 6,
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.15)",
                    fontSize: 12, color: "rgba(0,212,255,0.7)",
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}>{tag}</span>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  style={{
                    padding: "14px 32px", borderRadius: 10, border: "none",
                    fontSize: 15, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <Play size={16} fill="currentColor" />
                  Mulai Belajar Gratis
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-ghost"
                  style={{
                    padding: "14px 28px", borderRadius: 10, cursor: "pointer",
                    fontSize: 15, display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <BookOpen size={16} />
                  Lihat Kurikulum
                </motion.button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 36 }}
              >
                <div style={{ display: "flex" }}>
                  {["#00D4FF", "#8B5CF6", "#00FFB3", "#FFB800", "#FF6B6B"].map((c, i) => (
                    <div key={i} style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: `radial-gradient(circle, ${c}, ${c}88)`,
                      border: "2px solid #000D1A",
                      marginLeft: i > 0 ? -10 : 0,
                      boxShadow: `0 0 10px ${c}44`,
                    }} />
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#E8F4FF" }}>
                    <span className="text-gradient-accent">2,400+</span> mahasiswa aktif
                  </div>
                  <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#FFB800" color="#FFB800" />
                    ))}
                    <span style={{ fontSize: 11, color: "rgba(255,184,0,0.7)", marginLeft: 4, fontFamily: "'Rajdhani', sans-serif" }}>4.9/5.0</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right — Visual Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              style={{ position: "relative" }}
            >
              <HeroDashboardPreview />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <WaveDivider />
    </section>
  );
}

// ─── HERO DASHBOARD PREVIEW ────────────────────────────────────────────────────
function HeroDashboardPreview() {
  const metrics = [
    { label: "DO Level", value: "7.2", unit: "mg/L", color: "#00D4FF", pct: 72 },
    { label: "pH Air", value: "7.8", unit: "", color: "#00FFB3", pct: 78 },
    { label: "Suhu", value: "28°", unit: "C", color: "#FFB800", pct: 55 },
    { label: "Salinitas", value: "15", unit: "ppt", color: "#8B5CF6", pct: 30 },
  ];

  return (
    <div style={{
      background: "rgba(0,15,35,0.8)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(0,212,255,0.15)",
      borderRadius: 20,
      padding: 24,
      boxShadow: "0 30px 100px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,255,0.08)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: "rgba(0,212,255,0.5)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em", marginBottom: 2 }}>MONITORING DASHBOARD</div>
          <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: 16 }}>Parameter Kualitas Air</div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 20,
          background: "rgba(0,255,179,0.1)",
          border: "1px solid rgba(0,255,179,0.2)",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FFB3", boxShadow: "0 0 8px #00FFB3", animation: "pulse-glow 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 10, color: "#00FFB3", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>LIVE</span>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            style={{
              padding: 14, borderRadius: 12,
              background: `rgba(${m.color === "#00D4FF" ? "0,212,255" : m.color === "#00FFB3" ? "0,255,179" : m.color === "#FFB800" ? "255,184,0" : "139,92,246"},0.05)`,
              border: `1px solid ${m.color}22`,
            }}
          >
            <div style={{ fontSize: 10, color: "rgba(180,220,255,0.5)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em", marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontFamily: "'Oxanium', sans-serif", fontWeight: 700, color: m.color }}>
              {m.value}<span style={{ fontSize: 12, opacity: 0.6 }}>{m.unit}</span>
            </div>
            <div style={{ marginTop: 8, height: 3, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.pct}%` }}
                transition={{ duration: 1.5, delay: 0.7 + i * 0.1, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: 3, background: m.color, boxShadow: `0 0 8px ${m.color}` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fake chart */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: "rgba(180,220,255,0.4)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em", marginBottom: 10 }}>TREN PRODUKSI (7 HARI)</div>
        <svg viewBox="0 0 300 80" style={{ width: "100%", height: 80 }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,60 C30,40 60,55 90,35 C120,15 150,45 180,25 C210,5 240,30 270,20 L300,20" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.6))" }} />
          <path d="M0,60 C30,40 60,55 90,35 C120,15 150,45 180,25 C210,5 240,30 270,20 L300,20 L300,80 L0,80 Z" fill="url(#chartGrad)" />
          <path d="M0,70 C40,55 80,65 120,50 C160,35 200,60 240,52 C260,48 280,55 300,50" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>

      {/* Status list */}
      {[
        { label: "Biomassa Udang Vaname", val: "2.4 ton", ok: true },
        { label: "FCR Saat Ini", val: "1.28", ok: true },
        { label: "Kadar Ammonia", val: "0.05 mg/L", ok: false },
      ].map((s) => (
        <div key={s.label} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "8px 0", borderBottom: "1px solid rgba(0,212,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.ok ? "#00FFB3" : "#FFB800", boxShadow: `0 0 8px ${s.ok ? "#00FFB3" : "#FFB800"}` }} />
            <span style={{ fontSize: 12, color: "rgba(180,220,255,0.6)" }}>{s.label}</span>
          </div>
          <span style={{ fontSize: 12, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: s.ok ? "#00FFB3" : "#FFB800" }}>{s.val}</span>
        </div>
      ))}

      {/* Glow overlay */}
      <div style={{
        position: "absolute", top: -40, right: -40, width: 200, height: 200,
        background: "radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
    </div>
  );
}

// ─── STATS SECTION ─────────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { icon: BookOpen, label: "Total Materi", value: 82, suffix: "", color: "#00D4FF", desc: "Topik akademik terstruktur" },
    { icon: FileText2, label: "Referensi Ilmiah", value: 240, suffix: "+", color: "#00FFB3", desc: "Jurnal, FAO, buku akademik" },
    { icon: Brain, label: "Quiz Interaktif", value: 68, suffix: "", color: "#8B5CF6", desc: "Soal berbasis kompetensi" },
    { icon: GraduationCap, label: "Mahasiswa Aktif", value: 2400, suffix: "+", color: "#FFB800", desc: "Di seluruh Indonesia" },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} style={{ padding: "80px 24px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="card-hover"
            style={{
              padding: 28, borderRadius: 16,
              background: "rgba(0,15,35,0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,212,255,0.1)",
              cursor: "default",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${s.color}00, ${s.color}, ${s.color}00)`,
            }} />
            <div style={{
              width: 48, height: 48, borderRadius: 12, marginBottom: 16,
              background: `${s.color}15`,
              border: `1px solid ${s.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <s.icon size={22} color={s.color} />
            </div>
            <div style={{
              fontFamily: "'Oxanium', sans-serif", fontWeight: 800,
              fontSize: 36, color: s.color, lineHeight: 1,
              marginBottom: 4, letterSpacing: "-0.02em",
              textShadow: `0 0 20px ${s.color}44`,
            }}>
              {inView ? <AnimatedCounter target={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#E8F4FF", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: "rgba(180,220,255,0.5)" }}>{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── PILLAR CARDS ──────────────────────────────────────────────────────────────
function PillarSection() {
  const pillars = [
    {
      icon: Waves, label: "Produksi & Manajemen", sub: "Budidaya",
      desc: "Sistem RAS, bioflok, aquaponik, manajemen kualitas air, teknologi smart farming.",
      topics: 25, color: "#00D4FF", grad: "135deg, #00D4FF22, #0066FF11",
      cats: ["Sistem Budidaya", "Kualitas Air", "Manajemen Produksi", "Teknologi & Inovasi"],
    },
    {
      icon: Shield, label: "Kesehatan Biota &", sub: "Lingkungan",
      desc: "Penyakit ikan, diagnosis, biosekuriti, ekotoksikologi, dan konservasi perairan.",
      topics: 18, color: "#00FFB3", grad: "135deg, #00FFB322, #00996611",
      cats: ["Penyakit & Patologi", "Diagnosis & Terapi", "Kesehatan Lingkungan"],
    },
    {
      icon: Dna, label: "Biologi, Nutrisi &", sub: "Fisiologi",
      desc: "Anatomi ikan, fisiologi osmoregulasi, formulasi pakan, dan genomik akuakultur.",
      topics: 21, color: "#8B5CF6", grad: "135deg, #8B5CF622, #5B21B611",
      cats: ["Biologi Organisme", "Nutrisi & Pakan", "Genetika & Biotek"],
    },
    {
      icon: TrendingUp, label: "Bisnis & Sosial", sub: "Ekonomi",
      desc: "Analisis usaha, value chain, kebijakan perikanan, HACCP, dan ekspor komoditas.",
      topics: 18, color: "#FFB800", grad: "135deg, #FFB80022, #FF8C0011",
      cats: ["Ekonomi Usaha", "Sosial & Kebijakan", "Pengolahan Produk"],
    },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 24px", maxWidth: 1400, margin: "0 auto" }}>
      <SectionHeader
        tag="KURIKULUM"
        title="4 Pilar Utama Pembelajaran"
        sub="Kurikulum terstruktur mencakup seluruh aspek keilmuan perikanan modern sesuai standar akademik internasional"
        inView={inView}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {pillars.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="card-hover"
            style={{
              padding: 32, borderRadius: 20,
              background: `rgba(0,15,35,0.7)`,
              backdropFilter: "blur(20px)",
              border: `1px solid ${p.color}18`,
              cursor: "pointer",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(${p.grad})`,
              opacity: 0.5, pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", top: -30, right: -30,
              width: 140, height: 140, borderRadius: "50%",
              background: `radial-gradient(circle, ${p.color}10, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative" }}>
              <div style={{
                display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: `${p.color}18`,
                  border: `1px solid ${p.color}35`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 20px ${p.color}22`,
                }}>
                  <p.icon size={26} color={p.color} />
                </div>
                <div style={{
                  padding: "5px 14px", borderRadius: 20,
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}25`,
                  fontSize: 12, color: p.color,
                  fontFamily: "'Oxanium', sans-serif", fontWeight: 700,
                }}>
                  {p.topics} Topik
                </div>
              </div>

              <div style={{
                fontFamily: "'Oxanium', sans-serif", fontWeight: 700,
                fontSize: 22, color: "#E8F4FF", lineHeight: 1.2, marginBottom: 4,
              }}>
                {p.label}<br /><span style={{ color: p.color }}>{p.sub}</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(180,220,255,0.6)", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {p.cats.map((c) => (
                  <span key={c} style={{
                    fontSize: 11, padding: "4px 10px", borderRadius: 6,
                    background: `${p.color}0D`,
                    border: `1px solid ${p.color}20`,
                    color: `${p.color}CC`,
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: "0.04em",
                  }}>{c}</span>
                ))}
              </div>

              <motion.button
                whileHover={{ gap: "14px" }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "none", border: "none", padding: 0,
                  color: p.color, fontSize: 13,
                  fontFamily: "'Oxanium', sans-serif", fontWeight: 700,
                  cursor: "pointer", letterSpacing: "0.05em",
                }}
              >
                Eksplorasi Materi <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── SECTION HEADER ────────────────────────────────────────────────────────────
function SectionHeader({ tag, title, sub, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ textAlign: "center", marginBottom: 52 }}
    >
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "4px 14px", borderRadius: 100,
        background: "rgba(0,212,255,0.08)",
        border: "1px solid rgba(0,212,255,0.18)",
        fontSize: 10, color: "#00D4FF",
        fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
        letterSpacing: "0.2em", marginBottom: 20,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00D4FF", boxShadow: "0 0 6px #00D4FF" }} />
        {tag}
      </div>
      <h2 style={{
        fontFamily: "'Oxanium', sans-serif", fontWeight: 800,
        fontSize: "clamp(24px, 3.5vw, 40px)",
        color: "#E8F4FF", lineHeight: 1.2, marginBottom: 16,
      }}>{title}</h2>
      <p style={{
        fontSize: 15, color: "rgba(180,220,255,0.6)",
        maxWidth: 560, margin: "0 auto", lineHeight: 1.8,
      }}>{sub}</p>
    </motion.div>
  );
}

// ─── TOPIC CARDS SECTION ───────────────────────────────────────────────────────
function TopicCardsSection() {
  const topics = [
    { icon: Waves, title: "Dasar Akuakultur", cat: "Produksi & Budidaya", diff: "Pemula", time: "45 mnt", color: "#00D4FF", progress: 80, tag: "HOT" },
    { icon: Droplets, title: "Kualitas Air", cat: "Manajemen Lingkungan", diff: "Menengah", time: "60 mnt", color: "#00FFB3", progress: 45 },
    { icon: Microscope, title: "Penyakit Ikan", cat: "Kesehatan Biota", diff: "Menengah", time: "75 mnt", color: "#8B5CF6", progress: 0, tag: "NEW" },
    { icon: FlaskConical, title: "Nutrisi Ikan", cat: "Biologi & Nutrisi", diff: "Menengah", time: "55 mnt", color: "#FFB800", progress: 20 },
    { icon: Globe, title: "Oseanografi", cat: "Ilmu Kelautan", diff: "Lanjutan", time: "90 mnt", color: "#FF6B6B", progress: 0 },
    { icon: Shield, title: "Imunologi Ikan", cat: "Kesehatan Biota", diff: "Lanjutan", time: "80 mnt", color: "#00FFB3", progress: 0, tag: "NEW" },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 24px", maxWidth: 1400, margin: "0 auto" }}>
      <SectionHeader
        tag="MATERI UNGGULAN"
        title="Topik Pembelajaran Populer"
        sub="Mulai perjalanan akademik Anda dari materi dasar hingga tingkat lanjut"
        inView={inView}
      />

      {/* Filter chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap", justifyContent: "center" }}
      >
        {["Semua", "Pemula", "Menengah", "Lanjutan"].map((f, i) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "7px 18px", borderRadius: 8,
              background: i === 0 ? "linear-gradient(135deg, #00D4FF, #0066FF)" : "rgba(0,212,255,0.06)",
              border: i === 0 ? "none" : "1px solid rgba(0,212,255,0.15)",
              color: i === 0 ? "#000D1A" : "rgba(0,212,255,0.7)",
              fontSize: 13, cursor: "pointer",
              fontFamily: "'Oxanium', sans-serif", fontWeight: 700,
            }}
          >{f}</motion.button>
        ))}
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {topics.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="card-hover"
            style={{
              padding: 24, borderRadius: 16,
              background: "rgba(0,15,35,0.65)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,212,255,0.1)",
              cursor: "pointer", position: "relative", overflow: "hidden",
            }}
          >
            {t.tag && (
              <div style={{
                position: "absolute", top: 16, right: 16,
                padding: "3px 8px", borderRadius: 6,
                background: t.tag === "HOT" ? "rgba(255,107,107,0.2)" : "rgba(0,212,255,0.15)",
                border: t.tag === "HOT" ? "1px solid rgba(255,107,107,0.3)" : "1px solid rgba(0,212,255,0.25)",
                fontSize: 9, fontWeight: 700,
                color: t.tag === "HOT" ? "#FF6B6B" : "#00D4FF",
                fontFamily: "'Oxanium', sans-serif", letterSpacing: "0.1em",
              }}>{t.tag}</div>
            )}

            <div style={{
              width: 48, height: 48, borderRadius: 12, marginBottom: 16,
              background: `${t.color}15`,
              border: `1px solid ${t.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <t.icon size={22} color={t.color} />
            </div>

            <div style={{ fontSize: 11, color: "rgba(0,212,255,0.5)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.08em", marginBottom: 6 }}>{t.cat}</div>
            <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: 18, color: "#E8F4FF", marginBottom: 12 }}>{t.title}</div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <span style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 20,
                background: t.diff === "Pemula" ? "rgba(0,255,179,0.1)" : t.diff === "Menengah" ? "rgba(255,184,0,0.1)" : "rgba(255,107,107,0.1)",
                color: t.diff === "Pemula" ? "#00FFB3" : t.diff === "Menengah" ? "#FFB800" : "#FF6B6B",
                border: `1px solid ${t.diff === "Pemula" ? "rgba(0,255,179,0.2)" : t.diff === "Menengah" ? "rgba(255,184,0,0.2)" : "rgba(255,107,107,0.2)"}`,
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
              }}>{t.diff}</span>
              <span style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.04)",
                color: "rgba(180,220,255,0.5)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", gap: 4,
                fontFamily: "'Rajdhani', sans-serif",
              }}>
                <Clock size={10} /> {t.time}
              </span>
            </div>

            {/* Progress */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(180,220,255,0.4)", marginBottom: 6, fontFamily: "'Rajdhani', sans-serif" }}>
                <span>PROGRESS</span>
                <span style={{ color: t.progress > 0 ? t.color : "rgba(180,220,255,0.3)" }}>{t.progress}%</span>
              </div>
              <div style={{ height: 3, borderRadius: 3, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <div style={{
                  width: `${t.progress}%`, height: "100%", borderRadius: 3,
                  background: t.progress > 0 ? `linear-gradient(90deg, ${t.color}, ${t.color}88)` : "transparent",
                  boxShadow: t.progress > 0 ? `0 0 8px ${t.color}55` : "none",
                  transition: "width 1.5s ease",
                }} />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${t.color}33` }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%", marginTop: 18, padding: "10px", borderRadius: 8,
                background: t.progress > 0 ? `${t.color}18` : "rgba(255,255,255,0.04)",
                border: `1px solid ${t.color}25`,
                color: t.color, fontSize: 13, cursor: "pointer",
                fontFamily: "'Oxanium', sans-serif", fontWeight: 700,
              }}
            >
              {t.progress > 0 ? "Lanjutkan" : "Mulai Materi"} →
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── ACCORDION ─────────────────────────────────────────────────────────────────
function AccordionSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = [
    {
      title: "Sistem Budidaya Recirculating Aquaculture System (RAS)",
      cat: "Pilar 1 — Produksi & Manajemen",
      color: "#00D4FF",
      summary: "RAS adalah sistem tertutup dengan resirkulasi air yang memungkinkan budidaya intensif dengan kontrol penuh terhadap lingkungan.",
      content: "Sistem RAS mengintegrasikan biofilter, mechanical filter, UV sterilizer, dan aerasi untuk menjaga parameter optimal. Keunggulan: efisiensi air >95%, kontrol suhu presisi, densitas tinggi. Referensi: Timmons & Ebeling (2013), FAO Circular No. 1113.",
    },
    {
      title: "Patologi Penyakit White Spot Syndrome Virus (WSSV) pada Udang",
      cat: "Pilar 2 — Kesehatan Biota",
      color: "#00FFB3",
      summary: "WSSV adalah virus paling destruktif dalam budidaya udang dengan tingkat mortalitas mencapai 100% dalam 3–10 hari.",
      content: "Gejala klinis: bintik putih pada karapas (1–2 mm), perubahan warna hepatopankreas. Transmisi: horizontal (air, pakan) dan vertikal. Pencegahan: SPF seed, biosekuriti ketat, probiotik. Referensi: Lightner (2011), OIE Aquatic Animal Health Code.",
    },
    {
      title: "Formulasi Pakan Berbasis Protein Alternatif untuk Ikan Budidaya",
      cat: "Pilar 3 — Biologi & Nutrisi",
      color: "#8B5CF6",
      summary: "Penggunaan insect meal, single cell protein, dan BSFL sebagai substitusi tepung ikan dalam formulasi pakan komersial.",
      content: "Hermetia illucens (BSFL): protein 42–44%, lemak 30–35%, digestibility tinggi. Formulasi: Pearson square, linear programming. FCR optimal: 1.2–1.6. Referensi: NRC (2011), Hardy (2010), FAO Fisheries Technical Paper No. 522.",
    },
    {
      title: "Analisis Break Even Point & Kelayakan Usaha Budidaya Udang Vaname",
      cat: "Pilar 4 — Bisnis & Ekonomi",
      color: "#FFB800",
      summary: "Metodologi perhitungan BEP, B/C ratio, NPV, dan IRR untuk menilai kelayakan finansial unit budidaya skala komersial.",
      content: "Template analisis: biaya tetap (kolam, pompa, aerator), biaya variabel (benih, pakan, obat). Asumsi: SR 80%, FCR 1.3, size 100 ekor/kg. BEP: 2.8 ton/siklus. B/C ratio: 1.34. Referensi: Djamin (2015), KKP — Analisis Usaha Budidaya Udang.",
    },
  ];

  return (
    <section ref={ref} style={{ padding: "80px 24px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "start" }}>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "4px 14px", borderRadius: 100,
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.18)",
            fontSize: 10, color: "#00D4FF",
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            letterSpacing: "0.2em", marginBottom: 20,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00D4FF", boxShadow: "0 0 6px #00D4FF" }} />
            RINGKASAN MATERI
          </div>
          <h2 style={{
            fontFamily: "'Oxanium', sans-serif", fontWeight: 800,
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "#E8F4FF", lineHeight: 1.2, marginBottom: 20,
          }}>Preview Konten<br /><span className="text-gradient-primary">Akademik</span></h2>
          <p style={{ fontSize: 14, color: "rgba(180,220,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            Setiap topik disusun oleh akademisi dan praktisi perikanan terkemuka, dilengkapi referensi ilmiah mutakhir.
          </p>

          {/* Pillar badges */}
          {[
            { color: "#00D4FF", label: "Produksi & Manajemen" },
            { color: "#00FFB3", label: "Kesehatan & Lingkungan" },
            { color: "#8B5CF6", label: "Biologi & Nutrisi" },
            { color: "#FFB800", label: "Bisnis & Ekonomi" },
          ].map((p) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, boxShadow: `0 0 10px ${p.color}` }} />
              <span style={{ fontSize: 13, color: "rgba(180,220,255,0.7)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>{p.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {items.map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <motion.button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                whileHover={{ scale: 1.005 }}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "18px 20px", borderRadius: openIdx === i ? "14px 14px 0 0" : 14,
                  background: openIdx === i ? `rgba(0,15,35,0.9)` : "rgba(0,15,35,0.5)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${openIdx === i ? item.color + "40" : "rgba(0,212,255,0.1)"}`,
                  borderBottom: openIdx === i ? "none" : undefined,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                  boxShadow: openIdx === i ? `0 0 30px ${item.color}15` : "none",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 10, color: item.color, fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4, opacity: 0.8,
                  }}>{item.cat}</div>
                  <div style={{
                    fontFamily: "'Oxanium', sans-serif", fontWeight: 600,
                    fontSize: 14, color: "#E8F4FF", lineHeight: 1.4,
                  }}>{item.title}</div>
                </div>
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: openIdx === i ? `${item.color}20` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${openIdx === i ? item.color + "40" : "rgba(255,255,255,0.08)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: openIdx === i ? item.color : "rgba(180,220,255,0.4)",
                  }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      padding: "16px 20px 20px",
                      background: "rgba(0,10,25,0.85)",
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${item.color}30`,
                      borderTop: "none", borderRadius: "0 0 14px 14px",
                    }}>
                      <p style={{
                        fontSize: 13, color: item.color, lineHeight: 1.7,
                        fontStyle: "italic", marginBottom: 10,
                        padding: "10px 14px", borderRadius: 8,
                        background: `${item.color}08`,
                        borderLeft: `3px solid ${item.color}`,
                      }}>{item.summary}</p>
                      <p style={{ fontSize: 12, color: "rgba(180,220,255,0.6)", lineHeight: 1.8 }}>{item.content}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── MONITORING DASHBOARD ──────────────────────────────────────────────────────
function MonitoringDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const gauges = [
    { label: "Dissolved Oxygen", value: 7.2, max: 14, unit: "mg/L", color: "#00D4FF", ideal: "6–9" },
    { label: "pH Air", value: 7.8, max: 14, unit: "", color: "#00FFB3", ideal: "7–8.5" },
    { label: "Suhu Air", value: 28, max: 40, unit: "°C", color: "#FFB800", ideal: "26–30" },
    { label: "Salinitas", value: 15, max: 45, unit: "ppt", color: "#8B5CF6", ideal: "10–20" },
    { label: "Ammonia (NH₃)", value: 0.05, max: 1, unit: "mg/L", color: "#00FFB3", ideal: "<0.1" },
    { label: "Nitrit (NO₂)", value: 0.12, max: 1, unit: "mg/L", color: "#FF6B6B", ideal: "<0.1" },
  ];

  return (
    <section ref={ref} style={{ padding: "80px 24px", maxWidth: 1400, margin: "0 auto" }}>
      <SectionHeader
        tag="MONITORING VIRTUAL"
        title="Simulasi Dashboard Kualitas Air"
        sub="Pelajari parameter monitoring budidaya secara interaktif dengan tampilan real-time monitoring profesional"
        inView={inView}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          padding: 32, borderRadius: 24,
          background: "rgba(0,8,20,0.85)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(0,212,255,0.12)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
        }}
      >
        {/* Dashboard header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: 10,
              color: "rgba(0,212,255,0.5)", letterSpacing: "0.2em", marginBottom: 4,
            }}>AQUACULTURE MONITORING SYSTEM v2.4.1</div>
            <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: 20 }}>
              Tambak Unit A — <span className="text-gradient-primary">Udang Vaname</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {[
              { label: "SENSOR AKTIF", val: "12/12", color: "#00FFB3" },
              { label: "ALERT", val: "1 Kritis", color: "#FF6B6B" },
              { label: "UPDATE", val: "Real-time", color: "#00D4FF" },
            ].map((b) => (
              <div key={b.label} style={{
                padding: "8px 16px", borderRadius: 8,
                background: `${b.color}10`,
                border: `1px solid ${b.color}25`,
                textAlign: "center",
              }}>
                <div style={{ fontSize: 9, color: `${b.color}88`, fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em", marginBottom: 2 }}>{b.label}</div>
                <div style={{ fontSize: 13, color: b.color, fontFamily: "'Oxanium', sans-serif", fontWeight: 700 }}>{b.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gauges grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
          {gauges.map((g, i) => {
            const pct = g.value / g.max;
            const circumference = 2 * Math.PI * 40;
            const offset = circumference * (1 - pct);
            return (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  padding: 20, borderRadius: 14,
                  background: `${g.color}08`,
                  border: `1px solid ${g.color}20`,
                  display: "flex", alignItems: "center", gap: 16,
                }}
              >
                {/* SVG gauge */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r="40" fill="none" stroke={`${g.color}15`} strokeWidth="8" />
                    <motion.circle
                      cx="45" cy="45" r="40" fill="none"
                      stroke={g.color} strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={inView ? { strokeDashoffset: offset } : {}}
                      transition={{ duration: 1.5, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                      style={{ transform: "rotate(-90deg)", transformOrigin: "45px 45px", filter: `drop-shadow(0 0 6px ${g.color})` }}
                    />
                    <text x="45" y="41" textAnchor="middle" fontSize="14" fontWeight="700" fill={g.color} fontFamily="'Oxanium', sans-serif">{g.value}</text>
                    <text x="45" y="54" textAnchor="middle" fontSize="9" fill={`${g.color}88`} fontFamily="'Rajdhani', sans-serif">{g.unit || "pH"}</text>
                  </svg>
                  <div style={{
                    position: "absolute", inset: -4,
                    borderRadius: "50%",
                    boxShadow: `0 0 20px ${g.color}20`,
                    pointerEvents: "none",
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#E8F4FF", marginBottom: 4, fontFamily: "'Oxanium', sans-serif" }}>{g.label}</div>
                  <div style={{ fontSize: 10, color: "rgba(180,220,255,0.4)", fontFamily: "'Rajdhani', sans-serif", marginBottom: 8 }}>IDEAL: {g.ideal} {g.unit}</div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "3px 8px", borderRadius: 20,
                    background: (g.label.includes("Nitrit")) ? "rgba(255,107,107,0.1)" : "rgba(0,255,179,0.1)",
                    border: `1px solid ${(g.label.includes("Nitrit")) ? "rgba(255,107,107,0.2)" : "rgba(0,255,179,0.2)"}`,
                    fontSize: 9, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                    color: (g.label.includes("Nitrit")) ? "#FF6B6B" : "#00FFB3",
                  }}>
                    {(g.label.includes("Nitrit")) ? "⚠ ALERT" : "✓ NORMAL"}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Time series */}
        <div style={{
          padding: 20, borderRadius: 14,
          background: "rgba(0,212,255,0.03)",
          border: "1px solid rgba(0,212,255,0.08)",
        }}>
          <div style={{ fontSize: 10, color: "rgba(0,212,255,0.5)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em", marginBottom: 16 }}>TREN OKSIGEN TERLARUT — 24 JAM TERAKHIR</div>
          <svg viewBox="0 0 800 100" style={{ width: "100%", height: 80 }}>
            <defs>
              <linearGradient id="doGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Reference lines */}
            {[20, 50, 80].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="800" y2={y} stroke="rgba(0,212,255,0.06)" strokeWidth="1" strokeDasharray="4,4" />
            ))}
            <path
              d="M0,55 C40,45 80,60 120,40 C160,20 200,50 240,35 C280,20 320,45 360,30 C400,15 440,40 480,25 C520,10 560,35 600,22 C640,9 680,30 720,20 L760,18 L800,22"
              fill="none" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 8px rgba(0,212,255,0.7))" }}
            />
            <path
              d="M0,55 C40,45 80,60 120,40 C160,20 200,50 240,35 C280,20 320,45 360,30 C400,15 440,40 480,25 C520,10 560,35 600,22 C640,9 680,30 720,20 L760,18 L800,22 L800,100 L0,100 Z"
              fill="url(#doGrad)"
            />
            {/* Alert zone */}
            <rect x="0" y="0" width="800" height="10" fill="rgba(255,107,107,0.08)" />
            <line x1="0" y1="10" x2="800" y2="10" stroke="rgba(255,107,107,0.2)" strokeWidth="1" strokeDasharray="4,2" />
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"].map((t) => (
              <span key={t} style={{ fontSize: 9, color: "rgba(180,220,255,0.3)", fontFamily: "'Rajdhani', sans-serif" }}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── QUIZ PREVIEW ──────────────────────────────────────────────────────────────
function QuizPreview() {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const question = {
    text: "Parameter yang paling kritis dalam sistem bioflok adalah rasio karbon dan nitrogen (C/N ratio). Berapa nilai C/N ratio optimal yang direkomendasikan?",
    options: ["5 : 1", "10 : 1", "15 : 1", "20 : 1"],
    correct: 2,
    explanation: "C/N ratio 15:1 adalah optimal untuk mendorong pertumbuhan bakteri heterotrofik yang mengkonversi ammonia menjadi biomassa mikroba.",
  };

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  };

  return (
    <section ref={ref} style={{ padding: "80px 24px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "4px 14px", borderRadius: 100,
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.25)",
            fontSize: 10, color: "#8B5CF6",
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            letterSpacing: "0.2em", marginBottom: 20,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#8B5CF6", boxShadow: "0 0 6px #8B5CF6" }} />
            QUIZ INTERAKTIF
          </div>
          <h2 style={{
            fontFamily: "'Oxanium', sans-serif", fontWeight: 800,
            fontSize: "clamp(24px, 3vw, 40px)",
            color: "#E8F4FF", lineHeight: 1.2, marginBottom: 20,
          }}>Uji Pemahaman<br /><span style={{ color: "#8B5CF6" }}>Setiap Topik</span></h2>
          <p style={{ fontSize: 14, color: "rgba(180,220,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            68 set quiz berbasis soal kompetensi dengan penjelasan ilmiah mendalam setelah menjawab.
          </p>

          {/* Quiz stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: Target, label: "Soal per Quiz", val: "10–20", color: "#8B5CF6" },
              { icon: Clock, label: "Rata-rata Waktu", val: "15 mnt", color: "#00D4FF" },
              { icon: Award, label: "Sertifikat", val: "Per Pilar", color: "#FFB800" },
              { icon: Zap, label: "Adaptive Mode", val: "Beta", color: "#00FFB3" },
            ].map((s) => (
              <div key={s.label} style={{
                padding: 16, borderRadius: 12,
                background: `${s.color}08`,
                border: `1px solid ${s.color}20`,
              }}>
                <s.icon size={18} color={s.color} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 11, color: "rgba(180,220,255,0.5)", fontFamily: "'Rajdhani', sans-serif", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 15, fontFamily: "'Oxanium', sans-serif", fontWeight: 700, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quiz card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            padding: 28, borderRadius: 20,
            background: "rgba(0,8,20,0.85)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(139,92,246,0.2)",
            boxShadow: "0 0 60px rgba(139,92,246,0.08)",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{
              fontSize: 10, color: "#8B5CF6",
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.15em",
            }}>SOAL 3 DARI 15</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 11, color: "rgba(255,184,0,0.8)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>⏱ 11:24</div>
            </div>
          </div>

          {/* Progress */}
          <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.05)", marginBottom: 20, overflow: "hidden" }}>
            <div style={{ width: "20%", height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #8B5CF6, #00D4FF)", boxShadow: "0 0 10px rgba(139,92,246,0.5)" }} />
          </div>

          {/* Topic tag */}
          <div style={{
            display: "inline-block", padding: "4px 12px", borderRadius: 20, marginBottom: 16,
            background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)",
            fontSize: 10, color: "#8B5CF6", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
          }}>Sistem Bioflok — Pilar 1</div>

          {/* Question */}
          <div style={{
            fontSize: 14, lineHeight: 1.75, color: "#E8F4FF",
            fontWeight: 500, marginBottom: 24,
          }}>{question.text}</div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {question.options.map((opt, i) => {
              let bg = "rgba(255,255,255,0.03)";
              let border = "rgba(255,255,255,0.08)";
              let color = "rgba(180,220,255,0.7)";
              let glow = "none";

              if (answered) {
                if (i === question.correct) {
                  bg = "rgba(0,255,179,0.08)"; border = "rgba(0,255,179,0.35)"; color = "#00FFB3";
                  glow = "0 0 15px rgba(0,255,179,0.15)";
                } else if (i === selected && i !== question.correct) {
                  bg = "rgba(255,107,107,0.08)"; border = "rgba(255,107,107,0.35)"; color = "#FF6B6B";
                }
              } else if (selected === i) {
                bg = "rgba(139,92,246,0.1)"; border = "rgba(139,92,246,0.4)"; color = "#8B5CF6";
              }

              return (
                <motion.button
                  key={i}
                  whileHover={!answered ? { scale: 1.02, x: 4 } : {}}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "12px 16px", borderRadius: 10,
                    background: bg, border: `1px solid ${border}`,
                    color, cursor: answered ? "default" : "pointer",
                    textAlign: "left", fontSize: 13, fontWeight: 500,
                    boxShadow: glow, transition: "all 0.25s ease",
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: `${border}44`,
                    border: `1px solid ${border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontFamily: "'Oxanium', sans-serif", fontWeight: 700,
                  }}>
                    {answered && i === question.correct ? "✓" : answered && i === selected ? "✗" : String.fromCharCode(65 + i)}
                  </div>
                  {opt}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  marginTop: 16, padding: "14px 16px", borderRadius: 10,
                  background: "rgba(0,255,179,0.06)",
                  border: "1px solid rgba(0,255,179,0.2)",
                  fontSize: 12, color: "rgba(0,255,179,0.8)", lineHeight: 1.7,
                  borderLeft: "3px solid #00FFB3",
                }}
              >
                <strong style={{ color: "#00FFB3" }}>Penjelasan:</strong> {question.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          {answered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="btn-primary"
              style={{ width: "100%", marginTop: 16, padding: "12px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14 }}
              onClick={() => { setSelected(null); setAnswered(false); }}
            >
              Soal Berikutnya →
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── ROADMAP ───────────────────────────────────────────────────────────────────
function RoadmapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stages = [
    {
      level: "01", label: "Pemula", sub: "Fondasi Perikanan",
      color: "#00FFB3", topics: 15, weeks: "4–6 minggu",
      items: ["Pengantar Akuakultur", "Biologi Dasar Ikan", "Parameter Kualitas Air", "Sistem Budidaya Dasar"],
    },
    {
      level: "02", label: "Menengah", sub: "Aplikasi Teknis",
      color: "#00D4FF", topics: 28, weeks: "8–12 minggu",
      items: ["Manajemen Pakan & FCR", "Penyakit & Pencegahan", "Nutrisi Formulasi", "Ekonomi Usaha"],
    },
    {
      level: "03", label: "Lanjutan", sub: "Spesialisasi",
      color: "#8B5CF6", topics: 25, weeks: "12–16 minggu",
      items: ["Sistem RAS & Bioflok", "Genomik & Selective Breeding", "HACCP & Sertifikasi", "Smart Aquaculture"],
    },
    {
      level: "04", label: "Profesional", sub: "Riset & Inovasi",
      color: "#FFB800", topics: 14, weeks: "Ongoing",
      items: ["AI & Machine Learning", "Aquaculture 4.0", "Kebijakan & Regulasi", "Studi Kasus Global"],
    },
  ];

  return (
    <section ref={ref} style={{ padding: "80px 24px", maxWidth: 1400, margin: "0 auto" }}>
      <SectionHeader
        tag="ROADMAP BELAJAR"
        title="Jalur Pembelajaran Terstruktur"
        sub="Dari mahasiswa semester awal hingga peneliti perikanan — kuasai setiap level secara sistematis"
        inView={inView}
      />

      <div style={{ position: "relative" }}>
        {/* Connector line */}
        <div style={{
          position: "absolute", top: "50%", left: "12%", right: "12%", height: 2,
          background: "linear-gradient(90deg, rgba(0,255,179,0.3), rgba(0,212,255,0.3), rgba(139,92,246,0.3), rgba(255,184,0,0.3))",
          transform: "translateY(-50%)", zIndex: 0,
          display: "none", // hidden on mobile – shown via grid
        }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="card-hover"
              style={{
                padding: 24, borderRadius: 18,
                background: "rgba(0,10,25,0.7)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${s.color}25`,
                position: "relative", overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${s.color}00, ${s.color}, ${s.color}00)`,
              }} />

              {/* Level badge */}
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `linear-gradient(135deg, ${s.color}25, ${s.color}10)`,
                border: `1px solid ${s.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Oxanium', sans-serif", fontWeight: 800,
                fontSize: 18, color: s.color,
                marginBottom: 16,
                boxShadow: `0 0 20px ${s.color}20`,
              }}>{s.level}</div>

              <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: 20, color: s.color, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "rgba(180,220,255,0.5)", marginBottom: 16, fontFamily: "'Rajdhani', sans-serif" }}>{s.sub}</div>

              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <div style={{
                  padding: "4px 10px", borderRadius: 6,
                  background: `${s.color}10`, border: `1px solid ${s.color}20`,
                  fontSize: 11, color: s.color, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                }}>{s.topics} Topik</div>
                <div style={{
                  padding: "4px 10px", borderRadius: 6,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  fontSize: 11, color: "rgba(180,220,255,0.5)", fontFamily: "'Rajdhani', sans-serif",
                }}>{s.weeks}</div>
              </div>

              <div style={{ borderTop: `1px solid ${s.color}15`, paddingTop: 16 }}>
                {s.items.map((item) => (
                  <div key={item} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontSize: 12, color: "rgba(180,220,255,0.6)",
                    marginBottom: 8, lineHeight: 1.4,
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, flexShrink: 0, boxShadow: `0 0 6px ${s.color}` }} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── REFERENCE SECTION ────────────────────────────────────────────────────────
function ReferenceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sources = [
    { icon: Globe, label: "Jurnal Internasional", count: "120+", color: "#00D4FF", examples: ["Aquaculture (Elsevier)", "J. Fish Diseases", "Reviews in Aquaculture"] },
    { icon: Anchor, label: "Dokumen FAO", count: "40+", color: "#00FFB3", examples: ["SOFIA Annual Report", "FAO Technical Papers", "Fisheries Circular"] },
    { icon: GraduationCap, label: "Universitas Terkemuka", count: "15+", color: "#8B5CF6", examples: ["IPB University", "UNDIP", "Universitas Brawijaya"] },
    { icon: BookOpen, label: "Buku Akademik", count: "35+", color: "#FFB800", examples: ["Aquaculture: Farming Aquatic Animals", "Fish Pathology — Roberts", "NRC Nutrient Requirements"] },
    { icon: Shield, label: "Regulasi & Kebijakan", count: "30+", color: "#FF6B6B", examples: ["KKP RI — Permen", "BSN SNI Perikanan", "OIE Aquatic Code"] },
  ];

  return (
    <section ref={ref} style={{ padding: "80px 24px 40px", maxWidth: 1400, margin: "0 auto" }}>
      <SectionHeader
        tag="REFERENSI ILMIAH"
        title="Sumber Akademik Terpercaya"
        sub="Seluruh konten didukung oleh referensi ilmiah peer-reviewed dari institusi terkemuka dunia"
        inView={inView}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
        {sources.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-hover"
            style={{
              padding: 20, borderRadius: 14,
              background: "rgba(0,10,25,0.6)",
              border: `1px solid ${s.color}18`,
              cursor: "pointer",
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10, marginBottom: 12,
              background: `${s.color}12`, border: `1px solid ${s.color}25`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: 22, color: s.color, marginBottom: 4 }}>{s.count}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#E8F4FF", marginBottom: 12 }}>{s.label}</div>
            {s.examples.map((ex) => (
              <div key={ex} style={{
                fontSize: 10, color: "rgba(180,220,255,0.4)",
                fontFamily: "'Rajdhani', sans-serif", marginBottom: 4, lineHeight: 1.4,
              }}>• {ex}</div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const navCols = [
    {
      title: "Kurikulum",
      links: ["Produksi & Budidaya", "Kesehatan Biota", "Biologi & Nutrisi", "Bisnis & Ekonomi"],
    },
    {
      title: "Platform",
      links: ["Dashboard Belajar", "Quiz Interaktif", "Progress Tracker", "Referensi Ilmiah"],
    },
    {
      title: "Institusi",
      links: ["IPB University", "KKP Republik Indonesia", "FAO Aquaculture", "DJPB Nasional"],
    },
    {
      title: "Legalitas",
      links: ["Kebijakan Privasi", "Syarat & Ketentuan", "Hak Cipta Akademik", "Tentang Kami"],
    },
  ];

  return (
    <footer style={{
      background: "rgba(0,5,15,0.95)",
      borderTop: "1px solid rgba(0,212,255,0.08)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Top glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)",
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 24px 32px" }}>

        {/* Newsletter */}
        <div style={{
          marginBottom: 52, padding: 32, borderRadius: 20,
          background: "rgba(0,212,255,0.04)",
          border: "1px solid rgba(0,212,255,0.1)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32,
        }}>
          <div>
            <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: 20, color: "#E8F4FF", marginBottom: 6 }}>
              Newsletter <span className="text-gradient-primary">Akademik</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(180,220,255,0.5)" }}>Update materi baru, jurnal terkini, dan info beasiswa perikanan</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
            <input
              placeholder="email@universitas.ac.id"
              style={{
                padding: "11px 18px", borderRadius: 8, border: "1px solid rgba(0,212,255,0.2)",
                background: "rgba(0,212,255,0.05)", color: "#E8F4FF", fontSize: 13,
                outline: "none", width: 260,
              }}
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="btn-primary"
              style={{ padding: "11px 22px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, whiteSpace: "nowrap" }}
            >
              Subscribe
            </motion.button>
          </div>
        </div>

        {/* Links grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: "linear-gradient(135deg, #00D4FF, #0066FF)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Anchor size={17} color="#000D1A" strokeWidth={2.5} />
              </div>
              <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: 16 }}>
                <span className="text-gradient-primary">AQUA</span>
                <span style={{ color: "#E8F4FF" }}>ACADEMY</span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(180,220,255,0.5)", lineHeight: 1.8, marginBottom: 20 }}>
              Platform edukasi perikanan modern berbasis riset akademik untuk mahasiswa dan praktisi perikanan Indonesia.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["in", "tw", "ig", "yt"].map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ scale: 1.1, borderColor: "rgba(0,212,255,0.5)" }}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontFamily: "'Oxanium', sans-serif", fontWeight: 700,
                    color: "rgba(0,212,255,0.6)", cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >{s.toUpperCase()}</motion.div>
              ))}
            </div>
          </div>

          {navCols.map((col) => (
            <div key={col.title}>
              <div style={{
                fontSize: 11, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                letterSpacing: "0.15em", color: "rgba(0,212,255,0.6)", marginBottom: 16,
              }}>{col.title.toUpperCase()}</div>
              {col.links.map((link) => (
                <motion.div
                  key={link}
                  whileHover={{ x: 4, color: "#00D4FF" }}
                  style={{
                    fontSize: 13, color: "rgba(180,220,255,0.45)",
                    marginBottom: 10, cursor: "pointer", transition: "color 0.2s ease",
                    lineHeight: 1.4,
                  }}
                >{link}</motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24, borderTop: "1px solid rgba(0,212,255,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20,
        }}>
          <div style={{ fontSize: 12, color: "rgba(180,220,255,0.3)", fontFamily: "'Rajdhani', sans-serif" }}>
            © 2025 AquaAcademy — Platform Edukasi Perikanan Indonesia · Konten akademik dilindungi hak cipta
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FFB3", boxShadow: "0 0 8px #00FFB3", animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, color: "rgba(0,255,179,0.6)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
              SISTEM OPERASIONAL PENUH
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MISSING ICON SHIM ────────────────────────────────────────────────────────
function FileText2({ size, color, style }) {
  return <BookOpen size={size} color={color} style={style} />;
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Beranda");
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <>
      <style>{globalStyle}</style>
      <OceanBackground />

      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <StatsSection />
        <PillarSection />
        <TopicCardsSection />
        <AccordionSection />
        <MonitoringDashboard />
        <QuizPreview />
        <RoadmapSection />
        <ReferenceSection />
      </main>

      <Footer />
    </>
  );
}
