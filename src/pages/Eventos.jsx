import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Calendar, MapPin, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { eventosEscola } from '../data/eventos';

export default function Eventos() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'próximo':
        return 'bg-red-100 text-red-600 border-red-200 animate-pulse';
      case 'em_breve':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'futuro':
        return 'bg-teal-100 text-teal-600 border-teal-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="pb-24 lg:pb-8 min-h-screen">
      <PageHeader icon={PartyPopper} title="Eventos da Escola" />
      
      <div className="px-4 mt-8 max-w-3xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative border-l-2 border-blue-200 ml-4 md:ml-8 space-y-8"
        >
          {eventosEscola.map((evento) => (
            <motion.div key={evento.id} variants={itemVariants} className="relative pl-6 md:pl-8">
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow" />
              
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-4 gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{evento.titulo}</h3>
                    <div className="flex items-center text-slate-500 mt-2 space-x-4 text-sm">
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {evento.data}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {evento.hora}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border whitespace-nowrap self-start ${getStatusStyle(evento.status)}`}>
                    {evento.status.replace('_', ' ')}
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {evento.descricao}
                </p>
                
                <div className="flex items-center text-slate-500 text-sm bg-slate-50 p-2 rounded-lg inline-flex">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{evento.local}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
