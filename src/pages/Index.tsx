import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "courses" | "tests" | "materials" | "progress" | "profile";

const SUBJECTS = [
  { name: "Математика", color: "#00d4ff", bg: "rgba(0,212,255,0.12)", icon: "Calculator", score: 78, tasks: 142 },
  { name: "Русский язык", color: "#39ff7a", bg: "rgba(57,255,122,0.12)", icon: "BookOpen", score: 85, tasks: 98 },
  { name: "Физика", color: "#b44dff", bg: "rgba(180,77,255,0.12)", icon: "Zap", score: 62, tasks: 87 },
  { name: "Химия", color: "#ff6b35", bg: "rgba(255,107,53,0.12)", icon: "FlaskConical", score: 55, tasks: 64 },
  { name: "История", color: "#ffd700", bg: "rgba(255,215,0,0.12)", icon: "Scroll", score: 71, tasks: 110 },
  { name: "Биология", color: "#00ffcc", bg: "rgba(0,255,204,0.12)", icon: "Leaf", score: 68, tasks: 76 },
];

const COURSES = [
  {
    title: "ЕГЭ по математике: профиль",
    subject: "Математика",
    lessons: 48,
    duration: "36 ч",
    level: "Продвинутый",
    progress: 35,
    color: "#00d4ff",
    emoji: "📐",
  },
  {
    title: "Русский язык: сочинение и грамматика",
    subject: "Русский язык",
    lessons: 32,
    duration: "24 ч",
    level: "Базовый",
    progress: 60,
    color: "#39ff7a",
    emoji: "✍️",
  },
  {
    title: "Физика: механика и электродинамика",
    subject: "Физика",
    lessons: 40,
    duration: "30 ч",
    level: "Средний",
    progress: 15,
    color: "#b44dff",
    emoji: "⚡",
  },
  {
    title: "История России: с древних времён",
    subject: "История",
    lessons: 56,
    duration: "42 ч",
    level: "Базовый",
    progress: 80,
    color: "#ffd700",
    emoji: "🏛️",
  },
];

const TESTS = [
  { title: "Математика: задание №1-8", subject: "Математика", questions: 8, time: "15 мин", difficulty: "Лёгкий", color: "#00d4ff" },
  { title: "Русский язык: орфография", subject: "Русский язык", questions: 15, time: "25 мин", difficulty: "Средний", color: "#39ff7a" },
  { title: "Физика: кинематика", subject: "Физика", questions: 10, time: "20 мин", difficulty: "Сложный", color: "#b44dff" },
  { title: "История: даты и события", subject: "История", questions: 20, time: "30 мин", difficulty: "Средний", color: "#ffd700" },
  { title: "Химия: органика", subject: "Химия", questions: 12, time: "22 мин", difficulty: "Сложный", color: "#ff6b35" },
  { title: "Биология: клетка", subject: "Биология", questions: 14, time: "20 мин", difficulty: "Лёгкий", color: "#00ffcc" },
];

const MATERIALS = [
  { title: "Шпаргалка по производным", subject: "Математика", type: "PDF", size: "1.2 МБ", color: "#00d4ff", icon: "FileText" },
  { title: "Теория вероятностей — конспект", subject: "Математика", type: "PDF", size: "0.8 МБ", color: "#00d4ff", icon: "FileText" },
  { title: "Правила написания сочинения", subject: "Русский язык", type: "PDF", size: "2.1 МБ", color: "#39ff7a", icon: "FileText" },
  { title: "Видео: задания второй части", subject: "Физика", type: "Видео", size: "480 МБ", color: "#b44dff", icon: "Play" },
  { title: "Таблица исторических дат", subject: "История", type: "PDF", size: "0.5 МБ", color: "#ffd700", icon: "FileText" },
  { title: "Химические формулы — справочник", subject: "Химия", type: "PDF", size: "3.4 МБ", color: "#ff6b35", icon: "FileText" },
];

const STATS = [
  { label: "Тестов пройдено", value: "47", icon: "CheckCircle", color: "#00d4ff" },
  { label: "Среднее время", value: "22 мин", icon: "Clock", color: "#39ff7a" },
  { label: "Правильных ответов", value: "73%", icon: "Target", color: "#b44dff" },
  { label: "Дней подряд", value: "12", icon: "Flame", color: "#ff6b35" },
];

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "courses", label: "Курсы", icon: "GraduationCap" },
  { id: "tests", label: "Тесты", icon: "ClipboardList" },
  { id: "materials", label: "Материалы", icon: "FolderOpen" },
  { id: "progress", label: "Прогресс", icon: "BarChart3" },
  { id: "profile", label: "Профиль", icon: "User" },
];

