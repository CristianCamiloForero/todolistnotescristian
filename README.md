# Stack Tecnológico

## Resumen del Proyecto

Aplicación web para gestión de notas con interfaz moderna, construida con React y conectada a una API REST con FASTAPI.

## Tecnologías Utilizadas

### Frontend

**React 18**
- Librería JavaScript para construir interfaces de usuario
- Componentes reutilizables y estado reactivo
- Virtual DOM para renderizado eficiente

**Vite 6**
- Build tool moderna y rápida
- Hot Module Replacement (HMR) instantáneo
- Optimización automática de producción
- Servidor de desarrollo ultrarrápido

**Tailwind CSS 4**
- Framework CSS utility-first
- Diseño responsivo sin CSS personalizado
- Optimización automática de clases no usadas
- Sistema de diseño consistente

### Backend

**FastAPI** (Python)
- Framework web moderno y rápido
- Documentación automática con Swagger
- Validación de datos con Pydantic
- Soporte async/await nativo

**Railway**
- Plataforma de despliegue
- Base de datos PostgreSQL incluida
- SSL/HTTPS automático
- Logs y monitoreo integrados

### Despliegue

**Vercel** (Frontend)
- Despliegue continuo desde Git
- Preview deployments automáticos
- CDN global
- SSL automático
- Analytics integrado

## Arquitectura del Proyecto

### Estructura de Carpetas

```
frontend_notes/
├── src/
│   ├── components/          # Componentes de React
│   │   ├── NotaCard.jsx    # Tarjeta individual de nota
│   │   ├── NotaForm.jsx    # Formulario crear/editar
│   │   ├── FilterButtons.jsx  # (No usado actualmente)
│   │   └── ConfirmModal.jsx   # Modal de confirmación
│   ├── services/            # Lógica de comunicación con API
│   │   └── api.js          # Funciones para llamar endpoints
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales y Tailwind
├── public/                  # Archivos estáticos
├── .env                     # Variables de entorno (local)
├── .env.example            # Plantilla de variables
├── vercel.json             # Configuración de Vercel
├── vite.config.js          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
├── postcss.config.js       # Configuración de PostCSS
└── package.json            # Dependencias y scripts
```

### Flujo de Datos

```
Usuario
  ↓
Componentes React (UI)
  ↓
Event Handlers
  ↓
Funciones en api.js
  ↓
Fetch API (HTTP)
  ↓
Backend FastAPI
  ↓
Base de Datos
```

## Componentes del Frontend

### App.jsx

Componente principal que:
- Maneja el estado global de las notas
- Controla la visualización de modales y formularios
- Coordina las operaciones CRUD
- Gestiona filtros y estados de carga

### NotaCard.jsx

Componente para mostrar una nota individual:
- Muestra título, contenido y fecha
- Checkbox para marcar como completada
- Botones de editar y eliminar
- Estilos condicionales según el estado

### NotaForm.jsx

Formulario modal para crear/editar notas:
- Campos de título y contenido
- Validación de campos requeridos
- Modo crear o editar según props
- Checkbox para marcar estado

### ConfirmModal.jsx

Modal de confirmación:
- Usado antes de eliminar una nota
- Botones de cancelar y confirmar
- Overlay con cierre al hacer clic fuera

## Servicios y APIs

### api.js

Archivo que centraliza todas las peticiones HTTP:

**Funciones disponibles:**
- `listarNotas()` - GET todas las notas
- `crearNota(nota)` - POST nueva nota
- `obtenerNota(id)` - GET nota por ID
- `actualizarNota(id, nota)` - PUT actualizar nota
- `eliminarNota(id)` - DELETE nota
- `filtrarPorEstado(estado)` - GET notas por estado

Todas las funciones son asíncronas y manejan errores.

## Estado y Gestión de Datos

### Estados en App.jsx

```javascript
notas            // Array de objetos nota
filtro           // String: 'todas', 'pendientes', 'completadas'
mostrarForm      // Boolean: mostrar/ocultar formulario
notaEditando     // Object o null: nota siendo editada
modalEliminar    // Object: {isOpen, notaId}
cargando         // Boolean: estado de carga inicial
error            // String o null: mensaje de error
```

