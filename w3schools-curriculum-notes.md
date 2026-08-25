# W3Schools-style Zap curriculum notes

## Official source of truth

The curriculum is based on the official repository at https://github.com/ZapLang-Dev/zap, especially the English and Burmese beginner guides and the English syntax guide. The repository describes Zap as a readable general-purpose language using `.zp` files, indentation-based blocks, explicit modules, optional annotations, Result/Option values, and a native Rust runtime. The current README reports the native CLI, `zap.toml` project manifest, Linux/Windows/macOS release targets, VS Code/LSP support, standard-library domains, diagnostics, async foundations, and package/registry work.

## Teaching sequence

The first-time learner path should begin with installation, Hello World, comments, indentation, variables, values, annotations, text, operators, conditions, lists, maps, JSON, loops, functions, closures, classes, files, paths, modules, Result/Option, errors, tests, CLI workflow, and a mini project. The advanced path should then cover default/named parameters, async/await, structured `raise`/`try`/`catch`, typed payloads, diagnostics, LSP, package workflows, and benchmarks.

## Lesson format

Each lesson should contain a clear objective, a short definition, a syntax table, one minimal example, one expanded example, expected output, a line-by-line explanation, common mistakes, a practice task, a short multiple-choice quiz, and links to the previous and next lessons. Examples must be drawn from or directly aligned with the official Zap docs. The UI should label the browser playground as a lightweight preview whenever it is not the native runtime.

## W3Schools-style UX decisions

Use a course index with chapter progress, a “Try it yourself” action on every example, a visible output panel, copy controls, an answer-reveal/check interaction for quizzes, and a compact lesson navigation rail. Keep the existing Voltage Editorial branding, but introduce a tutorial-friendly green/cyan success treatment only for learning feedback rather than changing the overall brand palette.

## References

[1]: https://github.com/ZapLang-Dev/zap "Official Zap repository"
[2]: https://raw.githubusercontent.com/hidecard/zap/master/docs/LEARN_ZAP_EN.md "Learn Zap — English Guide"
[3]: https://raw.githubusercontent.com/hidecard/zap/master/docs/LEARN_ZAP_MM.md "Learn Zap — Burmese Beginner Course"
[4]: https://raw.githubusercontent.com/hidecard/zap/master/docs/SYNTAX_GUIDE_EN.md "Zap Syntax Reference — English"
[5]: https://github.com/ZapLang-Dev/zap/releases "Official Zap releases"
