import { useState } from 'react';
import { Check, Filter, Plus, Trash2 } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  room: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  date: string;
};

export function TaskList({ onAddTask }: { onAddTask: () => void }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Passer l\'aspirateur',
      room: 'Salon',
      assignedTo: 'Sophie',
      priority: 'high',
      completed: false,
      date: '2025-11-09',
    },
    {
      id: '2',
      title: 'Nettoyer la salle de bain',
      room: 'Salle de bain',
      assignedTo: 'Thomas',
      priority: 'medium',
      completed: true,
      date: '2025-11-09',
    },
    {
      id: '3',
      title: 'Sortir les poubelles',
      room: 'Cuisine',
      assignedTo: 'Emma',
      priority: 'high',
      completed: false,
      date: '2025-11-09',
    },
    {
      id: '4',
      title: 'Faire la vaisselle',
      room: 'Cuisine',
      assignedTo: 'Lucas',
      priority: 'medium',
      completed: false,
      date: '2025-11-09',
    },
    {
      id: '5',
      title: 'Ranger la chambre',
      room: 'Chambre',
      assignedTo: 'Emma',
      priority: 'low',
      completed: true,
      date: '2025-11-09',
    },
  ]);

  const [filter, setFilter] = useState<string>('all');

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return task.room === filter;
  });

  const rooms = Array.from(new Set(tasks.map((task) => task.room)));

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200',
  };

  const priorityLabels = {
    high: 'Haute',
    medium: 'Moyenne',
    low: 'Basse',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl text-[#3A3A3A] mb-1">Tâches du jour</h2>
          <p className="text-[#3A3A3A]/60">
            {tasks.filter((t) => !t.completed).length} tâche(s) restante(s)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3A3A]/40" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-[#F5F6F8] border border-transparent focus:border-[#4A90E2] focus:outline-none"
            >
              <option value="all">Toutes</option>
              <option value="active">Actives</option>
              <option value="completed">Terminées</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white border-2 rounded-xl p-4 transition-all hover:shadow-md ${
              task.completed ? 'border-[#F5F6F8] opacity-60' : 'border-[#F5F6F8]'
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? 'bg-[#4A90E2] border-[#4A90E2]'
                    : 'border-[#3A3A3A]/20 hover:border-[#4A90E2]'
                }`}
              >
                {task.completed && <Check className="w-4 h-4 text-white" />}
              </button>
              <div className="flex-1">
                <h3
                  className={`mb-2 ${
                    task.completed ? 'line-through text-[#3A3A3A]/50' : 'text-[#3A3A3A]'
                  }`}
                >
                  {task.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm px-3 py-1 rounded-full bg-[#F5F6F8] text-[#3A3A3A]/70">
                    📍 {task.room}
                  </span>
                  <span className="text-sm px-3 py-1 rounded-full bg-[#F5F6F8] text-[#3A3A3A]/70">
                    👤 {task.assignedTo}
                  </span>
                  <span
                    className={`text-sm px-3 py-1 rounded-full border ${
                      priorityColors[task.priority]
                    }`}
                  >
                    {priorityLabels[task.priority]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="flex-shrink-0 text-[#3A3A3A]/40 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-[#F5F6F8] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-[#4A90E2]" />
          </div>
          <h3 className="text-xl text-[#3A3A3A] mb-2">Aucune tâche</h3>
          <p className="text-[#3A3A3A]/60">
            {filter === 'completed'
              ? 'Aucune tâche terminée pour le moment'
              : 'Ajoutez votre première tâche pour commencer'}
          </p>
        </div>
      )}

      <button
        onClick={onAddTask}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-[#4A90E2] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
