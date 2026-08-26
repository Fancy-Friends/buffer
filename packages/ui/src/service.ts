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
 * Buffer's identity on the authoring surface, shared by every Buffer node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * Buffer has no separate test estate. createPost writes to a real Buffer
 * channel and can publish to the connected social account. Use fake mode while
 * building, then test against a deliberately private or disposable real
 * channel.
 */

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const BUFFER_SERVICE = {
  service: "buffer",
  serviceTitle: "Buffer",
  domain: "marketing",
  sandbox: "none",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a Buffer connection holds. */
export const BUFFER_CREDENTIALS = [
  {
    "key": "clientId",
    "label": "OAuth client ID",
    "scope": "provider",
    "secret": false,
    "help": "From the Buffer App Client registered under Settings -> API; one value for the whole installation."
  },
  {
    "key": "clientSecret",
    "label": "OAuth client secret",
    "scope": "provider",
    "secret": true,
    "help": "For a confidential App Client. Buffer still requires PKCE in addition to this secret, not instead of it."
  },
  {
    "key": "accessToken",
    "label": "Access token",
    "scope": "account",
    "secret": true,
    "help": "Per connected Buffer user. It expires after one hour and is sent as a Bearer token."
  },
  {
    "key": "refreshToken",
    "label": "Rotating refresh token",
    "scope": "account",
    "secret": true,
    "help": "Per connected user and single-use. Replace it atomically after every refresh; replaying an old value revokes the grant."
  }
] as const;

/**
 * The OAuth2 exchange Buffer requires — DECLARED here, performed by the host.
 *
 * A consent screen needs a browser, a redirect URI and somewhere to persist
 * the result, and all three belong to the host; a package that ran the dance
 * itself would have to own a web server. So this says precisely enough for a
 * host to do it.
 *
 * The access token lasts 3600 seconds. A host that never refreshes will work
 * all afternoon and be broken by morning, which is why the lifetime is stated
 * rather than left to be discovered.
 *
 * Its refresh tokens ROTATE, and they are single use. Every refresh returns a
 * new one and spends the one submitted, so REPLAYING a spent token revokes the
 * entire grant — the user is signed out, with nothing in the failure that says
 * why.
 *
 * Two consequences, both of which a host gets wrong by default. Do not RETRY a
 * failed refresh with the same token: a response that arrived but was not
 * persisted — a crash between the reply and the write — makes the retry a
 * replay. And do not refresh concurrently, because two workers refreshing at
 * once means one of them replays. Persist the returned token BEFORE using the
 * access token it came with.
 *
 * This provider requires PKCE (S256). Generate a verifier per authorization,
 * send its challenge on the authorize call, and send the VERIFIER ITSELF on
 * the token exchange — which means it has to survive between two separate
 * requests. Without it the exchange is refused outright rather than degraded.
 */
export const BUFFER_OAUTH = {
  "flow": "authorization_code",
  "authorizeUrl": "https://auth.buffer.com/auth",
  "tokenUrl": "https://auth.buffer.com/token",
  "scopes": [
    "posts:write",
    "offline_access"
  ],
  "accessTokenCredential": "accessToken",
  "refreshTokenCredential": "refreshToken",
  "refreshTokenRotates": true,
  "accessTokenTtlSeconds": 3600,
  "pkce": "S256"
} as const;

/** Build a Buffer node's connector metadata from the operation it performs. */
export function bufferMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...BUFFER_SERVICE, role, operation, docs };
}
