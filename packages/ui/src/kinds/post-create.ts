/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/post-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/post-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- buffer
 */

/**
 * Buffer post — Create or queue a text post in Buffer.
 *
 * https://developers.buffer.com/examples/create-text-post.html
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { bufferMeta } from "../service.js";

export const BUFFER_POST_KIND = "@particle-academy/buffer_post";
export const BUFFER_POST_OPERATION = "post_create";

export const BUFFER_POST_META = bufferMeta("action", "create a Buffer post", "https://developers.buffer.com/examples/create-text-post.html");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const BUFFER_POST_OUTPUT: OutputField[] = [
  {
    "path": "data.createPost.post.id",
    "type": "string",
    "description": "The created Buffer post id."
  },
  {
    "path": "data.createPost.post.status",
    "type": "string",
    "description": "The post's current queue or publishing status."
  },
  {
    "path": "data.createPost.post.text",
    "type": "string",
    "description": "The text Buffer stored for the post."
  },
  {
    "path": "data.createPost.post.assets",
    "type": "array",
    "description": "Assets attached to the post; empty for this text-only action."
  },
  {
    "path": "data.createPost.message",
    "type": "string",
    "description": "A user-fixable MutationError message when Buffer rejects the input inside an HTTP 200 GraphQL response."
  }
];

export const bufferPostKind: NodeKindDefinition = defineConnectorKind(BUFFER_POST_META, {
  name: BUFFER_POST_KIND,
  aliases: ["buffer_post"],
  label: "Buffer post",
  description: "Create or queue a text post in Buffer.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: BUFFER_POST_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "channelId",
      "label": "Channel ID",
      "required": true,
      "description": "The Buffer channel that will own and publish the post."
    },
    {
      "type": "textarea",
      "key": "text",
      "label": "Post text",
      "required": true,
      "description": "The text Buffer stores for the post. Network-specific length and content rules still apply at mutation time."
    },
    {
      "type": "select",
      "key": "schedulingType",
      "label": "Publishing method",
      "required": true,
      "default": "automatic",
      "description": "Automatic publishing sends through the connected network; notification publishing asks the user to finish through Buffer's notification workflow.",
      "options": [
        {
          "value": "automatic",
          "label": "Automatic"
        },
        {
          "value": "notification",
          "label": "Notification"
        }
      ]
    },
    {
      "type": "select",
      "key": "shareMode",
      "label": "Queue position",
      "required": true,
      "default": "addToQueue",
      "description": "Add to the normal queue, publish now, or place it next in line.",
      "options": [
        {
          "value": "addToQueue",
          "label": "Add to queue"
        },
        {
          "value": "shareNow",
          "label": "Share now"
        },
        {
          "value": "shareNext",
          "label": "Share next"
        }
      ]
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(BUFFER_POST_META, config as Record<string, unknown>, "create a Buffer post"),
});
