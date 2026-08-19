import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, ChevronLeft, ChevronRight, X, Circle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { eventos } from "../data/calendario";

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 1)); // August 2024 for example
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const getEventsForDate = (dateStr) => {
    return eventos.filter(e => e.data === dateStr);
  };

  const getTypeColor = (tipo) => {
    switch(tipo) {
      case 'prova': return 'bg-red-500';
      case 'evento': return 'bg-blue-500';
      case 'reuniao': return 'bg-purple-500';
      case 'feriado': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  const handleDateClick = (day) => {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${currentDate.getFullYear()}-${month}-${dayStr}`;
    setSelectedDate(dateStr);
    
    const events = getEventsForDate(dateStr);
    if (events.length > 0) {
      setShowModal(true);
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-slate-50">
      <PageHeader title="Calendário Escolar" icon={CalendarDays} />

      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-xl text-slate-600 hover:bg-slate-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-slate-800">
              {monthNames[currentDate.getMonth()]} <span className="text-slate-500">{currentDate.getFullYear()}</span>
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-xl text-slate-600 hover:bg-slate-50">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs font-bold text-slate-400 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const month = String(currentDate.getMonth() + 1).padStart(2, '0');
              const dayStr = String(day).padStart(2, '0');
              const dateStr = `${currentDate.getFullYear()}-${month}-${dayStr}`;
              const dayEvents = getEventsForDate(dateStr);
              
              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`relative p-2 rounded-xl flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                    selectedDate === dateStr ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <span className="text-sm">{day}</span>
                  <div className="flex gap-0.5 mt-1">
                    {dayEvents.map((e, idx) => (
                      <div key={idx} className={`w-1.5 h-1.5 rounded-full ${getTypeColor(e.tipo)}`} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Legenda</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2"><Circle className="w-3 h-3 fill-red-500 text-red-500" /><span className="text-xs text-slate-600">Provas</span></div>
            <div className="flex items-center gap-2"><Circle className="w-3 h-3 fill-blue-500 text-blue-500" /><span className="text-xs text-slate-600">Eventos</span></div>
            <div className="flex items-center gap-2"><Circle className="w-3 h-3 fill-purple-500 text-purple-500" /><span className="text-xs text-slate-600">Reuniões</span></div>
            <div className="flex items-center gap-2"><Circle className="w-3 h-3 fill-green-500 text-green-500" /><span className="text-xs text-slate-600">Feriados</span></div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedDate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 z-40"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">
                  Eventos do Dia
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pb-6">
                {getEventsForDate(selectedDate).map(e => (
                  <div key={e.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 flex gap-4">
                    <div className={`w-2 rounded-full ${getTypeColor(e.tipo)}`} />
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{e.tipo}</span>
                      <h4 className="text-base font-bold text-slate-800 mt-1 mb-1">{e.titulo}</h4>
                      {e.descricao && <p className="text-sm text-slate-600">{e.descricao}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendario;
