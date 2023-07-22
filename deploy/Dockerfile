# We start from a base image with Node.js installed
FROM node:16

WORKDIR /app

RUN npm i -g @bazel/bazelisk

RUN apt-get update && apt-get install -y git curl lsb-release apt-transport-https ca-certificates jq apt-utils

RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
RUN apt-get update -y && apt-get install google-cloud-sdk -y

RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
RUN chmod +x ./kubectl
RUN mv ./kubectl /usr/local/bin/kubectl
RUN apt-get install google-cloud-sdk-gke-gcloud-auth-plugin

RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh
