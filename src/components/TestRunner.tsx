import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { TestData } from "@/components/data";

interface Props {
  test: TestData;
  onClose: () => void;
}

export default function TestRunner({ test, onClose }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(test.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(test.timeSeconds);
  const [finished, setFinished] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timer); setFinished(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const question = test.questions[current];
  const total = test.questions.length;
  const timerColor = timeLeft < 60 ? "#ff6b35" : timeLeft < 180 ? "#ffd700" : test.color;

  const handleSelect = (idx: number) => {
    if (showCorrect) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setShowCorrect(true);
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setShowCorrect(false);
    }
  };

  const score = answers.filter((a, i) => a === test.questions[i].correct).length;
  const percent = Math.round((score / total) * 100);

  if (finished) {
    const grade = percent >= 80 ? { label: "Отлично!", color: "#39ff7a" }
      : percent >= 60 ? { label: "Хорошо", color: "#ffd700" }
      : { label: "Нужно подтянуть", color: "#ff6b35" };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center animate-fade-up" style={{ opacity: 0 }}>
          <div className="text-6xl mb-4">{percent >= 80 ? "🏆" : percent >= 60 ? "👍" : "📚"}</div>
          <h2 className="font-oswald text-3xl font-black text-white mb-1 uppercase">Тест завершён</h2>
          <div className="font-oswald text-5xl font-black mb-1" style={{ color: grade.color }}>{grade.label}</div>
          <div className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            Правильных ответов: <span className="font-bold" style={{ color: test.color }}>{score}</span> из {total}
          </div>

          <div className="progress-bar mb-6" style={{ height: 12 }}>
            <div className="progress-fill" style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${test.color}88, ${test.color})` }} />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {test.questions.map((q, i) => (
              <div key={q.id} className="flex items-center gap-2 text-sm glass rounded-xl px-3 py-2"
                style={{ color: answers[i] === q.correct ? "#39ff7a" : "#ff6b35" }}>
                <Icon name={answers[i] === q.correct ? "CheckCircle" : "XCircle"} size={16} />
                Вопрос {i + 1}
              </div>
            ))}
          </div>

          <button onClick={onClose} className="w-full py-3 rounded-xl font-bold text-black"
            style={{ background: `linear-gradient(135deg, ${test.color}, ${test.color}99)` }}>
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="glass-card rounded-3xl p-6 max-w-lg w-full" style={{ border: `1px solid ${test.color}30` }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="subject-badge text-xs" style={{ background: `${test.color}18`, color: test.color }}>
              {test.subject}
            </span>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              {current + 1} / {total}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg font-oswald font-bold"
              style={{ color: timerColor, borderColor: `${timerColor}30` }}>
              <Icon name="Clock" size={14} />
              {formatTime(timeLeft)}
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-all"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              <Icon name="X" size={18} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar mb-6">
          <div className="progress-fill"
            style={{ width: `${((current + 1) / total) * 100}%`, background: `linear-gradient(90deg, ${test.color}88, ${test.color})` }} />
        </div>

        {/* Question */}
        <p className="font-oswald text-xl font-bold text-white mb-5 leading-snug">{question.text}</p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((opt, idx) => {
            let bg = "rgba(255,255,255,0.04)";
            let border = "rgba(255,255,255,0.08)";
            let color = "rgba(255,255,255,0.8)";
            if (showCorrect) {
              if (idx === question.correct) { bg = "rgba(57,255,122,0.12)"; border = "#39ff7a"; color = "#39ff7a"; }
              else if (idx === selected && selected !== question.correct) { bg = "rgba(255,107,53,0.12)"; border = "#ff6b35"; color = "#ff6b35"; }
            } else if (idx === selected) {
              bg = `${test.color}15`; border = test.color; color = test.color;
            }
            return (
              <button key={idx} onClick={() => handleSelect(idx)}
                className="w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3"
                style={{ background: bg, border: `1px solid ${border}`, color }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${border}20`, color }}>
                  {["А", "Б", "В", "Г"][idx]}
                </span>
                {opt}
                {showCorrect && idx === question.correct && (
                  <Icon name="CheckCircle" size={16} className="ml-auto flex-shrink-0" style={{ color: "#39ff7a" }} />
                )}
                {showCorrect && idx === selected && selected !== question.correct && (
                  <Icon name="XCircle" size={16} className="ml-auto flex-shrink-0" style={{ color: "#ff6b35" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Action */}
        {!showCorrect ? (
          <button onClick={handleConfirm} disabled={selected === null}
            className="w-full py-3 rounded-xl font-bold transition-all"
            style={{
              background: selected !== null ? `linear-gradient(135deg, ${test.color}, ${test.color}99)` : "rgba(255,255,255,0.06)",
              color: selected !== null ? "#000" : "rgba(255,255,255,0.3)",
              cursor: selected !== null ? "pointer" : "not-allowed",
            }}>
            Проверить
          </button>
        ) : (
          <button onClick={handleNext} className="w-full py-3 rounded-xl font-bold text-black"
            style={{ background: `linear-gradient(135deg, ${test.color}, ${test.color}99)` }}>
            {current + 1 >= total ? "Завершить тест" : "Следующий вопрос →"}
          </button>
        )}
      </div>
    </div>
  );
}
