ARG API_PORT
ARG WEB_PORT

FROM node:18-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=api --prod /prod/api
RUN pnpm deploy --filter=web --prod /prod/web
RUN pnpm deploy --filter=db /prod/db

FROM base AS db-setup
COPY --from=build /prod/db /prod/db
WORKDIR /prod/db
CMD [ "pnpm", "run", "run-migrations-and-seed"]

FROM base AS api
COPY --from=build /prod/api /prod/api
WORKDIR /prod/api
EXPOSE ${API_PORT}
CMD [ "pnpm", "start" ]

FROM base AS web
COPY --from=build /prod/web /prod/web
WORKDIR /prod/web
EXPOSE ${WEB_PORT}
CMD [ "pnpm", "start" ]