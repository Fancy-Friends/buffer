# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/post-create.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/post-create.json (or weaver's template/) and regenerate:
#
# npm run provider -- buffer

"""Create or queue a text post in Buffer.

POST / — https://developers.buffer.com/examples/create-text-post.html

This describes the request. `call` resolves the connection, picks the
estate, and either calls Buffer or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "post_create"
METHOD = "POST"
PATH = "/"
DOCUMENT = """\
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
}"""
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the GraphQL request for one call, failing loudly and specifically."""
    if config.get("channelId") is None or config.get("channelId") == "":
        raise ConnectorConfigError(
            "post_create: \"channelId\" is required (Channel ID)."
        )

    if config.get("text") is None or config.get("text") == "":
        raise ConnectorConfigError(
            "post_create: \"text\" is required (Post text)."
        )

    if config.get("schedulingType") is None or config.get("schedulingType") == "":
        raise ConnectorConfigError(
            "post_create: \"schedulingType\" is required (Publishing method)."
        )

    if config.get("shareMode") is None or config.get("shareMode") == "":
        raise ConnectorConfigError(
            "post_create: \"shareMode\" is required (Queue position)."
        )

    out: dict[str, Any] = {}
    _value = config.get("channelId")
    if _value is None or _value == "":
        raise ConnectorConfigError("post_create: \"channelId\" is required.")

    out["channelId"] = str(_value)
    _value = config.get("text")
    if _value is None or _value == "":
        raise ConnectorConfigError("post_create: \"text\" is required.")

    out["text"] = str(_value)
    _value = config.get("schedulingType")
    if _value is None or _value == "":
        raise ConnectorConfigError("post_create: \"schedulingType\" is required.")

    out["schedulingType"] = str(_value)
    _value = config.get("shareMode")
    if _value is None or _value == "":
        raise ConnectorConfigError("post_create: \"shareMode\" is required.")

    out["shareMode"] = str(_value)

    return {"query": DOCUMENT, "variables": out}


def post_create(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Create or queue a text post in Buffer."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
