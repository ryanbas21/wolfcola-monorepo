FROM node:20-slim as base

USER root

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

LABEL repository="https://github.com/ryanbas21/wolfcola-monorepo"
LABEL "maintainer"="ryan bas"
LABEL com.github.actions.name="GitHub Action for pnpm verdaccio publish"
LABEL com.github.actions.description="Wraps the pnpm CLI to enable common pnpm commands."
LABEL com.github.actions.icon="package"


RUN pnpm add -g verdaccio@5 && \
  pnpm add -g verdaccio-auth-memory@latest && \
  pnpm add -g verdaccio-memory@latest && \
  pnpm add -g npm-auth-to-token@1.0.0


COPY config.yaml /config.yaml

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]
