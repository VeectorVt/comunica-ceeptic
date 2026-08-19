import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Moon, Mail, LogOut, Save, ChevronDown, CheckCircle } from 'lucide-react';
import { turmas } from '../data/turmas';

export default function Perfil() {
  const [turmaSelecionada, setTurmaSelecionada] = useState(turmas[0]?.nome || '');
  const [showToast, setShowToast] = useState(false);
  const [settings, setSettings] = useState({
    notificacoes: true,
    modoEscuro: false,
    mostrarEmail: true
  });

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const selectedTurmaData = turmas.find(t => t.nome === turmaSelecionada) || { turno: 'Manhã', curso: 'Informática' };

  return (
    <div className="pb-24 lg:pb-8 min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 pt-12 pb-24 px-4 text-center rounded-b-3xl relative shadow-md">
        <h1 className="text-white text-2xl font-bold">Meu Perfil</h1>
      </div>

      <div className="px-4 mt-16 max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-teal-400 p-1 shadow-lg mb-4">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-teal-500">
                AL
              </span>
            </div>
          </div>
          
          <div className="w-full">
            <label className="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase">Nome</label>
            <input 
              type="text" 
              defaultValue="Aluno CEEPTIC" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="w-full mt-4">
            <label className="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase">Turma</label>
            <div className="relative">
              <select 
                value={turmaSelecionada}
                onChange={(e) => setTurmaSelecionada(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {turmas.map(t => (
                  <option key={t.id} value={t.nome}>{t.nome}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-500 mb-1">Turno</p>
            <p className="font-bold text-slate-800">{selectedTurmaData.turno || 'Integral'}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-500 mb-1">Curso</p>
            <p className="font-bold text-slate-800">{selectedTurmaData.curso || 'Ensino Médio'}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 mb-6"
        >
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-700 font-medium">
              <Bell className="w-5 h-5 text-slate-400" />
              Notificações
            </div>
            <button 
              onClick={() => setSettings(s => ({ ...s, notificacoes: !s.notificacoes }))}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.notificacoes ? 'bg-blue-500' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.notificacoes ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-700 font-medium">
              <Moon className="w-5 h-5 text-slate-400" />
              Modo Escuro
            </div>
            <button 
              onClick={() => setSettings(s => ({ ...s, modoEscuro: !s.modoEscuro }))}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.modoEscuro ? 'bg-blue-500' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.modoEscuro ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-700 font-medium">
              <Mail className="w-5 h-5 text-slate-400" />
              Mostrar Email
            </div>
            <button 
              onClick={() => setSettings(s => ({ ...s, mostrarEmail: !s.mostrarEmail }))}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.mostrarEmail ? 'bg-blue-500' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.mostrarEmail ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar Preferências
          </button>
          
          <button className="w-full bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 py-4 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            Sair da Conta
          </button>
        </motion.div>
      </div>

      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-6 py-3 rounded-full font-medium shadow-xl flex items-center gap-2 z-50 whitespace-nowrap"
        >
          <CheckCircle className="w-5 h-5" />
          Preferências salvas!
        </motion.div>
      )}
    </div>
  );
}
