# Workaround Monorepo

This repository is organized as a Bazel monorepo for full-stack development, with all builds, tests, and service runs performed via Bazel targets. Local infrastructure is managed via Bazel-wrapped Docker Compose.

## Sections

### 1. Local Development Environment
- [sandbox/environment/Readme.md](sandbox/environment/Readme.md)

### 2. Auth Service (NestJS)
- [server/apps/auth/Readme.md](server/apps/auth/Readme.md)

### 3. OAuth View Frontend (React)
- [client/apps/oauth-view/Readme.md](client/apps/oauth-view/Readme.md)

---

Each section's README contains details on the purpose of the package, and how to run/build it using Bazel.
