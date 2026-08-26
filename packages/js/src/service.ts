/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- buffer
 */

/**
 * Buffer, as one service descriptor shared by every Buffer operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Buffer: its base URL, its auth
 * scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Buffer has no separate test estate. createPost writes to a real Buffer
 * channel and can publish to the connected social account. Use fake mode while
 * building, then test against a deliberately private or disposable real
 * channel.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { bufferFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const BUFFER_BASE_URLS = {
  "live": "https://api.buffer.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const BUFFER_REQUIRES = [
  "accessToken"
] as const;

/**
 * Apply Buffer's auth scheme to an outgoing request.
 *
 * Buffer also offers personal API keys, but those act only on the key owner's
 * account. This provider declares App Client OAuth so a host can connect
 * separate Buffer users; both token kinds use the same Bearer header on the
 * wire.
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function bufferAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers.Authorization = `Bearer ${credentials.accessToken ?? ""}`;
}

/** The Buffer service, for the TypeScript runtime. */
export const BUFFER: ServiceDescriptor = {
  service: "buffer",
  title: "Buffer",
  sandbox: "none",
  baseUrls: { ...BUFFER_BASE_URLS },
  requires: [...BUFFER_REQUIRES],
  authorize: bufferAuthorize,
  faker: bufferFaker,
};
