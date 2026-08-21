# Official runtime integration checklist

- [x] Inspect the official Zap repository for a browser runtime, WASM build, API, or embeddable execution interface.
- [x] Record the authoritative runtime source and any security or deployment constraints.
- [x] Confirm that no safe public native-runtime interface is currently documented; do not add an unsafe connection.
- [x] Preserve the lightweight fallback when native execution is unavailable.
- [x] Validate the existing fallback execution, error notes, and responsive playground UX.
- [x] Save a publish-ready checkpoint after verification.
