import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function CTA({ onGetStarted }: { onGetStarted: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-[#F5F6F8] to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#4A90E2] to-[#357ABD] rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-16">
            <div className="space-y-6 text-white">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Offre de lancement</span>
                </div>
                <h2 className="text-5xl mb-4 leading-tight">
                  Prêt à transformer votre quotidien ?
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Rejoignez les milliers de familles qui ont déjà simplifié leur vie 
                  avec ZenMénage. Commencez gratuitement aujourd'hui, aucune carte bancaire requise.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={onGetStarted}
                  className="group bg-white text-[#4A90E2] px-8 py-4 rounded-xl hover:bg-white/90 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm">
                  Planifier une démo
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm">4.9/5 sur 2,847 avis</span>
                </div>
                <div className="text-sm">✓ Sans engagement</div>
                <div className="text-sm">✓ Support 24/7</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1558600622-4cbcdc7ee876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMGNsZWFuaW5nfGVufDF8fHx8MTc2MjY5OTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Happy family"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 border-2 border-[#F5F6F8]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#3A3A3A]/60">Nouveau membre</p>
                    <p className="text-[#3A3A3A]">Sophie vient de s'inscrire</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
