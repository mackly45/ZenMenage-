import { Home, ListChecks, BarChart3, Users, Settings, LogOut } from 'lucide-react';

type Page = 'dashboard' | 'family' | 'settings';

export function Sidebar({
  currentPage,
  onPageChange,
  onLogout,
}: {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onLogout: () => void;
}) {
  const menuItems = [
    { id: 'dashboard' as Page, label: 'Tâches', icon: ListChecks },
    { id: 'family' as Page, label: 'Famille', icon: Users },
    { id: 'settings' as Page, label: 'Paramètres', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#F5F6F8] h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#4A90E2] rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl text-[#3A3A3A]">ZenMénage</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
              currentPage === item.id
                ? 'bg-[#4A90E2] text-white'
                : 'text-[#3A3A3A] hover:bg-[#F5F6F8]'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
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
