# Mini RRHH

Mini aplicación de recursos humanos hecha con **React + TypeScript + Vite + Tailwind CSS**.

## Estructura

```
src/
  types.ts                    # Interfaz Employee y tipos Department / EmployeeStatus / EmployeeRole
  data/mockData.ts            # 6 empleados de ejemplo, tipados al 100%
  components/StatsBadge.tsx   # Badge reutilizable: { label, value, color? }
  components/EmployeeCard.tsx # Tarjeta de empleado
  App.tsx                     # Ensambla las 4 estadísticas y la lista de empleados
```

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build de producción

```bash
npm run build
npm run preview
```

## Subir a GitHub

```bash
git init
git add .
git commit -m "Mini RRHH: mockData, StatsBadge y estadísticas en App"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mini-rrhh.git
git push -u origin main
```

(Reemplaza `TU-USUARIO` por tu usuario de GitHub y crea antes el repositorio vacío en github.com/new).
