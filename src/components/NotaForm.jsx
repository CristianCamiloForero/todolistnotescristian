import { useState, useEffect } from 'react';

function NotaForm({ nota, onSubmit, onCancelar }) {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    if (nota) {
      setTitulo(nota.titulo);
      setContenido(nota.contenido);
      setEstado(nota.estado);
    } else {
      setTitulo('');
      setContenido('');
      setEstado(false);
    }
  }, [nota]);

  const handleSubmit = () => {
    if (!titulo.trim() || !contenido.trim()) {
      alert('Completa todos los campos');
      return;
    }

    const notaData = {
      titulo: titulo.trim(),
      contenido: contenido.trim(),
      fecha: new Date().toISOString(),
      estado,
    };

    if (nota) {
      onSubmit(nota.id, notaData);
    } else {
      onSubmit(notaData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={onCancelar}>
      <div className="bg-white rounded-lg w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {nota ? 'Editar nota' : 'Nueva nota'}
          </h2>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Título de la nota"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              placeholder="Escribe aquí..."
              rows="6"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={estado}
              onChange={(e) => setEstado(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded"
            />
            <span className="text-sm text-gray-700">Marcar como completada</span>
          </label>
        </div>

        <div className="border-t border-gray-200 p-4 flex justify-end gap-2">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded font-medium"
          >
            {nota ? 'Guardar' : 'Crear'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotaForm;