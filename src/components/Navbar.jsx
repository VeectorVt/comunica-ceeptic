import React from 'react';
import { Menu } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="p-2 -ml-2 rounded-lg hover:bg-gray-100 md:hidden text-slate-700">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
          Comunica CEEPTIC
        </h1>
      </div>

    </header>
  );
}
