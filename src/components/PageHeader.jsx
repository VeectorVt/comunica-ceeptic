import React from 'react';
import { motion } from 'framer-motion';

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  teal: 'bg-teal-100 text-teal-600',
  orange: 'bg-orange-100 text-orange-600',
  red: 'bg-red-100 text-red-600',
  slate: 'bg-slate-100 text-slate-600',
};

export default function PageHeader({ icon: Icon, title, subtitle, color = 'blue' }) {
  const iconColorClass = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4"
    >
      <div className={`p-3 rounded-2xl flex-shrink-0 w-max ${iconColorClass}`}>
        <Icon size={28} />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
