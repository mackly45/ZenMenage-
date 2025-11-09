import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '10K+', label: 'Familles actives', color: '#4A90E2' },
    { value: '500K+', label: 'Tâches complétées', color: '#4A90E2' },
    { value: '98%', label: 'Satisfaction client', color: '#4A90E2' },
    { value: '24/7', label: 'Support disponible', color: '#4A90E2' },
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-[#4A90E2] to-[#357ABD] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl text-white mb-4">
            Des résultats qui parlent d'eux-mêmes
          </h2>
          <p className="text-xl text-white/80">
            Rejoignez une communauté grandissante de foyers organisés
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="text-5xl text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-white/80">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
