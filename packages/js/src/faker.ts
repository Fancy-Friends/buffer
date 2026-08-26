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
 * The Buffer faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Buffer actually publishes, so an author can wire {{ $json.data.id }}
 * against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakePostCreate({ config, fake }: FakeRequest): unknown {
  return {
    "data": {
      "createPost": {
        "post": {
          "id": "03d899f7-0c28-8510-bf6d-93a9c265d743",
          "status": "buffer",
          "text": "A useful update should not be shortened to accommodate generated source formatting.",
          "assets": [],
        },
      },
    },
  };
}

export const bufferFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "post_create":
      return fakePostCreate(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `buffer: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