function DifficultyBadge({ level }: { level: string }) {
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

function HomePage() {
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

function CoursesPage() {
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

function TestsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-oswald text-4xl font-bold text-white uppercase">Тесты</h2>
        <button className="btn-neon px-5 py-2 rounded-xl text-sm">Случайный тест</button>
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
  );
}

function MaterialsPage() {
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

function ProgressPage() {
  return (
    <div className="space-y-8">
      <h2 className="font-oswald text-4xl font-bold text-white uppercase">Прогресс</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="glass-card rounded-2xl p-5 animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
          >
            <div className="p-2 rounded-xl inline-flex mb-3" style={{ background: `${s.color}15` }}>
              <Icon name={s.icon as string} size={20} style={{ color: s.color }} />
            </div>
            <div className="font-oswald text-3xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-oswald text-2xl font-bold text-white mb-6 uppercase">По предметам</h3>
        <div className="space-y-5">
          {SUBJECTS.map((s, i) => (
            <div
              key={s.name}
              className="animate-fade-up"
              style={{ animationDelay: `${0.3 + i * 0.08}s`, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg" style={{ background: s.bg }}>
                    <Icon name={s.icon as string} size={16} style={{ color: s.color }} />
                  </div>
                  <span className="font-medium text-white text-sm">{s.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>{s.tasks} заданий</span>
                  <span className="font-oswald text-lg font-bold" style={{ color: s.color }}>
                    {s.score} б.
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${s.score}%`,
                    background: `linear-gradient(90deg, ${s.color}66, ${s.color})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">Активность за апрель</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }).map((_, i) => {
            const val = Math.random();
            const color =
              val > 0.7
                ? "#00d4ff"
                : val > 0.4
                ? "#00d4ff66"
                : val > 0.15
                ? "#00d4ff22"
                : "rgba(255,255,255,0.05)";
            return (
              <div
                key={i}
                className="aspect-square rounded-md transition-all hover:scale-110 cursor-pointer"
                style={{ background: color }}
                title={`День ${i + 1}`}
              />
            );
          })}
        </div>
        <div
          className="flex items-center gap-3 mt-4 text-xs"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <span>Меньше</span>
          {["rgba(255,255,255,0.05)", "#00d4ff22", "#00d4ff66", "#00d4ff"].map((c) => (
            <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
          ))}
          <span>Больше</span>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="font-oswald text-4xl font-bold text-white uppercase">Профиль</h2>

      <div
        className="glass-card rounded-2xl p-8 flex items-center gap-6 animate-fade-up"
        style={{ opacity: 0 }}
      >
        <div className="relative">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-oswald text-3xl font-black"
            style={{
              background: "linear-gradient(135deg, #00d4ff22, #39ff7a22)",
              border: "2px solid #00d4ff40",
              color: "#00d4ff",
            }}
          >
            АИ
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2"
            style={{ background: "#39ff7a", borderColor: "hsl(var(--background))" }}
          />
        </div>
        <div>
          <div className="font-oswald text-2xl font-bold text-white">Алексей Иванов</div>
          <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
            11 класс · Регистрация: март 2025
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span
              className="subject-badge"
              style={{ background: "rgba(0,212,255,0.15)", color: "#00d4ff" }}
            >
              🔥 12 дней подряд
            </span>
            <span
              className="subject-badge"
              style={{ background: "rgba(57,255,122,0.15)", color: "#39ff7a" }}
            >
              ⭐ ТОП-10%
            </span>
          </div>
        </div>
      </div>

      <div
        className="glass-card rounded-2xl p-6 animate-fade-up delay-200"
        style={{ opacity: 0 }}
      >
        <h3 className="font-oswald text-xl font-bold text-white mb-4 uppercase">Мои ЕГЭ</h3>
        <div className="space-y-4">
          {[
            { sub: "Математика (профиль)", target: 85, current: 78, color: "#00d4ff" },
            { sub: "Русский язык", target: 90, current: 85, color: "#39ff7a" },
            { sub: "Физика", target: 75, current: 62, color: "#b44dff" },
          ].map((e) => (
            <div key={e.sub}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white font-medium">{e.sub}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>
                  <span style={{ color: e.color }}>{e.current}</span> / {e.target}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(e.current / e.target) * 100}%`,
                    background: `linear-gradient(90deg, ${e.color}55, ${e.color})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="glass-card rounded-2xl p-6 animate-fade-up delay-300"
        style={{ opacity: 0 }}
      >
        <h3 className="font-oswald text-xl font-bold text-white mb-4 uppercase">Настройки</h3>
        <div className="space-y-1">
          {[
            { label: "Уведомления", icon: "Bell" },
            { label: "Цели и планы", icon: "Target" },
            { label: "Сменить пароль", icon: "Lock" },
            { label: "Выйти", icon: "LogOut" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <Icon
                name={item.icon as string}
                size={18}
                style={{ color: "rgba(255,255,255,0.4)" }}
              />
              {item.label}
              <Icon
                name="ChevronRight"
                size={16}
                className="ml-auto"
                style={{ color: "rgba(255,255,255,0.2)" }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="space-y-12">
      <div className="text-center py-12">
        <h2 className="font-oswald text-5xl font-black gradient-text mb-4 uppercase">О платформе</h2>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
          ЕГЭ Старт — умная платформа подготовки, которая подстраивается под тебя
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Адаптивные тесты",
            desc: "Система подбирает задания под твой уровень и прокачивает слабые места",
            icon: "Brain",
            color: "#00d4ff",
          },
          {
            title: "Живая статистика",
            desc: "Видишь прогресс по каждому предмету и типу задания в реальном времени",
            icon: "TrendingUp",
            color: "#39ff7a",
          },
          {
            title: "Курсы от экспертов",
            desc: "Видеоуроки и материалы от учителей с многолетним опытом подготовки к ЕГЭ",
            icon: "GraduationCap",
            color: "#b44dff",
          },
          {
            title: "Мобильный формат",
            desc: "Готовься где угодно — платформа работает с телефона так же хорошо",
            icon: "Smartphone",
            color: "#ff6b35",
          },
          {
            title: "Геймификация",
            desc: "Стрики, достижения и рейтинг среди друзей делают подготовку интересной",
            icon: "Trophy",
            color: "#ffd700",
          },
          {
            title: "Поддержка 24/7",
            desc: "Команда наставников ответит на вопросы в любое время",
            icon: "Headphones",
            color: "#00ffcc",
          },
        ].map((f, i) => (
          <div
            key={f.title}
            className="glass-card rounded-2xl p-6 animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
          >
            <div className="p-3 rounded-xl inline-flex mb-4" style={{ background: `${f.color}18` }}>
              <Icon name={f.icon as string} size={26} style={{ color: f.color }} />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">{f.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-10 text-center bg-mesh">
        <div className="font-oswald text-5xl font-black gradient-text mb-2">10 000+</div>
        <div className="mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
          учеников уже готовятся с нами
        </div>
        <button className="btn-neon px-10 py-4 rounded-xl font-bold text-lg">
          Начать бесплатно
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage />;
      case "courses":
        return <CoursesPage />;
      case "tests":
        return <TestsPage />;
      case "materials":
        return <MaterialsPage />;
      case "progress":
        return <ProgressPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 glass"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-6">
            <button onClick={() => setPage("home")} className="flex items-center gap-2.5 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00d4ff, #39ff7a)" }}
              >
                <span className="font-oswald font-black text-black text-sm">Е</span>
              </div>
              <span className="font-oswald font-bold text-white text-lg tracking-wide hidden sm:block">
                ЕГЭ<span style={{ color: "#00d4ff" }}>Старт</span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-6 flex-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`nav-link flex items-center gap-1.5 text-sm font-medium pb-1 ${page === item.id ? "active" : ""}`}
                  style={{ color: page === item.id ? "#00d4ff" : "rgba(255,255,255,0.6)" }}
                >
                  <Icon name={item.icon as string} size={15} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div
                className="hidden sm:flex items-center gap-2 glass px-3 py-1.5 rounded-lg text-sm font-semibold"
                style={{ color: "#39ff7a", borderColor: "rgba(57,255,122,0.2)" }}
              >
                <Icon name="Flame" size={14} />
                12
              </div>
              <button
                onClick={() => setPage("profile")}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-oswald font-black text-sm"
                style={{
                  background: "linear-gradient(135deg, #00d4ff22, #39ff7a22)",
                  color: "#00d4ff",
                  border: "1px solid #00d4ff30",
                }}
              >
                АИ
              </button>
              <button
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden border-t animate-fade-up glass"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-3 gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all text-center"
                  style={{
                    background: page === item.id ? "rgba(0,212,255,0.1)" : "transparent",
                    color: page === item.id ? "#00d4ff" : "rgba(255,255,255,0.55)",
                  }}
                >
                  <Icon name={item.icon as string} size={20} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{renderPage()}</main>

      {/* Bottom mobile nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 md:hidden z-40 glass"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="grid grid-cols-6 px-2 py-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className="flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-xl transition-all"
              style={{ color: page === item.id ? "#00d4ff" : "rgba(255,255,255,0.35)" }}
            >
              <Icon name={item.icon as string} size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="h-20 md:h-0" />
    </div>
  );
}