import { Menu, Moon, Search, Sun, User } from 'lucide-react';

export default function Header({ theme = 'system', onToggleTheme, onMenu }) {
  const themeIcon = theme === 'dark' ? Sun : Moon;
  const themeLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60 dark:bg-[#0b0f13]/60 border-b border-white/40 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center gap-3">
        <button onClick={onMenu} className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-br from-teal-300/60 to-amber-300/60 blur-xl" aria-hidden />
            <div className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/80 dark:bg-white/10 border border-white/50 dark:border-white/10">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-teal-300 to-amber-300 shadow-[0_0_20px_rgba(0,255,198,0.7)]" />
            </div>
          </div>
          <div className="font-semibold tracking-tight">IdeaVault</div>
        </div>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search ideas, labels, people…"
              className="w-full pl-9 pr-3 h-10 rounded-xl bg-white/70 dark:bg-white/5 border border-white/50 dark:border-white/10 outline-none placeholder:text-slate-500/70 focus:ring-2 ring-teal-300/60"
            />
          </div>
        </div>

        <button
          onClick={onToggleTheme}
          title={themeLabel}
          className="ml-2 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10"
        >
          {themeIcon && <themeIcon className="w-5 h-5" />}
        </button>
        <button className="ml-2 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
