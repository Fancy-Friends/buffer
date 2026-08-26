<?php

declare(strict_types=1);

namespace ParticleAcademy\Buffer;

use ParticleAcademy\Connectors\Mode;
use ParticleAcademy\Connectors\PreparedRequest;
use ParticleAcademy\Connectors\SandboxKind;
use ParticleAcademy\Connectors\ServiceDescriptor;

/*
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
 * The PHP twin of the js package's `src/service.ts`.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Buffer has no separate test estate. createPost writes to a real Buffer
 * channel and can publish to the connected social account. Use fake mode while
 * building, then test against a deliberately private or disposable real
 * channel.
 */
final class Buffer
{
    // The connector API version this package was GENERATED against. A
    // literal, never imported: an imported constant lets an upgrade rewrite
    // the very claim it exists to detect.
    public const CONNECTOR_API_VERSION = 1;

    public const SERVICE = 'buffer';

    public const LIVE_URL = 'https://api.buffer.com';

    /** @var list<string> Credential keys a remote call cannot proceed without. */
    public const REQUIRES = [
        'accessToken',
    ];

    public static function descriptor(): ServiceDescriptor
    {
        return new ServiceDescriptor(
            service: self::SERVICE,
            title: 'Buffer',
            sandbox: SandboxKind::None,
            baseUrls: [
                Mode::Live->value => self::LIVE_URL,
            ],
            requires: self::REQUIRES,
            authorize: self::authorize(...),
            faker: BufferFaker::respond(...),
        );
    }

    /**
     * Apply Buffer's auth scheme to an outgoing request.
     *
     * Buffer also offers personal API keys, but those act only on the key owner's
     * account. This provider declares App Client OAuth so a host can connect
     * separate Buffer users; both token kinds use the same Bearer header on the
     * wire.
     *
     * @param array<string,string> $credentials
     */
    public static function authorize(array $credentials, PreparedRequest $request, Mode $mode): void
    {
        $request->withHeader('Authorization', 'Bearer '.($credentials['accessToken'] ?? ''));
    }
}
