import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SUBJECTS, COURSES, TESTS, MATERIALS, STATS, TEST_DATA, TestData } from "@/components/data";
import TestRunner from "@/components/TestRunner";

export function DifficultyBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    "Лёгкий": "rgba(57,255,122,0.15)",
    "Средний": "rgba(255,215,0,0.15)",
    "Сложный": "rgba(255,107,53,0.15)",
    "Базовый": "rgba(0,212,255,0.15)",
    "Продвинутый": "rgba(180,77,255,0.15)",
  };
  const textMap: Record<string, string> = {
    "Лёгкий": "#39ff7a",
    "Средний": "#ffd700",
    "Сложный": "#ff6b35",
    "Базовый": "#00d4ff",
    "Продвинутый": "#b44dff",
  };
  return (
    <span
      className="subject-badge text-xs"
      style={{ background: map[level] || "rgba(255,255,255,0.1)", color: textMap[level] || "#fff" }}
    >
      {level}
    </span>
  );
}

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl glass p-10 md:p-16 bg-mesh">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 animate-float"
            style={{ background: "radial-gradient(circle, #00d4ff, transparent 70%)", transform: "translate(30%, -30%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8 animate-float delay-300"
            style={{ background: "radial-gradient(circle, #39ff7a, transparent 70%)", transform: "translate(-30%, 30%)" }}
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6"
            style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00d4ff" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse-neon" style={{ background: "#00d4ff" }} />
            До ЕГЭ осталось 47 дней
          </div>
          <h1 className="font-oswald text-5xl md:text-7xl font-black leading-none mb-4 uppercase tracking-tight">
            <span className="gradient-text">Сдай ЕГЭ</span>
            <br />
            <span className="text-white">на максимум</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            Тренажёры, курсы и статистика прогресса — всё для уверенной сдачи.
            Твой результат уже растёт:{" "}
            <span style={{ color: "#39ff7a" }}>+12 баллов</span> за неделю.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-neon px-8 py-3 rounded-xl font-bold text-base">
              Начать тренировку
            </button>
            <button className="glass px-8 py-3 rounded-xl font-bold text-base text-white hover:bg-white/10 transition-all">
              Мои курсы
            </button>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="glass-card rounded-2xl p-5 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl" style={{ background: `${s.color}18` }}>
                  <Icon name={s.icon as string} size={20} style={{ color: s.color }} />
                </div>
              </div>
              <div className="font-oswald text-3xl font-bold" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section>
        <h2 className="font-oswald text-3xl font-bold text-white mb-6 uppercase">Мои предметы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map((s, i) => (
            <div
              key={s.name}
              className="glass-card rounded-2xl p-5 animate-fade-up cursor-pointer"
              style={{ animationDelay: `${0.2 + i * 0.1}s`, opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl" style={{ background: s.bg }}>
                  <Icon name={s.icon as string} size={22} style={{ color: s.color }} />
                </div>
                <div>
                  <div className="font-semibold text-white">{s.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {s.tasks} заданий
                  </div>
                </div>
                <div className="ml-auto font-oswald text-2xl font-bold" style={{ color: s.color }}>
                  {s.score}
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${s.score}%`,
                    background: `linear-gradient(90deg, ${s.color}88, ${s.color})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function CoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-oswald text-4xl font-bold text-white uppercase">Курсы</h2>
        <div className="glass px-4 py-2 rounded-xl text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          4 курса доступно
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COURSES.map((c, i) => (
          <div
            key={c.title}
            className="glass-card rounded-2xl p-6 animate-fade-up cursor-pointer"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="text-4xl">{c.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="subject-badge text-xs"
                    style={{ background: `${c.color}18`, color: c.color }}
                  >
                    {c.subject}
                  </span>
                  <DifficultyBadge level={c.level} />
                </div>
                <h3 className="font-oswald text-xl font-bold text-white leading-snug">{c.title}</h3>
              </div>
            </div>
            <div
              className="flex items-center gap-6 mb-4 text-sm"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <span className="flex items-center gap-1">
                <Icon name="BookOpen" size={14} />
                {c.lessons} уроков
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                {c.duration}
              </span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span style={{ color: "rgba(255,255,255,0.4)" }}>Прогресс</span>
              <span style={{ color: c.color }}>{c.progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${c.progress}%`,
                  background: `linear-gradient(90deg, ${c.color}88, ${c.color})`,
                }}
              />
            </div>
            <button
              className="mt-5 w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{
                background: `${c.color}18`,
                color: c.color,
                border: `1px solid ${c.color}30`,
              }}
            >
              {c.progress > 0 ? "Продолжить" : "Начать курс"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestsPage() {
  const [activeTest, setActiveTest] = useState<TestData | null>(null);

  const startRandom = () => {
    const keys = Object.keys(TEST_DATA);
    const key = keys[Math.floor(Math.random() * keys.length)];
    setActiveTest(TEST_DATA[key]);
  };

  return (
    <>
      {activeTest && <TestRunner test={activeTest} onClose={() => setActiveTest(null)} />}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-oswald text-4xl font-bold text-white uppercase">Тесты</h2>
          <button onClick={startRandom} className="btn-neon px-5 py-2 rounded-xl text-sm">
            Случайный тест
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTS.map((t, i) => (
            <div
              key={t.title}
              className="glass-card rounded-2xl p-5 animate-fade-up cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="subject-badge text-xs"
                  style={{ background: `${t.color}18`, color: t.color }}
                >
                  {t.subject}
                </span>
                <DifficultyBadge level={t.difficulty} />
              </div>
              <h3 className="font-semibold text-white mb-4 leading-snug">{t.title}</h3>
              <div
                className="flex items-center gap-4 text-sm mb-5"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <span className="flex items-center gap-1">
                  <Icon name="HelpCircle" size={13} />
                  {t.questions} вопросов
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={13} />
                  {t.time}
                </span>
              </div>
              <button
                onClick={() => setActiveTest(TEST_DATA[t.title] ?? null)}
                className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: `${t.color}15`,
                  color: t.color,
                  border: `1px solid ${t.color}25`,
                }}
              >
                Начать тест
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function MaterialsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-oswald text-4xl font-bold text-white uppercase">Материалы</h2>
        <div className="glass px-4 py-2 rounded-xl text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          {MATERIALS.length} файлов
        </div>
      </div>
      <div className="space-y-3">
        {MATERIALS.map((m, i) => (
          <div
            key={m.title}
            className="glass-card rounded-2xl p-5 flex items-center gap-4 animate-fade-up cursor-pointer"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <div className="p-3 rounded-xl flex-shrink-0" style={{ background: `${m.color}18` }}>
              <Icon name={m.icon as string} size={24} style={{ color: m.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white truncate">{m.title}</div>
              <div
                className="flex items-center gap-3 mt-1 text-sm"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <span
                  className="subject-badge text-xs"
                  style={{ background: `${m.color}15`, color: m.color }}
                >
                  {m.subject}
                </span>
                <span>{m.type}</span>
                <span>{m.size}</span>
              </div>
            </div>
            <button
              className="flex-shrink-0 p-2.5 rounded-xl transition-all hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <Icon name="Download" size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}