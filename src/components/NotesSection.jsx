import { LayoutGrid, List, Pin, Star } from 'lucide-react';

export default function NotesSection({ viewMode = 'grid', onToggleView, pinnedNotes = [], otherNotes = [], onTogglePin }) {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Your notes</h2>
          <span className="text-xs text-slate-600 dark:text-slate-400">{pinnedNotes.length + otherNotes.length} total</span>
        </div>
        <button onClick={onToggleView} className="inline-flex items-center gap-2 h-10 px-3 rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-white/5">
          {viewMode === 'grid' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          <span className="text-sm">{viewMode === 'grid' ? 'List view' : 'Grid view'}</span>
        </button>
      </div>

      {pinnedNotes.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-medium">Pinned</h3>
          </div>
          <NotesGrid notes={pinnedNotes} viewMode={viewMode} onTogglePin={onTogglePin} />
        </section>
      )}

      <section>
        {pinnedNotes.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <Pin className="w-4 h-4 rotate-45 text-slate-500" />
            <h3 className="text-sm font-medium">Others</h3>
          </div>
        )}
        <NotesGrid notes={otherNotes} viewMode={viewMode} onTogglePin={onTogglePin} />
      </section>
    </div>
  );
}

function NotesGrid({ notes, viewMode, onTogglePin }) {
  const gridClass = viewMode === 'grid'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
    : 'space-y-3';

  return (
    <div className={gridClass}>
      {notes.map(n => (
        <article key={n.id} className={`group rounded-2xl border border-white/40 dark:border-white/10 bg-gradient-to-br ${n.color} backdrop-blur-xl p-4 relative overflow-hidden hover:shadow-[0_0_28px_rgba(0,255,198,0.20)] transition-shadow`}>
          <div className="absolute -inset-20 opacity-40 blur-3xl pointer-events-none" style={{background: 'radial-gradient(400px 200px at 20% 0%, rgba(0,255,198,0.15), transparent), radial-gradient(400px 200px at 80% 0%, rgba(255,215,106,0.15), transparent)'}} />
          <div className="relative">
            <div className="flex items-start gap-3">
              <h4 className="font-semibold leading-tight text-base flex-1 pr-10">{n.title}</h4>
              <button onClick={() => onTogglePin?.(n.id)} className={`shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-lg border ${n.pinned ? 'border-amber-300/70 bg-amber-300/30 text-amber-900 dark:text-amber-100' : 'border-white/40 dark:border-white/10 bg-white/60 dark:bg-white/10'} hover:border-teal-300/60`}>
                <Star className={`w-4 h-4 ${n.pinned ? 'fill-amber-300' : ''}`} />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-700/90 dark:text-slate-300/90 line-clamp-3">{n.content}</p>
            {n.labels?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {n.labels.map(l => (
                  <span key={l} className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-md border border-white/40 dark:border-white/10 bg-white/60 dark:bg-white/10">{l}</span>
                ))}
              </div>
            )}
            <div className="mt-3 text-[10px] text-slate-600 dark:text-slate-400">Updated {timeAgo(n.updatedAt)}</div>
          </div>
        </article>
      ))}
    </div>
  );
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
