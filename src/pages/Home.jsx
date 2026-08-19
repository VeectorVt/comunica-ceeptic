import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Megaphone, UtensilsCrossed, CalendarDays, GraduationCap, 
  MapPin, Users, PartyPopper, Search, Phone, Calendar
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { avisos } from '../data/avisos';

const features = [
  { id: 'avisos', title: 'Avisos', icon: Megaphone, desc: 'Comunicados e notícias', color: 'bg-blue-100 text-blue-600', link: '/avisos' },
  { id: 'cardapio', title: 'Cardápio', icon: UtensilsCrossed, desc: 'Menu da merenda escolar', color: 'bg-orange-100 text-orange-600', link: '/cardapio' },
  { id: 'calendario', title: 'Calendário', icon: CalendarDays, desc: 'Eventos e datas letivas', color: 'bg-teal-100 text-teal-600', link: '/calendario' },
  { id: 'grade', title: 'Grade', icon: GraduationCap, desc: 'Horários das turmas', color: 'bg-blue-100 text-blue-600', link: '/grade' },
  { id: 'mapa', title: 'Mapa', icon: MapPin, desc: 'Encontre salas e labs', color: 'bg-red-100 text-red-600', link: '/mapa' },
  { id: 'professores', title: 'Professores', icon: Users, desc: 'Corpo docente', color: 'bg-teal-100 text-teal-600', link: '/professores' },
  { id: 'eventos', title: 'Eventos', icon: PartyPopper, desc: 'Festas e feiras', color: 'bg-orange-100 text-orange-600', link: '/eventos' },
  { id: 'achados', title: 'Achados e Perdidos', icon: Search, desc: 'Itens esquecidos', color: 'bg-blue-100 text-blue-600', link: '/achados-perdidos' },
  { id: 'contatos', title: 'Contatos', icon: Phone, desc: 'Telefones úteis', color: 'bg-teal-100 text-teal-600', link: '/contatos' }
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const recentAvisos = avisos?.slice(0, 3) || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <div className="relative bg-gradient-to-r from-blue-600 via-teal-500 to-blue-700 pt-16 pb-24 px-4 overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-teal-300 blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Bem-vindo ao Comunica CEEPTIC</h1>
          <p className="text-blue-50 mb-8 text-lg md:text-xl">Sua central de informações do CEEP TIC de Lauro de Freitas</p>
          <SearchBar />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {features.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Link to={item.link} className="block bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 hover:scale-[1.02]">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 px-1">Avisos Recentes</h2>
          <div className="space-y-3">
            {recentAvisos.map(aviso => (
              <div key={aviso.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${aviso.urgency === 'Urgente' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                      {aviso.type}
                    </span>
                    {aviso.urgency === 'Urgente' && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">Urgente</span>
                    )}
                  </div>
                  <h4 className="font-medium text-slate-800">{aviso.title}</h4>
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {aviso.date}
                </div>
              </div>
            ))}
            {recentAvisos.length === 0 && (
              <div className="text-slate-500 text-sm px-2">Nenhum aviso no momento.</div>
            )}
          </div>
          <Link to="/avisos" className="block text-center text-blue-600 font-medium mt-4 text-sm hover:underline">
            Ver todos os avisos
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
