import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, X, Bell, Map, Calendar, Utensils, BookOpen, ChevronRight, AlertTriangle } from 'lucide-react';
import { avisos } from '../data/avisos';
import { locais } from '../data/mapa';

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
  const normalizedQuery = searchQuery.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const matchingAvisos = avisos.filter((aviso) =>
    [aviso.titulo, aviso.descricao, aviso.categoria]
      .some((value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedQuery))
  );
  const matchingLocais = locais.filter((local) =>
    [local.nome, local.descricao]
      .some((value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedQuery))
  );
  const hasSearchQuery = normalizedQuery.length > 0;

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
            className="w-full bg-white text-slate-800 rounded-2xl py-4 pl-12 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar avisos e locais"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Limpar busca"
              className="absolute inset-y-0 right-3 flex items-center p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>


      <div className="relative z-20 mt-5 px-4 sm:px-6">
        <div className="grid grid-cols-5 gap-1 rounded-xl border border-white/60  px-2 py-3 shadow-md backdrop-blur">
          {features.map((feature, idx) => (
            <motion.button
              key={feature.path}
              type="button"
              whileHover={{ y: -5, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(feature.path)}
              className="flex min-w-0 flex-col items-center gap-2 rounded-lg py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${feature.color}`}>
                {feature.icon}
              </span>
              <span className="text-center text-[11px] font-medium leading-tight text-slate-600">{feature.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-8">
        {hasSearchQuery ? (
          <section aria-live="polite">
            <h2 className="text-lg font-bold text-slate-800">Resultados da busca</h2>
            {matchingAvisos.length > 0 && (
              <div className="mt-4 space-y-3">
                <h3 className="text-sm font-semibold text-slate-500">Avisos</h3>
                {matchingAvisos.map((aviso) => (
                  <button
                    key={aviso.id}
                    type="button"
                    onClick={() => navigate('/avisos')}
                    className="w-full rounded-lg border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-blue-200"
                  >
                    <span className="text-sm font-bold text-slate-800">{aviso.titulo}</span>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">{aviso.descricao}</p>
                    <span className="mt-2 inline-block text-xs font-medium text-blue-600">{aviso.categoria} · {aviso.data}</span>
                  </button>
                ))}
              </div>
            )}
            {matchingLocais.length > 0 && (
              <div className="mt-5 space-y-3">
                <h3 className="text-sm font-semibold text-slate-500">Locais</h3>
                {matchingLocais.map((local) => (
                  <button
                    key={local.id}
                    type="button"
                    onClick={() => navigate('/mapa')}
                    className="w-full rounded-lg border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-emerald-200"
                  >
                    <span className="text-sm font-bold text-slate-800">{local.nome}</span>
                    <p className="mt-1 text-xs text-slate-600">{local.descricao}</p>
                  </button>
                ))}
              </div>
            )}
            {matchingAvisos.length === 0 && matchingLocais.length === 0 && (
              <p className="mt-3 rounded-lg bg-white p-4 text-sm text-slate-500">Nenhum aviso ou local encontrado.</p>
            )}
          </section>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
