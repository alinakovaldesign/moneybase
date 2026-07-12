# DDR-001 — Evidence-first environment on one web codebase

**Context**: 6h assessment scoring agent-driving evidence over polish; shareable link required; three platforms to reason about.

**Decision**: Single React codebase with runtime platform theming from one token source; git hooks enforce directive→commit traceability; build log + raw sessions captured as work happens.

**Alternatives rejected**:
- Native SwiftUI build — better fidelity, but no shareable link, slower agent iteration, and cross-platform story becomes purely written
- Three separate prototypes — triples surface area, destroys the one-source-of-truth demonstration
- Figma-first flow — weakens "same engineering path as production code" requirement

**Consequences**: Platform skins approximate native (stated honestly); in exchange, Area 4 is demonstrable live and all 6 hours accrue to one artifact.
