#!/bin/sh
# PostToolUse hook: appends every agent file-write to the build log's machine log.
# Receives hook JSON on stdin; never blocks the agent (always exits 0).
LOG="${CLAUDE_PROJECT_DIR:-.}/docs/build-log.md"
python3 -c "
import sys, json, datetime
try:
    d = json.load(sys.stdin)
    tool = d.get('tool_name', '?')
    fp = d.get('tool_input', {}).get('file_path', '')
    if fp:
        ts = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
        with open('$LOG', 'a') as f:
            f.write(f'- \`{ts}\` {tool} → \`{fp}\`\n')
except Exception:
    pass
" 2>/dev/null
exit 0
