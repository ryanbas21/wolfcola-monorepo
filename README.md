# My Monorepo

## What is wolfcola
Wolfcola is from it's always sunny in philadelphia, my favorite show. Its Frank's soft drink company.
Theres nothing special to the name other than that. It's just for fun.

## About wolfcola
This monorepo is a way for me to try different things in a modern setup.

As of now, this monorepo requires no real tooling in the form of a monorepo like `nx` or `turborepo` or `bazel`.

This is mostly because the size of the monorepo is small and build times are not a concern.

This would be evaluated as time goes on.

## Merging Strategy
This monorepo uses trunk based development. The main idea here is that commits go to `main` and releases are triggered from `main`. 

A release branch can then be cut from `main`. It is not in this repo currently. You can look at the releases & tags if you need a specific commit.

`main` should be the source of truth where all work goes.

## Packages
All packages should follow the same style, in the form of testing with vitest, linting with biome, and trunk for all formatting/linting/code scans.

## Package Manager
`pnpm` powers the repo. its heavily used for commands, releases, and dependency management. Because this repo uses `pnpm` >= 9, `catalogs` are also heavily used.

Any package that is "shared" or possibly shared, is probably used in the `pnpm` catalogs feature. This is to make sure all versions are always the same across packages. This avoids the diamond dependency problem.


## Releases
Releases use `changesets`. Every package is synced to the same version, because they are all published under the same organization and I want all my packages to be synced. Even if they are unreleated. This is subject to change as this style isn't really necessary as this repo stands.

When merges to main happen, if a changeset is included, the `changesets` action will create a release PR.

This release PR will be updated as more commits are added to `main`.


`pnpm changeset` will add a changeset.

No publishing should be done outside of the pipeline. All tags and github releases should be managed by the CI.

When ready to release, this PR can be merged into `main`.


## Docs
While theres not much to document here, `api-extractor` is setup to create docs and types. They live in the repo.


## What I like about this setup so far
Releases are simple and easy. I have little concern over the release process itself (merging -> publishing).

I love `pnpm` catalogs and the `pnpm` `workspace:*` feature. this makes dependency management of packages in the repo seamless.


## Tools I am evaluating still
`trunk` is a tool I am still learning and evaluating.  

`biome` instead of prettier/eslint is also being tested out.
