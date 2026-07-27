# AI Capstone — Project Guide

Guidance for working in this repository. Follow these conventions when adding or modifying code.

## Project Overview

Full-stack AI capstone application with a React frontend and a Node.js backend. The client handles UI and user interaction; the server exposes API routes, business logic, and external integrations.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, JavaScript, HTML, CSS |
| Backend | Node.js |
| Version control | Git |

## Project Structure

```
ai-capstone/
├── client/     # React app (components, pages, styles)
├── server/     # Node.js API (routes, controllers, services)
└── ...
```

Keep a clear separation between client and server. Do not mix frontend and backend concerns in the same module.

## React Conventions

- Use **functional components** only. Do not introduce class components.
- Prefer React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`) for state and side effects.
- One component per file. Name the file after the component (e.g., `UserProfile.jsx`).
- Keep components focused: presentational components render UI; container components handle data fetching and state.
- Colocate component-specific styles when practical; use shared styles for global or reusable patterns.

## JavaScript Conventions

- Write plain **JavaScript**. Do not add TypeScript unless the project explicitly adopts it.
- Use **`camelCase`** for variables, functions, and object properties.
- Use **`PascalCase`** for React component names and constructor-style classes (if any on the server).
- Use **`UPPER_SNAKE_CASE`** for module-level constants that are truly immutable configuration values.
- Choose **meaningful variable names** that describe intent, not implementation:

  ```javascript
  // Good
  const activeUsers = users.filter((user) => user.isActive);
  const fetchChatHistory = async (sessionId) => { /* ... */ };

  // Avoid
  const arr = users.filter((u) => u.a);
  const getData = async (id) => { /* ... */ };
  ```

- Prefer `const` by default; use `let` only when reassignment is required. Avoid `var`.
- Use async/await for asynchronous code instead of raw Promise chains when readability improves.
- Export named functions and components; use default exports sparingly and consistently within each folder.

## Node.js Conventions

- Organize the server by responsibility: routes → controllers → services.
- Keep route handlers thin; move business logic into service modules.
- Validate input at API boundaries before processing.
- Use environment variables for secrets, ports, and API keys. Never commit `.env` files.
- Return consistent JSON response shapes and appropriate HTTP status codes.

## Clean Code Principles

- **Single responsibility** — Each function and module should do one thing well.
- **Small functions** — If a function exceeds ~30 lines or has multiple levels of nesting, consider extracting helpers.
- **No magic numbers or strings** — Extract repeated or unclear values into named constants.
- **DRY with restraint** — Avoid duplication, but do not over-abstract one-off logic into premature helpers.
- **Comments sparingly** — Code should be self-explanatory. Comment only non-obvious business rules or complex algorithms.
- **Error handling** — Handle expected errors explicitly; avoid silent failures. Log server errors with enough context to debug.
- **Minimal diffs** — Change only what the task requires. Match existing patterns in surrounding code.

## Git & Commits

Follow **[Conventional Commits](https://www.conventionalcommits.org/)**:

```
<type>(<optional scope>): <short description>

[optional body]
```

Common types:

| Type | Use for |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or updating tests |
| `chore` | Build, tooling, dependencies |

Examples:

```
feat(client): add chat message input component
fix(server): handle missing API key gracefully
docs: update README setup instructions
```

- Use imperative mood in the subject line: "add feature" not "added feature".
- Keep the subject line under 72 characters.

## General Guidelines for Contributors

1. Read surrounding code before writing new code; match existing style and structure.
2. Do not introduce new dependencies without a clear reason.
3. Do not commit secrets, credentials, or `.env` files.
4. Test changes locally before opening a pull request.
5. Update documentation when behavior or setup steps change.
