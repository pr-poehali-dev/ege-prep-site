import { useState } from "react";
import Icon from "@/components/ui/icon";
import { THEORY_TOPICS, TheoryTopic } from "@/components/data";

function TopicView({ topic, onBack }: { topic: TheoryTopic; onBack: () => void }) {
  return (
    <div className="space-y-6 animate-fade-up" style={{ opacity: 0 }}>
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm transition-all hover:opacity-80"
        style={{ color: "rgba(255,255,255,0.5)" }}>
        <Icon name="ArrowLeft" size={16} />
        Назад к теории
      </button>

      <div className="glass-card rounded-2xl p-6" style={{ borderColor: `${topic.color}30` }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl" style={{ background: `${topic.color}18` }}>
            <Icon name={topic.icon as string} size={22} style={{ color: topic.color }} />
          </div>
          <span className="subject-badge text-xs" style={{ background: `${topic.color}18`, color: topic.color }}>
            {topic.subject}
          </span>
        </div>
        <h2 className="font-oswald text-3xl font-bold text-white uppercase">{topic.title}</h2>
      </div>

      <div className="space-y-4">
        {topic.content.map((block, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 animate-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}>
            <h3 className="font-oswald text-lg font-bold mb-3 uppercase" style={{ color: topic.color }}>
              {block.heading}
            </h3>
            <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
              {block.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TheoryPage() {
  const [activeTopic, setActiveTopic] = useState<TheoryTopic | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>("Все");

  const subjects = ["Все", ...Array.from(new Set(THEORY_TOPICS.map((t) => t.subject)))];
  const filtered = filterSubject === "Все"
    ? THEORY_TOPICS
    : THEORY_TOPICS.filter((t) => t.subject === filterSubject);

  if (activeTopic) {
    return <TopicView topic={activeTopic} onBack={() => setActiveTopic(null)} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-oswald text-4xl font-bold text-white uppercase">Теория</h2>
        <div className="glass px-4 py-2 rounded-xl text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          {THEORY_TOPICS.length} тем
        </div>
      </div>

      {/* Subject filter */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((s) => (
          <button key={s} onClick={() => setFilterSubject(s)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: filterSubject === s ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)",
              color: filterSubject === s ? "#00d4ff" : "rgba(255,255,255,0.5)",
              border: filterSubject === s ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
            }}>
            {s}
          </button>
        ))}
      </div>

      {/* Topics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((topic, i) => (
          <button key={topic.title} onClick={() => setActiveTopic(topic)}
            className="glass-card rounded-2xl p-6 text-left animate-fade-up"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl flex-shrink-0" style={{ background: `${topic.color}18` }}>
                <Icon name={topic.icon as string} size={24} style={{ color: topic.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="subject-badge text-xs mb-2 inline-flex"
                  style={{ background: `${topic.color}15`, color: topic.color }}>
                  {topic.subject}
                </span>
                <h3 className="font-oswald text-lg font-bold text-white leading-snug">{topic.title}</h3>
                <p className="text-sm mt-2 line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {topic.content[0].text}
                </p>
              </div>
              <Icon name="ChevronRight" size={18} className="flex-shrink-0 mt-1"
                style={{ color: "rgba(255,255,255,0.2)" }} />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              <Icon name="BookOpen" size={13} />
              {topic.content.length} раздела
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
