# Official ZAP documentation inventory

## Source of truth

The ZAP-Docs site mirrors the official source repository at [github.com/hidecard/zap](https://github.com/hidecard/zap), using the `master` branch at commit `283c310792d69b467d61fa9df114b7b2ceef379d`. The current published baseline in the source repository is **v2.2.7**.

The synchronized local snapshot is stored under `client/public/official-docs/`. The root overview and English changelog are available as `client/public/official-README.md` and `client/public/official-CHANGELOG_EN.md`. `client/public/official-docs-manifest.json` records the source repository, branch, commit, synchronization timestamp, and file count.

## Snapshot coverage

The complete upstream `docs/` directory is copied without filtering, including learner guides, bilingual references, runtime and tooling contracts, package and release records, roadmap/status notes, ownership data, and patch artifacts. The snapshot currently contains **169 files**, preserving the upstream paths and filenames so that every official document remains directly accessible.

| Area                            | Representative upstream sources                                                                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beginner and language reference | `LEARN_ZAP_EN.md`, `LEARN_ZAP_MM.md`, `SYNTAX_GUIDE_EN.md`, `SYNTAX_GUIDE.md`, `LANGUAGE_GUIDE.md`, `LANGUAGE_SPEC_EN.md`, `LANGUAGE_SPEC_MM.md`                |
| Runtime and async               | `NATIVE.md`, `RUNTIME_STATE_EN.md`, `RUNTIME_STATE_MM.md`, `ASYNC_BOUNDARIES_EN.md`, `ASYNC_RUNTIME_EN.md`, `ASYNC_LSP_EN.md`                                   |
| Standard library                | `STDLIB_INDEX_EN.md`, `STDLIB_TEXT_MATH_COLLECTION_EN.md`, `STDLIB_FILESYSTEM_JSON_EN.md`, `STDLIB_LOGGING_EN.md`, `STDLIB_TIME_EN.md` and Burmese counterparts |
| Types and diagnostics           | `TYPE_NARROWING_EN.md`, `TYPECHECK_GENERIC_DESIGN_EN.md`, `TYPECHECK_CONFORMANCE_MATRIX_EN.md`, `DIAGNOSTIC_MODEL_EN.md`, `SECURITY_AUDIT_EN.md`                |
| Packages and delivery           | `PACKAGE_EN.md`, `PACKAGE.md`, `PACKAGES.md`, `REGISTRY_AUTH_EN.md`, `DEPLOYMENT_EN.md`, `RELEASE_SIGNING_EN.md`, `RELEASE_VERSION_POLICY_EN.md`                |
| Project and historical material | roadmap, progress, ownership, compatibility, release-history, rollback, and audit documents in the upstream `docs/` directory                                   |

## Website integration

The application keeps its curated learner routes and bilingual lesson presentation, while linking each route to the corresponding official upstream document. Current-release UI elements now use v2.2.7 assets for Linux x86_64, macOS ARM64, and Windows x86_64. Historical lessons retain their historical version references where those references describe an earlier release rather than the active baseline.

## Automated update procedure

The repository includes `.github/workflows/sync-upstream-zap.yml`. GitHub Actions checks the public upstream `master` branch every 15 minutes, and it can also be started manually with **Run workflow** or by sending a `zap-updated` `repository_dispatch` event. The workflow clones the upstream source, runs `scripts/sync-official-zap-docs.sh`, executes the TypeScript check, production build, and whitespace validation, and pushes a commit to `main` only when the upstream commit has changed.

The sync script is idempotent: it compares the upstream commit with `official-docs-manifest.json` and exits without modifying files when the snapshot is already current. This prevents scheduled checks from creating empty or repetitive commits.

## Manual fallback

To refresh the snapshot locally, pull the latest `master` branch from the source repository and run `scripts/sync-official-zap-docs.sh /path/to/zap-source`. Then review current-release labels and download URLs in `client/src/App.tsx`, run `pnpm check`, `pnpm build`, and `git diff --check`, and inspect the Git diff before committing.
