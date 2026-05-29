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

  const teamMembers = [
    { name: "Имран Изатов", role: "Team Lead", desc: "Координирует весь процесс работы, распределяет задачи и гарантирует, что итоговая стратегия точно решает бизнес-кейс Mastercard", img: "/member1.jpg" },
    { name: "Наталия Хан", role: "Data Analyst", desc: "Исследует данные для поиска инсайтов, тестирует гипотезы и обеспечивает строгую аналитическую логику решения", img: "/member2.jpg" },
    { name: "Фахри Кубышева", role: "Tech Specialist", desc: "Отвечает за техническую реализацию — построение ML-моделей и написание сайта", img: "/member3.jpg" },
    { name: "Амаль", role: "Presenter", desc: "Создает понятную и стильную презентацию, отвечает за структурированную подачу материала и уверенную защиту проекта перед жюри", img: "/member4.jpg" },
    { name: "Имя 5", role: "Business Thinker", desc: "Превращает аналитику в практичную бизнес-стратегию, доказывая реальную ценность и применимость решения для Mastercard", img: "/member5.jpg" },
  ];

  return (
    <main className="relative">
      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-mcNavy/90 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Логотип Mastercard */}
            <img 
              src="/Mastercard-credit-card-Logo.png" 
              alt="Mastercard" 
              className="h-8 md:h-10 object-contain"
            />
            
            <div className="w-px h-8 bg-white/20 hidden sm:block"></div>
            
            {/* Логотип AIESEC */}
            <img 
              src="/powered-by-White-Black.png" 
              alt="AIESEC" 
              className="h-6 md:h-8 object-contain"
            />
            
            <span className="font-syne font-bold text-xl tracking-tight ml-2 hidden lg:block">
              Data Quest 2026
            </span>
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

      {/* COMPONENT 1: HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-mcNavy text-white overflow-hidden" id="solution">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#EB5A1E 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block py-1 px-3 rounded-full border border-mcOrange/50 text-mcOrange text-sm font-mono mb-6">Student Project / Almaty Hub</span>
            <h1 className="font-syne text-5xl md:text-7xl font-bold leading-tight mb-6">
              Выявление <span className="text-mcOrange">скрытой</span><br />
              коммерческой активности
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-12">
              AI-платформа для детектирования скрытых предпринимателей среди физических лиц. Единица предсказания — карта, а не транзакция.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { end: 13000000, label: "Транзакций проанализировано", suffix: "+" },
              { end: 0.9998, label: "F1 Score на синтетике", decimals: 4 },
              { end: 216000, label: "Годовая прибыль банка", prefix: "$" }
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} 
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:-translate-y-2 transition-transform">
                <div className="font-syne text-4xl font-bold text-mcOrange mb-2">
                  <Counter end={stat.end} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals || 0} />
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENT 2: THE PROBLEM & INTERACTIVE SHAP */}
      <section className="py-24 bg-mcLight">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-syne text-4xl font-bold mb-6 text-mcNavy">Проблема невидимого бизнеса</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Самозанятые используют потребительские карты для ведения бизнеса. Банк теряет Interchange fee и упускает возможности кросс-продаж (эквайринг, кредиты).
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3"><CheckCircle className="text-mcTeal mt-1" size={20}/> <span>Сложность: нет готовых меток (PU Learning).</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="text-mcTeal mt-1" size={20}/> <span>Решение: Continuous Score для каждой карты.</span></li>
              </ul>
            </motion.div>

            <motion.div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-syne font-bold text-xl">Live Demo: Card Scoring</h3>
                <Activity className="text-mcOrange" />
              </div>
              {!scoredCard ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-xl hover:border-mcOrange cursor-pointer transition-colors" onClick={() => setScoredCard('business')}>
                    <div className="font-mono text-sm text-gray-500">CARD_****4821</div>
                    <div className="font-bold">Потенциальный B2B паттерн</div>
                    <div className="text-sm text-gray-600 mt-2">Высокий оборот, концентрация мерчантов</div>
                    <button className="mt-4 w-full bg-mcNavy text-white py-2 rounded-lg font-medium">Score this card</button>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in duration-500">
                  <div className="flex justify-between mb-4 pb-4 border-b">
                    <div>
                      <div className="text-sm text-gray-500">Predicted Label</div>
                      <div className="font-bold text-mcOrange text-xl">HOT LEAD (Business)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Final Score</div>
                      <div className="font-bold font-mono text-xl text-mcNavy">0.942</div>
                    </div>
                  </div>
                  <div className="space-y-3 mt-6">
                    <h4 className="font-medium text-sm text-gray-500 mb-4">SHAP Feature Contributions</h4>
                    {[
                      { name: 'pct_biz_mcc', val: '+0.41', width: '85%', text: 'Транзакции в бизнес-категориях' },
                      { name: 'cv_amount', val: '+0.28', width: '65%', text: 'Аномальная вариативность сумм' },
                      { name: 'n_unique_merchants', val: '+0.15', width: '40%', text: 'Низкая концентрация трат' },
                    ].map((feat, i) => (
                      <div key={i} className="relative">
                        <div className="flex justify-between text-sm mb-1">
                          <code className="text-mcTeal">{feat.name}</code>
                          <span className="font-mono font-bold">{feat.val}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-mcOrange h-2 rounded-full" style={{ width: feat.width }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{feat.text}</div>
                      </div>
                    ))}
                    <button onClick={() => setScoredCard(null)} className="mt-6 text-sm text-mcNavy underline">Reset demo</button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMPONENT 3 & 4: ML SOLUTION & LAYERS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-syne text-4xl font-bold text-mcNavy mb-4">Архитектура Платформы</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">От сырых данных к бизнес-решениям через 4 слоя интеллекта.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mb-24">
            {platformLayers.map((layer, i) => (
              <motion.div key={i} className={`p-6 rounded-2xl border-2 ${layer.current ? 'border-mcOrange bg-orange-50/50' : 'border-gray-100'}`}>
                <div className="font-syne text-2xl font-bold text-gray-300 mb-4">{layer.id}</div>
                <h3 className="font-bold text-lg mb-2">{layer.title}</h3>
                <p className="text-sm text-gray-600">{layer.desc}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="font-syne text-3xl font-bold text-mcNavy mb-8">Сравнение ML Моделей</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {models.map((model) => (
              <div key={model.id} className="border-b">
                <div className={`grid grid-cols-4 p-4 cursor-pointer`} onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}>
                   <div className="col-span-2 font-bold">{model.name}</div>
                   <div className="font-mono">{model.auc}</div>
                   <div className="flex justify-between">{model.f1}<ChevronDown /></div>
                </div>
                {expandedModel === model.id && <div className="p-6 text-sm bg-gray-50">{model.desc}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENT 5: TEAM SECTION */}
      <section className="py-24 bg-mcNavy text-white" id="team">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-syne text-4xl font-bold mb-16">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-orange-500" />
                <h3 className="text-white text-lg font-semibold">{member.name}</h3>
                <p className="text-orange-500 text-sm mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#060d18] text-gray-500 py-12 text-center text-sm border-t border-white/5">
        <div className="flex justify-center items-center gap-6 mb-6 opacity-50 grayscale">
          <img src="/Mastercard-credit-card-Logo.png" alt="Mastercard" className="h-6 object-contain" />
          <img src="/powered-by-White-Black.png" alt="AIESEC" className="h-5 object-contain" />
        </div>
        <p>Disclaimer: This is a student project for Mastercard Data Quest 2026.</p>
      </footer>
    </main>
  );
}