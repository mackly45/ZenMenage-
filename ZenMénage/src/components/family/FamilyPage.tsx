import { useState, useEffect } from 'react';
import { UserPlus, Crown, Star, Copy, Check } from 'lucide-react';
import api from '../../services/api';

type Member = {
  id: string;
  name: string;
  role: string;
  tasksCompleted: number;
  totalTasks: number;
  avatar: string;
  isAdmin: boolean;
};

export function FamilyPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [family, setFamily] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchFamily();
  }, []);

  const fetchFamily = async () => {
    try {
      setLoading(true);
      const response = await api.getFamily();
      if (response.success) {
        setFamily(response.data.family);
        // Map backend members to frontend Member type
        const mappedMembers = response.data.family.members.map((m: any) => ({
          id: m._id,
          name: m.name,
          role: m.role || (m._id === response.data.family.createdBy ? 'Admin' : 'Membre'),
          tasksCompleted: m.tasksCompleted || 0,
          totalTasks: m.totalTasks || 0,
          avatar: m.name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
          isAdmin: m._id === response.data.family.createdBy,
        }));
        setMembers(mappedMembers);
      }
    } catch (error) {
      console.error('Error fetching family:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyInviteCode = () => {
    if (family?.inviteCode) {
      navigator.clipboard.writeText(family.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 bg-[#F5F6F8] min-h-screen">
      <header className="bg-white border-b border-[#F5F6F8] px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#3A3A3A]">{family?.name || 'Ma Famille'}</h1>
            <p className="text-sm text-[#3A3A3A]/60">{members.length} membres actifs</p>
          </div>
          <button
            onClick={() => setShowAddMember(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#4A90E2]/90 transition-all"
          >
            <UserPlus className="w-5 h-5" />
            Ajouter un membre
          </button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => {
            const progressPercentage = Math.round(
              (member.tasksCompleted / member.totalTasks) * 100
            );
            const isTopPerformer = progressPercentage >= 85;

            return (
              <div
                key={member.id}
                className="bg-white rounded-xl p-6 hover:shadow-xl transition-all border-2 border-[#F5F6F8] relative overflow-hidden"
              >
                {isTopPerformer && (
                  <div className="absolute top-0 right-0 bg-gradient-to-bl from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-bl-lg flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-white" />
                    Top
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#357ABD] rounded-full flex items-center justify-center text-white text-xl">
                      {member.avatar}
                    </div>
                    {member.isAdmin && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-[#3A3A3A] mb-1">{member.name}</h3>
                    <p className="text-sm text-[#3A3A3A]/60">{member.role}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#3A3A3A]/60">Tâches cette semaine</span>
                    <span className="text-[#4A90E2]">
                      {member.tasksCompleted}/{member.totalTasks}
                    </span>
                  </div>
                  <div className="w-full bg-[#F5F6F8] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-2xl text-[#3A3A3A]">{progressPercentage}%</span>
                    <span className="text-sm text-[#3A3A3A]/60 ml-1">complété</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#F5F6F8] flex gap-2">
                  <button className="flex-1 py-2 text-sm bg-[#F5F6F8] text-[#3A3A3A] rounded-lg hover:bg-[#4A90E2]/10 hover:text-[#4A90E2] transition-all">
                    Voir tâches
                  </button>
                  <button className="flex-1 py-2 text-sm bg-[#F5F6F8] text-[#3A3A3A] rounded-lg hover:bg-[#4A90E2]/10 hover:text-[#4A90E2] transition-all">
                    Assigner
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 border-2 border-[#F5F6F8]">
          <h2 className="text-xl text-[#3A3A3A] mb-4">Statistiques familiales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl text-[#4A90E2] mb-1">82</div>
              <div className="text-sm text-[#3A3A3A]/60">Tâches complétées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-[#4A90E2] mb-1">97</div>
              <div className="text-sm text-[#3A3A3A]/60">Total cette semaine</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-[#4A90E2] mb-1">85%</div>
              <div className="text-sm text-[#3A3A3A]/60">Taux de réussite</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-[#4A90E2] mb-1">15</div>
              <div className="text-sm text-[#3A3A3A]/60">Jours actifs</div>
            </div>
          </div>
        </div>
      </div>

      {showAddMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="space-y-6">
              <p className="text-[#3A3A3A]/60">
                Partagez ce code avec les membres de votre famille pour qu'ils puissent rejoindre votre espace ZenMénage.
              </p>

              <div className="bg-[#F5F6F8] p-6 rounded-xl border-2 border-dashed border-[#4A90E2]/30 text-center">
                <span className="text-sm text-[#3A3A3A]/40 block mb-2 uppercase tracking-wider font-semibold">
                  Code d'invitation
                </span>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl font-mono font-bold text-[#4A90E2]">
                    {family?.inviteCode}
                  </span>
                  <button
                    onClick={copyInviteCode}
                    className="p-2 hover:bg-white rounded-lg transition-all text-[#4A90E2]"
                  >
                    {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setShowAddMember(false)}
                  className="w-full py-3 rounded-lg bg-[#4A90E2] text-white hover:bg-[#4A90E2]/90 transition-all font-semibold"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
