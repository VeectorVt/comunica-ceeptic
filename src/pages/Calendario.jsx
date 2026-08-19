import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { eventos } from '../data/calendario';

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026
  const [selectedEvent, setSelectedEvent] = useState(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getEventsForDay = (day) => {
    return eventos?.filter(e => {
      const eDate = new Date(e.date);
      // adjust for timezone differences if needed, simplified match
      return eDate.getDate() === day && eDate.getMonth() === currentDate.getMonth() && eDate.getFullYear() === currentDate.getFullYear();
    }) || [];
  };

  const getEventColor = (type) => {
    switch(type) {
      case 'prova': return 'bg-red-500';
      case 'evento': return 'bg-orange-500';
      case 'reuniao': return 'bg-blue-500';
      case 'feriado': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-14 sm:h-20 border border-transparent"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      days.push(
        <div 
          key={day} 
          onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents)}
          className={`h-14 sm:h-20 border border-slate-100 bg-white p-1 sm:p-2 relative rounded-lg ${dayEvents.length > 0 ? 'cursor-pointer hover:bg-blue-50 transition-colors shadow-sm' : ''}`}
        >
          <span className="text-sm sm:text-base font-medium text-slate-700">{day}</span>
          <div className="absolute bottom-1 sm:bottom-2 left-0 w-full flex justify-center gap-1">
            {dayEvents.map((e, idx) => (
              <span key={idx} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${getEventColor(e.type)}`}></span>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20">
      <PageHeader icon={CalendarDays} title="Calendário Escolar" subtitle="Datas importantes, avaliações e feriados" />
      
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 flex items-center justify-between bg-slate-50 border-b border-slate-100">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white transition-colors text-slate-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-slate-800 capitalize">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white transition-colors text-slate-600">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(d => (
                <div key={d} className="text-center text-xs font-semibold text-slate-400 uppercase">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-sm text-slate-600">Prova/Avaliação</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span><span className="text-sm text-slate-600">Evento</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-sm text-slate-600">Reunião</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span><span className="text-sm text-slate-600">Feriado/Recesso</span></div>
        </div>

        <AnimatePresence>
          {selectedEvent && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-slate-800">Eventos do Dia</h3>
                  <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
                </div>
                <div className="p-4 space-y-3">
                  {selectedEvent.map((e, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className={`w-1.5 rounded-full mt-1 ${getEventColor(e.type)}`}></div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{e.title}</h4>
                        {e.description && <p className="text-sm text-slate-600 mt-1">{e.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
