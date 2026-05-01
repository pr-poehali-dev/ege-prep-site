import Icon from "@/components/ui/icon";
import { SUBJECTS, STATS } from "@/components/data";

export function ProgressPage() {
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

export function ProfilePage() {
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

export function AboutPage() {
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
