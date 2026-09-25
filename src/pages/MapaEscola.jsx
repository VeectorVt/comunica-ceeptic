import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, X, MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { locais } from '../data/mapa';

const MapaEscola = () => {
  const [selectedLocal, setSelectedLocal] = useState(null);

  const legenda = [
    { tipo: 'sala', label: 'Salas', cor: 'bg-blue-500' },
    { tipo: 'laboratorio', label: 'Laboratórios', cor: 'bg-purple-500' },
    { tipo: 'administrativo', label: 'Administrativo', cor: 'bg-slate-500' },
    { tipo: 'servico', label: 'Serviços', cor: 'bg-orange-500' },
    { tipo: 'esporte', label: 'Esportes', cor: 'bg-green-500' }
  ];

  return (
    <div className="pb-20 min-h-screen bg-slate-50">
      <PageHeader title="Mapa da Escola" icon={MapIcon} />

      <div className="px-4 py-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 mb-6 overflow-x-auto">
          <div className="min-w-[500px]">
            <div 
              className="grid gap-2" 
              style={{ 
                gridTemplateColumns: 'repeat(6, minmax(60px, 1fr))',
                gridAutoRows: '60px'
              }}
            >
              {locais.map(local => (
                <motion.button
                  key={local.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLocal(local)}
                  style={{
                    gridRow: local.posicao.row,
                    gridColumn: local.posicao.col
                  }}
                  className={`${local.cor} rounded-xl shadow-sm flex items-center justify-center p-1 border-2 border-white/20 relative overflow-hidden group`}
                >
                  <span className="text-[10px] font-bold text-white text-center leading-tight drop-shadow-md z-10 break-words w-full px-1">
                    {local.nome}
                  </span>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Legenda</h3>
          <div className="flex flex-wrap gap-3">
            {legenda.map(item => (
              <div key={item.tipo} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-md ${item.cor}`} />
                <span className="text-xs text-slate-600 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLocal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 z-40"
              onClick={() => setSelectedLocal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-4 right-4 -translate-y-1/2 bg-white rounded-lg z-50 p-6 shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${selectedLocal.cor.replace('bg-', 'bg-').replace('-500', '-100')} ${selectedLocal.cor.replace('bg-', 'text-')}`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{selectedLocal.nome}</h3>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{selectedLocal.tipo}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedLocal(null)} className="p-2 bg-slate-100 rounded-full text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {selectedLocal.descricao}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapaEscola;
