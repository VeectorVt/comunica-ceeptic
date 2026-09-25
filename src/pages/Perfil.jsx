import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, Settings, LogOut, CheckCircle, Save, Bell, Shield, Moon, Check, ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { turmas } from '../data/turmas';

export default function Perfil() {
  const [selectedTurma, setSelectedTurma] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const turmaDetalhes = turmas.find(t => t.codigo === selectedTurma);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pb-20 relative min-h-screen">
      <PageHeader title="Meu Perfil" subtitle="Gerencie suas informações e preferências" icon={UserCircle} />

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white mb-4"
          >
            AL
          </motion.div>
          <h2 className="text-xl font-bold text-slate-900">Aluno Exemplo</h2>
          <p className="text-slate-500 text-sm">aluno@escola.com.br</p>
        </div>

        {/* Academic Info */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Informações Acadêmicas
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Sua Turma</label>
              <div className="relative">
                <select
                  value={selectedTurma}
                  onChange={(e) => setSelectedTurma(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-10 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                >
                  <option value="">Selecione sua turma...</option>
                  {turmas.map(t => (
                    <option key={t.codigo} value={t.codigo}>{t.nome_completo}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {turmaDetalhes && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-blue-50/50 rounded-xl p-4 border border-blue-100"
              >
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="block text-slate-500 mb-0.5 text-xs">Curso</span>
                    <span className="font-semibold text-slate-900">{turmaDetalhes.curso}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 mb-0.5 text-xs">Ano</span>
                    <span className="font-semibold text-slate-900">{turmaDetalhes.ano}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-slate-500 mb-0.5 text-xs">Turno</span>
                    <span className="font-semibold text-slate-900">{turmaDetalhes.turno}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-100 space-y-5">
          <h3 className="font-bold text-slate-900 mb-2">Preferências</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Notificações</p>
                <p className="text-xs text-slate-500">Avisos e eventos</p>
              </div>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Modo Escuro</p>
                <p className="text-xs text-slate-500">Aparência do app</p>
              </div>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Save className="w-5 h-5" />
            Salvar Alterações
          </button>
          
          <button className="w-full bg-white text-red-600 border border-red-100 rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-sm">
            <LogOut className="w-5 h-5" />
            Sair da Conta
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <p className="font-medium text-sm">Configurações salvas com sucesso!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
