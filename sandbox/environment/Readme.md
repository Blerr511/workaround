# Local Development Environment

This folder contains Bazel rules and templates for running all local infrastructure (Postgres, Redis, Nginx, etc.) via Docker Compose.

## Start All Services

```sh
bazel run //sandbox/environment:dc
```

- This command ensures all configs and environment files are generated, then starts Docker Compose.
- Nginx config is templated and mounted automatically.

## Stop All Services

```sh
docker-compose -f sandbox/environment/docker-compose.development.yml down
``` 