# MORPHYX — Environment Configuration Guide

## 1. Security First Principles

- **NEVER** commit `.env` or `.env.local` files to Git.
- **NEVER** expose the Supabase `SERVICE_ROLE_KEY` to client-side code (`apps/web`). Only public `ANON_KEY` is permitted in the frontend.
- All backend variables are strictly validated using **Zod** (`apps/server/src/config/env.ts`). If an invalid variable is supplied, the process logs clear instructions and fails fast.

---

## 2. Server Environment Variables (`apps/server/.env`)

| Variable                    | Type                                | Default                 | Description                              |
| :-------------------------- | :---------------------------------- | :---------------------- | :--------------------------------------- |
| `NODE_ENV`                  | `development \| test \| production` | `development`           | Node.js execution environment            |
| `PORT`                      | Number (1000-65535)                 | `4000`                  | Port for Express HTTP server             |
| `HOST`                      | String                              | `0.0.0.0`               | Host binding interface                   |
| `CORS_ORIGIN`               | URL String                          | `http://localhost:5173` | Allowed frontend origin                  |
| `LOG_LEVEL`                 | `error \| warn \| info \| debug`    | `info`                  | Structured logger filter level           |
| `SUPABASE_URL`              | URL String (Optional)               | `""`                    | Supabase Project URL                     |
| `SUPABASE_ANON_KEY`         | String (Optional)                   | `""`                    | Supabase Public Anonymous API key        |
| `SUPABASE_SERVICE_ROLE_KEY` | String (Optional)                   | `""`                    | Supabase Private Admin key (Server only) |

---

## 3. Web Environment Variables (`apps/web/.env.local`)

| Variable                 | Type                  | Default                 | Description                              |
| :----------------------- | :-------------------- | :---------------------- | :--------------------------------------- |
| `VITE_API_URL`           | URL String            | `http://localhost:4000` | Address of MORPHYX Express API           |
| `VITE_SUPABASE_URL`      | URL String (Optional) | `""`                    | Supabase Project URL                     |
| `VITE_SUPABASE_ANON_KEY` | String (Optional)     | `""`                    | Supabase Anonymous Key (SAFE FOR CLIENT) |

> [!CAUTION]
> Never prepend `VITE_` to any private service-role keys or passwords. Anything with `VITE_` prefix will be bundled into the client JavaScript bundle.
