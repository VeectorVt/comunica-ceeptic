import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mail, BookOpen, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { professores } from '../data/professores';

export default function Professores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisciplina, setSelectedDisciplina] = useState('Todas');

  const disciplinas = ['Todas', ...new Set(professores.map(p => p.disciplina))];

  const filteredProfessores = professores.filter(prof => {
    const matchesSearch = prof.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDisciplina = selectedDisciplina === 'Todas' || prof.disciplina === selectedDisciplina;
    return matchesSearch && matchesDisciplina;
  });

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="pb-20">
      <PageHeader title="Professores" subtitle="Corpo docente da escola" icon={Users} />

      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {disciplinas.map(disc => (
            <button
              key={disc}
              onClick={() => setSelectedDisciplina(disc)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedDisciplina === disc
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {disc}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence>
            {filteredProfessores.map((prof, index) => (
              <motion.div
                key={prof.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-white rounded-lg p-5 shadow-sm border border-slate-100 flex flex-col h-full min-w-0 overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                    {getInitials(prof.nome)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{prof.nome}</h3>
                    <div className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
                      <BookOpen className="w-4 h-4" />
                      {prof.disciplina}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 flex-1 flex flex-col justify-end">
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {prof.turmas.map(turma => (
                        <span key={turma} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">
                          {turma}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`mailto:${prof.email}`}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 w-full justify-center mt-2"
                  >
                    <Mail className="w-4 h-4" />
                    {prof.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProfessores.length === 0 && (
            <div className="text-center py-10 text-slate-500 sm:col-span-2">
              Nenhum professor encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
