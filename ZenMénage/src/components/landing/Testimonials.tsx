import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      name: 'Sophie Martin',
      role: 'Maman de 2 enfants',
      content: 'ZenMénage a complètement transformé notre organisation familiale. Plus de disputes sur qui fait quoi ! Les enfants sont maintenant motivés et participent activement.',
      avatar: 'SM',
      rating: 5,
      color: '#4A90E2',
    },
    {
      name: 'Thomas Dubois',
      role: 'Utilisateur depuis 6 mois',
      content: 'Simple, efficace et élégant. Exactement ce qu\'il nous fallait pour gérer notre maison. L\'interface est intuitive et les statistiques nous aident à rester motivés.',
      avatar: 'TD',
      rating: 5,
      color: '#357ABD',
    },
    {
      name: 'Claire Rousseau',
      role: 'Famille de 4',
      content: 'Les enfants adorent cocher leurs tâches et gagner des badges. C\'est devenu un jeu pour eux ! Nous avons gagné tellement de temps et d\'énergie.',
      avatar: 'CR',
      rating: 5,
      color: '#2A6599',
    },
    {
      name: 'Marc Lefebvre',
      role: 'Papa solo de 3',
      content: 'En tant que parent solo, ZenMénage m\'a sauvé la vie. Tout est organisé, automatisé et je peux enfin souffler. Les rappels sont géniaux !',
      avatar: 'ML',
      rating: 5,
      color: '#4A90E2',
    },
    {
      name: 'Julie & Pierre',
      role: 'Couple avec 1 enfant',
      content: 'Nous avons retrouvé plus de temps pour nous en famille. L\'application est devenue indispensable à notre quotidien. On ne pourrait plus s\'en passer !',
      avatar: 'JP',
      rating: 5,
      color: '#357ABD',
    },
    {
      name: 'Isabelle Moreau',
      role: 'Maman de 4',
      content: 'Avec 4 enfants, l\'organisation était un cauchemar. Maintenant, chacun sait ce qu\'il a à faire et la maison est toujours nickel. Un vrai miracle !',
      avatar: 'IM',
      rating: 5,
      color: '#2A6599',
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#4A90E2]/10 rounded-full text-[#4A90E2] mb-4">
            💬 Témoignages
          </div>
          <h2 className="text-4xl mb-4">Ce que disent nos utilisateurs</h2>
          <p className="text-xl text-[#3A3A3A]/70">
            Rejoignez plus de 10 000 familles satisfaites
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-[#F5F6F8] to-white rounded-2xl p-8 hover:shadow-2xl transition-all h-full border-2 border-transparent hover:border-[#4A90E2]/20 relative overflow-hidden">
                {/* Quote icon decoration */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-16 h-16 text-[#4A90E2]" />
                </div>

                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                      >
                        <Star className="w-5 h-5 fill-[#4A90E2] text-[#4A90E2]" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-[#3A3A3A] mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#F5F6F8]">
                    <motion.div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}dd)`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="text-lg">{testimonial.avatar}</span>
                    </motion.div>
                    <div>
                      <p className="text-[#3A3A3A]">{testimonial.name}</p>
                      <p className="text-sm text-[#3A3A3A]/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>

                {/* Hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.color}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A90E2]/10 to-[#357ABD]/10 px-6 py-3 rounded-full">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#357ABD] border-2 border-white"
                />
              ))}
            </div>
            <p className="text-[#3A3A3A]">
              <span className="text-[#4A90E2]">+10 000 familles</span> nous font confiance
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
