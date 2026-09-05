---
"@goodie-ts/events": major
"@goodie-ts/hono": minor
"@goodie-ts/kysely": major
"@goodie-ts/scheduler": major
"@goodie-ts/security": minor
"@goodie-ts/validation": minor
---

Expose build-time transformer plugins through dedicated `/plugin` entry points. Events, Kysely, and scheduler consumers that configure plugins manually must update their imports to use the new entry point.
