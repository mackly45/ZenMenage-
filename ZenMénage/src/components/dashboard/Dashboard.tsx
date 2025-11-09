import { useState, useEffect } from 'react';
import { Bell, Sparkles, TrendingUp, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { TaskList } from './TaskList';
import { WeeklyStats } from './WeeklyStats';
import { AddTaskModal } from './AddTaskModal';
import api from '../../services/api';

export function Dashboard({ userName }: { userName: string }) {
  const [showAddTask, setShowAddTask] = useState(false);

  const quickStats = [
    { label: 'Aujourd\'hui', value: '3/8', icon: Target, color: '#4A90E2' },
    { label: 'Cette semaine', value: '24/32', icon: TrendingUp, color: '#357ABD' },
    { label: 'Tendance', value: '+12%', icon: Sparkles, color: '#2A6599' },
  ];

  return (
    <div className="flex-1 bg-[#F5F6F8] min-h-screen">
      <header className="bg-white border-b border-[#F5F6F8] px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl text-[#3A3A3A]">Bonjour, {userName} 👋</h1>
            <p className="text-sm text-[#3A3A3A]/60">Dimanche 9 novembre 2025</p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-[#F5F6F8] rounded-lg transition-all"
          >
            <Bell className="w-6 h-6 text-[#3A3A3A]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#4A90E2] rounded-full animate-pulse" />
          </motion.button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl p-4 border-2 border-[#F5F6F8] hover:border-[#4A90E2]/30 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#3A3A3A]/60">{stat.label}</span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-2xl" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <TaskList onAddTask={() => setShowAddTask(true)} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <WeeklyStats />
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-[#4A90E2] to-[#357ABD] text-white rounded-xl p-6 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-xl">Conseil du jour</h3>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  Commencez par les tâches prioritaires le matin pour une journée plus productive !
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 border-2 border-[#F5F6F8] hover:border-[#4A90E2]/30 transition-all"
            >
              <h3 className="text-lg text-[#3A3A3A] mb-4">🎯 Objectifs de la semaine</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#3A3A3A]/70">Tâches complétées</span>
                    <span className="text-sm text-[#4A90E2]">75%</span>
                  </div>
                  <div className="w-full bg-[#F5F6F8] rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#3A3A3A]/70">Participation famille</span>
                    <span className="text-sm text-[#4A90E2]">92%</span>
                  </div>
                  <div className="w-full bg-[#F5F6F8] rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {showAddTask && <AddTaskModal onClose={() => setShowAddTask(false)} />}
    </div>
  );
}
