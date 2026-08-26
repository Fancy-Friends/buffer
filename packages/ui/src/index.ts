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
 * Buffer's node kinds for fancy-flow.
 *
 * Install this on every host. The TypeScript executors live in the js
 * package's `./flow` subpath; PHP and Python hosts run their own and need only
 * this.
 */

export * from "./service.js";
export * from "./kinds/post-create.js";

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { bufferPostKind } from "./kinds/post-create.js";

/** Every Buffer kind, for a host that registers the lot. */
export const BUFFER_KINDS: NodeKindDefinition[] = [
  bufferPostKind,
];
