import { useState, useEffect } from 'react';


function NotaCard({ nota, onEditar, onEliminar, onToggleEstado }) {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500 shadow hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{nota.titulo}</h3>
        <input
          type="checkbox"
          checked={nota.estado}
          onChange={() => onToggleEstado(nota)}
          className="w-5 h-5 text-teal-600 rounded cursor-pointer"
        />
      </div>
      
      <p className={`text-sm text-gray-600 mb-3 ${nota.estado ? 'line-through' : ''}`}>
        {nota.contenido}
      </p>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">{formatearFecha(nota.fecha)}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEditar(nota)}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Editar
          </button>
          <button
            onClick={() => onEliminar(nota.id)}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotaCard;