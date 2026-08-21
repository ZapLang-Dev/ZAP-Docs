# Official Zap source notes

The documentation source of truth is the official repository: https://github.com/hidecard/zap

The repository README identifies the current release line as v2.0.4, with `.zp` source files, `main.zp` as the common entry point, `zap.toml` as the project manifest, a native Rust runtime, and Linux x86_64, Windows x86_64, and macOS ARM64 release targets. The README installation section links to the v2.0.4 release and documents `tar -xzf`, `bash install.sh`, `chmod +x install.sh`, `./install.sh`, `install_windows.bat`, `zap --version`, `zap --help`, and running `zap main.zp`.

The repository’s current master branch and changelog show newer development work, including a v2.1.7 release entry dated 2026-08-21. The docs syntax reference identifies its supported syntax reference as v2.1.0, last verified 2026-08-21, while the README still labels the stable current release line v2.0.4. The site should distinguish the stable release line from the syntax/reference version instead of presenting a single ambiguous version number.

Authoritative learning content comes from:

- https://raw.githubusercontent.com/hidecard/zap/master/docs/LEARN_ZAP_EN.md
- https://raw.githubusercontent.com/hidecard/zap/master/docs/SYNTAX_GUIDE_EN.md
- https://raw.githubusercontent.com/hidecard/zap/master/docs/LEARN_ZAP_MM.md
- https://raw.githubusercontent.com/hidecard/zap/master/docs/SYNTAX_GUIDE.md
- https://raw.githubusercontent.com/hidecard/zap/master/CHANGELOG_EN.md
- https://raw.githubusercontent.com/hidecard/zap/master/CONTRIBUTING.md

The official English learning guide covers Hello World with `say`, comments and indentation-based blocks, variables and core values, optional type annotations, operators, conditions, lists/maps/JSON, loops, functions, closures, classes, files/paths/environment, modules/exports, Result/Option, `?` propagation, tests/assertions, CLI workflow, diagnostics, typed Result/Option payloads, async foundations, and a mini project. The syntax reference adds default parameters, `async fn`/`await`, `raise`/`try`/`catch`, modules/workspaces, diagnostics, and tooling commands.

The official Burmese learning guide is available and should be used as the basis for a future Burmese switch rather than inventing translations. Its lessons include installation and Hello World, comments, variables/types, operators, if/else, lists, maps/JSON, loops, functions, closures, file/path/time, modules, testing/formatting, a task-tracker mini project, OOP, and standard-library helpers.

## v2.0.4 release assets

Release page: https://github.com/hidecard/zap/releases/tag/v2.0.4

Linux x86_64 archive: https://github.com/hidecard/zap/releases/download/v2.0.4/zap-2.0.4-linux-x86_64.tar.gz
Linux checksum: https://github.com/hidecard/zap/releases/download/v2.0.4/zap-2.0.4-linux-x86_64.tar.gz.sha256
macOS ARM64 archive: https://github.com/hidecard/zap/releases/download/v2.0.4/zap-2.0.4-macos-arm64.tar.gz
macOS checksum: https://github.com/hidecard/zap/releases/download/v2.0.4/zap-2.0.4-macos-arm64.tar.gz.sha256
Windows x86_64 archive: https://github.com/hidecard/zap/releases/download/v2.0.4/zap-2.0.4-windows-x86_64.zip
Windows checksum: https://github.com/hidecard/zap/releases/download/v2.0.4/zap-2.0.4-windows-x86_64.zip.sha256
Full changelog comparison: https://github.com/hidecard/zap/compare/v2.0.3...v2.0.4
Repository changelog: https://github.com/hidecard/zap/blob/master/CHANGELOG_EN.md
