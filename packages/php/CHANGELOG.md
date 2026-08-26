# Changelog

All notable changes to `@particle-academy/buffer-ui`,
`@particle-academy/buffer-js`, `particle-academy/buffer-php` and
`fancy-buffer`.

## [0.1.0] — 2026-08-23

First release.

### Added

- `post_create` — create, queue or immediately share a text post through
  Buffer's current GraphQL API.
- A GraphQL PostActionSuccess faker for development without creating a real
  post.

### Current API, not legacy REST

The connector targets `POST https://api.buffer.com` with a JSON GraphQL
envelope. The historical form-encoded `api.bufferapp.com/1` API is not used.

### OAuth safety

Buffer requires S256 PKCE for every App Client. Access tokens last one hour and
refresh tokens rotate on every use; replaying an old refresh token revokes the
entire grant.

### No sandbox or idempotency guarantee

Buffer has no separate test estate, and `createPost` documents no idempotency
key. A retry may create or publish the post twice.

[0.1.0]: https://github.com/Fancy-Friends/buffer/releases/tag/v0.1.0
