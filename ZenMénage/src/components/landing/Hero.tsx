import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

export function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="bg-gradient-to-b from-[#F5F6F8] to-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl">
              Organisez votre maison, simplifiez vos journées.
            </h1>
            <p className="text-xl text-[#3A3A3A]/70">
              ZenMénage vous aide à planifier, partager et suivre toutes vos tâches ménagères en famille.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-[#4A90E2] text-white px-8 py-4 rounded-xl hover:bg-[#4A90E2]/90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758272422189-b10f36fd4ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGhvbWUlMjBvcmdhbml6YXRpb258ZW58MXx8fHwxNzYyNjk4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Clean organized home"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-[#F5F6F8]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#4A90E2]/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="text-sm text-[#3A3A3A]/60">Cette semaine</p>
                  <p className="text-[#4A90E2]">24 tâches terminées</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
