# Guía de Despliegue en Vercel

## Requisitos Previos

- Cuenta en GitHub, GitLab o Bitbucket
- Código del proyecto en un repositorio
- Cuenta en Vercel (gratuita)

## Pasos para Desplegar

### 1. Preparar el Proyecto

Asegúrate de que tu proyecto tenga estos archivos:

```
frontend_notes/
├── package.json
├── vite.config.js
├── vercel.json
└── .env.example
```

### 2. Desplegar desde la Web

1. Ingresa a vercel.com e inicia sesión
2. Haz clic en "Add New Project"
3. Selecciona "Import Git Repository"
4. Elige tu repositorio del frontend
5. Vercel detectará automáticamente que es un proyecto Vite

### 3. Configurar el Proyecto

En la pantalla de configuración:

**Framework Preset:** Vite

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Root Directory:** Dejar en blanco (a menos que el proyecto esté en una subcarpeta)

### 4. Agregar Variables de Entorno

En la sección "Environment Variables":

1. Clic en "Add Environment Variable"
2. Ingresa:
   - Name: `VITE_API_URL`
   - Value: `https://apinotasdb-production.up.railway.app`
3. Selecciona los ambientes: Production, Preview, Development
4. Clic en "Add"

### 5. Iniciar el Despliegue

1. Revisa la configuración
2. Haz clic en "Deploy"
3. Espera a que termine el proceso (1-3 minutos)

### 6. Verificar el Despliegue

Una vez completado:
- Vercel te dará una URL: `https://tu-proyecto.vercel.app`
- Haz clic en "Visit" para ver tu aplicación
- Prueba crear, editar y eliminar notas

## Despliegue Continuo

Vercel configurará automáticamente:
- Cada push a la rama principal desplegará en producción
- Cada pull request creará un preview deployment
- Los cambios se reflejan automáticamente

## Actualizar Variables de Entorno

Si necesitas cambiar la URL del backend después:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings > Environment Variables
3. Edita o elimina la variable existente
4. Agrega la nueva variable
5. Ve a Deployments y haz "Redeploy" en el último deployment

## Configurar Dominio Personalizado (Opcional)

1. En tu proyecto de Vercel, ve a Settings > Domains
2. Ingresa tu dominio personalizado
3. Sigue las instrucciones para configurar DNS
4. Vercel generará un certificado SSL automáticamente

## Despliegue desde la CLI (Alternativa)

Si prefieres usar la terminal:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Iniciar sesión
vercel login

# Desplegar (primera vez)
vercel

# Desplegar a producción
vercel --prod
```

## Solución de Problemas

### Error: Build Failed

Verifica que:
- Todas las dependencias estén en package.json
- No haya errores de sintaxis en el código
- Los imports de archivos tengan las extensiones correctas

Revisa los logs del build en Vercel para más detalles.

### Error: Cannot Connect to API

Verifica que:
- La variable VITE_API_URL esté configurada correctamente
- El backend esté corriendo y accesible
- CORS esté configurado en el backend para permitir el dominio de Vercel

### Error: Environment Variable Not Found

Después de agregar variables de entorno:
1. No se aplicarán a deployments existentes
2. Debes hacer redeploy del proyecto
3. O hacer un nuevo commit para activar el despliegue

### La Aplicación No Carga

Abre las DevTools del navegador (F12):
1. Revisa la pestaña Console para errores JavaScript
2. Revisa la pestaña Network para errores de API
3. Verifica que las peticiones vayan a la URL correcta

## Mejores Prácticas

1. **Usa variables de entorno** para todas las URLs y configuraciones
2. **No hagas commit del archivo .env** (debe estar en .gitignore)
3. **Documenta todas las variables** necesarias en .env.example
4. **Prueba localmente** antes de desplegar
5. **Revisa los logs** después de cada despliegue

## URLs Importantes

Después del despliegue tendrás:
- URL de producción: asignada automáticamente por Vercel
- URL de preview: para cada rama o pull request
- Dashboard: para monitorear y configurar el proyecto

## Monitoreo y Analytics

Vercel proporciona automáticamente:
- Analytics de velocidad y rendimiento
- Logs de despliegue
- Logs de funciones serverless (si las usas)
- Métricas de uso

Accede a estos desde tu Dashboard > proyecto > Analytics