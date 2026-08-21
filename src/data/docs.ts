export interface DocSection {
  title: string;
  items: DocItem[];
}

export interface DocItem {
  title: string;
  path: string;
  description?: string;
  content: string;
  codeExamples?: CodeExample[];
}

export interface CodeExample {
  language: string;
  code: string;
  caption?: string;
}

export const docsSections: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        path: "/docs/introduction",
        description: "What is Zap and why use it",
        content: `
# Zap Programming Language

**Zap** is a beginner-friendly, general-purpose programming language designed for Web, Mobile, AI, and IoT applications. It features a clean syntax, native execution without external runtimes, and a growing standard library.

## Why Zap?

- **Native Execution**: Run \`.zp\` files directly without installing extra runtimes
- **Simple Syntax**: Indentation-based blocks that are easy to read and write
- **Built-in JSON & File I/O**: Handle data and files out of the box
- **Growing Ecosystem**: Web, AI, and IoT libraries on the roadmap
- **Fast Feedback**: \`zap check\`, \`zap fmt\`, and \`zap test\` keep development smooth

## Quick Example

\`\`\`zap
say "Hello, Zap!"
\`\`\`

Save this as \`main.zp\` and run:

\`\`\`bash
zap main.zp
\`\`\`

## Current Status

Zap 0.7.1 includes a stable native runtime with support for variables, expressions, control flow, functions, closures, collections, JSON, file I/O, modules, formatter, project validation, scaffolding, and a recursive project test runner.
        `,
        codeExamples: [
          { language: "zap", code: 'say "Hello, Zap!"', caption: "Your first Zap program" },
        ],
      },
      {
        title: "Installation",
        path: "/docs/installation",
        description: "Install Zap on your system",
        content: `
# Installation

Zap runs as a standalone native binary. No extra runtime or package manager is required.

## Linux & macOS

Download or extract the release archive, open Terminal, and run:

\`\`\`bash
cd zap
bash install.sh
\`\`\`

The installer copies the standalone \`zap\` binary to \`~/.local/bin\` and updates your shell profile. Open a new terminal to verify:

\`\`\`bash
zap --version
\`\`\`

## Windows

Extract the release archive and run \`bin\\zap.exe\` directly:

\`\`\`bat
cd zap-0.8.0
bin\\zap.exe --version
bin\\zap.exe main.zp
\`\`\`

Or run \`install_windows.bat\` to copy the binary to \`%USERPROFILE%\\.zap\\bin\` and add it to your user PATH.

## Quick Start

\`\`\`bash
zap init hello-zap
cd hello-zap
zap check
zap main.zp
\`\`\`
        `,
        codeExamples: [
          { language: "bash", code: "zap init hello-zap\ncd hello-zap\nzap main.zp" },
          { language: "bat", code: "bin\\zap.exe main.zp" },
        ],
      },
      {
        title: "Quick Start",
        path: "/docs/quickstart",
        description: "Write and run your first program",
        content: `
# Quick Start

Create your first Zap project in under a minute.

## 1. Scaffold a project

\`\`\`bash
zap init hello-zap
cd hello-zap
\`\`\`

This creates a project with \`zap.toml\`, \`main.zp\`, and a starter test.

## 2. Write some code

Edit \`main.zp\`:

\`\`\`zap
say "Hello from Zap!"
\`\`\`

## 3. Run it

\`\`\`bash
zap main.zp
\`\`\`

## 4. Validate and format

\`\`\`bash
zap check
zap fmt main.zp
\`\`\`

## 5. Run tests

\`\`\`bash
zap test
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'say "Hello from Zap!"' },
        ],
      },
    ],
  },
  {
    title: "Language Guide",
    items: [
      {
        title: "Syntax Basics",
        path: "/docs/syntax",
        description: "Comments, variables, values, and operators",
        content: `
# Syntax Basics

Zap source files use the \`.zp\` extension. Blocks are defined by indentation and statements end with a colon when starting a block.

## Comments

\`\`\`zap
# This is a comment
say "Hello"  # inline comment
\`\`\`

## Variables

\`\`\`zap
let name = "Zap"
let version = 4
let stable = true
let empty = none
\`\`\`

## Values

| Type | Example |
|------|---------|
| text | \`"hello"\` |
| number | \`42\` |
| bool | \`true\` / \`false\` |
| list | \`[1, 2, 3]\` |
| map | \`{"key": "value"}\` |
| none | \`none\` |

## Operators

\`\`\`zap
let total = 10 + 5 * 2
let remainder = 17 % 4
let allowed = total >= 20 and not false
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'let name = "Zap"\nlet version = 4\nsay name + " v" + str(version)' },
        ],
      },
      {
        title: "Control Flow",
        path: "/docs/control-flow",
        description: "If/else, loops, and branching",
        content: `
# Control Flow

## Conditionals

\`\`\`zap
let score = 78

if score >= 80:
    say "Excellent"
else:
    if score >= 60:
        say "Good"
    else:
        say "Needs improvement"
\`\`\`

## Loops

\`\`\`zap
for item in ["web", "ai", "iot"]:
    say item

let count = 0
while count < 3:
    say count
    count = count + 1
\`\`\`

## Break and Continue

\`\`\`zap
for number in range(10):
    if number == 2:
        continue
    if number == 6:
        break
    say number
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'for item in ["web", "ai", "iot"]:\n    say item' },
        ],
      },
      {
        title: "Functions",
        path: "/docs/functions",
        description: "Defining and calling functions",
        content: `
# Functions

Functions are defined with \`fn\` and use indentation for their body.

\`\`\`zap
fn greet(name):
    return "Hello, " + name

let message = greet("Developer")
say message
\`\`\`

## Default Parameters

\`\`\`zap
fn greet(name: text = "World", punctuation: text = "!"):
    return "Hello, " + name + punctuation

say greet()
say greet("Zap", ".")
\`\`\`

## Async Functions

\`\`\`zap
async fn load() -> number:
    return 7

let pending = load()
let value: number = await pending
say value
\`\`\`

## Closures

\`\`\`zap
fn make_adder(base):
    fn add(value):
        return base + value
    return add(10)

say make_adder(5)
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'fn greet(name):\n    return "Hello, " + name\n\nsay greet("Developer")' },
        ],
      },
      {
        title: "Data Structures",
        path: "/docs/data-structures",
        description: "Lists, maps, and JSON",
        content: `
# Data Structures

## Lists

\`\`\`zap
let tools = ["compiler", "formatter", "tester"]
say tools[0]
say len(tools)

for tool in tools:
    say tool
\`\`\`

## Maps

\`\`\`zap
let user = {"name": "Zap", "role": "builder", "active": true}

say user["name"]
say keys(user)
say contains(user, "name")
\`\`\`

## JSON

\`\`\`zap
let payload = {"name": "Zap", "features": ["web", "ai", "iot"]}

let raw = json(payload)
say raw

let restored = from_json(raw)
say restored["features"][1]
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'let tools = ["compiler", "formatter", "tester"]\nsay tools[0]' },
        ],
      },
      {
        title: "Modules & Packages",
        path: "/docs/modules",
        description: "Organizing code with modules",
        content: `
# Modules & Packages

## Module Declaration

\`\`\`zap
# modules/app/core.zp
module app.core

fn version():
    return "2.0"
\`\`\`

## Importing

\`\`\`zap
# main.zp
module app.main
import app.core as core

say core.version()
\`\`\`

## Project Manifest

\`\`\`toml
[package]
name = "workspace-demo"
version = "0.1.0"
main = "main.zp"

[module]
root = "modules"
entries = ["app/core.zp"]
\`\`\`

## Legacy Imports

\`\`\`zap
use "greeting.zp"
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'module app.core\nfn version():\n    return "2.0"' },
          { language: "toml", code: '[package]\nname = "workspace-demo"\nversion = "0.1.0"\nmain = "main.zp"' },
        ],
      },
      {
        title: "Error Handling",
        path: "/docs/error-handling",
        description: "Result, Option, and structured errors",
        content: `
# Error Handling

## Result and Option

\`\`\`zap
let success = ok(42)
let failure = err("failed")
let value = some("Zap")
let missing = option_none()

say is_ok(success)
say is_err(failure)
say unwrap_or(failure, 0)
\`\`\`

## The ? Operator

\`\`\`zap
fn read_value() -> Result:
    return err("not available")

fn use_value() -> Result:
    let value = read_value()?
    return ok(value)
\`\`\`

## Structured Errors

\`\`\`zap
fn load_config():
    raise "configuration unavailable"

try:
    load_config()
catch error:
    say "handled: " + error
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'let success = ok(42)\nlet failure = err("failed")\nsay is_ok(success)' },
        ],
      },
    ],
  },
  {
    title: "Standard Library",
    items: [
      {
        title: "Standard Library",
        path: "/docs/stdlib",
        description: "Built-in modules and functions",
        content: `
# Standard Library

Zap's standard library is organized into stable public domains.

| Module | Scope | Key APIs |
|--------|-------|----------|
| text | Text conversion | \`len\`, \`upper\`, \`lower\`, \`trim\`, \`split\`, \`join\` |
| math | Numeric operations | \`abs\`, \`min\`, \`max\`, \`pow\`, \`sqrt\` |
| collections | Lists and maps | \`sum\`, \`range\`, \`keys\`, \`count\`, \`reverse\`, \`get\` |
| filesystem | File I/O | \`read_text\`, \`write_text\`, \`read_lines\`, \`write_lines\`, \`exists\` |
| json | JSON serialization | \`json\`, \`from_json\` |
| system | Environment, paths, time | \`env\`, \`has_env\`, \`path_join\`, \`now\`, \`sleep\` |
| network | URL and HTTP | \`url_parse\`, \`url_encode\`, \`url_decode\`, \`http_get\` |
| process | Process execution | \`process_run\` |

## Text Example

\`\`\`zap
let message = "  Zap Language  "
say upper(message)
say lower(message)
say trim(message)
say len(message)
say split(trim(message), " ")
say join(["web", "ai", "iot"], " / ")
\`\`\`

## Math Example

\`\`\`zap
say abs(-4)
say min(3, 8)
say max(3, 8)
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'let message = "  Zap Language  "\nsay upper(message)\nsay trim(message)' },
        ],
      },
      {
        title: "Built-in Functions",
        path: "/docs/builtins",
        description: "Complete built-in reference",
        content: `
# Built-in Functions

## Output & Introspection

| Function | Example | Result |
|----------|---------|--------|
| \`say(value)\` | \`say "Hello"\` | Console output |
| \`len(value)\` | \`len(items)\` | Length of text/list |
| \`type(value)\` | \`type(data)\` | Type name |
| \`str(value)\` | \`str(42)\` | Text representation |
| \`keys(map)\` | \`keys(user)\` | Map key list |
| \`contains(value, item)\` | \`contains(items, "web")\` | Boolean |

## Collections

| Function | Example | Result |
|----------|---------|--------|
| \`join(list, sep)\` | \`join(parts, "/")\` | Text |
| \`range(end)\` | \`range(5)\` | Number list |
| \`range(start, end)\` | \`range(2, 5)\` | Bounded number list |
| \`get(map, key, default)\` | \`get(user, "id", 0)\` | Value |
| \`sum(list)\` | \`sum(scores)\` | Number |
| \`reverse(list)\` | \`reverse(items)\` | List |
| \`sort(list)\` | \`sort(items)\` | List |

## Math

| Function | Example | Result |
|----------|---------|--------|
| \`abs(number)\` | \`abs(-4)\` | Absolute number |
| \`min(a, b)\` | \`min(3, 8)\` | Smaller number |
| \`max(a, b)\` | \`max(3, 8)\` | Larger number |
| \`pow(a, b)\` | \`pow(2, 3)\` | Power |
| \`sqrt(n)\` | \`sqrt(16)\` | Square root |

## Text

| Function | Example | Result |
|----------|---------|--------|
| \`upper(text)\` | \`upper(name)\` | Uppercase |
| \`lower(text)\` | \`lower(name)\` | Lowercase |
| \`trim(text)\` | \`trim(input)\` | Trimmed text |
| \`split(text, sep)\` | \`split(path, "/")\` | Text list |
| \`replace(text, old, new)\` | \`replace(msg, "a", "b")\` | Text |
| \`is_empty(text)\` | \`is_empty("")\` | Boolean |

## System & Files

| Function | Example | Result |
|----------|---------|--------|
| \`read_text(path)\` | \`read_text("data.txt")\` | File text |
| \`write_text(path, text)\` | \`write_text("out.txt", data)\` | none |
| \`read_lines(path)\` | \`read_lines("data.txt")\` | Text list |
| \`write_lines(path, list)\` | \`write_lines("out.txt", lines)\` | none |
| \`exists(path)\` | \`exists("data.txt")\` | Boolean |
| \`path_join(a, b)\` | \`path_join("data", "x.txt")\` | Path text |
| \`basename(path)\` | \`basename("/a/b.txt")\` | Text |
| \`dirname(path)\` | \`dirname("/a/b.txt")\` | Text |
| \`env(name)\` | \`env("PATH")\` | Text |
| \`has_env(name)\` | \`has_env("PATH")\` | Boolean |
| \`now()\` | \`now()\` | Timestamp |
| \`sleep(ms)\` | \`sleep(1000)\` | none |

## JSON

| Function | Example | Result |
|----------|---------|--------|
| \`json(value)\` | \`json(user)\` | JSON text |
| \`from_json(text)\` | \`from_json(raw)\` | Zap value |

## Diagnostics

| Function | Example | Result |
|----------|---------|--------|
| \`assert(cond, msg)\` | \`assert(ok, "invalid")\` | Error if false |
        `,
        codeExamples: [
          { language: "zap", code: 'let message = "  Zap Language  "\nsay upper(message)\nsay len(message)' },
        ],
      },
    ],
  },
  {
    title: "Examples",
    items: [
      {
        title: "Hello World",
        path: "/docs/hello-world",
        description: "Your first Zap program",
        content: `
# Hello World

\`\`\`zap
say "Hello, Zap!"
\`\`\`

Save as \`main.zp\` and run:

\`\`\`bash
zap main.zp
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'say "Hello, Zap!"' },
        ],
      },
      {
        title: "Tasks Summary",
        path: "/docs/tasks-example",
        description: "Functions, maps, loops, and JSON",
        content: `
# Tasks Summary

\`\`\`zap
fn completed_count(tasks):
    let total = 0
    for task in tasks:
        if task["done"]:
            total = total + 1
    return total

let tasks = [
    {"title": "learn syntax", "done": true},
    {"title": "write a program", "done": true},
    {"title": "build a project", "done": false}
]

let completed = completed_count(tasks)
let summary = {"total": len(tasks), "completed": completed, "remaining": len(tasks) - completed}

assert(summary["total"] > 0, "task list must not be empty")
say json(summary)
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'fn completed_count(tasks):\n    let total = 0\n    for task in tasks:\n        if task["done"]:\n            total = total + 1\n    return total\n\nlet tasks = [\n    {"title": "learn syntax", "done": true},\n    {"title": "write a program", "done": true},\n    {"title": "build a project", "done": false}\n]\n\nlet completed = completed_count(tasks)\nlet summary = {"total": len(tasks), "completed": completed, "remaining": len(tasks) - completed}\n\nassert(summary["total"] > 0, "task list must not be empty")\nsay json(summary)' },
        ],
      },
      {
        title: "Data & JSON",
        path: "/docs/data-example",
        description: "JSON encoding and file I/O",
        content: `
# Data & JSON

\`\`\`zap
let profile = {"name": "Zap", "targets": ["web", "mobile", "ai", "iot"]}

let encoded = json(profile)
write_text("profile.json", encoded)

let restored = from_json(read_text("profile.json"))
assert(type(restored) == "map", "profile must decode to a map")
say restored["name"]
say join(restored["targets"], ", ")
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'let profile = {"name": "Zap", "targets": ["web", "mobile", "ai", "iot"]}\n\nlet encoded = json(profile)\nwrite_text("profile.json", encoded)\n\nlet restored = from_json(read_text("profile.json"))\nassert(type(restored) == "map", "profile must decode to a map")\nsay restored["name"]\nsay join(restored["targets"], ", ")' },
        ],
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "CLI Reference",
        path: "/docs/cli",
        description: "Zap CLI commands",
        content: `
# CLI Reference

| Command | Purpose |
|---------|---------|
| \`zap --version\` | Print native Zap version |
| \`zap file.zp\` | Execute a Zap source file |
| \`zap run file.zp\` | Explicit run command |
| \`zap --help\` | Print CLI usage |
| \`zap fmt file.zp\` | Format a \`.zp\` source file |
| \`zap check [dir]\` | Validate \`zap.toml\` and entry file |
| \`zap test [dir]\` | Run all \`*_test.zp\` files |
| \`zap init <dir>\` | Scaffold a new Zap project |
| \`zap build [dir]\` | Build-ready project validation |
| \`zap lint <file.zp>\` | Check tabs, trailing whitespace, long lines |
| \`zap check --json [dir]\` | Emit JSON diagnostics for CI/editor |

## Project Structure

\`\`\`text
hello-zap/
├── zap.toml
├── main.zp
├── modules/
│   └── greeting.zp
├── lib/
│   └── text_helpers.zp
└── tests/
    └── smoke.zp
\`\`\`
        `,
        codeExamples: [
          { language: "bash", code: "zap init hello-zap\ncd hello-zap\nzap check\nzap main.zp" },
        ],
      },
      {
        title: "Type System",
        path: "/docs/types",
        description: "Annotations, narrowing, and validation",
        content: `
# Type System

## Annotations

\`\`\`zap
let port: number = 8080
let enabled: bool = true
\`\`\`

Available annotation names: \`text\`, \`number\`, \`bool\`, \`list\`, \`map\`, \`none\`, and \`any\`.

## Type Narrowing

\`\`\`zap
let result: Result = ok(42)

if is_ok(result):
    let value: number = result["ok"]
    say value
\`\`\`

## Option and Result

\`\`\`zap
let value = some("Zap")
let missing = option_none()

say is_some(value)
say unwrap_or(missing, "default")
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'let port: number = 8080\nlet enabled: bool = true' },
        ],
      },
      {
        title: "Classes",
        path: "/docs/classes",
        description: "Object-oriented programming",
        content: `
# Classes

## Basic Class

\`\`\`zap
class User:
    fn init(self, name):
        self.name = name

    fn greet(self):
        return "Hello, " + self.name

let user = new("User", "Zap")
say user.greet()
\`\`\`

## Inheritance

\`\`\`zap
class Animal:
    fn speak(self):
        return "sound"

class Dog extends Animal:
    fn speak(self):
        return "woof"
\`\`\`
        `,
        codeExamples: [
          { language: "zap", code: 'class User:\n    fn init(self, name):\n        self.name = name\n\n    fn greet(self):\n        return "Hello, " + self.name\n\nlet user = new("User", "Zap")\nsay user.greet()' },
        ],
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        title: "Contributing",
        path: "/docs/contributing",
        description: "How to contribute to Zap",
        content: `
# Contributing

Zap is open source and welcomes contributions.

## Development Setup

\`\`\`bash
git clone https://github.com/zap-lang/zap.git
cd zap
cargo test --manifest-path native/Cargo.toml
\`\`\`

## Running Tests

\`\`\`bash
make native-test
\`\`\`

## Code Style

- Indentation: 4 spaces per level
- Function names: \`snake_case\`
- Comments: clear and concise
- Tests: \`*_test.zp\` in \`tests/\`
        `,
        codeExamples: [
          { language: "bash", code: "git clone https://github.com/zap-lang/zap.git\ncd zap\ncargo test --manifest-path native/Cargo.toml" },
        ],
      },
      {
        title: "Roadmap",
        path: "/docs/roadmap",
        description: "Future plans for Zap",
        content: `
# Roadmap

## Completed (v0.7.1)

- Variables, expressions, control flow
- Functions, closures, collections
- JSON and file I/O
- Modules and project validation
- Formatter and test runner
- Async/await foundation

## In Progress

- Static type checking
- Richer diagnostics
- First-class module exports
- Package registry
- Async I/O
- Platform-specific libraries

## Future

- Web server framework
- Mobile bindings
- AI/ML libraries
- IoT device support
- Native bytecode VM
        `,
        codeExamples: [],
      },
      {
        title: "Ecosystem",
        path: "/docs/ecosystem",
        description: "Web, Mobile, AI, and IoT plans",
        content: `
# Ecosystem

Zap is designed to grow across multiple platforms.

## Web

HTTP server and client foundations are on the roadmap. The current runtime includes bounded \`http_get\` and \`http_request\` helpers.

## Mobile

Mobile bindings are planned as separate packages after core language stability.

## AI

\`zap\` supports placeholder AI interfaces. Real model provider integration, API key management, and production networking are planned for future releases.

## IoT

IoT device support is a long-term ecosystem goal, built on top of the stable core language and standard library.

> **Note**: API keys should never be hardcoded in Zap source code. Use environment variables via \`env()\` and \`has_env()\`.
        `,
        codeExamples: [],
      },
    ],
  },
];

export function findDocByPath(path: string): DocItem | undefined {
  for (const section of docsSections) {
    const item = section.items.find((item) => item.path === path);
    if (item) return item;
  }
  return undefined;
}

export function getAllDocPaths(): string[] {
  const paths: string[] = [];
  for (const section of docsSections) {
    for (const item of section.items) {
      paths.push(item.path);
    }
  }
  return paths;
}
