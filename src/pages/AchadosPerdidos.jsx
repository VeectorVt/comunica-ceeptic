import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Smartphone, Shirt, BookOpen, Package, MapPin, Calendar, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { achados } from '../data/achados';

export default function AchadosPerdidos() {
  const [tab, setTab] = useState('Achados');

  const itensFiltrados = achados.filter(item => item.status === tab);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  const getIcon = (categoria) => {
    switch (categoria) {
      case 'eletrônico': return <Smartphone className="w-6 h-6 text-blue-500" />;
      case 'vestuário': return <Shirt className="w-6 h-6 text-orange-500" />;
      case 'material': return <BookOpen className="w-6 h-6 text-teal-500" />;
      default: return <Package className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <div className="pb-24 lg:pb-8 min-h-screen flex flex-col">
      <PageHeader icon={Search} title="Achados e Perdidos" />
      
      <div className="px-4 mt-6 flex-grow">
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6 max-w-sm mx-auto">
          {['Achados', 'Perdidos'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                tab === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <motion.div 
          key={tab}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {itensFiltrados.map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  {getIcon(item.categoria)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{item.descricao}</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{item.categoria}</p>
                </div>
              </div>
              <div className="space-y-2 mt-4 text-sm text-slate-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                  {item.local}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                  {item.data}
                </div>
              </div>
            </motion.div>
          ))}
          {itensFiltrados.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              Nenhum item encontrado nesta categoria.
            </div>
          )}
        </motion.div>
      </div>

      <div className="px-4 mt-8 pb-4">
        <button 
          onClick={() => alert('Função de reportar item em desenvolvimento.')}
          className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <AlertCircle className="w-5 h-5" />
          Reportar Item {tab === 'Achados' ? 'Achado' : 'Perdido'}
        </button>
      </div>
    </div>
  );
}
