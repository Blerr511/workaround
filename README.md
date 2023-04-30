# cell-annotation-platform

The Cell Annotation Platform is a centralized collaborative repository for the storage and analysis of single-cell RNA sequence datasets.

## Development Prerequisites

### Toolset

Make sure to install the following toolset:

- bazel v5.3.0
- gcloud cli
- terraform cli
- docker
- envsubst
- jq
- node (v16)/npm
- python3/pip with ssl, bz2, lzma, ffi, and zlib headers
- java
- ts-node (npm module, globally)
- semver (npm module, globally)
- yarn (npm module, globally)

### Setup

[Windows/Linux Setup](./docs/windows-and-linux-setup.md)

[Mac Setup](./docs/mac-setup.md)

## Monorepo / Bazel

Development is running on top of monorepo build with [Bazel](https://docs.bazel.build/versions/5.3.0/bazel-overview.html). Bazelisk installations can be managed with [Bazelisk](https://docs.bazel.build/versions/main/install-bazelisk.html) to ensure a compatible version is installed and streamline future upgrades.

### Bazel version compatibility

If installing Bazel manually, please read the note on version compatibility in [troubleshooting](./docs/troubleshooting.md)

## Development Sandbox

**Note:** Before you start working on with `sandbox` environment please read [Sandbox README](sandbox/README.md).

Configuration is done based on cascade explicit environment variables passing thru [Bazel Toolchains](https://docs.bazel.build/versions/5.3.0/toolchains.html).

To have environment variables available in bazel action targets context (i.e. referenced using ["Make" Variables Notation](https://docs.bazel.build/versions/5.3.0/be/make-variables.html)) those have to be explicitly injected using [TemplateVariableInfo](https://docs.bazel.build/versions/5.3.0/skylark/lib/TemplateVariableInfo.html) provider.

### Configuration

Look into `.bazelrc` for current set of environment variables passed over to bazel configuration. Add/override in `.bazelrc.local`.
The `.bazelrc` files are loaded as documented in the [bazel user guide](https://docs.bazel.build/versions/main/guide.html#bazelrc-the-bazel-configuration-file).
If you are having trouble with the Anndata parser on Ubuntu, change the temp files path variable in `.bazelrc.local` to `/tmp/files`.
Look into this [document](https://capdevelopment.atlassian.net/wiki/spaces/CAP/pages/113770762/Bazel+and+Project+Sandbox) (updated periodically) for
`.bazelrc.local` example.

Check if you have Cloud SDK configured for the project. Run the below command for that:

    bazel-standalone run //sandbox/environment:gcloud -- auth list

If result output is saying `No credentialed accounts.` then run:

    bazel-standalone run //sandbox/environment:gcloud -- auth login

This will generate Cloud SDK configuration files under `GCP_CLOUDSDK_CONFIG` path (see `.bazelrc`).

### Watch-mode

You can run any target in watch mode. Unfortunately bazel does not support watch feature out of the box (can be extended with iBazel...) but
this can be simplified using `nodemon`. The sandbox provides a wrapper script as a temporary solution to watch-mode with bazel.

To start bazel package development in watch-mode use the following command:

    bazel-standalone-watch --package [bazel/package-name] --target [package_target] --delay [number_of_seconds]

For example you can run either one of the below commands from the root of the project.

    bazel-standalone-watch --package authentication/firebase --target emulator
    bazel-standalone-watch --package server/data-backend --target server --delay 1

To start bazel package testing in watch-mode run either one of the below commands from the root of the project.

    bazel-standalone-watch --command test --package server/data-backend --target unit_test --delay 1

Specifically for React (NextJS) client run the following:

    bazel-standalone-nextjs --package client/web-client --command dev

### Third-party services (postgres, elasticsearch, rabbitmq, etc)

The sandbox is not providing any database out of the box. It is up to developer to run it on the dev host machine.
That said, bazel has a couple convenient commands for this---check the command examples below.

    # Start 3rd-party services
    bazel-standalone run //sandbox/environment:dc_services -- up --detach --remove-orphans

    # Stop 3rd-party services
    bazel-standalone run //sandbox/environment:dc_services -- down

_Note. The services bootstrap commands will use the environment variables defined in `.bazelrc`_

_Note. RabbitMQ Management console is available at <http://localhost:15672/> (username/password: root/rabbitmqsecret)_

#### Ontology Lookup Service (OLS)

This service is developed in separate repository.

The are 2 parts of it that are used to bootstrap service:

- OLS itself <https://github.com/kharchenkolab/cap-ontology-search/tree/development>

- Indexer <https://github.com/kharchenkolab/cap-pipeline-config/tree/development>

Read `README.md`'s for both on how to use and run.

_TL;DR_

1. Run CAP sandbox (dc_services): `bazel-standalone run //sandbox/environment:dc_services -- up --detach --remove-orphans` to have `solr` up and running

2. Run indexer from `cap-pipeline-config`:

- Take `solr.json` from one of your colleagues
- `./solr_init.sh -h localhost -p 8983 -c ontology`
- `./solr_index.sh -h localhost -p 8984 -c ontology`

3. Run OLS: `./sandbox/bazel-wd.sh --package "." --target service --ext py`

4. Make sure `ONTOLOGY_SEARCH_SERVICE_API_URL` is pointing to the service (default config in `.bazelrc` usually works `ONTOLOGY_SEARCH_SERVICE_API_URL="http://localhost:8007/ontology/api"`)

### Migrations

#### Postgres

_TL;DR_

Run after every model change (otherwise DatabaseConnection test will fail notifying on pending migrations to generate):

`bazel-standalone run <bazel-package-name>:migration_generate -- $(pwd)/path/to/migration/<migration-name>`

Example:

    bazel-standalone run //server/data-backend:migration_generate -- $(pwd)/server/data-backend/migration/migration-name-here

To create a migration for a package use the following helper cli

    bazel-standalone run --action_env=SANDBOX_DATA_BACKEND_MIGRATIONS_PATH=<migration-store-path> //<bazel-package-name>:migration_create -- --name <migration-name>`

where:

- migration-store-path - can be an alternative path to store migration to, default is "/tmp/.cap/.migration/server/data-backend" for Data Backend (see corresponding config in `.bazelrc` - `SANDBOX_DATA_BACKEND_MIGRATIONS_PATH`)
- bazel-package-name - could be something like "server/data-backend"
- migration-name - could be something like "dataset-add-column-is_public"

_Note. Unfortunately there is no way to generate or change source code using bazel, since it is running all routines in its own sandbox._

To apply migrations:

    bazel-standalone run //<bazel-package-name>:migration_apply

To undo latest migration:

    bazel-standalone run //<bazel-package-name>:migration_undo

### Firebase

For details see `authentication/firebase/README.md`

### Test Datasets

This describes how to fill in sandbox database with tests Datasets.

1. Prepare environment by running the following services (in parallel in different terminal screens):

```
bazel-standalone-nextjs --package client/web-client --command dev
```

```
bazel-standalone-watch --package authentication/firebase --target emulator
```

```
bazel-standalone-watch --package server/data-backend --target server
```

```
bazel-standalone run //server/parsers/AnnData:parser

```

2. Make sure you have signed in and created a Project. Datasets will be attached to it in next step.

3. Run the cap `cli` command to upload sample dataset for newly generated project. See [uploader cli](client/cli/README.md) for details

4. Navigate to Project page and click Publish button.

### Test AnnData

Look into [AnnData README.md](server/parsers/AnnData/README.md) for AnnData parser testing and running details.

### Uploads Watchdog

Look into [Upload Watchdog README.md](server/services/upload-watchdog/README.md) for upload watchdog testing and running details.

## WSL2-specific Cypress setup steps

See [Cypress README](client/web-client/cypress/README.md)

## Deployment

See details in [deploy/README.md](deploy/README.md)
