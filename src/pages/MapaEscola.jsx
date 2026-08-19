import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { locais } from '../data/mapa';

export default function MapaEscola() {
  const [selectedLocal, setSelectedLocal] = useState(null);

  const legend = [
    { type: 'sala', label: 'Sala de Aula', color: 'bg-blue-500', bg: 'bg-blue-100 text-blue-700' },
    { type: 'lab', label: 'Laboratório', color: 'bg-teal-500', bg: 'bg-teal-100 text-teal-700' },
    { type: 'admin', label: 'Administrativo', color: 'bg-orange-500', bg: 'bg-orange-100 text-orange-700' },
    { type: 'servico', label: 'Serviço', color: 'bg-red-500', bg: 'bg-red-100 text-red-700' },
    { type: 'esporte', label: 'Esporte', color: 'bg-green-500', bg: 'bg-green-100 text-green-700' },
  ];

  const getLocalStyle = (type) => {
    const found = legend.find(l => l.type === type);
    return found ? found.bg : 'bg-slate-100 text-slate-700';
  };

  // Generate grid 6x5
  const gridCells = Array.from({ length: 30 }, (_, i) => {
    const row = Math.floor(i / 6) + 1;
    const col = (i % 6) + 1;
    const local = locais?.find(l => l.gridRow === row && l.gridCol === col);
    return { row, col, local };
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20">
      <PageHeader icon={MapPin} title="Mapa da Escola" subtitle="Encontre salas, laboratórios e outros espaços" />
      
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6 flex flex-wrap gap-4 justify-center">
          {legend.map(item => (
            <div key={item.type} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
              <span className="text-sm font-medium text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 overflow-x-auto">
          <div className="min-w-[600px] grid grid-cols-6 grid-rows-5 gap-2 h-[500px]">
            {gridCells.map((cell, idx) => {
              if (!cell.local) {
                return <div key={idx} className="bg-transparent rounded-xl border border-dashed border-slate-200/50"></div>;
              }
              
              const colSpanClass = cell.local.colSpan ? `col-span-${cell.local.colSpan}` : '';
              const rowSpanClass = cell.local.rowSpan ? `row-span-${cell.local.rowSpan}` : '';
              
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 0.98 }}
                  onClick={() => setSelectedLocal(cell.local)}
                  className={`${colSpanClass} ${rowSpanClass} ${getLocalStyle(cell.local.type)} rounded-xl border border-white/50 shadow-sm cursor-pointer p-2 flex flex-col items-center justify-center text-center transition-all hover:shadow-md`}
                  style={{ 
                    gridColumn: cell.local.colSpan ? `span ${cell.local.colSpan}` : 'auto',
                    gridRow: cell.local.rowSpan ? `span ${cell.local.rowSpan}` : 'auto' 
                  }}
                >
                  <span className="font-bold text-sm md:text-base leading-tight">{cell.local.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {selectedLocal && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelectedLocal(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <div className={`p-6 ${getLocalStyle(selectedLocal.type).split(' ')[0]} flex justify-between items-start`}>
                  <div className={`w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mb-4 ${getLocalStyle(selectedLocal.type).split(' ')[1]}`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <button onClick={() => setSelectedLocal(null)} className="text-slate-500 hover:text-slate-800 bg-white/50 rounded-full p-1"><X className="w-5 h-5"/></button>
                </div>
                <div className="p-6 pt-2">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{selectedLocal.fullName || selectedLocal.name}</h3>
                  <div className="inline-block px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-4 bg-slate-100 text-slate-600">
                    {legend.find(l => l.type === selectedLocal.type)?.label}
                  </div>
                  <p className="text-slate-600 mb-4">{selectedLocal.description || 'Nenhuma descrição detalhada disponível para este local.'}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
