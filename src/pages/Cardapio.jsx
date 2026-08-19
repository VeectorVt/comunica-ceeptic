import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, Coffee, Cookie, Info } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { cardapio } from '../data/cardapio';

export default function Cardapio() {
  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  // Hoje = 1 (Segunda) to 5 (Sexta), fallback to 0 se fim de semana
  const dayIndex = new Date().getDay();
  const initialTab = (dayIndex >= 1 && dayIndex <= 5) ? dias[dayIndex - 1] : 'Segunda';
  
  const [selectedDay, setSelectedDay] = useState(initialTab);

  const getMealIcon = (type) => {
    if (type.includes('Café')) return Coffee;
    if (type.includes('Almoço')) return UtensilsCrossed;
    return Cookie;
  };

  const getMealColor = (type) => {
    if (type.includes('Café')) return 'text-orange-500 bg-orange-50';
    if (type.includes('Almoço')) return 'text-red-500 bg-red-50';
    return 'text-teal-500 bg-teal-50';
  };

  const menuDoDia = cardapio?.[selectedDay] || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20">
      <PageHeader icon={UtensilsCrossed} title="Cardápio da Merenda" subtitle="Confira as refeições servidas na escola" />
      
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide gap-2">
          {dias.map(dia => (
            <button
              key={dia}
              onClick={() => setSelectedDay(dia)}
              className={`flex-1 min-w-[80px] py-3 px-4 rounded-xl font-medium text-sm text-center transition-all ${
                selectedDay === dia 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {dia}
            </button>
          ))}
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {menuDoDia.length > 0 ? (
                menuDoDia.map((refeicao, index) => {
                  const Icon = getMealIcon(refeicao.tipo);
                  const colorClass = getMealColor(refeicao.tipo);
                  return (
                    <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{refeicao.tipo}</h3>
                        <p className="text-slate-600">{refeicao.descricao}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
                  <UtensilsCrossed className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Cardápio não disponível para este dia.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">O cardápio pode sofrer alterações sem aviso prévio de acordo com a disponibilidade dos ingredientes.</p>
        </div>
      </div>
    </motion.div>
  );
}
