# 📝 Frontend de Notas

Una aplicación moderna y minimalista para gestionar notas, construida con React, Vite y Tailwind CSS.

## 🚀 Características

- ✨ Interfaz moderna y minimalista
- 📱 Diseño completamente responsivo
- ⚡ Creación, edición y eliminación de notas
- 🔍 Filtrado por estado (todas, pendientes, completadas)
- 🎨 Animaciones suaves y transiciones
- 🌐 Listo para desplegar en Vercel

## 🛠️ Tecnologías

- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utility-first
- **API REST** - Integración con backend FastAPI

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd frontend_notes
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

4. Edita el archivo `.env` con la URL de tu API:
```env
VITE_API_URL=https://tu-api-backend.com
```

## 🏃‍♂️ Ejecución

### Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Producción
```bash
npm run build
npm run preview
```

## 🌐 Desplegar en Vercel

### Opción 1: Desde la interfaz de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio de GitHub
3. Configura la variable de entorno:
   - `VITE_API_URL`: URL de tu API backend
4. Haz clic en "Deploy"

### Opción 2: Desde la CLI

```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel
```

## 📋 Endpoints de la API

La aplicación consume los siguientes endpoints:

- `GET /notas/` - Lista todas las notas
- `POST /notas/` - Crea una nueva nota
- `GET /notas/{id}` - Obtiene una nota específica
- `PUT /notas/{id}` - Actualiza una nota
- `DELETE /notas/{id}` - Elimina una nota
- `GET /notas/estado/{estado}` - Filtra notas por estado

## 📁 Estructura del Proyecto

```
frontend_notes/
├── src/
│   ├── components/       # Componentes de React
│   │   ├── NotaCard.jsx
│   │   ├── NotaForm.jsx
│   │   └── FilterButtons.jsx
│   ├── services/         # Servicios API
│   │   └── api.js
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Punto de entrada
├── public/              # Archivos estáticos
├── .env                 # Variables de entorno (no subir a Git)
├── .env.example         # Ejemplo de variables de entorno
├── vercel.json          # Configuración de Vercel
└── package.json         # Dependencias
```

## 🎨 Personalización

Los estilos se pueden personalizar en:
- `tailwind.config.js` - Configuración de Tailwind
- `src/index.css` - Estilos globales

## 📝 Licencia

MIT
