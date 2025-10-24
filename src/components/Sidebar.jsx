import { Archive, Bell, Home, Settings, Tag, Trash } from 'lucide-react';

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside
        className={`fixed md:static z-40 top-16 md:top-0 left-0 h-[calc(100vh-4rem)] md:h-[calc(100vh)] w-72 md:w-72 p-4 md:p-6 bg-white/70 dark:bg-white/5 backdrop-blur-xl border-r border-white/40 dark:border-white/10 transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="space-y-1">
          <SidebarItem icon={Home} label="Dashboard" active />
          <SidebarItem icon={Tag} label="Labels" />
          <SidebarItem icon={Bell} label="Reminders" />
          <SidebarItem icon={Archive} label="Archive" />
          <SidebarItem icon={Trash} label="Trash" />
          <div className="pt-4 mt-4 border-t border-white/40 dark:border-white/10">
            <SidebarItem icon={Settings} label="Settings" />
          </div>
        </nav>

        <div className="mt-6 p-4 rounded-2xl border border-white/40 dark:border-white/10 bg-gradient-to-br from-teal-300/20 to-amber-300/20">
          <p className="text-sm text-slate-700 dark:text-slate-200">Glowing tip</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Use the + button to start with text, checklist, voice, or camera.</p>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon: Icon, label, active }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 h-11 rounded-xl border transition-all ${
        active
          ? 'border-teal-300/60 bg-white/70 dark:bg-white/10 shadow-[0_0_24px_rgba(0,255,198,0.25)]'
          : 'border-white/40 dark:border-white/10 hover:border-teal-300/60 hover:shadow-[0_0_20px_rgba(0,255,198,0.2)]'
      }`}
    >
      <Icon className="w-4.5 h-4.5" />
      <span className="text-sm">{label}</span>
    </button>
  );
}
