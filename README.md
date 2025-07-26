# sadv1 Monorepo

- **admin-panel:** Panel administrativo (Next.js)
- **mobile-app:** App móvil (React Native)
- **api:** Backend (NestJS)
- **packages:** Código compartido (UI, utils, types)

## Comandos útiles

- `npm run lint` — Linting de todo el monorepo
- `npm run format` — Formateo de todo el monorepo

# Configuración de puertos y variables de entorno

## Desarrollo local
- **Frontend (Next.js):**
  - Puerto por defecto: 3000
  - Archivo: `apps/admin-panel/.env.local`
  - Ejemplo:
    ```
    PORT=3000
    ```
- **Backend (NestJS):**
  - Puerto por defecto: 3001
  - Archivo: `apps/api/.env`
  - Ejemplo:
    ```
    PORT=3001
    ```

## Producción
- Puedes sobrescribir el puerto con la variable de entorno `PORT` según tu infraestructura (Docker, Nginx, PaaS, etc.).
- **Nunca uses el mismo puerto para frontend y backend en el mismo host.**
- Si tu plataforma (Heroku, Vercel, etc.) define su propio `PORT`, tu app debe respetarlo.

## Buenas prácticas
- Mantén los puertos separados para evitar conflictos.
- Usa archivos `.env` para desarrollo local y variables de entorno en producción.
- El valor por defecto en el código debe ser seguro (`process.env.PORT ?? 3001` para backend).
