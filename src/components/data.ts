export type Page = "home" | "courses" | "tests" | "materials" | "progress" | "profile";

export const SUBJECTS = [
  { name: "Математика", color: "#00d4ff", bg: "rgba(0,212,255,0.12)", icon: "Calculator", score: 78, tasks: 142 },
  { name: "Русский язык", color: "#39ff7a", bg: "rgba(57,255,122,0.12)", icon: "BookOpen", score: 85, tasks: 98 },
  { name: "Физика", color: "#b44dff", bg: "rgba(180,77,255,0.12)", icon: "Zap", score: 62, tasks: 87 },
  { name: "Химия", color: "#ff6b35", bg: "rgba(255,107,53,0.12)", icon: "FlaskConical", score: 55, tasks: 64 },
  { name: "История", color: "#ffd700", bg: "rgba(255,215,0,0.12)", icon: "Scroll", score: 71, tasks: 110 },
  { name: "Биология", color: "#00ffcc", bg: "rgba(0,255,204,0.12)", icon: "Leaf", score: 68, tasks: 76 },
];

export const COURSES = [
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

export const TESTS = [
  { title: "Математика: задание №1-8", subject: "Математика", questions: 8, time: "15 мин", difficulty: "Лёгкий", color: "#00d4ff" },
  { title: "Русский язык: орфография", subject: "Русский язык", questions: 15, time: "25 мин", difficulty: "Средний", color: "#39ff7a" },
  { title: "Физика: кинематика", subject: "Физика", questions: 10, time: "20 мин", difficulty: "Сложный", color: "#b44dff" },
  { title: "История: даты и события", subject: "История", questions: 20, time: "30 мин", difficulty: "Средний", color: "#ffd700" },
  { title: "Химия: органика", subject: "Химия", questions: 12, time: "22 мин", difficulty: "Сложный", color: "#ff6b35" },
  { title: "Биология: клетка", subject: "Биология", questions: 14, time: "20 мин", difficulty: "Лёгкий", color: "#00ffcc" },
];

export const MATERIALS = [
  { title: "Шпаргалка по производным", subject: "Математика", type: "PDF", size: "1.2 МБ", color: "#00d4ff", icon: "FileText" },
  { title: "Теория вероятностей — конспект", subject: "Математика", type: "PDF", size: "0.8 МБ", color: "#00d4ff", icon: "FileText" },
  { title: "Правила написания сочинения", subject: "Русский язык", type: "PDF", size: "2.1 МБ", color: "#39ff7a", icon: "FileText" },
  { title: "Видео: задания второй части", subject: "Физика", type: "Видео", size: "480 МБ", color: "#b44dff", icon: "Play" },
  { title: "Таблица исторических дат", subject: "История", type: "PDF", size: "0.5 МБ", color: "#ffd700", icon: "FileText" },
  { title: "Химические формулы — справочник", subject: "Химия", type: "PDF", size: "3.4 МБ", color: "#ff6b35", icon: "FileText" },
];

export const STATS = [
  { label: "Тестов пройдено", value: "47", icon: "CheckCircle", color: "#00d4ff" },
  { label: "Среднее время", value: "22 мин", icon: "Clock", color: "#39ff7a" },
  { label: "Правильных ответов", value: "73%", icon: "Target", color: "#b44dff" },
  { label: "Дней подряд", value: "12", icon: "Flame", color: "#ff6b35" },
];

export const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "courses", label: "Курсы", icon: "GraduationCap" },
  { id: "tests", label: "Тесты", icon: "ClipboardList" },
  { id: "materials", label: "Материалы", icon: "FolderOpen" },
  { id: "progress", label: "Прогресс", icon: "BarChart3" },
  { id: "profile", label: "Профиль", icon: "User" },
];
