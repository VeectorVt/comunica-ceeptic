import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, ChevronLeft, ChevronRight, X, Circle, Star } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { eventos } from '../data/calendario';

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const letivoInicio = new Date(2026, 7, 1);
  const letivoFim = new Date(2026, 11, 23);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const getEventsForDate = (dateStr) => eventos.filter((e) => e.data === dateStr);

  const getTypeColor = (tipo) => {
    switch (tipo) {
      case 'prova':
        return 'bg-red-500';
      case 'evento':
        return 'bg-blue-500';
      case 'reuniao':
        return 'bg-purple-500';
      case 'feriado':
        return 'bg-green-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getTypeBadgeClass = (tipo) => {
    switch (tipo) {
      case 'prova':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'evento':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'reuniao':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'feriado':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const isInLetivoPeriod = (dateStr) => {
    const date = new Date(`${dateStr}T00:00:00`);
    return date >= letivoInicio && date <= letivoFim;
  };

  const currentMonthEvents = useMemo(() => {
    return eventos
      .filter((e) => {
        const date = new Date(`${e.data}T00:00:00`);
        return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
      })
      .sort((a, b) => new Date(a.data) - new Date(b.data));
  }, [currentDate]);

  const principalEvento = currentMonthEvents.find((evento) => evento.tipo === 'prova') || currentMonthEvents[0];

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
    <div className="pb-20  min-h-screen bg-slate-50 rounded-lg">
      <PageHeader title="Calendário Escolar"  icon={CalendarDays} />

      <div className="px-4 py-6 space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Período Letivo</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">2026</p>
          <p className="text-xs text-slate-600">01/08/2026 até 23/12/2026</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-xl text-slate-600 hover:bg-slate-50" aria-label="Mês anterior">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-slate-800">
              {monthNames[currentDate.getMonth()]} <span className="text-slate-500">{currentDate.getFullYear()}</span>
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-xl text-slate-600 hover:bg-slate-50" aria-label="Próximo mês">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-[11px] font-bold text-slate-400 py-2 uppercase">
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
              const isLetivoDay = isInLetivoPeriod(dateStr);

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`relative p-2 rounded-xl flex flex-col items-center justify-center min-h-[52px] border transition-colors ${
                    selectedDate === dateStr ? 'bg-blue-50 text-blue-700 border-blue-200 font-bold' : 'text-slate-700 hover:bg-slate-50 font-medium border-transparent'
                  } ${isLetivoDay ? 'ring-1 ring-amber-300 bg-amber-50/50' : ''}`}
                >
                  <span className="text-sm">{day}</span>
                  {isLetivoDay && (
                    <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-amber-500" title="Período letivo" />
                  )}
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

        <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">Agenda do mês</h3>
            {principalEvento && (
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700 bg-blue-100 border border-blue-200 px-2 py-1 rounded-full">
                Destaque
              </span>
            )}
          </div>

          {principalEvento && (
            <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 p-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700">Principal</span>
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getTypeBadgeClass(principalEvento.tipo)}`}>
                  {principalEvento.tipo}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">{principalEvento.titulo}</p>
              <p className="text-xs text-slate-600">{new Date(`${principalEvento.data}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</p>
            </div>
          )}

          <div className="space-y-2">
            {currentMonthEvents.map((eventoItem) => (
              <button
                key={eventoItem.id}
                onClick={() => {
                  setSelectedDate(eventoItem.data);
                  setShowModal(true);
                }}
                className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`inline-flex h-2.5 w-2.5 rounded-full ${getTypeColor(eventoItem.tipo)}`} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {new Date(`${eventoItem.data}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getTypeBadgeClass(eventoItem.tipo)}`}>
                    {eventoItem.tipo}
                  </span>
                </div>
                <p className="mt-2 text-sm font-bold text-slate-800">{eventoItem.titulo}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Legenda</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2"><Circle className="w-3 h-3 fill-red-500 text-red-500" /><span className="text-xs text-slate-600">Provas</span></div>
            <div className="flex items-center gap-2"><Circle className="w-3 h-3 fill-blue-500 text-blue-500" /><span className="text-xs text-slate-600">Eventos</span></div>
            <div className="flex items-center gap-2"><Circle className="w-3 h-3 fill-purple-500 text-purple-500" /><span className="text-xs text-slate-600">Reuniões</span></div>
            <div className="flex items-center gap-2"><Circle className="w-3 h-3 fill-green-500 text-green-500" /><span className="text-xs text-slate-600">Feriados</span></div>
          </div>
        </div>
      </div>

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
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Detalhes do dia</h3>
                  <p className="text-xs text-slate-500">{new Date(`${selectedDate}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-600" aria-label="Fechar detalhes">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pb-6">
                {getEventsForDate(selectedDate).map((e) => (
                  <div key={e.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 flex gap-4">
                    <div className={`w-2 rounded-full ${getTypeColor(e.tipo)}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${getTypeBadgeClass(e.tipo)}`}>
                          {e.tipo}
                        </span>
                        {isInLetivoPeriod(selectedDate) && (
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                            Letivo
                          </span>
                        )}
                      </div>
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
