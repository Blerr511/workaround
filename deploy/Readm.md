# Deploy WR app

## Update infrastructure

- Init terraform

```bash
bazel run //deploy/infra:tf -- init
```

- Plan Changes

```bash
bazel run //deploy/infra:tf -- plan --out tf.plan
```

- Apply Changes

```bash
bazel run //deploy/infra:tf -- apply tf.plan
```

## Deploy app to GKE

- Define Cluster and project id

```bash
export _CLUSTER=gke_workaround-388416_europe-central2_wr-cluster-1; export PROJECT_ID=workaround-388416
```

- Define substitutions

```bash
export SUBSTITUTIONS=BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)",COMMIT_SHA="$(git log -n 1 -- ./ | head -1 | awk '{print $2}')",SHORT_SHA="$(git log -n 1 -- ./ | head -1 | awk '{print substr($2,1,8)}')",_CLUSTER=$_CLUSTER
```

- Submit cloud build

```bash
bazel run //tools/gcloud:gcloud -- builds submit --project=$PROJECT_ID --config="$(pwd)/deploy/cloudbuild.yaml" --substitutions="$SUBSTITUTIONS" $(pwd)
```
