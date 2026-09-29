import React from 'react';

import { motion } from 'framer-motion';

import {
  Phone,
  MessageCircle,
  User,
  Building
} from 'lucide-react';

import PageHeader from '../components/PageHeader';

import { contatos } from '../data/contatos';

export default function Contatos() {
  return (
    <div className="pb-20">

      <PageHeader
        title="Contatos"
        subtitle="Fale com os setores da escola"
        icon={Phone}
      />

      <div className="p-4 space-y-4">

        {contatos.map((c, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1
            }}
            className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden"
          >

            <div className="p-5">

              <div className="flex items-center gap-4">

                {/* Foto */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-slate-100">

                  {c.imagem ? (
                    <img
                      src={c.imagem}
                      alt={c.responsavel}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-7 h-7" />
                  )}

                </div>

                {/* Informações */}
                <div className="min-w-0 flex-1">

                  <h3 className="font-bold text-slate-900 text-lg">
                    {c.responsavel}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">

                    <Building className="w-4 h-4 text-slate-400 shrink-0" />

                    <span>
                      {c.setor}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Telefone / WhatsApp */}
            {c.telefone && (
              <div className="flex items-center bg-slate-50 divide-x divide-slate-200">

                <a
                  href={`tel:${c.telefone.replace(/\D/g, '')}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Ligar
                </a>

                <a
                  href={`https://wa.me/${c.telefone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>

              </div>
            )}

          </motion.div>

        ))}

      </div>

    </div>
  );
}