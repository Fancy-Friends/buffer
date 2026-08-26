/**
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
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { bufferFaker } from "../src/faker.js";

test("post_create fakes the shape Buffer publishes", () => {
  const config = {};

  const faked = bufferFaker("post_create", fakeRequest("buffer", "post_create", config));

  assert.deepEqual(faked, {
    "data": {
      "createPost": {
        "post": {
          "id": "03d899f7-0c28-8510-bf6d-93a9c265d743",
          "status": "buffer",
          "text": "A useful update should not be shortened to accommodate generated source formatting.",
          "assets": []
        }
      }
    }
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => bufferFaker("no_such_operation", fakeRequest("buffer", "no_such_operation", {})), /no fake response/);
});
