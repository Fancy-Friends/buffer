# Buffer

Buffer for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/buffer-ui` | `npm install @particle-academy/buffer-ui` |
| Node | `@particle-academy/buffer-js` | `npm install @particle-academy/buffer-js` |
| PHP 8.4+ | `particle-academy/buffer-php` | `composer require particle-academy/buffer-php` |
| Python 3.11+ | `fancy-buffer` | `pip install fancy-buffer` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Buffer SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Buffer connection holds 4 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **OAuth client ID** | per installation | not secret | From the Buffer App Client registered under Settings -> API; one value for the whole installation. |
| **OAuth client secret** | per installation | **secret** | For a confidential App Client. Buffer still requires PKCE in addition to this secret, not instead of it. |
| **Access token** | per connected account | **secret** | Per connected Buffer user. It expires after one hour and is sent as a Bearer token. |
| **Rotating refresh token** | per connected account | **secret** | Per connected user and single-use. Replace it atomically after every refresh; replaying an old value revokes the grant. |

### Authorising

Buffer uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://auth.buffer.com/auth
- **Token URL** — https://auth.buffer.com/token
- **Scopes** — `posts:write`, `offline_access`
- **Access token lifetime** — 3600 seconds (1 hours). A host that never refreshes works all afternoon and is broken by morning.
- **PKCE is REQUIRED** (`S256`). Generate a verifier per authorization, send its challenge on the authorize call, and send the verifier itself on the token exchange — so it has to survive between two separate requests. Without it the exchange is refused outright.

**The refresh tokens ROTATE, and they are single use.** Every refresh returns a new one and spends the one submitted, so replaying a spent token revokes the ENTIRE grant — the user is signed out, with nothing in the failure that says why.

Two consequences, both of which a host gets wrong by default:

1. **Do not RETRY a failed refresh with the same token.** A response that arrived but was not persisted — a crash between the reply and the write — turns the reflexive retry into a replay.
2. **Do not refresh CONCURRENTLY.** Two workers refreshing at once means one of them replays.

Persist the returned token before using the access token it came with.

### The estate

**Buffer has no test estate, and somebody checked.** Everything this connector does is real. Use the faker to build against it.

> Buffer has no separate test estate. createPost writes to a real Buffer channel and can publish to the connected social account. Use fake mode while building, then test against a deliberately private or disposable real channel.

## What it can do

### Actions

#### `post_create` — Buffer post

Create or queue a text post in Buffer.

`POST /` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `channelId` | yes | The Buffer channel that will own and publish the post. |
| `text` | yes | The text Buffer stores for the post. Network-specific length and content rules still apply at mutation time. |
| `schedulingType` | yes | Automatic publishing sends through the connected network; notification publishing asks the user to finish through Buffer's notification workflow. |
| `shareMode` | yes | Add to the normal queue, publish now, or place it next in line. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Buffer has a sandbox. Set a
node's mode to `fake` and it returns the shape Buffer actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/buffer`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
