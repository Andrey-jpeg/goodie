# @goodie-ts/security

## 2.1.0

### Minor Changes

- 023b7e5: Expose build-time transformer plugins through dedicated `/plugin` entry points. Events, Kysely, and scheduler consumers that configure plugins manually must update their imports to use the new entry point.
