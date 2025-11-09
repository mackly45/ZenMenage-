import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const posts = [
    {
      title: '10 astuces pour motiver vos enfants à ranger',
      excerpt: 'Découvrez comment transformer le rangement en jeu amusant pour toute la famille...',
      image: 'https://images.unsplash.com/photo-1558600622-4cbcdc7ee876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMGNsZWFuaW5nfGVufDF8fHx8MTc2MjY5OTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Conseils',
      date: '5 novembre 2025',
      readTime: '5 min',
      author: 'Marie Dupont',
    },
    {
      title: 'Comment organiser une routine de ménage efficace',
      excerpt: 'Les clés d\'une maison toujours propre sans y passer des heures chaque jour...',
      image: 'https://images.unsplash.com/photo-1593136573819-c3b57b8caf29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwY2xlYW58ZW58MXx8fHwxNzYyNjk5NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Organisation',
      date: '2 novembre 2025',
      readTime: '7 min',
      author: 'Thomas Bernard',
    },
    {
      title: 'Les bienfaits d\'une maison organisée sur le bien-être',
      excerpt: 'Une étude révèle l\'impact positif d\'un environnement rangé sur la santé mentale...',
      image: 'https://images.unsplash.com/photo-1496180727794-817822f65950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwb3JnYW5pemVkfGVufDF8fHx8MTc2MjY5OTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Bien-être',
      date: '28 octobre 2025',
      readTime: '6 min',
      author: 'Claire Martin',
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
            📰 Blog
          </div>
          <h2 className="text-4xl mb-4">Conseils & Actualités</h2>
          <p className="text-xl text-[#3A3A3A]/70">
            Découvrez nos articles pour mieux organiser votre quotidien
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border-2 border-[#F5F6F8] hover:border-[#4A90E2]/30 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#4A90E2] text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-[#3A3A3A]/60 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl text-[#3A3A3A] mb-2 group-hover:text-[#4A90E2] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#3A3A3A]/70 mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-[#F5F6F8]">
                  <span className="text-sm text-[#3A3A3A]/60">Par {post.author}</span>
                  <ArrowRight className="w-5 h-5 text-[#4A90E2] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 border-2 border-[#4A90E2] text-[#4A90E2] rounded-xl hover:bg-[#4A90E2] hover:text-white transition-all">
            Voir tous les articles
          </button>
        </motion.div>
      </div>
    </section>
  );
}
