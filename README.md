# gstack-study

Monorepo scaffold for a learning-focused chat app.

## Apps

- `apps/web`: Next.js web client
- `apps/mobile`: Expo React Native mobile client
- `apps/server`: NestJS API and realtime server
- `packages/shared`: shared types for clients and server

## Quick start

1. Start PostgreSQL:
   `docker compose up -d`
2. Install dependencies:
   `corepack pnpm install`
3. Generate Prisma client:
   `corepack pnpm --filter @gstack-study/server exec prisma generate`
4. Run apps:
   `corepack pnpm dev:web`
   `corepack pnpm dev:mobile`
   `corepack pnpm dev:server`
