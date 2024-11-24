# Workaround

Requirements

- [bazel](https://bazel.build/install)
- [docker](https://docs.docker.com/engine/install/)
- [jq](https://jqlang.github.io/jq/download/)
- [pnpm@8.3.1](https://www.npmjs.com/package/pnpm/v/8.3.1)

## bazel installation

Recommended way of installing bazel is to use [@bazel/bazelisk](https://www.npmjs.com/package/@bazel/bazelisk) npm package
just install it globally `npm i -g @bazel/bazelisk` and run any bazel target in workspace, it will fetch and install required bazel version

## Starting development

1. Run docker compose file for local development

```bash
bazel run //sandbox/environment:dc -- up -d
```

2. Run apps locally in watch mode
   use [watch.sh](./watch.sh) utility for running targets in watch mode

- web-client - `./watch.sh client/apps/web-client`
- game - `./watch.sh server/apps/game`
- backend - `./watch.sh server/apps/backend`
- auth - `./watch.sh server/apps/auth`
- gateway - `./watch.sh server/apps/gateway`

3. Run db migrations

- game db - `bazel run //server/apps/game:migration.apply`
- backend db - `bazel run //server/packages/data-source:migration.apply` // TODO - move migrations from data-source package to backend service
