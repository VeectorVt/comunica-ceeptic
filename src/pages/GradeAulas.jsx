import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { turmas } from '../data/turmas';
import { grades } from '../data/grades';

const GradeAulas = () => {
  const [selectedTurma, setSelectedTurma] = useState(turmas[0]?.codigo || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTurmas = turmas.filter(t => 
    t.nome_completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.codigo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gradeAtual = grades[selectedTurma];

  return (
    <div className="pb-20 min-h-screen bg-slate-50">
      <PageHeader title="Grade de Aulas" icon={BookOpen} />

      <div className="px-4 py-6">
        {/* Turma Selector */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">Selecione sua Turma</label>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar turma..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select 
            value={selectedTurma}
            onChange={(e) => setSelectedTurma(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            {filteredTurmas.map(t => (
              <option key={t.codigo} value={t.codigo}>{t.nome_completo}</option>
            ))}
          </select>
        </div>

        {/* Grade Table */}
        {gradeAtual ? (
          <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-blue-600 p-4 text-white">
              <h2 className="font-bold text-lg">{gradeAtual.nome}</h2>
              <p className="text-blue-100 text-sm">Horário de Aulas</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 border-b border-slate-100">
                    <th className="p-3 font-bold whitespace-nowrap">Horário</th>
                    <th className="p-3 font-bold">Seg</th>
                    <th className="p-3 font-bold">Ter</th>
                    <th className="p-3 font-bold">Qua</th>
                    <th className="p-3 font-bold">Qui</th>
                    <th className="p-3 font-bold">Sex</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {gradeAtual.horarios.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-500 whitespace-nowrap">{row.horario}</td>
                      <td className="p-3">{row.segunda}</td>
                      <td className="p-3">{row.terca}</td>
                      <td className="p-3">{row.quarta}</td>
                      <td className="p-3">{row.quinta}</td>
                      <td className="p-3">{row.sexta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Selecione uma turma para ver a grade.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeAulas;
