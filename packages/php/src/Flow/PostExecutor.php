<?php

declare(strict_types=1);

namespace ParticleAcademy\Buffer\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Buffer\Actions\PostCreate;
use ParticleAcademy\Buffer\Buffer;
use ParticleAcademy\Connectors\ConnectorClient;

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
 * Buffer post, run on a fancy-flow-php host.
 *
 * The PHP twin of `bufferPostExecutor` in @particle-academy/buffer-js: the
 * same request, built from the node's config by the same `Actions\PostCreate`
 * a host would call directly, and the same value on `out` — the client's
 * `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Buffer. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/buffer_post',
    aliases: [
        'buffer_post',
    ],
    category: 'io',
    label: 'Buffer post',
    description: 'Create or queue a text post in Buffer.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'unsafe-to-replay',
    outputShape: [
        [
            'path' => 'data.createPost.post.id',
            'type' => 'string',
            'description' => 'The created Buffer post id.',
        ],
        [
            'path' => 'data.createPost.post.status',
            'type' => 'string',
            'description' => 'The post\'s current queue or publishing status.',
        ],
        [
            'path' => 'data.createPost.post.text',
            'type' => 'string',
            'description' => 'The text Buffer stored for the post.',
        ],
        [
            'path' => 'data.createPost.post.assets',
            'type' => 'array',
            'description' => 'Assets attached to the post; empty for this text-only action.',
        ],
        [
            'path' => 'data.createPost.message',
            'type' => 'string',
            'description' => 'A user-fixable MutationError message when Buffer rejects the input inside an HTTP 200 GraphQL response.',
        ],
    ],
)]
final class PostExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Buffer::descriptor(),
            PostCreate::OPERATION,
            $config,
            [
                'method' => PostCreate::METHOD,
                'path' => PostCreate::PATH,
                'json' => PostCreate::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'buffer post_create'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
