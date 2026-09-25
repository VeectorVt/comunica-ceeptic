import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, Info, Users, Filter } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { avisos } from '../data/avisos';

const Avisos = () => {
  const [filter, setFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categorias = ['Todos', 'Geral', 'Turma', 'Urgente'];

  const filteredAvisos = avisos.filter(aviso => {
    const matchesFilter = filter === 'Todos' || aviso.categoria === filter;
    const matchesSearch = aviso.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          aviso.descricao.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (categoria) => {
    switch(categoria) {
      case 'Urgente': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'Turma': return <Users className="w-5 h-5 text-purple-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBadgeStyle = (categoria) => {
    switch(categoria) {
      case 'Urgente': return 'bg-red-100 text-red-700';
      case 'Turma': return 'bg-purple-100 text-purple-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-slate-50 rounded-lg">
      <PageHeader title="Mural de Avisos" icon={Info} />

      <div className="px-4 py-4 sticky top-[72px] bg-slate-50 z-10">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar avisos..."
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4">
        <AnimatePresence>
          {filteredAvisos.map(aviso => (
            <motion.div
              key={aviso.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white p-5 rounded-lg shadow-sm border ${
                aviso.categoria === 'Urgente' ? 'border-red-200' : 'border-slate-100'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    aviso.categoria === 'Urgente' ? 'bg-red-50' :
                    aviso.categoria === 'Turma' ? 'bg-purple-50' : 'bg-blue-50'
                  }`}>
                    {getIcon(aviso.categoria)}
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${getBadgeStyle(aviso.categoria)}`}>
                    {aviso.categoria}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-400">{aviso.data}</span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">{aviso.titulo}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{aviso.descricao}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredAvisos.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Nenhum aviso encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avisos;
