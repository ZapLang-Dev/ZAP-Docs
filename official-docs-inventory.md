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
