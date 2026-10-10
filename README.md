# Mini Sistema de RRHH

> **Sitio desplegado:** https://desarrollo-web-1.vercel.app/

Aplicación web para la gestión de empleados. El listado y el CRUD de empleados
se sirven desde una API local (JSON Server); la sesión (login, renovación del
token y roles) se resuelve contra una instancia de API-RH.

## Stack

- React 19 y TypeScript, con Vite como herramienta de build.
- TailwindCSS para los estilos.
- React Router para la navegación y las rutas protegidas por rol.
- Zustand para el estado de sesión.
- TanStack Query para el estado del servidor.
- React Hook Form y Zod para formularios y validación.
- Axios como cliente HTTP, con interceptores para el token y los errores.
- react-hot-toast para las notificaciones.
- ESLint (`typescript-eslint`) como linter.

## Requisitos

- Node.js 20 o superior.
- La URL base de una instancia de API-RH.

## Puesta en marcha

```bash
npm install
cp .env.example .env
```

Completa `.env` con la URL base de API-RH, sin `/api/v1` al final:

```
VITE_AUTH_API_URL=<API_BASE_URL_ASIGNADA>
```

Levanta la API local de empleados y la aplicación, cada una en su terminal:

```bash
npm run mock-api   # JSON Server en http://localhost:3001 (datos de db.json)
npm run dev        # aplicación en http://localhost:5173
```

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run build` | Compila TypeScript y genera el build de producción. |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto. |
| `npm run preview` | Sirve el build de producción de forma local. |
| `npm run mock-api` | Levanta JSON Server con `db.json` (desarrollo, con `--watch`). |
| `npm run start:mock` | Levanta JSON Server para producción (lee el puerto de `PORT`). |

## Despliegue

La aplicación son dos piezas que se publican por separado:

1. **API de empleados (JSON Server)**, por ejemplo en [Render](https://render.com) como *Web Service*:
   - Build command: `npm install`
   - Start command: `npm run start:mock`
2. **Frontend (Vite)**, por ejemplo en [Vercel](https://vercel.com) importando este repositorio.
   Variables de entorno:

   | Variable | Valor |
   | --- | --- |
   | `VITE_AUTH_API_URL` | URL base de API-RH, sin `/api/v1` |
   | `VITE_API_URL` | URL pública de la API de empleados del paso 1 |

   Vite lee estas variables al compilar: después de agregarlas o cambiarlas hay que
   volver a desplegar (*Redeploy*). Si `VITE_AUTH_API_URL` falta o no empieza con
   `http(s)://`, el login muestra "Falta configurar la URL de API-RH".

   El archivo `vercel.json` redirige todas las rutas a `index.html`, necesario para
   que React Router funcione al recargar o abrir un enlace directo (por ejemplo la
   página 404).

## Estructura

```
src/
├── components/   # Componentes reutilizables (EmployeeCard, Modal, guards, etc.)
├── hooks/        # useEmployees (TanStack Query) y usePageNotFound
├── layouts/      # Estructura de página (Header)
├── pages/        # Login, Dashboard, Empleados, Detalle de empleado y 404
├── schemas/      # Esquemas de validación con Zod
├── services/     # Clientes HTTP y servicios (API local y API-RH)
├── store/        # Estado de sesión con Zustand
├── types/        # Tipos e interfaces compartidos
└── utils/        # Manejo de errores y datos de apoyo
```

## Roles

| Rol | Acceso |
| --- | --- |
| `ADMIN` | Dashboard y empleados, con permiso para eliminar. |
| `HR_MANAGER` | Dashboard y empleados. |
| `EMPLOYEE` | Dashboard. |

El ocultamiento de opciones por rol es solo de experiencia de uso: la
autorización real la aplica el backend.

## Rutas

| Ruta | Descripción | Acceso |
| --- | --- | --- |
| `/login` | Inicio de sesión | Pública |
| `/dashboard` | Resumen con estadísticas | Cualquier usuario autenticado |
| `/empleados` | Listado, filtros, alta, edición y baja | `ADMIN`, `HR_MANAGER` |
| `/empleados/:id` | Detalle de un empleado (clic en su tarjeta) | `ADMIN`, `HR_MANAGER` |
| `*` | Página 404 (registra la URL con `console.warn`) | Pública |

## Flujo de ramas

- `main` y `stage`: ramas estables.
- `develop`: integración.
- `feature_*`: cambios individuales, que se integran a `develop`.
