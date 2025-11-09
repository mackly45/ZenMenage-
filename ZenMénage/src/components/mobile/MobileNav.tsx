import { Home, ListChecks, Plus, BarChart3, User } from 'lucide-react';

type Page = 'dashboard' | 'family' | 'settings';

export function MobileNav({
  currentPage,
  onPageChange,
  onAddTask,
}: {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onAddTask: () => void;
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#F5F6F8] z-50 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16">
        <button
          onClick={() => onPageChange('dashboard')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPage === 'dashboard' ? 'text-[#4A90E2]' : 'text-[#3A3A3A]/40'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Accueil</span>
        </button>

        <button
          onClick={() => onPageChange('dashboard')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPage === 'dashboard' ? 'text-[#4A90E2]' : 'text-[#3A3A3A]/40'
          }`}
        >
          <ListChecks className="w-6 h-6" />
          <span className="text-xs">Tâches</span>
        </button>

        <button
          onClick={onAddTask}
          className="flex flex-col items-center justify-center -mt-6"
        >
          <div className="w-14 h-14 bg-[#4A90E2] rounded-full flex items-center justify-center shadow-lg">
            <Plus className="w-7 h-7 text-white" />
          </div>
        </button>

        <button
          onClick={() => onPageChange('dashboard')}
          className="flex flex-col items-center justify-center gap-1 text-[#3A3A3A]/40"
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-xs">Stats</span>
        </button>

        <button
          onClick={() => onPageChange('family')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPage === 'family' ? 'text-[#4A90E2]' : 'text-[#3A3A3A]/40'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profil</span>
        </button>
      </div>
    </nav>
  );
}
