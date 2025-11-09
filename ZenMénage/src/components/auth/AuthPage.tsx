import { useState } from 'react';
import { Home, Mail, Lock } from 'lucide-react';

export function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6F8] to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#4A90E2] rounded-xl flex items-center justify-center">
              <Home className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl text-[#3A3A3A]">ZenMénage</span>
          </div>
          <p className="text-[#3A3A3A]/70">
            Rendez votre maison zen, un geste à la fois.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg transition-all ${
                isLogin
                  ? 'bg-[#4A90E2] text-white'
                  : 'bg-[#F5F6F8] text-[#3A3A3A] hover:bg-[#F5F6F8]/70'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg transition-all ${
                !isLogin
                  ? 'bg-[#4A90E2] text-white'
                  : 'bg-[#F5F6F8] text-[#3A3A3A] hover:bg-[#F5F6F8]/70'
              }`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block mb-2 text-sm text-[#3A3A3A]">Nom complet</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F6F8] border border-transparent focus:border-[#4A90E2] focus:outline-none transition-all"
                  placeholder="Sophie Martin"
                />
              </div>
            )}
            <div>
              <label className="block mb-2 text-sm text-[#3A3A3A]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3A3A]/40" />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#F5F6F8] border border-transparent focus:border-[#4A90E2] focus:outline-none transition-all"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm text-[#3A3A3A]">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3A3A]/40" />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#F5F6F8] border border-transparent focus:border-[#4A90E2] focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#4A90E2] text-white py-3 rounded-lg hover:bg-[#4A90E2]/90 transition-all shadow-lg hover:shadow-xl"
            >
              {isLogin ? 'Se connecter' : 'Créer un compte'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F5F6F8]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#3A3A3A]/60">Ou continuer avec</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-[#F5F6F8] rounded-lg hover:bg-[#F5F6F8]/50 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-[#F5F6F8] rounded-lg hover:bg-[#F5F6F8]/50 transition-all">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
