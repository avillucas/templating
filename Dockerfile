# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.15.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app
EXPOSE 3000

FROM base AS dev
RUN chown node -R  /usr/src/app
ENV NODE_ENV=development
COPY ./public ./public
COPY .env.develop .env
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci --include=dev
CMD ["npm", "run","dev"]


FROM base AS prod
ENV NODE_ENV=production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
USER node
COPY . .
CMD ["npm", "run","prod"]