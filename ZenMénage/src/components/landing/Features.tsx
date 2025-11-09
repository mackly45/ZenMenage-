import { Calendar, Users, BarChart3, Zap, Bell, Award, Shield, Smartphone, Cloud } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const mainFeatures = [
    {
      icon: Calendar,
      title: 'Planifier',
      description: 'Organisez vos tâches quotidiennes et hebdomadaires avec un calendrier intuitif.',
      color: '#4A90E2',
    },
    {
      icon: Users,
      title: 'Partager',
      description: 'Assignez des tâches à chaque membre de la famille et collaborez efficacement.',
      color: '#4A90E2',
    },
    {
      icon: BarChart3,
      title: 'Suivre',
      description: 'Visualisez vos progrès et célébrez vos accomplissements semaine après semaine.',
      color: '#4A90E2',
    },
  ];

  const additionalFeatures = [
    {
      icon: Zap,
      title: 'Automatisation intelligente',
      description: 'Créez des routines récurrentes automatiquement',
    },
    {
      icon: Bell,
      title: 'Rappels personnalisés',
      description: 'Recevez des notifications au bon moment',
    },
    {
      icon: Award,
      title: 'Système de récompenses',
      description: 'Motivez toute la famille avec des badges',
    },
    {
      icon: Shield,
      title: 'Sécurité garantie',
      description: 'Vos données sont protégées et chiffrées',
    },
    {
      icon: Smartphone,
      title: 'Multi-plateformes',
      description: 'Disponible sur iOS, Android et Web',
    },
    {
      icon: Cloud,
      title: 'Synchronisation cloud',
      description: 'Accédez à vos données partout, tout le temps',
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#4A90E2]/10 rounded-full text-[#4A90E2] mb-4">
            ✨ Fonctionnalités
          </div>
          <h2 className="text-4xl mb-4">Tout ce dont vous avez besoin</h2>
          <p className="text-xl text-[#3A3A3A]/70">
            Des fonctionnalités pensées pour simplifier votre quotidien
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gradient-to-br from-[#F5F6F8] to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#4A90E2]/20"
            >
              <motion.div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative"
                style={{ backgroundColor: `${feature.color}15` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                <div className="absolute inset-0 bg-[#4A90E2] opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
              </motion.div>
              <h3 className="text-2xl mb-3 group-hover:text-[#4A90E2] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#3A3A3A]/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-[#F5F6F8] to-white rounded-3xl p-8 md:p-12 border-2 border-[#4A90E2]/10"
        >
          <h3 className="text-3xl text-center mb-12">Et bien plus encore...</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#4A90E2]/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#4A90E2]" />
                </div>
                <div>
                  <h4 className="text-[#3A3A3A] mb-1">{feature.title}</h4>
                  <p className="text-sm text-[#3A3A3A]/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
