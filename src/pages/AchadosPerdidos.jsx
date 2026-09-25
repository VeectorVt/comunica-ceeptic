import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Smartphone, Shirt, BookOpen, Package, AlertCircle, Info } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { achados } from '../data/achados';

export default function AchadosPerdidos() {
  const [activeTab, setActiveTab] = useState('Todos');

  const filteredItems = achados?.filter(item => {
    if (activeTab === 'Todos') return true;
    return item.tipo === activeTab.toLowerCase().replace(/s$/, '');
  }) || [];

  const getCategoryIcon = (categoria) => {
    switch (categoria) {
      case 'eletrônico': return <Smartphone className="w-6 h-6" />;
      case 'vestuário': return <Shirt className="w-6 h-6" />;
      case 'material': return <BookOpen className="w-6 h-6" />;
      case 'outro':
      default: return <Package className="w-6 h-6" />;
    }
  };

  return (
    <div className="pb-20">
      <PageHeader title="Achados & Perdidos" subtitle="Encontre ou relate itens perdidos" icon={Search} />

      <div className="p-4 space-y-6">
        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['Todos', 'Achados', 'Perdidos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid gap-4 sm:grid-cols-2">
          
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex gap-4 min-w-0 overflow-hidden"
              >
                <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-white shadow-sm ${
                  item.tipo === 'achado' ? 'bg-gradient-to-br from-teal-400 to-teal-500' : 'bg-gradient-to-br from-orange-400 to-orange-500'
                }`}>
                  {getCategoryIcon(item.categoria)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 line-clamp-2 flex-1 min-w-0 break-words">{item.descricao}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                      item.tipo === 'achado' ? 'bg-teal-50 text-teal-700' : 'bg-orange-50 text-orange-700'
                    }`}>
                      {item.tipo}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 mt-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500 min-w-0">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate flex-1">{item.local}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 min-w-0">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate flex-1">{item.data}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredItems.length === 0 && (
            <div className="text-center py-10 text-slate-500 sm:col-span-2">
              Nenhum item encontrado.
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800 text-sm">
          <Info className="w-5 h-5 shrink-0 text-blue-600" />
          <p>Para recuperar ou entregar um item, dirija-se à secretaria da escola no horário de funcionamento.</p>
        </div>
      </div>
    </div>
  );
}
