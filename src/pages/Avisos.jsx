import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { avisos } from '../data/avisos';

export default function Avisos() {
  const [filter, setFilter] = useState('Todos');
  const tabs = ['Todos', 'Geral', 'Turma', 'Urgente'];

  const filteredAvisos = avisos?.filter(aviso => {
    if (filter === 'Todos') return true;
    if (filter === 'Urgente') return aviso.urgency === 'Urgente';
    return aviso.type === filter;
  }) || [];

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20">
      <PageHeader icon={Megaphone} title="Avisos e Comunicados" subtitle="Fique por dentro das novidades da escola" />
      
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex overflow-x-auto gap-2 pb-2 mb-4 scrollbar-hide">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === tab ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
          {filteredAvisos.map(aviso => (
            <motion.div key={aviso.id} variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {aviso.destaque && (
                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full uppercase">Novo</span>
                  )}
                  {aviso.urgency === 'Urgente' && (
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full uppercase">Urgente</span>
                  )}
                  {aviso.type === 'Turma' && (
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full uppercase">Turma</span>
                  )}
                  {aviso.type === 'Geral' && (
                    <span className="bg-teal-100 text-teal-600 text-xs font-bold px-2 py-0.5 rounded-full uppercase">Geral</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{aviso.title}</h3>
                <p className="text-slate-600 text-sm mb-3">{aviso.description}</p>
                <div className="flex items-center text-slate-400 text-xs font-medium">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {aviso.date}
                </div>
              </div>
              <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors self-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
          {filteredAvisos.length === 0 && (
            <div className="text-center py-10 text-slate-500">Nenhum aviso encontrado para este filtro.</div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
