import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Comment fonctionne ZenMénage ?',
      answer:
        'ZenMénage est une application intuitive qui vous permet de créer, assigner et suivre toutes vos tâches ménagères. Invitez les membres de votre famille, créez des tâches, assignez-les aux membres, et suivez les progrès de chacun en temps réel. Notre système de récompenses motive même les plus jeunes !',
    },
    {
      question: 'Puis-je utiliser ZenMénage gratuitement ?',
      answer:
        'Oui ! Notre plan gratuit vous permet d\'accueillir jusqu\'à 5 membres et de créer jusqu\'à 50 tâches par mois. C\'est parfait pour tester l\'application et voir si elle convient à votre famille. Vous pouvez passer à un plan payant à tout moment pour débloquer toutes les fonctionnalités.',
    },
    {
      question: 'L\'application est-elle disponible sur mobile ?',
      answer:
        'Absolument ! ZenMénage est disponible sur iOS, Android et en version web. Toutes vos données sont synchronisées automatiquement entre tous vos appareils. Vous pouvez gérer vos tâches depuis votre téléphone, tablette ou ordinateur.',
    },
    {
      question: 'Comment inviter les membres de ma famille ?',
      answer:
        'C\'est très simple ! Allez dans la section "Famille" de votre tableau de bord, cliquez sur "Ajouter un membre", et envoyez une invitation par email. Les membres peuvent également rejoindre en scannant un code QR depuis l\'application mobile.',
    },
    {
      question: 'Puis-je personnaliser les types de tâches ?',
      answer:
        'Oui ! Vous pouvez créer des tâches personnalisées, définir leur fréquence (quotidienne, hebdomadaire, mensuelle), ajouter des notes, des photos, et même des instructions détaillées. Vous pouvez également créer des modèles de tâches pour gagner du temps.',
    },
    {
      question: 'Mes données sont-elles sécurisées ?',
      answer:
        'La sécurité de vos données est notre priorité absolue. Toutes les données sont chiffrées (SSL/TLS) et stockées sur des serveurs sécurisés conformes au RGPD. Nous ne vendons jamais vos données et vous pouvez les exporter ou les supprimer à tout moment.',
    },
    {
      question: 'Puis-je annuler mon abonnement à tout moment ?',
      answer:
        'Oui, vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte. Il n\'y a aucun engagement et aucune pénalité. Si vous annulez, vous conserverez l\'accès jusqu\'à la fin de votre période de facturation.',
    },
    {
      question: 'Proposez-vous un support client ?',
      answer:
        'Nous offrons un support par email pour tous les utilisateurs. Les abonnés Premium bénéficient d\'un support prioritaire avec des temps de réponse garantis. Nous avons également une base de connaissances complète et des tutoriels vidéo.',
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#4A90E2]/10 rounded-full text-[#4A90E2] mb-4">
            ❓ FAQ
          </div>
          <h2 className="text-4xl mb-4">Questions fréquentes</h2>
          <p className="text-xl text-[#3A3A3A]/70">
            Tout ce que vous devez savoir sur ZenMénage
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-[#F5F6F8] rounded-xl overflow-hidden border-2 border-transparent hover:border-[#4A90E2]/30 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-lg text-[#3A3A3A] pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#4A90E2] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-[#3A3A3A]/70 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center bg-gradient-to-br from-[#4A90E2]/5 to-[#357ABD]/5 rounded-2xl p-8 border-2 border-[#4A90E2]/20"
        >
          <h3 className="text-2xl text-[#3A3A3A] mb-3">
            Vous avez d'autres questions ?
          </h3>
          <p className="text-[#3A3A3A]/70 mb-6">
            Notre équipe est là pour vous aider !
          </p>
          <button className="px-6 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#4A90E2]/90 transition-all">
            Contactez le support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
