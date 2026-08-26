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
 * Create or queue a text post in Buffer.
 *
 * POST / — https://developers.buffer.com/examples/create-text-post.html
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Buffer or calls the faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { BUFFER } from "../service.js";

export const POST_CREATE_OPERATION = "post_create";

const DOCUMENT = `mutation CreatePost(
  $channelId: ChannelId!,
  $text: String!,
  $schedulingType: SchedulingType!,
  $shareMode: ShareMode!
) {
  createPost(input: {
    channelId: $channelId
    text: $text
    schedulingType: $schedulingType
    mode: $shareMode
  }) {
    ... on PostActionSuccess {
      post {
        id
        status
        text
        assets {
          id
          mimeType
        }
      }
    }
    ... on MutationError {
      message
    }
  }
}`;

export type PostCreateOptions = {
  /** The node's resolved config. Keys: channelId, text, schedulingType, shareMode. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function bufferPostCreate(options: PostCreateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.channelId === undefined || config.channelId === null || config.channelId === "") {
    throw new Error(`post_create: "channelId" is required (Channel ID).`);
  }

  if (config.text === undefined || config.text === null || config.text === "") {
    throw new Error(`post_create: "text" is required (Post text).`);
  }

  if (config.schedulingType === undefined || config.schedulingType === null || config.schedulingType === "") {
    throw new Error(`post_create: "schedulingType" is required (Publishing method).`);
  }

  if (config.shareMode === undefined || config.shareMode === null || config.shareMode === "") {
    throw new Error(`post_create: "shareMode" is required (Queue position).`);
  }

  return callConnector(BUFFER, {
    operation: POST_CREATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: "/",
      json: {
        query: DOCUMENT,
        variables: {
          "channelId": String(config.channelId),
          "text": String(config.text),
          "schedulingType": String(config.schedulingType),
          "shareMode": String(config.shareMode),
        },
      },
    },
  });
}
