# Official Zap documentation inventory

## Primary sources

- Repository: https://github.com/hidecard/zap
- Official documentation directory: https://github.com/hidecard/zap/tree/master/docs
- English beginner course: https://raw.githubusercontent.com/hidecard/zap/master/docs/LEARN_ZAP_EN.md
- Burmese beginner course: https://raw.githubusercontent.com/hidecard/zap/master/docs/LEARN_ZAP_MM.md
- English syntax reference: https://raw.githubusercontent.com/hidecard/zap/master/docs/SYNTAX_GUIDE_EN.md
- Burmese syntax reference: https://raw.githubusercontent.com/hidecard/zap/master/docs/SYNTAX_GUIDE.md
- Official docs directory API: https://api.github.com/repos/hidecard/zap/contents/docs?ref=master

## Verified lesson coverage

The English beginner guide follows a lesson path covering installation and Hello World, comments and indentation, values and variables, type annotations, text and operators, conditions, lists/maps/JSON, loops, functions, closures and scope, classes and objects, files/paths/environment, modules/exports, Result and Option, Result propagation, tests/assertions, CLI workflow/diagnostics, mini projects, structured ZapError diagnostics, typed Result/Option payloads, and later runtime/tooling topics in the full source.

The Burmese beginner guide presents a lesson-based course with installation and Hello World, comments/program structure, variables and value types, operators/calculations, if/else, lists/indexing, maps/JSON, for/while loops, functions/return, scope/closures, file I/O/path/time/environment, modules/project structure, testing/formatter, a task-tracker mini project, and troubleshooting. It explicitly states that each lesson should include a concept, code example, run instructions, expected output, and practice task.

The English syntax guide covers running programs and CLI commands, comments/values, variables and annotations, operators, blocks/control flow, functions, default and named parameters, async functions and await, classes/inheritance, lists/maps/JSON, modules/workspaces, Result/Option, structured errors with raise/try/catch, files/paths/time/environment, diagnostics, and tests.

## Integration decision

The site should preserve the current visual lesson model but expand the route catalog and data model to support detailed lessons with title, language, source URL, learning objective, explanation, syntax, examples, expected output, common mistakes, exercises, and related lessons. English and Burmese content should be presented as parallel lesson tracks or an explicit language selector rather than mixing languages inside one paragraph.

## Additional official documentation families discovered

The repository also contains dedicated bilingual sources for async boundaries, async LSP, async runtime, default parameters, deployment, diagnostic model, language guide/specification, memory model, package and registry workflows, standard-library index, text/math/collection helpers, filesystem/JSON, logging, time, type narrowing, generic type design, resource limits, cross-platform behavior, security audits, release signing/version policy, and roadmap/progress documents.

| Family | English source | Burmese source |
|---|---|---|
| Async | `ASYNC_BOUNDARIES_EN.md`, `ASYNC_LSP_EN.md`, `ASYNC_RUNTIME_EN.md` | matching `_MM.md` files |
| Standard library | `STDLIB_INDEX_EN.md`, `STDLIB_TEXT_MATH_COLLECTION_EN.md`, `STDLIB_FILESYSTEM_JSON_EN.md`, `STDLIB_LOGGING_EN.md`, `STDLIB_TIME_EN.md` | matching `_MM.md` files |
| Types | `TYPE_NARROWING_EN.md`, `TYPECHECK_CONFORMANCE_MATRIX_EN.md`, `TYPECHECK_GENERIC_DESIGN_EN.md` | matching `_MM.md` files |
| Packages | `PACKAGE_EN.md`, `PACKAGES.md`, `REGISTRY_AUTH_EN.md` | `REGISTRY_AUTH_MM.md` and bilingual package docs |
| Delivery | `DEPLOYMENT_EN.md`, `RELEASE_SIGNING_EN.md`, `RELEASE_VERSION_POLICY_EN.md` | matching `_MM.md` files |
| Diagnostics | `DIAGNOSTIC_MODEL_EN.md`, `SECURITY_AUDIT_EN.md` | matching `_MM.md` files |
| Architecture | `CORE_SPEC.md`, `LANGUAGE_SPEC_EN.md`, `MEMORY_MODEL_EN.md`, `NATIVE.md` | selected bilingual status docs |
| Project practice | `BENCHMARK_HARNESS_EN.md`, `COMPATIBILITY_CHANGE_TEMPLATE_EN.md`, `ECOSYSTEM.md` | matching bilingual files where available |

These families are the remaining lesson candidates beyond the already integrated beginner, language, advanced runtime, and basic tooling routes. They should be grouped into beginner lessons, reference lessons, and contributor/developer lessons rather than exposing every internal planning document as a beginner tutorial.
