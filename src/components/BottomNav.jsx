import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Bell, Calendar, Map, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/avisos', icon: Bell, label: 'Avisos' },
    { path: '/grade', icon: Calendar, label: 'Grade' },
    { path: '/mapa', icon: Map, label: 'Mapa' },
    { path: '/perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-t border-gray-200/50 z-50 pb-safe">
      <ul className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => (
          <li key={item.path} className="flex-1 relative h-full">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full gap-1 pt-1 transition-colors ${
                  isActive ? 'text-blue-500' : 'text-slate-500 hover:text-slate-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className="mb-0.5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
