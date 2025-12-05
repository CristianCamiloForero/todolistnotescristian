const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const notasAPI = {
  // Listar todas las notas
  async listarNotas() {
    const response = await fetch(`${API_URL}/notas/`);
    if (!response.ok) throw new Error('Error al obtener notas');
    return response.json();
  },

  // Crear una nueva nota
  async crearNota(nota) {
    const response = await fetch(`${API_URL}/notas/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nota),
    });
    if (!response.ok) throw new Error('Error al crear nota');
    return response.json();
  },

  // Obtener una nota específica
  async obtenerNota(id) {
    const response = await fetch(`${API_URL}/notas/${id}`);
    if (!response.ok) throw new Error('Error al obtener nota');
    return response.json();
  },

  // Actualizar una nota
  async actualizarNota(id, nota) {
    const response = await fetch(`${API_URL}/notas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nota),
    });
    if (!response.ok) throw new Error('Error al actualizar nota');
    return response.json();
  },

  // Eliminar una nota
  async eliminarNota(id) {
    const response = await fetch(`${API_URL}/notas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar nota');
    
    // Si la respuesta está vacía o es 204, retornar objeto vacío
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {};
    }
    
    // Intentar parsear JSON solo si hay contenido
    try {
      return await response.json();
    } catch {
      return {};
    }
  },

  // Filtrar notas por estado
  async filtrarPorEstado(estado) {
    const response = await fetch(`${API_URL}/notas/estado/${estado}`);
    if (!response.ok) throw new Error('Error al filtrar notas');
    return response.json();
  },
};
