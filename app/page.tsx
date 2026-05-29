"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, CheckCircle, Activity, Users, ExternalLink } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

const Counter = ({ end, duration = 2000, suffix = "", prefix = "", decimals = 0 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  if (!mounted) {
    const initialZero = decimals > 0 ? "0." + "0".repeat(decimals) : "0";
    return <span>{prefix}{initialZero}{suffix}</span>;
  }

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('ru-RU');

  return <span>{prefix}{formattedCount}{suffix}</span>;
};

export default function Home() {
  const [scoredCard, setScoredCard] = useState<string | null>(null);
  const [expandedModel, setExpandedModel] = useState<number | null>(null);

  const models = [
    { id: 1, name: "Logistic Regression", auc: "0.850", f1: "0.812", role: "Baseline", desc: "Простая линейная модель. Не справляется со сложными нелинейными связями транзакций." },
    { id: 2, name: "Random Forest", auc: "0.940", f1: "0.910", role: "Strong", desc: "Ансамбль деревьев. Хорошо ловит паттерны, но склонен к переобучению на дисбалансе." },
    { id: 3, name: "LightGBM", auc: "0.985", f1: "0.970", role: "Strong", desc: "Быстрый градиентный бустинг, показал отличные результаты, но чуть хуже калибруется." },
    { id: 4, name: "XGBoost + Platt Scaling", auc: "1.000", f1: "0.9998", role: "Winner", highlight: true, desc: "Победитель. Идеально справляется с One-Class спецификой задачи. Platt Scaling обеспечивает точную выдачу вероятностей (Continuous Score), а не грубых меток." },
  ];

  const platformLayers = [
    { id: "L1", title: "Data Ingestion & Feature Eng", desc: "Агрегация транзакций, расчет 28 фичей (RFM, Time-based, HHI)." },
    { id: "L2", title: "AI Scoring Engine", current: true, desc: "Ядро нашего проекта. XGBoost модель оценивает вероятность скрытого бизнеса для каждой карты." },
    { id: "L3", title: "Decision Engine", desc: "Hot/Warm/Cold сегментация и автоматический подбор оффера (Acquiring, SaaS, Credit)." },
    { id: "L4", title: "Consulting & Monetisation", desc: "Стратегия go-to-market для банков-партнеров Mastercard." },
  ];

  // Массив участников теперь объявлен ПЕРЕД return
  const teamMembers = [
    { name: "Имя Фамилия 1", role: "Data Scientist", desc: "Описание 1", img: "/member1.jpg" },
    { name: "Имя Фамилия 2", role: "Business Analyst", desc: "Описание 2", img: "/member2.jpg" },
    { name: "Имя Фамилия 3", role: "Product Manager", desc: "Описание 3", img: "/member3.jpg" },
    { name: "Имя Фамилия 4", role: "Data Engineer", desc: "Описание 4", img: "/member4.jpg" },
    { name: "Имя Фамилия 5", role: "UX/UI Designer", desc: "Описание 5", img: "/member5.jpg" },
  ];

  return (
    <main className="relative">
      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-mcNavy/90 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-mcOrange mix-blend-screen translate-x-3"></div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 mix-blend-screen -translate-x-3"></div>
            </div>
            <span className="font-syne font-bold text-xl tracking-tight">Data Quest 2026</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#solution" className="hover:text-mcOrange transition-colors">Решение</a>
            <a href="#team" className="hover:text-mcOrange transition-colors">О нас</a>
            <a href="/MDQ_2026_Slides.pdf" download className="bg-mcOrange text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-orange-600 transition-all hover:-translate-y-1">
              <Download size={18} />
              Презентация
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-mcNavy text-white overflow-hidden" id="solution">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#EB5A1E 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block py-1 px-3 rounded-full border border-mcOrange/50 text-mcOrange text-sm font-mono mb-6">Student Project / Almaty Hub</span>
            <h1 className="font-syne text-5xl md:text-7xl font-bold leading-tight mb-6">
              Выявление <span className="text-mcOrange">скрытой</span><br />
              коммерческой активности
            </h1>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
              { end: 13000000, label: "Транзакций проанализировано", suffix: "+" },
              { end: 0.9998, label: "F1 Score на синтетике", decimals: 4 },
              { end: 216000, label: "Годовая прибыль банка", prefix: "$" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                 <Counter end={stat.end} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals || 0} />
                 <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 bg-mcNavy text-white" id="team">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-syne text-4xl font-bold mb-16">Наша команда</h2>
          {/* Вот здесь мы используем массив через {} */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-orange-500"
                />
                <h3 className="text-white text-lg font-semibold">{member.name}</h3>
                <p className="text-orange-500 text-sm mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#060d18] text-gray-500 py-8 text-center text-sm">
        <p>Disclaimer: This is a student project for Mastercard Data Quest 2026.</p>
      </footer>
    </main>
  );
}