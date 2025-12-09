const API_URL = 'https://apinotasdb-production.up.railway.app';

export const notasAPI = {
  // Listar todas las notas
  async listarNotas() {
    try {
      const response = await fetch(`${API_URL}/notas/`);
      if (!response.ok) throw new Error('Error al obtener notas');
      return response.json();
    } catch (error) {
      console.error('Error en listarNotas:', error);
      throw error;
    }
  },

  // Crear una nueva nota
  async crearNota(nota) {
    try {
      const response = await fetch(`${API_URL}/notas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nota),
      });
      if (!response.ok) throw new Error('Error al crear nota');
      return response.json();
    } catch (error) {
      console.error('Error en crearNota:', error);
      throw error;
    }
  },

  // Obtener una nota específica
  async obtenerNota(id) {
    try {
      const response = await fetch(`${API_URL}/notas/${id}`);
      if (!response.ok) throw new Error('Error al obtener nota');
      return response.json();
    } catch (error) {
      console.error('Error en obtenerNota:', error);
      throw error;
    }
  },

  // Actualizar una nota
  async actualizarNota(id, nota) {
    try {
      const response = await fetch(`${API_URL}/notas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nota),
      });
      if (!response.ok) throw new Error('Error al actualizar nota');
      return response.json();
    } catch (error) {
      console.error('Error en actualizarNota:', error);
      throw error;
    }
  },

  // Eliminar una nota
  async eliminarNota(id) {
    try {
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
    } catch (error) {
      console.error('Error en eliminarNota:', error);
      throw error;
    }
  },

  // Filtrar notas por estado
  async filtrarPorEstado(estado) {
    try {
      const response = await fetch(`${API_URL}/notas/estado/${estado}`);
      if (!response.ok) throw new Error('Error al filtrar notas');
      return response.json();
    } catch (error) {
      console.error('Error en filtrarPorEstado:', error);
      throw error;
    }
  },
};
