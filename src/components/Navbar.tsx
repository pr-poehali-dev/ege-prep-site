import Icon from "@/components/ui/icon";
import { Page, NAV_ITEMS } from "@/components/data";

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

export default function Navbar({ page, setPage, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  return (
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
  );
}

interface BottomNavProps {
  page: Page;
  setPage: (p: Page) => void;
}

export function BottomNav({ page, setPage }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-40 glass"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="grid grid-cols-8 px-1 py-2">
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
  );
}