import { useState, useEffect } from 'react';


function FilterButtons({ filtro, setFiltro }) {
  const botones = [
    { 
      id: 'todas', 
      label: 'Todas',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 'pendientes', 
      label: 'Pendientes',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 'completadas', 
      label: 'Completadas',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex gap-3 flex-wrap" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      {botones.map((boton) => (
        <button
          key={boton.id}
          onClick={() => setFiltro(boton.id)}
          className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
            filtro === boton.id
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-300'
          }`}
        >
          {boton.icon}
          {boton.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
