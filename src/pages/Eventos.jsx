import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, PartyPopper } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { eventosEscola } from '../data/eventos';

export default function Eventos() {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'proximo':
        return { color: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700', label: 'Próximo' };
      case 'em_breve':
        return { color: 'bg-orange-500', bg: 'bg-orange-50', text: 'text-orange-700', label: 'Em Breve' };
      case 'futuro':
        return { color: 'bg-teal-500', bg: 'bg-teal-50', text: 'text-teal-700', label: 'Futuro' };
      default:
        return { color: 'bg-slate-500', bg: 'bg-slate-50', text: 'text-slate-700', label: status };
    }
  };

  return (
    <div className="pb-20">
      <PageHeader title="Eventos" subtitle="Fique por dentro do que acontece na escola" icon={PartyPopper} />

      <div className="p-4">
        <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8 py-2">
          {eventosEscola.map((ev, index) => {
            const statusConfig = getStatusConfig(ev.status);
            
            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[35px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${statusConfig.color}`} />
                
                <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                      {statusConfig.label}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      {ev.data}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{ev.titulo}</h3>
                  <p className="text-slate-600 text-sm mb-4">{ev.descricao}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-2 rounded-xl">
                    <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="truncate">{ev.local}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
