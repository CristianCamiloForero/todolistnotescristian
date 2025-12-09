import { useState, useEffect } from 'react';
import { notasAPI } from './services/api';
import NotaCard from './components/NotaCard';
import NotaForm from './components/NotaForm';
import FilterButtons from './components/FilterButtons';
import ConfirmModal from './components/ConfirmModal';

function App() {
  const [notas, setNotas] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [notaEditando, setNotaEditando] = useState(null);
  const [modalEliminar, setModalEliminar] = useState({ isOpen: false, notaId: null });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar notas al iniciar
  useEffect(() => {
    cargarNotas();
  }, []);

  const cargarNotas = async () => {
    try {
      setCargando(true);
      setError(null);
      const notasData = await notasAPI.listarNotas();
      setNotas(notasData);
    } catch (err) {
      setError('Error al cargar las notas. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const notasFiltradas = notas.filter(nota => {
    if (filtro === 'todas') return true;
    if (filtro === 'pendientes') return !nota.estado;
    if (filtro === 'completadas') return nota.estado;
    return true;
  });

  const handleCrearNota = async (notaData) => {
    try {
      const nuevaNota = await notasAPI.crearNota(notaData);
      setNotas([...notas, nuevaNota]);
      setMostrarForm(false);
    } catch (err) {
      alert('Error al crear la nota');
      console.error(err);
    }
  };

  const handleActualizarNota = async (id, notaData) => {
    try {
      const notaActualizada = await notasAPI.actualizarNota(id, notaData);
      setNotas(notas.map(n => n.id === id ? notaActualizada : n));
      setNotaEditando(null);
      setMostrarForm(false);
    } catch (err) {
      alert('Error al actualizar la nota');
      console.error(err);
    }
  };

  const handleEliminarNota = (id) => {
    setModalEliminar({ isOpen: true, notaId: id });
  };

  const confirmarEliminar = async () => {
    try {
      await notasAPI.eliminarNota(modalEliminar.notaId);
      setNotas(notas.filter(n => n.id !== modalEliminar.notaId));
      setModalEliminar({ isOpen: false, notaId: null });
    } catch (err) {
      alert('Error al eliminar la nota');
      console.error(err);
      setModalEliminar({ isOpen: false, notaId: null });
    }
  };

  const handleToggleEstado = async (nota) => {
    try {
      const notaActualizada = await notasAPI.actualizarNota(nota.id, {
        ...nota,
        estado: !nota.estado
      });
      setNotas(notas.map(n => n.id === nota.id ? notaActualizada : n));
    } catch (err) {
      alert('Error al actualizar el estado');
      console.error(err);
    }
  };

  const handleEditar = (nota) => {
    setNotaEditando(nota);
    setMostrarForm(true);
  };

  const handleCancelar = () => {
    setMostrarForm(false);
    setNotaEditando(null);
  };

  const totalNotas = notas.length;
  const completadas = notas.filter(n => n.estado).length;
  const pendientes = totalNotas - completadas;

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-gray-600">Cargando notas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-900 font-semibold mb-2">{error}</p>
          <button
            onClick={cargarNotas}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 text-white p-6 flex flex-col">
          <h1 className="text-2xl font-bold mb-8">TaskBoard</h1>
          
          <button
            onClick={() => setMostrarForm(true)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded font-medium mb-6 transition-colors"
          >
            Crear nota
          </button>

          <nav className="space-y-1 flex-1">
            <button
              onClick={() => setFiltro('todas')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                filtro === 'todas' ? 'bg-slate-700' : 'hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Todas</span>
                <span className="text-sm text-gray-400">{totalNotas}</span>
              </div>
            </button>
            
            <button
              onClick={() => setFiltro('pendientes')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                filtro === 'pendientes' ? 'bg-slate-700' : 'hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Pendientes</span>
                <span className="text-sm text-gray-400">{pendientes}</span>
              </div>
            </button>
            
            <button
              onClick={() => setFiltro('completadas')}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                filtro === 'completadas' ? 'bg-slate-700' : 'hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Completadas</span>
                <span className="text-sm text-gray-400">{completadas}</span>
              </div>
            </button>
          </nav>

          <div className="text-xs text-gray-400 mt-6">
            {completadas > 0 && (
              <div className="mb-2">
                Progreso: {Math.round((completadas / totalNotas) * 100)}%
              </div>
            )}
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all"
                style={{ width: `${totalNotas > 0 ? (completadas / totalNotas) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {filtro === 'todas' ? 'Todas las notas' : 
                 filtro === 'pendientes' ? 'Notas pendientes' : 
                 'Notas completadas'}
              </h2>
              <p className="text-gray-600">
                {notasFiltradas.length} {notasFiltradas.length === 1 ? 'nota' : 'notas'}
              </p>
            </div>

            {notasFiltradas.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 mb-4">
                  <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {filtro === 'todas' ? 'No hay notas' : `No hay notas ${filtro}`}
                </h3>
                <p className="text-gray-600 mb-6">
                  {filtro === 'todas' ? 'Crea tu primera nota para empezar' : 'Intenta con otro filtro'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notasFiltradas.map((nota) => (
                  <NotaCard
                    key={nota.id}
                    nota={nota}
                    onEditar={handleEditar}
                    onEliminar={handleEliminarNota}
                    onToggleEstado={handleToggleEstado}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {mostrarForm && (
        <NotaForm
          nota={notaEditando}
          onSubmit={notaEditando ? handleActualizarNota : handleCrearNota}
          onCancelar={handleCancelar}
        />
      )}

      <ConfirmModal
        isOpen={modalEliminar.isOpen}
        onConfirm={confirmarEliminar}
        onCancel={() => setModalEliminar({ isOpen: false, notaId: null })}
      />
    </div>
  );
}

export default App;
