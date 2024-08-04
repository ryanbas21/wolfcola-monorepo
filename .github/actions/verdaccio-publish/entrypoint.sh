#!/bin/sh

set -e

local_registry="http://0.0.0.0:4873"

# start local registry
tmp_registry_log=$(mktemp)
sh -c "mkdir -p ${HOME}/.config/verdaccio"
sh -c "cp --verbose /config.yaml ${HOME}/.config/verdaccio/config.yaml"
sh -c "nohup verdaccio --config ${HOME}/.config/verdaccio/config.yaml &>${tmp_registry_log} &"

# FIXME: this throws a syntax error, but would be great to make it run
# grep -q 'http address' <(tail -f $tmp_registry_log)
# login so we can publish packages
sh -c "npm-auth-to-token -u test -p test -e test@test.com -r ${local_registry}"

## Version the snapshot for ci publishing
sh -c "pnpm changeset version -- snapshot ci-${PR_NUMBER}"

# Run pnpm release command
sh -c "pnpm changeset publish --registry ${local_registry} --tag ci-${PR_NUMBER} --no-git-tag"
