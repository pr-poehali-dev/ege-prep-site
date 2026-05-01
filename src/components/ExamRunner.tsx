import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { EgeTask, SUBJECT_COLORS } from "@/components/egeTasks";

interface Props {
  tasks: EgeTask[];
  title: string;
  onClose: () => void;
}

type Status = "idle" | "correct" | "wrong";

export default function ExamRunner({ tasks, title, onClose }: Props) {
  const [current, setCurrent] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [multiSelected, setMultiSelected] = useState<Set<number>>(new Set());
  const [status, setStatus] = useState<Status>("idle");
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const task = tasks[current];
  const color = SUBJECT_COLORS[task.subject] || "#00d4ff";
  const total = tasks.length;

  const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "");

  const checkAnswer = (): boolean => {
    if (task.type === "choice") {
      return String(selectedChoice) === task.correct;
    }
    if (task.type === "input") {
      return normalise(inputValue) === normalise(task.correct);
    }
    if (task.type === "multichoice") {
      const correctSet = task.correct.split(",").map((s) => s.trim()).sort().join(",");
      const userSet = Array.from(multiSelected).map(String).sort().join(",");
      return userSet === correctSet;
    }
    return false;
  };

  const handleConfirm = () => {
    if (status !== "idle") return;
    const ok = checkAnswer();
    setStatus(ok ? "correct" : "wrong");
    setResults((r) => [...r, ok]);
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelectedChoice(null);
      setInputValue("");
      setMultiSelected(new Set());
      setStatus("idle");
    }
  };

  const toggleMulti = (idx: number) => {
    if (status !== "idle") return;
    setMultiSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) { next.delete(idx); } else { next.add(idx); }
      return next;
    });
  };

  const canConfirm =
    status === "idle" &&
    ((task.type === "choice" && selectedChoice !== null) ||
      (task.type === "input" && inputValue.trim().length > 0) ||
      (task.type === "multichoice" && multiSelected.size > 0));

  // ── Results screen ─────────────────────────────────────────────
  if (finished) {
    const score = results.filter(Boolean).length;
    const pct = Math.round((score / total) * 100);
    const grade = pct >= 80 ? { label: "Отлично!", emoji: "🏆" }
      : pct >= 60 ? { label: "Хорошо", emoji: "👍" }
      : { label: "Нужно повторить", emoji: "📚" };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}>
        <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center animate-fade-up" style={{ opacity: 0, border: `1px solid ${color}30` }}>
          <div className="text-6xl mb-3">{grade.emoji}</div>
          <h2 className="font-oswald text-3xl font-black text-white uppercase mb-1">{grade.label}</h2>
          <div className="font-oswald text-5xl font-black mb-1" style={{ color }}>{pct}%</div>
          <div className="mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            {score} из {total} правильно
          </div>
          <div className="progress-bar mb-6" style={{ height: 10 }}>
            <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
          </div>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {tasks.map((t, i) => (
              <div key={t.id} title={`Задание ${i + 1}`}
                className="aspect-square rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: results[i] ? "rgba(57,255,122,0.15)" : "rgba(255,107,53,0.15)",
                  color: results[i] ? "#39ff7a" : "#ff6b35",
                  border: `1px solid ${results[i] ? "#39ff7a30" : "#ff6b3530"}`,
                }}>
                {i + 1}
              </div>
            ))}
          </div>
          <button onClick={onClose} className="w-full py-3 rounded-xl font-bold text-black"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  // ── Task screen ─────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}>
      <div className="glass-card rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto"
        style={{ border: `1px solid ${color}25` }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="subject-badge text-xs" style={{ background: `${color}18`, color }}>{task.subject}</span>
            <span className="subject-badge text-xs" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
              {task.taskLabel}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{current + 1}/{total}</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-all"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Progress */}
        <div className="progress-bar mb-5">
          <div className="progress-fill"
            style={{ width: `${((current + 1) / total) * 100}%`, background: `linear-gradient(90deg, ${color}66, ${color})` }} />
        </div>

        {/* Points badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
            {task.points} {task.points === 1 ? "балл" : "балла"}
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {task.type === "choice" ? "Один вариант" : task.type === "multichoice" ? "Несколько вариантов" : "Введите ответ"}
          </span>
        </div>

        {/* Question text */}
        <p className="text-white font-medium mb-5 leading-relaxed whitespace-pre-line">{task.text}</p>

        {/* Choice options */}
        {task.type === "choice" && task.options && (
          <div className="space-y-2 mb-5">
            {task.options.map((opt, idx) => {
              let bg = "rgba(255,255,255,0.04)";
              let border = "rgba(255,255,255,0.08)";
              let textColor = "rgba(255,255,255,0.8)";
              if (status !== "idle") {
                if (idx === Number(task.correct)) { bg = "rgba(57,255,122,0.12)"; border = "#39ff7a55"; textColor = "#39ff7a"; }
                else if (idx === selectedChoice && status === "wrong") { bg = "rgba(255,107,53,0.12)"; border = "#ff6b3555"; textColor = "#ff6b35"; }
              } else if (idx === selectedChoice) {
                bg = `${color}12`; border = `${color}55`; textColor = color;
              }
              return (
                <button key={idx} onClick={() => { if (status === "idle") setSelectedChoice(idx); }}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3"
                  style={{ background: bg, border: `1px solid ${border}`, color: textColor }}>
                  <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${border}30`, color: textColor }}>
                    {["А","Б","В","Г"][idx]}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {status !== "idle" && idx === Number(task.correct) && <Icon name="CheckCircle" size={16} className="flex-shrink-0" style={{ color: "#39ff7a" }} />}
                  {status === "wrong" && idx === selectedChoice && idx !== Number(task.correct) && <Icon name="XCircle" size={16} className="flex-shrink-0" style={{ color: "#ff6b35" }} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Multichoice options */}
        {task.type === "multichoice" && task.options && (
          <div className="space-y-2 mb-5">
            {task.options.map((opt, idx) => {
              const correctList = task.correct.split(",").map((s) => s.trim());
              const isCorrect = correctList.includes(String(idx + 1));
              const isSelected = multiSelected.has(idx + 1);
              let bg = "rgba(255,255,255,0.04)";
              let border = "rgba(255,255,255,0.08)";
              let textColor = "rgba(255,255,255,0.8)";
              if (status !== "idle") {
                if (isCorrect) { bg = "rgba(57,255,122,0.12)"; border = "#39ff7a55"; textColor = "#39ff7a"; }
                else if (isSelected) { bg = "rgba(255,107,53,0.12)"; border = "#ff6b3555"; textColor = "#ff6b35"; }
              } else if (isSelected) {
                bg = `${color}12`; border = `${color}55`; textColor = color;
              }
              return (
                <button key={idx} onClick={() => toggleMulti(idx + 1)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3"
                  style={{ background: bg, border: `1px solid ${border}`, color: textColor }}>
                  <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${border}30`, color: textColor }}>
                    {idx + 1}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {status !== "idle" && isCorrect && <Icon name="CheckCircle" size={16} className="flex-shrink-0" style={{ color: "#39ff7a" }} />}
                  {status === "wrong" && isSelected && !isCorrect && <Icon name="XCircle" size={16} className="flex-shrink-0" style={{ color: "#ff6b35" }} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Input */}
        {task.type === "input" && (
          <div className="mb-5">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => { if (status === "idle") setInputValue(e.target.value); }}
              onKeyDown={(e) => { if (e.key === "Enter" && canConfirm) handleConfirm(); }}
              placeholder="Введите ответ..."
              className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all"
              style={{
                background: status === "correct" ? "rgba(57,255,122,0.1)" : status === "wrong" ? "rgba(255,107,53,0.1)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${status === "correct" ? "#39ff7a55" : status === "wrong" ? "#ff6b3555" : `${color}30`}`,
                caretColor: color,
              }}
            />
            {status !== "idle" && (
              <div className="mt-2 text-sm flex items-center gap-2"
                style={{ color: status === "correct" ? "#39ff7a" : "#ff6b35" }}>
                <Icon name={status === "correct" ? "CheckCircle" : "XCircle"} size={14} />
                {status === "correct" ? "Верно!" : `Правильный ответ: ${task.correct}`}
              </div>
            )}
          </div>
        )}

        {/* Explanation */}
        {status !== "idle" && (
          <div className="rounded-xl p-4 mb-5 animate-fade-up" style={{ opacity: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Icon name="Lightbulb" size={14} />
              Пояснение
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{task.explanation}</p>
          </div>
        )}

        {/* Actions */}
        {status === "idle" ? (
          <button onClick={handleConfirm} disabled={!canConfirm}
            className="w-full py-3 rounded-xl font-bold transition-all"
            style={{
              background: canConfirm ? `linear-gradient(135deg, ${color}, ${color}bb)` : "rgba(255,255,255,0.06)",
              color: canConfirm ? "#000" : "rgba(255,255,255,0.25)",
              cursor: canConfirm ? "pointer" : "not-allowed",
            }}>
            Проверить
          </button>
        ) : (
          <button onClick={handleNext} className="w-full py-3 rounded-xl font-bold text-black"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
            {current + 1 >= total ? "Посмотреть результаты" : "Следующее задание →"}
          </button>
        )}
      </div>
    </div>
  );
}