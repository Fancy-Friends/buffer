# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- buffer

"""Buffer, as one service descriptor shared by every Buffer operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

Buffer has no separate test estate. createPost writes to a real Buffer
channel and can publish to the connected social account. Use fake mode while
building, then test against a deliberately private or disposable real
channel.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "buffer"
TITLE = "Buffer"
SANDBOX = "none"
BASE_URLS = {
    "live": "https://api.buffer.com",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "accessToken",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Buffer's auth scheme to an outgoing request.
    
    Buffer also offers personal API keys, but those act only on the key owner's
    account. This provider declares App Client OAuth so a host can connect
    separate Buffer users; both token kinds use the same Bearer header on the
    wire.
    """
    request.headers["Authorization"] = f"Bearer {credentials.get('accessToken') or ''}"


def descriptor() -> ServiceDescriptor:
    """The Buffer service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
