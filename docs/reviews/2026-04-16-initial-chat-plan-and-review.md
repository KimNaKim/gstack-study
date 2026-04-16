# Initial Chat App Review

Date: 2026-04-16

## Plan-Eng Review Summary

- Product scope is appropriately narrow for a learning project: anonymous 1:1 chat, file upload, web + mobile clients.
- The monorepo split (`apps/web`, `apps/mobile`, `apps/server`, `packages/shared`) is a good fit for shared event contracts and DTOs.
- PostgreSQL + Prisma + NestJS + Expo + Next.js is a reasonable stack for the stated learning goals.

### Recommended design constraints before implementation

1. Treat "1:1 conversation" as a first-class invariant.
   The backend should guarantee one conversation per user pair, not just "a conversation can have members".

2. Separate uploaded file metadata from chat messages.
   Even if the first version stores only `fileUrl`, define the API so file storage can move from local disk to S3-compatible storage without changing the message contract.

3. Lock the realtime contract in `packages/shared`.
   Define socket event names and message DTOs once, then import them from web/mobile/server instead of duplicating string literals.

4. Keep guest auth disposable.
   Guests should have revocable, low-privilege sessions so later migration to named accounts does not force a schema rewrite.

5. Decide early whether mobile and web create conversations the same way.
   A single idempotent "open-or-create DM" API prevents duplicated business logic and duplicate threads.

## Review Findings

1. The current schema/migration does not enforce the promised 1:1 invariant.
   `Conversation` + `ConversationMember` currently models a generic group chat, so the same two guest users can end up with multiple parallel conversations. This will leak into every client flow that expects "open chat with user X" to be deterministic.

2. `apps/mobile` currently contains a nested `.git` directory.
   Git is treating it as a dirty gitlink without a matching `.gitmodules` entry, which is fragile for commits, clones, and code review. It should be normalized into a regular tracked directory before more work lands.

## Suggested next implementation steps

1. Normalize `apps/mobile` into a regular workspace package.
2. Refine Prisma schema for 1:1 conversations and file attachments.
3. Add Prisma service/module to NestJS.
4. Implement guest session creation and an idempotent "open-or-create conversation" API.
5. Add Socket.IO event contracts to `packages/shared`.
