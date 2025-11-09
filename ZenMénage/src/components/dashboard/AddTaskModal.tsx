import { useState } from 'react';
import { X } from 'lucide-react';

export function AddTaskModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    room: 'Cuisine',
    assignedTo: 'Sophie',
    priority: 'medium' as 'high' | 'medium' | 'low',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the task to state/database
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-[#3A3A3A]">Nouvelle tâche</h2>
          <button
            onClick={onClose}
            className="text-[#3A3A3A]/40 hover:text-[#3A3A3A] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm text-[#3A3A3A]">Nom de la tâche</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#F5F6F8] border border-transparent focus:border-[#4A90E2] focus:outline-none transition-all"
              placeholder="Ex: Passer l'aspirateur"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-[#3A3A3A]">Pièce</label>
            <select
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#F5F6F8] border border-transparent focus:border-[#4A90E2] focus:outline-none transition-all"
            >
              <option value="Cuisine">Cuisine</option>
              <option value="Salon">Salon</option>
              <option value="Salle de bain">Salle de bain</option>
              <option value="Chambre">Chambre</option>
              <option value="Bureau">Bureau</option>
              <option value="Garage">Garage</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-[#3A3A3A]">Assigné à</label>
            <select
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#F5F6F8] border border-transparent focus:border-[#4A90E2] focus:outline-none transition-all"
            >
              <option value="Sophie">Sophie</option>
              <option value="Thomas">Thomas</option>
              <option value="Emma">Emma</option>
              <option value="Lucas">Lucas</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-[#3A3A3A]">Priorité</label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority })}
                  className={`py-3 rounded-lg transition-all ${
                    formData.priority === priority
                      ? priority === 'high'
                        ? 'bg-red-100 text-red-700 border-2 border-red-200'
                        : priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200'
                        : 'bg-green-100 text-green-700 border-2 border-green-200'
                      : 'bg-[#F5F6F8] text-[#3A3A3A] border-2 border-transparent'
                  }`}
                >
                  {priority === 'high' ? 'Haute' : priority === 'medium' ? 'Moyenne' : 'Basse'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-[#3A3A3A]">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#F5F6F8] border border-transparent focus:border-[#4A90E2] focus:outline-none transition-all"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg bg-[#F5F6F8] text-[#3A3A3A] hover:bg-[#F5F6F8]/70 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-[#4A90E2] text-white hover:bg-[#4A90E2]/90 transition-all shadow-lg"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
