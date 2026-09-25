import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Map, Calendar, Utensils, BookOpen, ChevronRight, AlertTriangle } from 'lucide-react';
import { avisos } from '../data/avisos';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    { icon: <Bell className="w-6 h-6" />, title: 'Avisos', path: '/avisos', color: 'bg-blue-100 text-blue-600' },
    { icon: <Utensils className="w-6 h-6" />, title: 'Cardápio', path: '/cardapio', color: 'bg-orange-100 text-orange-600' },
    { icon: <Calendar className="w-6 h-6" />, title: 'Calendário', path: '/calendario', color: 'bg-teal-100 text-teal-600' },
    { icon: <BookOpen className="w-6 h-6" />, title: 'Grade de Aulas', path: '/grade', color: 'bg-indigo-100 text-indigo-600' },
    { icon: <Map className="w-6 h-6" />, title: 'Mapa', path: '/mapa', color: 'bg-emerald-100 text-emerald-600' },
  ];

  const recentAvisos = avisos.slice(0, 3);

  return (
    <div className="pb-20 min-h-screen">
      {/* Hero Banner */}
      <div className="relative px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-lg overflow-hidden bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-700/60">

        <div className="relative z-10 flex justify-between items-center mb-6 text-white">
          <div>
            <h1 className="text-2xl font-bold drop-shadow">Bem-vindo! 👋</h1>
            <p className="text-blue-100 mt-1 drop-shadow">CEEPTIC – Lauro de Freitas</p>
          </div>
          <img
            src="/logo_ceeptic.png"
            alt="Logo CEEPTIC"
            className="w-14 h-14 rounded-full object-cover shadow-lg border-2 border-white/40"
          />
        </div>

        {/* Search Bar */}
        <div className="relative z-10">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar avisos, locais..."
            className="w-full bg-white text-slate-800 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>


      <div className="px-6 mt-8">
        {/* Features Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {features.slice(0, 4).map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(feature.path)}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${feature.color}`}>
                {feature.icon}
              </div>
              <span className="text-xs font-medium text-slate-600 text-center">{feature.title}</span>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {features.slice(4).map((feature, idx) => (
             <motion.div
             key={idx}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => navigate(feature.path)}
             className="flex flex-col items-center gap-2 cursor-pointer"
           >
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${feature.color}`}>
               {feature.icon}
             </div>
             <span className="text-xs font-medium text-slate-600 text-center">{feature.title}</span>
           </motion.div>
          ))}
        </div>

        {/* Recent Avisos */}
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-slate-800">Avisos Recentes</h2>
          <button onClick={() => navigate('/avisos')} className="text-sm font-medium text-blue-600 flex items-center">
            Ver todos <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="space-y-4">
          {recentAvisos.map((aviso) => (
            <motion.div
              key={aviso.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg shadow-sm border ${
                aviso.categoria === 'Urgente' ? 'bg-red-50 border-red-100' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {aviso.categoria === 'Urgente' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    aviso.categoria === 'Urgente' ? 'bg-red-100 text-red-700' :
                    aviso.categoria === 'Turma' ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {aviso.categoria}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">{aviso.data}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">{aviso.titulo}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{aviso.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
