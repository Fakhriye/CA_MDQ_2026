"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, CheckCircle, Activity, Users, ExternalLink } from 'lucide-react';

// --- Типы ---
interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

// --- Компонент счетчика ---
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

// --- Основная страница ---
export default function Home() {
  // Состояния
  const [scoredCard, setScoredCard] = useState<string | null>(null);
  const [expandedModel, setExpandedModel] = useState<number | null>(null);

  // Данные для моделей
  const models = [
    { id: 1, name: "Logistic Regression", auc: "0.850", f1: "0.812", role: "Baseline", desc: "Простая линейная модель." },
    { id: 2, name: "Random Forest", auc: "0.940", f1: "0.910", role: "Strong", desc: "Ансамбль деревьев." },
    { id: 3, name: "LightGBM", auc: "0.985", f1: "0.970", role: "Strong", desc: "Быстрый градиентный бустинг." },
    { id: 4, name: "XGBoost + Platt Scaling", auc: "1.000", f1: "0.9998", role: "Winner", highlight: true, desc: "Победитель. Идеально справляется с One-Class спецификой." },
  ];

  // Данные для команды
  const teamMembers = [
    { name: "Имя 1", role: "Data Scientist", desc: "Мастер моделирования", img: "/member1.jpg" },
    { name: "Имя 2", role: "Business Analyst", desc: "Понимает бизнес", img: "/member2.jpg" },
    { name: "Имя 3", role: "Product Manager", desc: "Управляет всем", img: "/member3.jpg" },
    { name: "Имя 4", role: "Data Engineer", desc: "Строит пайплайны", img: "/member4.jpg" },
    { name: "Имя 5", role: "UX/UI Designer", desc: "Делает красиво", img: "/member5.jpg" },
  ];

  const platformLayers = [
    { id: "L1", title: "Data Ingestion", desc: "Агрегация транзакций" },
    { id: "L2", title: "AI Scoring Engine", current: true, desc: "Ядро XGBoost" },
    { id: "L3", title: "Decision Engine", desc: "Сегментация" },
    { id: "L4", title: "Consulting", desc: "Go-to-market" },
  ];

  return (
    <main className="relative">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-mcNavy/90 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-syne font-bold text-xl">Data Quest 2026</span>
          <nav className="flex items-center gap-8">
            <a href="#solution" className="hover:text-mcOrange">Решение</a>
            <a href="#team" className="hover:text-mcOrange">О нас</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-20 bg-mcNavy text-white" id="solution">
        <div className="max-w-7xl mx-auto px-6">
            <h1 className="font-syne text-5xl md:text-7xl font-bold mb-6">Выявление <span className="text-mcOrange">скрытого</span> бизнеса</h1>
            {/* ... дальше твой остальной контент Hero ... */}
        </div>
      </section>

      {/* TEAM SECTION (Вот эта часть исправлена) */}
      <section className="py-24 bg-mcNavy text-white" id="team">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-syne text-4xl font-bold mb-16">Наша команда</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
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
    </main>
  );
}