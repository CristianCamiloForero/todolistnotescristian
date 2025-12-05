# 🚀 Guía de Despliegue en Vercel

## Pasos para desplegar tu frontend

### 1. Preparar el Repositorio

Asegúrate de que tu código esté en un repositorio de GitHub, GitLab o Bitbucket.

### 2. Desplegar en Vercel

#### Opción A: Desde la Interfaz Web

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "New Project"
3. Importa tu repositorio de Git
4. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Agrega la variable de entorno:
   - Clave: `VITE_API_URL`
   - Valor: La URL de tu API backend (ejemplo: `https://tu-api.herokuapp.com`)

6. Haz clic en "Deploy"

#### Opción B: Desde la CLI

```bash
# Instala Vercel CLI
npm i -g vercel

# Inicia sesión
vercel login

# Despliega
vercel

# Para producción
vercel --prod
```

### 3. Configurar Variables de Entorno

En el dashboard de Vercel:
1. Ve a tu proyecto
2. Selecciona "Settings" > "Environment Variables"
3. Agrega:
   - `VITE_API_URL` = URL de tu backend

**Importante**: Después de agregar variables de entorno, necesitas redesplegar el proyecto.

### 4. CORS en el Backend

Asegúrate de que tu API backend tenga configurado CORS para permitir peticiones desde tu dominio de Vercel:

```python
# En tu backend FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Desarrollo local
        "https://tu-app.vercel.app",  # Tu dominio de Vercel
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 5. Dominio Personalizado (Opcional)

1. Ve a tu proyecto en Vercel
2. Selecciona "Settings" > "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar el DNS

## 🔄 Despliegue Continuo

Vercel automáticamente:
- Despliega cada push a la rama principal
- Crea previews para pull requests
- Actualiza el sitio cuando hagas push

## 🐛 Solución de Problemas

### Error: "Cannot find module"
- Asegúrate de que todas las dependencias estén en `package.json`
- Verifica que los imports tengan las extensiones correctas

### Error: "API_URL is not defined"
- Verifica que la variable de entorno `VITE_API_URL` esté configurada en Vercel
- Redesplega después de agregar variables de entorno

### Error de CORS
- Configura CORS en tu backend para permitir el dominio de Vercel
- Verifica que la URL del backend sea correcta

## 📱 URLs de tu Proyecto

Después del despliegue, tendrás:
- **URL de Producción**: `https://tu-proyecto.vercel.app`
- **URL de Preview**: Para cada PR/branch

## 🔗 Enlaces Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Variables de Entorno en Vite](https://vitejs.dev/guide/env-and-mode.html)
- [Configuración de CORS FastAPI](https://fastapi.tiangolo.com/tutorial/cors/)
