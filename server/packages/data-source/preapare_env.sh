echo "Preaparing env vars for prisma data-source.."

bazel build //sandbox:data_source_env_vars.env

ws=$(bazel info workspace)

out_dir=$ws/server/packages/data-source/prisma/.env

rm -rf $out_dir

cp $ws/bazel-bin/sandbox/data_source_env_vars.env $out_dir

echo "Write env into $out_dir"