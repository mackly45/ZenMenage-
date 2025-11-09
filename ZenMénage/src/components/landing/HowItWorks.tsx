import { UserPlus, ListChecks, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: UserPlus,
      title: 'Créez votre compte',
      description: 'Inscrivez-vous en quelques secondes et invitez votre famille. Configuration ultra-rapide, aucune compétence technique requise.',
      step: '1',
      color: '#4A90E2',
    },
    {
      icon: ListChecks,
      title: 'Ajoutez vos tâches',
      description: 'Listez toutes vos tâches ménagères et assignez-les aux membres. Utilisez nos modèles prédéfinis pour gagner du temps.',
      step: '2',
      color: '#357ABD',
    },
    {
      icon: TrendingUp,
      title: 'Suivez vos progrès',
      description: 'Visualisez l\'avancement et motivez votre équipe familiale. Célébrez les victoires ensemble avec le système de récompenses.',
      step: '3',
      color: '#2A6599',
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-[#F5F6F8] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#4A90E2]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#4A90E2]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-white rounded-full text-[#4A90E2] mb-4 shadow-sm">
            🚀 Simple & Rapide
          </div>
          <h2 className="text-4xl mb-4">Comment ça marche</h2>
          <p className="text-xl text-[#3A3A3A]/70">
            Trois étapes simples pour une maison organisée
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <motion.div
                className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
                whileHover={{ y: -8 }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${step.color}, transparent)` }}
                />

                <div className="relative mb-6">
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                    style={{ backgroundColor: `${step.color}15` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <step.icon className="w-10 h-10" style={{ color: step.color }} />
                  </motion.div>
                  <motion.div
                    className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: step.color }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.3, type: 'spring' }}
                  >
                    <span className="text-xl">{step.step}</span>
                  </motion.div>
                </div>

                <h3 className="text-2xl mb-3 group-hover:text-[#4A90E2] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[#3A3A3A]/70 leading-relaxed">{step.description}</p>

                {/* Progress indicator */}
                <div className="mt-6 pt-6 border-t border-[#F5F6F8]">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[#F5F6F8] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: step.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '100%' } : {}}
                        transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                      />
                    </div>
                    <span className="text-xs text-[#3A3A3A]/60">Étape {step.step}/3</span>
                  </div>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-4 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.6 }}
                >
                  <div className="w-8 h-8 bg-[#4A90E2]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#4A90E2] rounded-full" />
                  </div>
                  <div className="absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-[#4A90E2]/30 to-transparent" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white rounded-2xl p-6 shadow-lg">
            <p className="text-[#3A3A3A]/70 mb-2">
              ⚡ En moyenne, nos utilisateurs sont opérationnels en
            </p>
            <p className="text-4xl text-[#4A90E2]">
              moins de 5 minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
