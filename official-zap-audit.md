# Official Zap repository audit — 2026-08-22

Source repository: https://github.com/hidecard/zap
Docs directory: https://github.com/hidecard/zap/tree/master/docs
Releases: https://github.com/hidecard/zap/releases

The official repository currently shows the `master` branch and latest commit `5cf2682dd14e62f13a0edba6df9718d76e83459e` (Fix stale active documentation baselines). The current release line is v2.2.3, while the existing ZAP-Docs hero/install references still use v2.0.4 and need an update after source verification.

The current docs inventory includes new or important topics that should be represented as learner lessons or clearly labeled reference/contributor material: ASYNC_BOUNDARIES_EN/MM, ASYNC_LSP_EN/MM, ASYNC_RUNTIME_EN/MM, AUDIT_LANGUAGE_COMPARISON_2026-08.md, BENCHMARK_HARNESS_EN/MM, COMPATIBILITY_CHANGE_TEMPLATE_EN/MM, DEPLOYMENT_EN/MM, DIAGNOSTIC_MODEL_EN/MM, DOCUMENTATION_NAVIGATION_EN/MM, LANGUAGE_SPEC_EN/MM, LEARN_ZAP_EN/MM, MEMORY_BUDGET_OBJECT_STORE_EN/MM, MEMORY_MODEL_EN/MM, P001_PARITY_MATRIX_EN/MM, P005B_RESOURCE_LIMIT_PLAN_EN/MM, P005C_CROSS_PLATFORM_PLAN_EN/MM, P105_REPLAY_EN/MM, PACKAGE_EN/MM, PDF_REMAINING_TODO_EN/MM, POST_V2.2.0_REMEDIATION_EN/MM, REGISTRY_AUTH_EN/MM, RELEASE_SIGNING_EN/MM, RELEASE_VERSION_POLICY_EN/MM, RUNTIME_STATE_EN/MM, SECURITY_AUDIT_EN/MM, SPEC_OWNERSHIP_EN/MM, STDLIB_FILESYSTEM_JSON_EN/MM, STDLIB_INDEX_EN/MM, STDLIB_LOGGING_EN/MM, STDLIB_POLICY_EN/MM, STDLIB_TEXT_MATH_COLLECTION_EN/MM, STDLIB_TIME_EN/MM, TYPECHECK_CONFORMANCE_MATRIX_EN/MM, TYPECHECK_GENERIC_DESIGN_EN/MM, TYPE_NARROWING_EN/MM, plus existing core/package/usage/native docs.

Repository structure also includes `native/` Rust runtime sources, `tests/`, `examples/`, `editors/vscode/`, `vscode-extension/`, `website/`, benchmark/conformance/corpus directories, and release/changelog files. The docs sync should distinguish learner-facing lessons from project planning, audit, release, and contributor references rather than presenting every status document as a beginner lesson.

Initial gap hypotheses for ZAP-Docs: update release/install metadata to v2.2.3; add async boundaries/runtime/LSP lessons and Burmese counterparts; add memory budget/object store and runtime state lessons; add generic type design and conformance lessons; add deployment, security audit, release signing/version policy, compatibility template, benchmark harness, documentation navigation, and VS Code extension workflow lessons; verify existing route mappings against official filenames and Burmese source links.

## Verified v2.2.3 assets

The GitHub Releases API confirms these platform assets: `zap-2.2.3-linux-x86_64.tar.gz`, `zap-2.2.3-macos-arm64.tar.gz`, and `zap-2.2.3-windows-x86_64.zip`. It also publishes per-artifact `.sha256` and `.asc` files, a checksums file, manifest, provenance document, and release-signing key. ZAP-Docs installation commands and links now use the verified v2.2.3 filenames.

## Implemented in this sync

Added learner routes and bilingual source mappings for async boundaries, async runtime, async LSP, diagnostics model, memory budget/object store, generic type design, documentation navigation, standard-library time helpers, release signing/provenance, and v2.2.3 release history. Added search metadata, official English/Burmese source links, accurate sidebar counts, generic learning objective/syntax/practice/quiz metadata for new routes, and corrected stale v2.0.4/v2.1.7 references.

Validation: `pnpm exec tsc --noEmit --pretty false` passes; `pnpm run build` passes. The bundle-size advisory remains non-blocking because the current static app is intentionally bundled as one route-aware client.

## Zap v2.2.4 audit findings

The official repository `master` points to tag `v2.2.4` at commit `00d2847eaf149821c88f1ed060085972eca993b2`. The release adds the bilingual source files `docs/RELEASE_2.2.4_EN.md` and `docs/RELEASE_2.2.4_MM.md`, while the v2.2.3-to-v2.2.4 diff updates active baselines across language specification, syntax guide, async boundaries, memory contract, runtime state, standard-library policy, traits RFC, type conformance, documentation navigation, README, security, and VS Code package manifests.

The release documentation emphasizes deterministic single-threaded runtime behavior, eager scheduled async values, explicit cancellation/timeout boundaries, structured diagnostics, deterministic parser/JSON/lockfile/security corpus gates, reproducible Unix and Windows packaging, uninstall/reinstall/upgrade verification, and LSP `textDocument/documentSymbol` support with nested symbols and deterministic ranges. Traits/interfaces/composition and tracing collectors remain proposals or deferred scope rather than released language features.

Sources: [official v2.2.4 release note](https://github.com/hidecard/zap/blob/master/docs/RELEASE_2.2.4_EN.md), [Burmese v2.2.4 release note](https://github.com/hidecard/zap/blob/master/docs/RELEASE_2.2.4_MM.md), [v2.2.4 tag](https://github.com/hidecard/zap/releases/tag/v2.2.4), [v2.2.4 commit](https://github.com/hidecard/zap/commit/00d2847eaf149821c88f1ed060085972eca993b2).
