import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, Sun, Sunset, Moon, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { cardapio } from '../data/cardapio';

const Cardapio = () => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const selectedDay = days[selectedDayIdx];
  const dayMenu = cardapio[selectedDay] || { cafe: 'Não disponível', almoco: 'Não disponível', lanche: 'Não disponível' };

  const refeicoes = [
    { tipo: 'Café da Manhã', descricao: dayMenu.cafe, icon: <Coffee className="w-6 h-6" />, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
    { tipo: 'Almoço', descricao: dayMenu.almoco, icon: <Sun className="w-6 h-6" />, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-100' },
    { tipo: 'Lanche da Tarde', descricao: dayMenu.lanche, icon: <Sunset className="w-6 h-6" />, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { tipo: 'Ceia', descricao: dayMenu.ceia, icon: <Moon className="w-6 h-6" />, color: 'text-violet-500', bg: 'bg-violet-50', border: 'border-violet-100' }
  ];

  const handlePrev = () => {
    setSelectedDayIdx(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setSelectedDayIdx(prev => (prev < days.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="pb-20 min-h-screen bg-slate-50 rounded-lg">
      <PageHeader title="Cardápio" icon={Utensils} />

      <div className="px-4 py-6">
        {/* Day Selector */}
        <div className="flex items-center justify-between bg-white rounded-lg p-2 shadow-sm  mb-6">
          <button 
            onClick={handlePrev}
            disabled={selectedDayIdx === 0}
            className={`p-2 rounded-xl transition-colors ${selectedDayIdx === 0 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div>
              <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                {selectedDay}-feira
              </span>
              <span className="mt-1 block text-xs font-medium text-slate-500">{dayMenu.data}</span>
            </div>
          </div>

          <button 
            onClick={handleNext}
            disabled={selectedDayIdx === days.length - 1}
            className={`p-2 rounded-xl transition-colors ${selectedDayIdx === days.length - 1 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Meals */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {dayMenu.semAula ? (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-amber-100 p-3 text-amber-700">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Não haverá aula</h3>
                      <p className="mt-1 text-sm text-slate-700">{dayMenu.observacao}</p>
                    </div>
                  </div>
                </div>
              ) : (
                refeicoes.map((meal, idx) => (
                  <div key={idx} className={`bg-white p-5 rounded-lg shadow-sm border ${meal.border}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-3 rounded-xl ${meal.bg} ${meal.color}`}>
                        {meal.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{meal.tipo}</h3>
                        <p className="text-xs text-slate-500 font-medium">Cardápio do dia</p>
                      </div>
                    </div>
                    <div className="pl-16">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {meal.descricao}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Cardapio;
