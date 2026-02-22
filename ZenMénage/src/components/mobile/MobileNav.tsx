import { Home, ListChecks, Plus, BarChart3, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function MobileNav({
  onAddTask,
}: {
  onAddTask: () => void;
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#F5F6F8] z-50 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16">
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? 'text-[#4A90E2]' : 'text-[#3A3A3A]/40'
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Accueil</span>
        </NavLink>

        <NavLink
          to="/app/tasks"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? 'text-[#4A90E2]' : 'text-[#3A3A3A]/40'
            }`
          }
        >
          <ListChecks className="w-6 h-6" />
          <span className="text-xs">Tâches</span>
        </NavLink>

        <button
          onClick={onAddTask}
          className="flex flex-col items-center justify-center -mt-6"
        >
          <div className="w-14 h-14 bg-[#4A90E2] rounded-full flex items-center justify-center shadow-lg">
            <Plus className="w-7 h-7 text-white" />
          </div>
        </button>

        <NavLink
          to="/app/stats"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? 'text-[#4A90E2]' : 'text-[#3A3A3A]/40'
            }`
          }
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-xs">Stats</span>
        </NavLink>

        <NavLink
          to="/app/family"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? 'text-[#4A90E2]' : 'text-[#3A3A3A]/40'
            }`
          }
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profil</span>
        </NavLink>
      </div>
    </nav>
  );
}
