FROM node:20

LABEL version="1.0.0"
LABEL repository="https://github.com/ryanbas21/wolfcola-monorepo"
LABEL "maintainer"="ryan bas"

LABEL com.github.actions.name="GitHub Action for pnpm verdaccio publish"
LABEL com.github.actions.description="Wraps the pnpm CLI to enable common pnpm commands."
LABEL com.github.actions.icon="package"
LABEL "com.github.actions.color"="#4b5e40"
# COPY LICENSE README.md THIRD_PARTY_NOTICE.md /

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]
