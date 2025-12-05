# 🔗 Configuración de la API

## Configurar la URL del Backend

Para conectar el frontend con tu API de notas, necesitas configurar la variable de entorno `VITE_API_URL`.

### En Desarrollo Local

1. Abre el archivo `.env` en la raíz del proyecto
2. Modifica la URL según tu configuración:

```env
# Si tu API corre en localhost
VITE_API_URL=http://localhost:8000

# O si tu API ya está desplegada
VITE_API_URL=https://tu-api-backend.com
```

3. Reinicia el servidor de desarrollo:
```bash
npm run dev
```

### En Producción (Vercel)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Navega a **Settings** > **Environment Variables**
3. Agrega una nueva variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://tu-api-backend.com`
   - **Environment**: Production (y Preview si lo deseas)
4. Haz clic en **Save**
5. Redesplega tu proyecto para que tome los cambios

## Estructura de Datos que Espera el Frontend

### NotaCreate (POST /notas/)
```json
{
  "titulo": "Mi primera nota",
  "contenido": "Este es el contenido de la nota",
  "fecha": "2025-12-04T10:30:00.000Z",
  "estado": false
}
```

### NotaUpdate (PUT /notas/{id})
```json
{
  "titulo": "Título actualizado",
  "contenido": "Contenido actualizado",
  "fecha": "2025-12-04T10:30:00.000Z",
  "estado": true
}
```

### Nota (Respuesta del servidor)
```json
{
  "id": 1,
  "titulo": "Mi primera nota",
  "contenido": "Este es el contenido de la nota",
  "fecha": "2025-12-04T10:30:00.000Z",
  "estado": false
}
```

## CORS en el Backend

**IMPORTANTE**: Tu API backend debe permitir peticiones desde el frontend.

### Para FastAPI

Agrega el middleware CORS en tu archivo principal:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Desarrollo local
        "https://tu-frontend.vercel.app",  # Tu dominio de Vercel
        # Agrega más dominios según necesites
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permite todos los headers
)
```

### Para desarrollo local sin restricciones

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ Solo para desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Verificar la Conexión

### 1. Verifica que la API esté corriendo

```bash
# Si es local
curl http://localhost:8000/

# Si está en producción
curl https://tu-api-backend.com/
```

### 2. Prueba el endpoint de notas

```bash
curl http://localhost:8000/notas/
```

### 3. Verifica en el navegador

Abre las DevTools (F12) en tu navegador y:
1. Ve a la pestaña **Network**
2. Intenta crear una nota en el frontend
3. Busca las peticiones a `/notas/`
4. Verifica que no haya errores de CORS o 404

## Troubleshooting

### Error: "Failed to fetch"
- ✅ Verifica que la URL en `.env` sea correcta
- ✅ Asegúrate de que el backend esté corriendo
- ✅ Verifica la configuración de CORS

### Error: "CORS policy"
- ✅ Configura el middleware CORS en tu backend
- ✅ Agrega el dominio del frontend a `allow_origins`

### Error: "404 Not Found"
- ✅ Verifica que los endpoints en `src/services/api.js` coincidan con tu API
- ✅ Comprueba que la URL base sea correcta

### Datos no se cargan
- ✅ Abre la consola del navegador (F12)
- ✅ Busca errores en la pestaña Console
- ✅ Verifica las peticiones en la pestaña Network

## Ejemplo Completo de Flujo

1. **Usuario crea una nota**
   - Frontend: `POST http://localhost:8000/notas/`
   - Backend: Guarda en base de datos
   - Backend: Responde con la nota creada (incluye `id`)
   - Frontend: Actualiza la lista de notas

2. **Usuario edita una nota**
   - Frontend: `PUT http://localhost:8000/notas/1`
   - Backend: Actualiza en base de datos
   - Backend: Responde con la nota actualizada
   - Frontend: Actualiza la lista de notas

3. **Usuario elimina una nota**
   - Frontend: `DELETE http://localhost:8000/notas/1`
   - Backend: Elimina de base de datos
   - Backend: Responde con confirmación
   - Frontend: Actualiza la lista de notas

4. **Usuario filtra notas**
   - Frontend: `GET http://localhost:8000/notas/estado/true`
   - Backend: Devuelve solo notas completadas
   - Frontend: Muestra solo notas filtradas
