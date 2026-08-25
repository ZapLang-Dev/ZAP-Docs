# Official Zap runtime investigation

## Findings

The official Zap README identifies the runtime as a **native Rust runtime** and lists supported release platforms as Linux, Windows, and macOS ARM64. The project exposes a `zap` CLI and the README documents native commands such as `zap main.zp`, `zap check`, `zap fmt`, `zap test`, and `zap lsp`. The repository structure includes Rust-native build scripts, native conformance fixtures, release workflows, and no documented browser, WASM, or public remote execution endpoint in the inspected sources.

The documentation site is a static frontend. It cannot safely execute an arbitrary native Rust binary in the browser, and sending user-edited source to an undocumented public endpoint would be unsafe and unreliable. The current lightweight browser preview should therefore remain as the client-only fallback unless a dedicated sandboxed backend or an official WASM build is added.

## Sources

1. Official README: https://raw.githubusercontent.com/hidecard/zap/master/README.md
2. Official repository contents: https://api.github.com/repos/hidecard/zap/contents
3. Official recursive repository tree: https://api.github.com/repos/hidecard/zap/git/trees/master?recursive=1
4. Official repository: https://github.com/ZapLang-Dev/zap

## Decision

Do not claim native runtime execution from the static site. Keep the existing browser preview, label its execution boundary clearly, and recommend a future backend or official WASM target for full native execution.
