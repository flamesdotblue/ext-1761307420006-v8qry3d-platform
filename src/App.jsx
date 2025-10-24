import { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Plus } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomAddSheet from './components/BottomAddSheet';
import NotesSection from './components/NotesSection';

const primaryTeal = '#00FFC6';
const primaryGold = '#FFD76A';

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'system';
    return localStorage.getItem('theme') || 'system';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  const [notes, setNotes] = useState(() => [
    {
      id: 'n1',
      title: 'Brainstorm: Weekend Hackathon',
      content: 'AI note assistant, glowing UI, real-time collab. Tasks: research, prototype, pitch.',
      pinned: true,
      labels: ['ideas', 'hackathon'],
      color: 'from-teal-300/20 to-yellow-200/20',
      updatedAt: Date.now() - 1000 * 60 * 20,
    },
    {
      id: 'n2',
      title: 'Grocery App Flow',
      content: 'List, reminders, share with family. Monetize via premium smart lists.',
      pinned: false,
      labels: ['product'],
      color: 'from-teal-300/15 to-yellow-200/15',
      updatedAt: Date.now() - 1000 * 60 * 60 * 4,
    },
    {
      id: 'n3',
      title: 'Travel: Japan 2026',
      content: 'Kyoto temples, Osaka food tour, JR pass, cherry blossoms timing.',
      pinned: false,
      labels: ['travel', 'wishlist'],
      color: 'from-teal-300/15 to-yellow-200/10',
      updatedAt: Date.now() - 1000 * 60 * 90,
    },
  ]);

  const pinned = useMemo(() => notes.filter(n => n.pinned), [notes]);
  const others = useMemo(() => notes.filter(n => !n.pinned), [notes]);

  useEffect(() => {
    const root = document.documentElement;
    const apply = (t) => {
      if (t === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', prefersDark);
      } else {
        root.classList.toggle('dark', t === 'dark');
      }
    };
    apply(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleCreate = (type) => {
    const id = crypto.randomUUID();
    const templates = {
      text: { title: 'New Idea', content: 'Jot your thoughts…' },
      checklist: { title: 'Checklist', content: '[] First item' },
      image: { title: 'Image Note', content: 'Tap to add images' },
      drawing: { title: 'Sketch', content: 'Open canvas to draw' },
      voice: { title: 'Voice Memo', content: 'Start recording…' },
      camera: { title: 'Camera Capture', content: 'Snap and annotate' },
    };
    const tpl = templates[type] || templates.text;
    const newNote = {
      id,
      title: tpl.title,
      content: tpl.content,
      pinned: false,
      labels: [],
      color: 'from-teal-300/15 to-yellow-200/10',
      updatedAt: Date.now(),
      type,
    };
    setNotes(prev => [newNote, ...prev]);
    setAddOpen(false);
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-white to-white/60 dark:from-[#0b0f13] dark:to-[#0b0f13] text-slate-900 dark:text-slate-100 selection:bg-teal-300/60 selection:text-slate-900">
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -inset-40 opacity-60 blur-3xl" style={{background: `radial-gradient(1200px 600px at 20% 10%, ${primaryTeal}22, transparent), radial-gradient(1200px 600px at 80% 20%, ${primaryGold}22, transparent)`}} />
      </div>
      <Header theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : t === 'light' ? 'system' : 'dark')} onMenu={() => setSidebarOpen(s => !s)} />

      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 relative">
          <section className="relative w-full h-[260px] md:h-[360px] overflow-hidden">
            <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/60 dark:from-[#0b0f13]/40 dark:via-[#0b0f13]/20 dark:to-[#0b0f13]/70" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="backdrop-blur-xl bg-white/50 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,255,198,0.15)]">
                <div className="p-4 md:p-6">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">IdeaVault</h1>
                  <p className="text-sm md:text-base text-slate-700/80 dark:text-slate-300/80 mt-1">Capture, organize, and collaborate on ideas. Glowing, fast, and synced in real-time.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="px-4 md:px-8 max-w-7xl mx-auto w-full">
            <NotesSection
              viewMode={viewMode}
              onToggleView={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
              pinnedNotes={pinned}
              otherNotes={others}
              onTogglePin={(id) => setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n))}
            />
          </div>
        </main>
      </div>

      <button
        aria-label="Create new note"
        onClick={() => setAddOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-teal-400 to-amber-300 text-slate-900 shadow-[0_0_40px_rgba(0,255,198,0.35)] hover:shadow-[0_0_60px_rgba(0,255,198,0.55)] active:scale-95 transition-all"
      >
        <Plus className="w-7 h-7" />
      </button>

      <BottomAddSheet open={addOpen} onClose={() => setAddOpen(false)} onSelect={handleCreate} />
    </div>
  );
}
