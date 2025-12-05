import { useState, useEffect } from 'react';


function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-lg w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmar eliminación</h3>
        <p className="text-sm text-gray-600 mb-5">¿Estás seguro de eliminar esta nota?</p>
        
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;