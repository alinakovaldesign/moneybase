---
description: Log a human intervention to the build log. Usage: /log-intervention <what happened>
---

Append to `docs/build-log.md` under the current directive's section:

```
### Intervention — <timestamp>
- **Directive**: <current WALLET-NNN>
- **Agent did**: <1 line, factual — what I produced or attempted>
- **Human redirect**: $ARGUMENTS
- **Why it mattered**: <1 line — the design/UX reason, from the human's stated rationale, not invented>
- **Resolution**: <what changed>
```

Fill `Agent did` and `Resolution` from actual session context. Ask for "why it mattered" if the human didn't say. Do not editorialize or soften the failure — honest logs score better.
