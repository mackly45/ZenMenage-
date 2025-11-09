import { Bell, Globe, Moon, Shield, HelpCircle, Info } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="flex-1 bg-[#F5F6F8] min-h-screen">
      <header className="bg-white border-b border-[#F5F6F8] px-6 py-4 sticky top-0 z-10">
        <div>
          <h1 className="text-2xl text-[#3A3A3A]">Paramètres</h1>
          <p className="text-sm text-[#3A3A3A]/60">Personnalisez votre expérience</p>
        </div>
      </header>

      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-xl overflow-hidden border-2 border-[#F5F6F8]">
          <div className="p-4 border-b border-[#F5F6F8]">
            <h3 className="text-lg text-[#3A3A3A]">Notifications</h3>
          </div>
          <div className="divide-y divide-[#F5F6F8]">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#4A90E2]" />
                <div>
                  <p className="text-[#3A3A3A]">Rappels de tâches</p>
                  <p className="text-sm text-[#3A3A3A]/60">
                    Recevoir des notifications pour les tâches du jour
                  </p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#4A90E2]" />
                <div>
                  <p className="text-[#3A3A3A]">Nouvelles assignations</p>
                  <p className="text-sm text-[#3A3A3A]/60">
                    Être notifié quand une tâche vous est assignée
                  </p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden border-2 border-[#F5F6F8]">
          <div className="p-4 border-b border-[#F5F6F8]">
            <h3 className="text-lg text-[#3A3A3A]">Préférences</h3>
          </div>
          <div className="divide-y divide-[#F5F6F8]">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#4A90E2]" />
                <div>
                  <p className="text-[#3A3A3A]">Langue</p>
                  <p className="text-sm text-[#3A3A3A]/60">Français</p>
                </div>
              </div>
              <button className="text-[#4A90E2] text-sm">Modifier</button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#4A90E2]" />
                <div>
                  <p className="text-[#3A3A3A]">Mode sombre</p>
                  <p className="text-sm text-[#3A3A3A]/60">Activer le thème sombre</p>
                </div>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden border-2 border-[#F5F6F8]">
          <div className="p-4 border-b border-[#F5F6F8]">
            <h3 className="text-lg text-[#3A3A3A]">Support</h3>
          </div>
          <div className="divide-y divide-[#F5F6F8]">
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#F5F6F8]/50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#4A90E2]" />
                <p className="text-[#3A3A3A]">Centre d'aide</p>
              </div>
              <span className="text-[#3A3A3A]/40">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#F5F6F8]/50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#4A90E2]" />
                <p className="text-[#3A3A3A]">Confidentialité</p>
              </div>
              <span className="text-[#3A3A3A]/40">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#F5F6F8]/50 transition-colors">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-[#4A90E2]" />
                <p className="text-[#3A3A3A]">À propos</p>
              </div>
              <span className="text-[#3A3A3A]/40">→</span>
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-[#3A3A3A]/40 py-6">
          Version 1.0.0 • © 2025 ZenMénage
        </div>
      </div>
    </div>
  );
}
