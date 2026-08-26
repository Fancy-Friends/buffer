"""
Buffer — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_buffer._fake import FakeValues, seed_for_call
from fancy_buffer.faker import respond

GOLDENS = [
    {
        "operation": "post_create",
        "config": {},
        "expected": {
            "data": {
                "createPost": {
                    "post": {
                        "id": "03d899f7-0c28-8510-bf6d-93a9c265d743",
                        "status": "buffer",
                        "text": (
                                    "A useful update should not be shortened to accommodate "
                                    "generated source formatting."
                                ),
                        "assets": [],
                    },
                },
            },
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-buffer")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("buffer", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
