import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin, User, Building, BookOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { contatos } from '../data/contatos';

export default function Contatos() {
  return (
    <div className="pb-20">
      <PageHeader title="Contatos" subtitle="Fale com os setores da escola" icon={Phone} />

      <div className="p-4 space-y-4">
        {contatos.map((c, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-5 border-b border-slate-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{c.setor}</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium">{c.responsavel}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{c.horario}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center bg-slate-50 divide-x divide-slate-200">
              <a
                href={`tel:${c.telefone.replace(/\D/g, '')}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Ligar
              </a>
              <a
                href={`mailto:${c.email}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
