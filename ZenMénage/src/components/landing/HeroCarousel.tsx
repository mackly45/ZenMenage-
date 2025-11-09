import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1758272422189-b10f36fd4ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGhvbWUlMjBvcmdhbml6YXRpb258ZW58MXx8fHwxNzYyNjk4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Un foyer organisé',
    subtitle: 'Pour une vie plus sereine',
  },
  {
    url: 'https://images.unsplash.com/photo-1593136573819-c3b57b8caf29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwY2xlYW58ZW58MXx8fHwxNzYyNjk5NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Une cuisine impeccable',
    subtitle: 'Chaque jour, sans effort',
  },
  {
    url: 'https://images.unsplash.com/photo-1496180727794-817822f65950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwb3JnYW5pemVkfGVufDF8fHx8MTc2MjY5OTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Un salon accueillant',
    subtitle: 'Toujours prêt à recevoir',
  },
  {
    url: 'https://images.unsplash.com/photo-1718939045285-b67f9e9f9f8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbml6ZWQlMjBiZWRyb29tJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NjI2OTk1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Des chambres zen',
    subtitle: 'Pour un repos mérité',
  },
];

export function HeroCarousel({ onGetStarted }: { onGetStarted: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#F5F6F8] to-white py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-[#4A90E2]/10 rounded-full text-[#4A90E2] mb-4"
            >
              ✨ Nouveau : Version 2.0 disponible
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl leading-tight"
            >
              Organisez votre maison, <br />
              <span className="text-[#4A90E2]">simplifiez</span> vos journées.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-[#3A3A3A]/70 leading-relaxed"
            >
              ZenMénage transforme la gestion de votre foyer en une expérience collaborative 
              et agréable. Planifiez, partagez et suivez toutes vos tâches ménagères en famille.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={onGetStarted}
                className="group bg-[#4A90E2] text-white px-8 py-4 rounded-xl hover:bg-[#4A90E2]/90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-xl border-2 border-[#3A3A3A]/10 hover:border-[#4A90E2] hover:bg-[#4A90E2]/5 transition-all">
                Voir la démo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#357ABD] border-2 border-white flex items-center justify-center text-white text-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-[#3A3A3A]">
                  Plus de <span className="text-[#4A90E2]">10 000+</span> familles nous font confiance
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                  className="relative"
                >
                  <ImageWithFallback
                    src={images[currentIndex].url}
                    alt={images[currentIndex].title}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl mb-2"
                    >
                      {images[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-white/90"
                    >
                      {images[currentIndex].subtitle}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-[#3A3A3A]" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-[#3A3A3A]" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-white'
                        : 'w-1.5 bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#F5F6F8]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#4A90E2] to-[#357ABD] rounded-xl flex items-center justify-center">
                  <span className="text-3xl">✓</span>
                </div>
                <div>
                  <p className="text-sm text-[#3A3A3A]/60">Cette semaine</p>
                  <p className="text-2xl text-[#4A90E2]">2,847</p>
                  <p className="text-xs text-[#3A3A3A]/60">tâches terminées</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-[#4A90E2]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#4A90E2]/5 rounded-full blur-3xl" />
    </section>
  );
}
