#!/bin/bash
# Trying to fix permissions and re-install whatever could fail to install

mkdir -p /usr/local/lib/node_modules/firebase-tools/node_modules/puppeteer/.local-chromium
usermod -a -G root nobody
chmod 710 /root
mkdir -p /root/.npm /usr/local/lib/node_modules
chown -R 65534:0 "/root/.npm" "/usr/local/lib/node_modules"

groupadd -r -g 2000 cloudsdk &&
    useradd -r -u 2000 -m -s /bin/bash -g cloudsdk cloudsdk
apt-get -qqy update && apt-get install -qqy \
    curl wget mc screen procps net-tools sudo mc \
    libbz2-dev \
    apt-transport-https apt-utils \
    build-essential lsb-release libssl-dev libffi-dev libxml2-dev libgit2-dev libgeos-dev libharfbuzz-dev libfribidi-dev \
    zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libsqlite3-dev libreadline-dev \
    openssh-client \
    git \
    make \
    gnupg \
    netcat
apt-get build-dep libcurl4-openssl-dev libcurl4-gnutls-dev
apt-get install -qqy libcurl4-openssl-dev libcurl4-gnutls-dev --fix-broken
# Build and install Python
wget https://www.python.org/ftp/python/3.9.1/Python-3.9.1.tgz
tar -xf Python-3.9.1.tgz
cd Python-3.9.1
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$(pwd)/
./configure --enable-optimizations --enable-shared
make -j $(nproc)
make install
cd ..
python3.9 --version
# Configure Python environment
python3 -m pip install --upgrade pip
python3 -m pip install pyopenssl crcmod
# Bug in OpenJDSK 11 installation: missing directory
mkdir -p /usr/share/man/man1
apt-get update &&
    apt-get install -qqy openjdk-11-jdk &&
    java --version
echo "export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/" >/etc/profile.d/java.sh
source /etc/profile.d/java.sh
# Install K8S from repository: add repositories
mkdir -p /etc/apt/keyrings
curl -fsSL https://dl.k8s.io/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-archive-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
export CLOUD_SDK_REPO="cloud-sdk" &&
    echo "deb https://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add - &&
    apt-get update &&
    apt-get install -qqy google-cloud-sdk \
        kubectl &&
    gcloud --version &&
    docker --version && kubectl version --client
curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose &&
    chmod +x /usr/local/bin/docker-compose &&
    docker-compose --version
curl -fsSL https://apt.releases.hashicorp.com/gpg | apt-key add - &&
    echo "deb [arch=$(dpkg --print-architecture)] https://apt.releases.hashicorp.com $(lsb_release -cs) main" >/etc/apt/sources.list.d/hashicorp.list &&
    apt-get update &&
    apt-get install -qqy terraform
apt-get install -qqy \
    gcc
apt-get install -qqy gettext-base jq
# Required by Cypress
apt-get install -qqy libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
# Install required node packages
npm install -g typescript @types/node@ ts-node wait-on pnpm@8.3.1

# Install bazel
echo "Installing bazel"

bazel_sha256="6437726de7f61c879caa70893876f9d8b5e681b3833d586dd7b1bd71dd4f35be"

# Download bazel binary
curl -LO https://github.com/aspect-build/aspect-cli/releases/download/5.3.2/bazel-5.3.2-linux-x86_64

# Verify SHA-256
echo "$bazel_sha256 bazel-5.3.2-linux-x86_64" | sha256sum --check

chmod +x bazel-5.3.2-linux-x86_64

mv bazel-5.3.2-linux-x86_64 /usr/local/bin/bazel

echo "Bazel instllation completed, version: $(bazel --version)"

git config --system credential.'https://source.developergclous.google.com'.helper gcloud.sh

# AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install

rm -rf /var/lib/apt/lists/*
