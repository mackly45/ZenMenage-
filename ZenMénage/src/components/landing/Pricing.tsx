import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';

export function Pricing({ onGetStarted }: { onGetStarted: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const plans = [
    {
      name: 'Gratuit',
      price: '0€',
      period: 'pour toujours',
      description: 'Parfait pour débuter et tester ZenMénage',
      features: [
        'Jusqu\'à 5 membres',
        '50 tâches par mois',
        'Statistiques basiques',
        'Support par email',
        'Application mobile',
      ],
      cta: 'Commencer gratuitement',
      popular: false,
    },
    {
      name: 'Famille',
      price: '9.90€',
      period: 'par mois',
      description: 'Idéal pour les familles qui veulent s\'organiser',
      features: [
        'Membres illimités',
        'Tâches illimitées',
        'Statistiques avancées',
        'Support prioritaire',
        'Rappels personnalisés',
        'Calendrier partagé',
        'Récompenses & badges',
      ],
      cta: 'Essayer 14 jours gratuits',
      popular: true,
    },
    {
      name: 'Premium',
      price: '19.90€',
      period: 'par mois',
      description: 'Pour les familles qui veulent le meilleur',
      features: [
        'Tout de Famille, plus :',
        'Multi-foyers',
        'Intégrations (Google, Alexa)',
        'Assistance personnelle',
        'Rapports mensuels détaillés',
        'Accès anticipé aux nouveautés',
        'Formation vidéo exclusive',
      ],
      cta: 'Essayer 14 jours gratuits',
      popular: false,
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-[#F5F6F8]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#4A90E2]/10 rounded-full text-[#4A90E2] mb-4">
            💎 Tarifs transparents
          </div>
          <h2 className="text-4xl mb-4">
            Choisissez le plan parfait pour votre famille
          </h2>
          <p className="text-xl text-[#3A3A3A]/70">
            Aucune carte bancaire requise • Annulez à tout moment
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.popular
                  ? 'border-4 border-[#4A90E2] shadow-2xl scale-105'
                  : 'border-2 border-[#F5F6F8] hover:border-[#4A90E2]/30'
              } transition-all hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Plus populaire</span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl text-[#3A3A3A] mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl text-[#4A90E2]">{plan.price}</span>
                  <span className="text-[#3A3A3A]/60">/ {plan.period}</span>
                </div>
                <p className="text-sm text-[#3A3A3A]/70">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-[#4A90E2]/10 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-[#4A90E2]" />
                    </div>
                    <span className="text-[#3A3A3A]/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onGetStarted}
                className={`w-full py-4 rounded-xl transition-all ${
                  plan.popular
                    ? 'bg-[#4A90E2] text-white hover:bg-[#4A90E2]/90 shadow-lg hover:shadow-xl'
                    : 'bg-[#F5F6F8] text-[#3A3A3A] hover:bg-[#4A90E2]/10 hover:text-[#4A90E2]'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-[#3A3A3A]/70">
            🏢 Vous êtes une entreprise ou une association ?{' '}
            <a href="#" className="text-[#4A90E2] hover:underline">
              Contactez-nous pour une offre sur mesure
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
