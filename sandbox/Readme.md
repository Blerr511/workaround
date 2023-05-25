# Sandbox Setup

## Docker services

Using Bazel to utilize docker-compose and run development services

Services configuration is in [services.bazelrc](../.aspect/bazelrc/services.bazelrc)

You can overwrite it with [local.bazelrc](../.aspect/bazelrc/local.bazelrc)

### Pre Requirements

- Make sure that you have installed docker and docker-compose in your system

### Usage

To use `docker-compose` you should run it through Bazel

```sh
# Run docker-compose up
bazel run //sandbox/environment:dc -- up
```
