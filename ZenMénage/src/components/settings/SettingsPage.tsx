import { useState, useEffect } from 'react';
import { Bell, Globe, Moon, Shield, HelpCircle, Info, User, Save, Loader2, CheckCircle } from 'lucide-react';
import api from '../../services/api';

export function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.getCurrentUser();
      if (response.success) {
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await api.updateDetails(formData);
      if (response.success) {
        setUser(response.data.user);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-[#F5F6F8] min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#4A90E2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F5F6F8] min-h-screen pb-12">
      <header className="bg-white border-b border-[#F5F6F8] px-6 py-4 sticky top-0 z-10">
        <div>
          <h1 className="text-2xl text-[#3A3A3A]">Paramètres</h1>
          <p className="text-sm text-[#3A3A3A]/60">Gérez votre compte et vos préférences</p>
        </div>
      </header>

      <div className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl overflow-hidden border-2 border-[#F5F6F8]">
          <div className="p-4 border-b border-[#F5F6F8] flex items-center gap-2">
            <User className="w-5 h-5 text-[#4A90E2]" />
            <h3 className="text-lg text-[#3A3A3A]">Profil Personnel</h3>
          </div>
          <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#3A3A3A]/60 mb-2">Nom Complet</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-[#F5F6F8] border border-transparent focus:border-[#4A90E2] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#3A3A3A]/60 mb-2">Adresse Email</label>
                <input
                  type="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-[#F5F6F8] border border-transparent opacity-60 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-[#3A3A3A]/40">
                L'email ne peut pas être modifié pour le moment.
              </p>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#4A90E2]/90 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : success ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {success ? 'Enregistré !' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>

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
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-[#F5F6F8] text-[#4A90E2] focus:ring-[#4A90E2]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden border-2 border-[#F5F6F8]">
          <div className="p-4 border-b border-[#F5F6F8]">
            <h3 className="text-lg text-[#3A3A3A]">Préférences d'affichage</h3>
          </div>
          <div className="divide-y divide-[#F5F6F8]">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#4A90E2]" />
                <div>
                  <p className="text-[#3A3A3A]">Mode sombre</p>
                  <p className="text-sm text-[#3A3A3A]/60">Activer le thème sombre (Bientôt disponible)</p>
                </div>
              </div>
              <input type="checkbox" disabled className="w-5 h-5 opacity-50" />
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-[#3A3A3A]/40 py-6">
          Version 1.0.0 • © 2025 ZenMénage
        </div>
      </div>
    </div>
  );
}
