# Configuración de la API

## Conectar el Frontend con el Backend

El frontend se conecta al backend a través de la variable de entorno `VITE_API_URL`.

## Configuración en Desarrollo Local

### Paso 1: Crear el Archivo de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
touch .env
```

### Paso 2: Configurar la URL

Abre el archivo `.env` y agrega:

```env
VITE_API_URL=https://apinotasdb-production.up.railway.app
```

Para desarrollo local con backend en tu máquina:

```env
VITE_API_URL=http://localhost:8000
```

### Paso 3: Reiniciar el Servidor

Después de modificar el archivo `.env`:

```bash
npm run dev
```

## Configuración en Producción (Vercel)

### Paso 1: Acceder a la Configuración

1. Ingresa a vercel.com
2. Selecciona tu proyecto
3. Ve a Settings
4. Selecciona "Environment Variables"

### Paso 2: Agregar la Variable

1. Haz clic en "Add New"
2. Completa:
   - Key: `VITE_API_URL`
   - Value: `https://apinotasdb-production.up.railway.app`
3. Selecciona los ambientes (Production, Preview, Development)
4. Guarda los cambios

### Paso 3: Redesplegar

La variable solo se aplicará en nuevos despliegues:
- Haz un nuevo commit y push, o
- Ve a Deployments y haz "Redeploy"

## Estructura de Datos

### Crear Nota (POST /notas/)

Request:
```json
{
  "titulo": "Mi nota",
  "contenido": "Contenido de la nota",
  "fecha": "2025-12-10T10:30:00.000Z",
  "estado": false
}
```

Response:
```json
{
  "id": 1,
  "titulo": "Mi nota",
  "contenido": "Contenido de la nota",
  "fecha": "2025-12-10T10:30:00.000Z",
  "estado": false
}
```

### Actualizar Nota (PUT /notas/{id})

Request:
```json
{
  "titulo": "Nota actualizada",
  "contenido": "Contenido actualizado",
  "fecha": "2025-12-10T10:30:00.000Z",
  "estado": true
}
```

Response:
```json
{
  "id": 1,
  "titulo": "Nota actualizada",
  "contenido": "Contenido actualizado",
  "fecha": "2025-12-10T10:30:00.000Z",
  "estado": true
}
```

### Listar Notas (GET /notas/)

Response:
```json
[
  {
    "id": 1,
    "titulo": "Primera nota",
    "contenido": "Contenido...",
    "fecha": "2025-12-10T10:30:00.000Z",
    "estado": false
  },
  {
    "id": 2,
    "titulo": "Segunda nota",
    "contenido": "Contenido...",
    "fecha": "2025-12-10T11:00:00.000Z",
    "estado": true
  }
]
```

### Eliminar Nota (DELETE /notas/{id})

Response: 204 No Content o {}

## Configurar CORS en el Backend

El backend debe permitir peticiones desde el frontend.

### Para FastAPI (Python)

Abre tu archivo principal (main.py o app.py) y agrega:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Desarrollo local
        "https://tu-frontend.vercel.app",  # Producción en Vercel
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Para Desarrollo (Sin Restricciones)

Solo durante desarrollo, puedes usar:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Nota: No uses `allow_origins=["*"]` en producción por seguridad.

### Para Express (Node.js)

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tu-frontend.vercel.app'
  ],
  credentials: true
}));
```

## Verificar la Conexión

### Desde la Terminal

Verifica que el backend esté accesible:

```bash
# Probar endpoint principal
curl https://apinotasdb-production.up.railway.app/

# Probar endpoint de notas
curl https://apinotasdb-production.up.railway.app/notas/
```

### Desde el Navegador

1. Abre tu aplicación frontend
2. Abre DevTools (F12)
3. Ve a la pestaña Network
4. Intenta crear una nota
5. Busca la petición POST a /notas/
6. Verifica el status code (debe ser 200 o 201)

## Solución de Problemas

### Error: "Failed to fetch"

Posibles causas:
- Backend no está corriendo
- URL incorrecta en VITE_API_URL
- Problemas de red o firewall

Solución:
1. Verifica que el backend esté activo
2. Revisa la URL en .env
3. Prueba la URL directamente en el navegador

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"

Causa: El backend no permite peticiones desde tu dominio

Solución:
1. Agrega el middleware CORS en el backend
2. Incluye tu dominio en allow_origins
3. Reinicia el backend

### Error: "404 Not Found"

Causa: El endpoint no existe o la URL es incorrecta

Solución:
1. Verifica que la URL base sea correcta
2. Revisa que los endpoints en api.js coincidan con tu API
3. Consulta la documentación de tu API (/docs)

### Los Datos No Se Cargan

Pasos para debuggear:
1. Abre la consola del navegador (F12)
2. Busca errores en la pestaña Console
3. Revisa las peticiones en Network
4. Verifica que la respuesta del servidor sea correcta
5. Revisa los logs del backend

## Endpoints Disponibles

El frontend usa estos endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /notas/ | Lista todas las notas |
| POST | /notas/ | Crea una nueva nota |
| GET | /notas/{id} | Obtiene una nota específica |
| PUT | /notas/{id} | Actualiza una nota |
| DELETE | /notas/{id} | Elimina una nota |
| GET | /notas/estado/{estado} | Filtra notas por estado |

## Flujo de Operaciones

### Crear una Nota

1. Usuario llena el formulario
2. Frontend valida los campos
3. Frontend envía POST a /notas/
4. Backend guarda en la base de datos
5. Backend responde con la nota creada (incluye id)
6. Frontend actualiza la lista de notas

### Editar una Nota

1. Usuario hace clic en "Editar"
2. Se abre el formulario con los datos actuales
3. Usuario modifica y guarda
4. Frontend envía PUT a /notas/{id}
5. Backend actualiza en la base de datos
6. Backend responde con la nota actualizada
7. Frontend actualiza la lista

### Eliminar una Nota

1. Usuario hace clic en "Eliminar"
2. Aparece modal de confirmación
3. Usuario confirma
4. Frontend envía DELETE a /notas/{id}
5. Backend elimina de la base de datos
6. Backend responde con confirmación
7. Frontend remueve la nota de la lista

### Cambiar Estado de una Nota

1. Usuario marca/desmarca el checkbox
2. Frontend envía PUT a /notas/{id} con estado invertido
3. Backend actualiza el estado
4. Frontend actualiza la vista

## Seguridad

### Variables de Entorno

- Nunca hagas commit del archivo .env
- Mantén .env en .gitignore
- Usa .env.example para documentar variables necesarias

### API Keys

Si tu API requiere autenticación:

1. Agrega la variable en .env:
```env
VITE_API_KEY=tu_clave_secreta
```

2. Úsala en api.js:
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
}
```

### HTTPS

En producción, siempre usa HTTPS:
- Vercel proporciona HTTPS automáticamente
- Railway también proporciona HTTPS
- No uses HTTP en producción