import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Live Apps', id: 'live-apps' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
      <div className="bg-white/80 backdrop-blur-md border border-zinc-200 rounded-2xl px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-xs">M</div>
          <span className="font-bold text-zinc-900 tracking-tight hidden sm:inline">Mohanaprasath</span>
        </div>

        <div className="flex items-center gap-1">
          {menuItems.map((item) => (
            <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 text-sm font-bold transition-all rounded-full ${
                    activeTab === item.id 
                        ? 'bg-zinc-900 text-white shadow-md' // Active state: Black fill for ALL tabs
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100' // Inactive state
                }`}
            >
                {item.name}
            </button>
            ))}
        </div>
      </div>
    </nav>
  );
}