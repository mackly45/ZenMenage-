import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

export function WeeklyStats() {
  const data = [
    { name: 'Terminées', value: 24, color: '#4A90E2' },
    { name: 'En cours', value: 8, color: '#F5F6F8' },
  ];

  const totalTasks = data.reduce((sum, item) => sum + item.value, 0);
  const completedPercentage = Math.round((data[0].value / totalTasks) * 100);

  return (
    <div className="bg-white border-2 border-[#F5F6F8] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-[#3A3A3A]">Progrès hebdomadaire</h3>
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm">+12%</span>
        </div>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-4xl text-[#4A90E2]">{completedPercentage}%</div>
            <div className="text-sm text-[#3A3A3A]/60">Complétées</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-[#3A3A3A]/60">{item.name}</span>
            </div>
            <div className="text-2xl text-[#3A3A3A]">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-[#F5F6F8]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#3A3A3A]/60">Objectif hebdomadaire</span>
          <span className="text-sm text-[#4A90E2]">75%</span>
        </div>
        <div className="w-full bg-[#F5F6F8] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#4A90E2] h-full rounded-full transition-all duration-500"
            style={{ width: `${completedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
