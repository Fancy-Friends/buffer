# Changelog

All notable changes to `@particle-academy/buffer-ui`,
`@particle-academy/buffer-js`, `particle-academy/buffer-php` and
`fancy-buffer`.

## [0.1.1] — 2026-09-06

### Changed

- **Published through npm Trusted Publishing, so these packages now carry PROVENANCE.**

Every earlier release went out under a scope-wide npm token. This one is
published by an OIDC exchange from the release workflow itself, and npm records
which workflow in which repository built it.
`npm view @particle-academy/buffer-ui@0.1.1` shows the attestation; releases before
this one have none.

What it buys a consumer: the tarball on the registry can be tied to a public
commit and a public workflow run, rather than to whoever held a token. What it
does not buy: nothing about the code changed, and the runtime behaviour of all
four packages is identical to 0.1.0.

- **`repository.directory` in the npm packages.**

`@particle-academy/buffer-ui` and `@particle-academy/buffer-js` live at
`packages/ui` and `packages/js` inside the provider repo. npm's `repository`
field now says so, which makes the "Repository" link on each package page point
at the package rather than at the repository root.

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
