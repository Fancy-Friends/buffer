<?php

declare(strict_types=1);

namespace ParticleAcademy\Buffer\Actions;

use ParticleAcademy\Buffer\Buffer;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Buffer or calls the faker.
 */
final class PostCreate
{
    public const OPERATION = 'post_create';
    public const METHOD = 'POST';
    public const PATH = '/';
    public const DOCUMENT = <<<'GRAPHQL'
        mutation CreatePost(
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
        }
        GRAPHQL;
    public const SIDE_EFFECTS = 'unsafe-to-replay';

    /**
     * Build the form body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Buffer.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        if (($config['channelId'] ?? null) === null || ($config['channelId'] ?? null) === '') {
            throw new ConnectorConfigException('post_create: "channelId" is required (Channel ID).');
        }

        if (($config['text'] ?? null) === null || ($config['text'] ?? null) === '') {
            throw new ConnectorConfigException('post_create: "text" is required (Post text).');
        }

        if (($config['schedulingType'] ?? null) === null || ($config['schedulingType'] ?? null) === '') {
            throw new ConnectorConfigException('post_create: "schedulingType" is required (Publishing method).');
        }

        if (($config['shareMode'] ?? null) === null || ($config['shareMode'] ?? null) === '') {
            throw new ConnectorConfigException('post_create: "shareMode" is required (Queue position).');
        }

        $body = [];

        $value = $config['channelId'] ?? null;
        $body['channelId'] = (string) $value;

        $value = $config['text'] ?? null;
        $body['text'] = (string) $value;

        $value = $config['schedulingType'] ?? null;
        $body['schedulingType'] = (string) $value;

        $value = $config['shareMode'] ?? null;
        $body['shareMode'] = (string) $value;

        $body = $body === [] ? new \stdClass() : $body;
        return ['query' => self::DOCUMENT, 'variables' => $body];
    }
}
