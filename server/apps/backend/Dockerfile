FROM node:16.19.0

WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g @bazel/bazelisk

COPY . /app/

RUN ls