import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, User, Building } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { contatos } from '../data/contatos';

export default function Contatos() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const colors = ['border-blue-500', 'border-teal-500', 'border-orange-500', 'border-red-500', 'border-indigo-500'];

  return (
    <div className="pb-24 lg:pb-8 min-h-screen">
      <PageHeader icon={Phone} title="Contatos da Escola" />
      
      <div className="px-4 mt-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {contatos.map((contato, index) => (
            <motion.div 
              key={contato.id} 
              variants={itemVariants}
              className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${colors[index % colors.length]} border-y border-r border-y-slate-100 border-r-slate-100 flex flex-col`}
            >
              <div className="flex items-center gap-3 mb-4 border-b border-slate-50 pb-4">
                <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{contato.setor}</h3>
              </div>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-center text-slate-600 text-sm">
                  <User className="w-4 h-4 mr-3 text-slate-400" />
                  <span className="font-medium">{contato.responsavel}</span>
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <Phone className="w-4 h-4 mr-3 text-slate-400" />
                  <span>{contato.telefone}</span>
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <Mail className="w-4 h-4 mr-3 text-slate-400" />
                  <span>{contato.email}</span>
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <Clock className="w-4 h-4 mr-3 text-slate-400" />
                  <span>{contato.horario}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </button>
                <button className="flex-1 bg-teal-50 hover:bg-teal-100 text-teal-600 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
