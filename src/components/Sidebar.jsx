import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Megaphone,
  UtensilsCrossed,
  CalendarDays,
  GraduationCap,
  MapPin,
  Users,
  PartyPopper,
  Search,
  Phone,
  UserCircle,
  X
} from 'lucide-react';

const menuItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/avisos', icon: Megaphone, label: 'Avisos' },
  { path: '/cardapio', icon: UtensilsCrossed, label: 'Cardápio' },
  { path: '/calendario', icon: CalendarDays, label: 'Calendário' },
  { path: '/grade', icon: GraduationCap, label: 'Grade de Aulas' },
  { path: '/mapa', icon: MapPin, label: 'Mapa' },
  { path: '/professores', icon: Users, label: 'Professores' },
  { path: '/eventos', icon: PartyPopper, label: 'Eventos' },
  { path: '/achados-perdidos', icon: Search, label: 'Achados e Perdidos' },
  { path: '/contatos', icon: Phone, label: 'Contatos' },
  { path: '/perfil', icon: UserCircle, label: 'Perfil' },
];

export default function Sidebar({ isOpen, onClose }) {
  const sidebarContent = (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col py-4 shadow-sm">
      <div className="flex items-center justify-between px-4 pb-4 md:hidden border-b border-gray-100 mb-2">
        <span className="font-bold text-slate-800">Menu CEEPTIC</span>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 text-slate-500">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => onClose && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500 font-medium'
                  : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900 border-l-4 border-transparent'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-16 left-0 bottom-0 z-40 bg-white">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
