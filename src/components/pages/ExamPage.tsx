import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { EGE_TASKS, SUBJECT_COLORS, SUBJECT_ICONS, EgeTask } from "@/components/egeTasks";
import ExamRunner from "@/components/ExamRunner";

const ALL_SUBJECTS = ["Все", "Математика", "Русский язык", "Физика", "Химия", "История", "Биология"];

const TYPE_LABELS: Record<string, string> = {
  choice: "Выбор ответа",
  input: "Ввод ответа",
  multichoice: "Несколько ответов",
};

const TYPE_ICONS: Record<string, string> = {
  choice: "ListChecks",
  input: "PenLine",
  multichoice: "CheckSquare",
};

export function ExamPage() {
  const [subject, setSubject] = useState("Все");
  const [taskNumber, setTaskNumber] = useState<number | null>(null);
  const [runTasks, setRunTasks] = useState<EgeTask[] | null>(null);
  const [runTitle, setRunTitle] = useState("");

  const filtered = useMemo(() => {
    let list = EGE_TASKS;
    if (subject !== "Все") list = list.filter((t) => t.subject === subject);
    if (taskNumber !== null) list = list.filter((t) => t.taskNumber === taskNumber);
    return list;
  }, [subject, taskNumber]);

  const allNumbers = useMemo(() => {
    const base = subject === "Все" ? EGE_TASKS : EGE_TASKS.filter((t) => t.subject === subject);
    return Array.from(new Set(base.map((t) => t.taskNumber))).sort((a, b) => a - b);
  }, [subject]);

  const startAll = () => {
    if (filtered.length === 0) return;
    const label = subject === "Все" ? "Все задания ЕГЭ" : subject + (taskNumber ? ` · Задание ${taskNumber}` : " · Все задания");
    setRunTitle(label);
    setRunTasks([...filtered].sort(() => Math.random() - 0.5).slice(0, Math.min(filtered.length, 15)));
  };

  const startSingle = (task: EgeTask) => {
    setRunTitle(`${task.subject} · ${task.taskLabel}`);
    setRunTasks([task]);
  };

  const subjectColor = subject !== "Все" ? SUBJECT_COLORS[subject] : "#00d4ff";
  const subjectIcon = subject !== "Все" ? SUBJECT_ICONS[subject] : "BookMarked";

  return (
    <>
      {runTasks && (
        <ExamRunner tasks={runTasks} title={runTitle} onClose={() => setRunTasks(null)} />
      )}

      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-oswald text-4xl font-bold text-white uppercase">Задания ЕГЭ</h2>
            <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              {filtered.length} заданий по выбранным фильтрам
            </p>
          </div>
          <button
            onClick={startAll}
            disabled={filtered.length === 0}
            className="btn-neon px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            style={{ opacity: filtered.length === 0 ? 0.4 : 1 }}
          >
            <Icon name="Play" size={15} />
            Начать тренировку
          </button>
        </div>

        {/* Subject filter */}
        <div className="flex flex-wrap gap-2">
          {ALL_SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => { setSubject(s); setTaskNumber(null); }}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5"
              style={{
                background: subject === s ? `${SUBJECT_COLORS[s] || "#00d4ff"}18` : "rgba(255,255,255,0.05)",
                color: subject === s ? (SUBJECT_COLORS[s] || "#00d4ff") : "rgba(255,255,255,0.5)",
                border: subject === s
                  ? `1px solid ${SUBJECT_COLORS[s] || "#00d4ff"}40`
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {s !== "Все" && <Icon name={SUBJECT_ICONS[s] as string} size={13} />}
              {s}
            </button>
          ))}
        </div>

        {/* Task number filter */}
        {allNumbers.length > 0 && (
          <div>
            <div className="text-xs mb-2 font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              Номер задания
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTaskNumber(null)}
                className="px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{
                  background: taskNumber === null ? `${subjectColor}18` : "rgba(255,255,255,0.05)",
                  color: taskNumber === null ? subjectColor : "rgba(255,255,255,0.4)",
                  border: taskNumber === null ? `1px solid ${subjectColor}40` : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Все
              </button>
              {allNumbers.map((n) => (
                <button
                  key={n}
                  onClick={() => setTaskNumber(taskNumber === n ? null : n)}
                  className="px-3 py-1.5 rounded-lg text-sm font-mono transition-all"
                  style={{
                    background: taskNumber === n ? `${subjectColor}18` : "rgba(255,255,255,0.05)",
                    color: taskNumber === n ? subjectColor : "rgba(255,255,255,0.4)",
                    border: taskNumber === n ? `1px solid ${subjectColor}40` : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  №{n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stats row */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Заданий", value: filtered.length, icon: "ClipboardList" },
              { label: "Предметов", value: new Set(filtered.map((t) => t.subject)).size, icon: subjectIcon },
              { label: "Баллов всего", value: filtered.reduce((s, t) => s + t.points, 0), icon: "Star" },
            ].map((st) => (
              <div key={st.label} className="glass-card rounded-xl p-4 text-center">
                <Icon name={st.icon as string} size={18} className="mx-auto mb-1" style={{ color: subjectColor }} />
                <div className="font-oswald text-2xl font-bold" style={{ color: subjectColor }}>{st.value}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{st.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Task cards */}
        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Icon name="SearchX" size={40} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.2)" }} />
            <p style={{ color: "rgba(255,255,255,0.4)" }}>Заданий по выбранным фильтрам нет</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((task, i) => {
              const color = SUBJECT_COLORS[task.subject] || "#00d4ff";
              const icon = SUBJECT_ICONS[task.subject] || "BookOpen";
              return (
                <div
                  key={task.id}
                  className="glass-card rounded-2xl p-5 animate-fade-up"
                  style={{ animationDelay: `${Math.min(i, 10) * 0.05}s`, opacity: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: `${color}18` }}>
                      <Icon name={icon as string} size={20} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="subject-badge text-xs" style={{ background: `${color}15`, color }}>
                          {task.subject}
                        </span>
                        <span className="subject-badge text-xs" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}>
                          {task.taskLabel}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                          <Icon name={TYPE_ICONS[task.type] as string} size={11} />
                          {TYPE_LABELS[task.type]}
                        </span>
                        <span className="text-xs" style={{ color }}>
                          {task.points} {task.points === 1 ? "балл" : "балла"}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-white line-clamp-2">{task.text}</p>
                    </div>
                    <button
                      onClick={() => startSingle(task)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
                    >
                      <Icon name="Play" size={13} />
                      Решить
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
