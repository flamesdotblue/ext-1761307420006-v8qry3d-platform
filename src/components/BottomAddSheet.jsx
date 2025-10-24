import { Camera, CheckSquare, FileText, Image, Mic, Pencil, X } from 'lucide-react';

export default function BottomAddSheet({ open, onClose, onSelect }) {
  const actions = [
    { key: 'text', label: 'Text', icon: FileText, hint: 'Quick note' },
    { key: 'checklist', label: 'Checklist', icon: CheckSquare, hint: 'Tasks' },
    { key: 'image', label: 'Image', icon: Image, hint: 'Add photos' },
    { key: 'drawing', label: 'Drawing', icon: Pencil, hint: 'Sketch' },
    { key: 'voice', label: 'Voice', icon: Mic, hint: 'Record' },
    { key: 'camera', label: 'Camera', icon: Camera, hint: 'Capture' },
  ];

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div className={`absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center transition-transform ${open ? 'translate-y-0' : 'translate-y-full md:translate-y-0 md:scale-95 md:opacity-0'}`}>
        <div className="w-full md:max-w-2xl md:rounded-3xl rounded-t-3xl overflow-hidden">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-teal-300/60 to-amber-300/60 blur-2xl" aria-hidden />
            <div className="relative backdrop-blur-2xl bg-white/70 dark:bg-white/5 border-t md:border border-white/40 dark:border-white/10">
              <div className="flex items-center justify-between px-5 pt-4">
                <h3 className="text-base font-medium">Add new idea</h3>
                <button onClick={onClose} className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/10">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 p-5">
                {actions.map(a => (
                  <button
                    key={a.key}
                    onClick={() => onSelect?.(a.key)}
                    className="group rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-4 text-left hover:border-teal-300/60 hover:shadow-[0_0_20px_rgba(0,255,198,0.25)] transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-300 to-amber-300 text-slate-900 flex items-center justify-center shadow-[0_0_24px_rgba(0,255,198,0.35)]">
                      <a.icon className="w-5 h-5" />
                    </div>
                    <div className="mt-3">
                      <div className="font-medium text-sm">{a.label}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{a.hint}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
