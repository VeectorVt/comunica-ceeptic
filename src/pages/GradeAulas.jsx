import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { turmas } from '../data/turmas';
import { grades } from '../data/grades';

export default function GradeAulas() {
  const [selectedTurma, setSelectedTurma] = useState('');

  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const horarios = ['07:30', '08:20', '09:10', '10:00 (Intervalo)', '10:20', '11:10', '12:00'];

  const gradeAtual = grades?.[selectedTurma];

  const getSubjectColor = (type) => {
    if (type === 'technical') return 'bg-teal-50 text-teal-700 border-teal-100';
    if (type === 'physical') return 'bg-orange-50 text-orange-700 border-orange-100';
    if (type === 'break') return 'bg-slate-100 text-slate-500 border-slate-200';
    return 'bg-blue-50 text-blue-700 border-blue-100';
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20">
      <PageHeader icon={GraduationCap} title="Grade de Aulas" subtitle="Consulte os horários e disciplinas da sua turma" />
      
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Selecione sua turma</label>
          <div className="relative">
            <select 
              value={selectedTurma} 
              onChange={(e) => setSelectedTurma(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
            >
              <option value="" disabled>Escolha uma turma...</option>
              {turmas?.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedTurma && gradeAtual ? (
            <motion.div 
              key={selectedTurma}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-center w-24">Horário</th>
                      {dias.map(d => <th key={d} className="px-4 py-3 font-semibold text-center min-w-[120px]">{d}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {horarios.map((hora, rowIdx) => (
                      <tr key={hora}>
                        <td className="px-4 py-3 font-medium text-slate-500 text-center whitespace-nowrap bg-slate-50">{hora}</td>
                        {dias.map((dia, colIdx) => {
                          const isBreak = hora.includes('Intervalo');
                          const cellData = isBreak ? { subject: 'Intervalo', type: 'break' } : gradeAtual[dia]?.[rowIdx - (rowIdx > 3 ? 1 : 0)];
                          
                          if (isBreak) {
                            if (colIdx === 0) return <td key={dia} colSpan={5} className="px-4 py-2 text-center text-slate-400 bg-slate-50 font-medium tracking-widest uppercase text-xs border-y border-slate-200">Intervalo</td>;
                            return null;
                          }

                          return (
                            <td key={dia} className="p-1">
                              {cellData ? (
                                <div className={`h-full flex flex-col justify-center items-center p-2 rounded-lg border text-center ${getSubjectColor(cellData.type)}`}>
                                  <span className="font-bold block leading-tight mb-1">{cellData.subject}</span>
                                  {cellData.teacher && <span className="text-[10px] opacity-80 uppercase tracking-wide">{cellData.teacher}</span>}
                                </div>
                              ) : (
                                <div className="h-full min-h-[60px] bg-slate-50 rounded-lg border border-dashed border-slate-200"></div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : selectedTurma ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-500">Grade não disponível para esta turma.</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
