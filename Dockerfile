FROM node:16.19.0

ARG NPMRC_PATH
# ARG PACKAGE_NAME

WORKDIR /app

RUN npm install -g pnpm

RUN ls

COPY pnpm-lock.yaml /app/
COPY pnpm-workspace.yaml /app/
COPY package.json /app/

COPY ${NPMRC_PATH}} /app/.npmrc

RUN ls

COPY server/apps/backend /app/server/apps/backend

RUN pnpm install --prod --frozen-lockfile