### Flujo de Estado

1. **Carga inicial**: useEffect llama a `cargarNotas()`
2. **Crear**: `handleCrearNota()` → API → actualiza `notas`
3. **Editar**: `handleActualizarNota()` → API → actualiza `notas`
4. **Eliminar**: `confirmarEliminar()` → API → filtra `notas`
5. **Toggle**: `handleToggleEstado()` → API → actualiza `notas`

## Estilos y Diseño

### Tailwind CSS

Sistema de utilidades CSS usado para:
- Layout con Flexbox y Grid
- Colores y fondos
- Espaciado y padding
- Bordes y sombras
- Animaciones y transiciones
- Responsividad con breakpoints

### Personalización

**tailwind.config.js** permite extender:
- Colores personalizados
- Fuentes
- Espaciado
- Breakpoints
- Animaciones

### Clases Personalizadas

En `index.css` se definen:
- Animaciones de fade-in y slide-up
- Efectos de vidrio (glass effect)
- Estilos para tareas completadas

## Build y Optimización

### Proceso de Build

```bash
npm run build
```

Vite realiza:
1. Tree-shaking de código no usado
2. Minificación de JS y CSS
4. Code splitting automático
5. Genera archivos en carpeta `dist/`

### Optimizaciones Aplicadas

- Lazy loading de componentes
- Memoización de cálculos (filtros)
- Debouncing en búsquedas (si se implementa)
- Compresión GZIP automática por Vercel
- Cache de assets estáticos

## Configuración de Entorno

### Variables de Entorno

Las variables deben comenzar con `VITE_` para estar disponibles:

```env
VITE_API_URL=https://apinotasdb-production.up.railway.app
```

Acceso en código:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

### Ambientes

- **Desarrollo**: .env.local (ignorado por Git)
- **Producción**: Variables en Vercel Dashboard
- **Preview**: Configurables por branch

## Dependencias

### Dependencias de Producción

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

### Dependencias de Desarrollo

```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "vite": "^6.0.3",
  "tailwindcss": "^4.0.0",
  "@tailwindcss/postcss": "^4.0.0",
  "autoprefixer": "^10.4.20"
}
```

## Scripts Disponibles

```bash
npm run dev        # Inicia servidor de desarrollo
npm run build      # Construye para producción
npm run preview    # Previsualiza build de producción
npm run lint       # (Si está configurado) Ejecuta linter
```

## Seguridad

### Buenas Prácticas Implementadas

1. **Variables de entorno** para configuración sensible
2. **Validación de entrada** en formularios
3. **Sanitización de datos** antes de mostrar
4. **HTTPS obligatorio** en producción
5. **CORS configurado** en el backend

### Consideraciones

- No se almacenan tokens en localStorage
- No hay autenticación implementada
- Todas las peticiones son HTTPS en producción

## Rendimiento

### Métricas Esperadas

- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: > 90

### Optimizaciones Aplicadas

- Componentes funcionales (más ligeros)
- Memoización donde es necesario
- Lazy loading de rutas (si se implementa)
- CSS purgado automáticamente

## Testing (Para Implementar)

### Herramientas Recomendadas

**Vitest** - Testing unitario
```bash
npm install -D vitest
```

**React Testing Library** - Testing de componentes
```bash
npm install -D @testing-library/react
```

**Playwright** - Testing E2E
```bash
npm install -D @playwright/test
```

## Monitoreo y Logs

### En Desarrollo

- Logs de consola del navegador
- React DevTools
- Network tab para peticiones API

### En Producción

- Vercel Analytics (automático)
- Logs en Vercel Dashboard
- Error tracking (Sentry si se agrega)

## Mantenimiento

### Actualizar Dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas
npm update

# Actualizar una específica
npm install react@latest
```

### Verificar Vulnerabilidades

```bash
npm audit
npm audit fix
```

## Soporte de Navegadores

Compatible con:
- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

No soporta:
- Internet Explorer 11
- Navegadores muy antiguos

## Recursos Adicionales

### Documentación Oficial

- React: react.dev
- Vite: vitejs.dev
- Tailwind CSS: tailwindcss.com
- Vercel: vercel.com/docs
- FastAPI: fastapi.tiangolo.com
