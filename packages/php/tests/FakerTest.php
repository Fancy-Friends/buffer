<?php

declare(strict_types=1);

use ParticleAcademy\Buffer\BufferFaker;
use ParticleAcademy\Connectors\FakeValues;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- buffer
 */
/**
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('post_create fakes the shape Buffer publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('buffer', 'post_create', $config));

    $faked = BufferFaker::respond('post_create', ['config' => $config, 'fake' => $fake]);

    expect($faked)->toBe([
        'data' => [
            'createPost' => [
                'post' => [
                    'id' => '03d899f7-0c28-8510-bf6d-93a9c265d743',
                    'status' => 'buffer',
                    'text' => 'A useful update should not be shortened to accommodate generated source formatting.',
                    'assets' => [],
                ],
            ],
        ],
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('buffer', 'no_such_operation', []));

    expect(fn () => BufferFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
