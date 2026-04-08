# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| sdd-init Trigger (from sdd-init SKILL) | sdd-init | C:\Users\lapij\AppData\Roaming\opencode\skills\sdd-init\SKILL.md |

## Compact Rules

### sdd-init
- Detect the project tech stack from package.json (expo, react-native, firebase) and declared dependencies
- Detect architecture patterns in use (hooks, contexts, navigation)
- Detect test runner presence (jest/vitest) and linter/formatter availability
- Persist context to Engram when available
- Do not create placeholder specs during initial bootstrap

### Project Conventions Found
- sdd-init is registered and used

### Next Steps
- Use sdd-explore to define changes
