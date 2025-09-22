FROM node:24.0-bookworm-slim as builder

ENV SHELL=bash
RUN corepack enable

WORKDIR /usr/src/app

COPY turbo.json ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN pnpm preinstall

COPY apps/web/package.json ./apps/web/
COPY apps/core/package.json ./apps/core/

RUN pnpm i --frozen-lockfile
