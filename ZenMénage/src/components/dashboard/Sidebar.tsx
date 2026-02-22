import { Home, ListChecks, Users, Settings, LogOut } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

export function Sidebar({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Tâches', icon: ListChecks, path: '/app/dashboard' },
    { id: 'family', label: 'Famille', icon: Users, path: '/app/family' },
    { id: 'settings', label: 'Paramètres', icon: Settings, path: '/app/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#F5F6F8] h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#4A90E2] rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl text-[#3A3A3A]">ZenMénage</span>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${isActive
                ? 'bg-[#4A90E2] text-white'
                : 'text-[#3A3A3A] hover:bg-[#F5F6F8]'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-[#F5F6F8]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#3A3A3A] hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
