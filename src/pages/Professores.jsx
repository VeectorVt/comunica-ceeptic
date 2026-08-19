import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Book } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { professores } from '../data/professores';

export default function Professores() {
  const [filtro, setFiltro] = useState('Todas');
  
  const disciplinas = ['Todas', ...new Set(professores.map(p => p.disciplina))];
  
  const professoresFiltrados = filtro === 'Todas' 
    ? professores 
    : professores.filter(p => p.disciplina === filtro);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getInitials = (name) => {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="pb-24 lg:pb-8">
      <PageHeader icon={Users} title="Professores e Disciplinas" />
      
      <div className="px-4 mt-6">
        <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
          {disciplinas.map(d => (
            <button
              key={d}
              onClick={() => setFiltro(d)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                filtro === d 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
        >
          {professoresFiltrados.map((prof) => (
            <motion.div
              key={prof.id}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col h-full transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white text-xl font-bold shadow-inner">
                  {getInitials(prof.nome)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{prof.nome}</h3>
                  <div className="flex items-center text-teal-600 text-sm font-medium mt-1">
                    <Book className="w-4 h-4 mr-1" />
                    {prof.disciplina}
                  </div>
                </div>
              </div>
              
              <div className="mt-2 mb-4 flex-grow">
                <p className="text-sm text-slate-500 mb-2">Turmas:</p>
                <div className="flex flex-wrap gap-2">
                  {prof.turmas.map(turma => (
                    <span key={turma} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium">
                      {turma}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center text-slate-500 text-sm border-t border-slate-100 pt-4 mt-auto">
                <Mail className="w-4 h-4 mr-2" />
                <span className="truncate">{prof.email}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
