import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const links = {
    Produit: ['Fonctionnalités', 'Tarifs', 'Témoignages', 'Changelog', 'Roadmap'],
    Entreprise: ['À propos', 'Blog', 'Carrières', 'Presse', 'Partenaires'],
    Support: ['Centre d\'aide', 'Contact', 'FAQ', 'Tutoriels', 'Statut'],
    Légal: ['Confidentialité', 'Conditions', 'Mentions légales', 'Cookies', 'RGPD'],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#3A3A3A] to-[#2A2A2A] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-6 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                className="w-12 h-12 bg-[#4A90E2] rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Home className="w-7 h-7 text-white" />
              </motion.div>
              <span className="text-2xl">ZenMénage</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Rendez votre maison zen, un geste à la fois. L'application de gestion 
              des tâches ménagères préférée des familles françaises.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-[#4A90E2]" />
                <span>Paris, France</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 text-[#4A90E2]" />
                <span>contact@zenmenage.fr</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 text-[#4A90E2]" />
                <span>+33 1 23 45 67 89</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 hover:bg-[#4A90E2] rounded-lg flex items-center justify-center transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="mb-4 text-white">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/70 hover:text-[#4A90E2] transition-colors inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © 2025 ZenMénage. Tous droits réservés. Fait avec ❤️ à Paris.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                🇫🇷 Français
              </a>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/60">Tous les systèmes opérationnels</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg mb-2">📧 Restez informé·e</h4>
                <p className="text-sm text-white/70">
                  Recevez nos actualités, conseils et offres exclusives
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#4A90E2] flex-1 md:w-64"
                />
                <button className="px-6 py-2 bg-[#4A90E2] hover:bg-[#4A90E2]/90 rounded-lg transition-all whitespace-nowrap">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
