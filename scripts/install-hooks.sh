#!/bin/sh
# Run once after git init, from repo root.
cp scripts/commit-msg .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
echo "✓ commit-msg hook installed — commits now require a WALLET-NNN directive reference."
