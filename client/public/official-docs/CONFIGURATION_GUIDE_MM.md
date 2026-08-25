# Zap Configuration Guide

**Verified baseline:** Zap v2.11.16  
**ရည်ရွယ်ချက်:** Zap project တစ်ခု၏ manifest၊ lockfile၊ Web server၊ package registry နှင့် runtime configuration များကို မြန်မာဘာသာဖြင့် ရှင်းပြရန် ဖြစ်ပါသည်။

> Zap ၏ configuration သည် project အတွင်းရှိ `zap.toml`၊ generated `zap.lock` နှင့် လိုအပ်သည့် environment variables များပေါ်တွင် အခြေခံပါသည်။ Configuration များကို project source ထဲတွင် ရှင်းလင်းစွာ ထားပြီး secret များကို source code သို့မဟုတ် lockfile ထဲ မထည့်ပါနှင့်။

## Project ဖွဲ့စည်းပုံ

အနည်းဆုံး Zap project တစ်ခုတွင် အောက်ပါဖိုင်များ ပါဝင်နိုင်ပါသည်။

```text
my_app/
├── zap.toml
├── zap.lock
├── main.zp
├── web.zp
├── server.zp
├── routes/
├── middleware/
├── public/
└── tests/
```

`main.zp` သည် default entry file ဖြစ်ပါသည်။ `zap.toml` သည် package identity၊ version၊ entry file နှင့် dependencies များကို သတ်မှတ်ပြီး `zap.lock` သည် dependency resolution ၏ canonical output ဖြစ်ပါသည်။

## အခြေခံ `zap.toml`

```toml
[package]
name = "hello-app"
version = "0.1.0"
main = "main.zp"
```

`main` ကို မရေးထားလျှင် Zap သည် `main.zp` ကို အသုံးပြုပါသည်။ Package name သည် project တစ်ခုအတွင်း ထူးခြားရမည်ဖြစ်ပြီး version သည် semver ပုံစံကို လိုက်နာသင့်ပါသည်။

## Dependencies သတ်မှတ်ခြင်း

```toml
[package]
name = "web-app"
version = "0.1.0"
main = "main.zp"

[dependencies]
web = "0.3"
json-tools = "1.2"
local-lib = { path = "../local-lib" }
```

Version dependency များကို lockfile ထဲတွင် အတည်ပြုရန် `zap lock` ကို run ပါ။ Local path dependency ၏ directory တွင်လည်း `zap.toml` နှင့် package `name`၊ `version` ရှိရမည်။ Dependency cycle တွေ့ပါက Zap သည် deterministic diagnostic ပြန်ပေးပါသည်။

## Lockfile workflow

```bash
zap check
zap lock
zap install
zap update
zap build --locked
```

`zap lock` သည် canonical `zap.lock` ကို ထုတ်ပေးပါသည်။ Lockfile ကို project နှင့်အတူ commit လုပ်သင့်ပါသည်။ Manifest ပြောင်းလဲပြီးနောက် `zap update` သို့မဟုတ် `zap lock` ကို ပြန် run ပါ။ Lockfile ကို လက်ဖြင့်ပြင်ခြင်းကို ရှောင်ပါ။ CI နှင့် reproducible build အတွက် `zap build --locked` ကို သုံးပါ။

## Registry configuration

Registry index တစ်ခုကို local path၊ `file://` URL သို့မဟုတ် HTTPS URL အဖြစ် သတ်မှတ်နိုင်ပါသည်။

| Environment variable | အဓိပ္ပာယ် |
|---|---|
| `ZAP_REGISTRY_INDEX` | Dependency registry index ၏ path သို့မဟုတ် URL |
| `ZAP_CACHE_DIR` | Package cache အတွက် အစားထိုး directory |
| `ZAP_OFFLINE=1` | Cache ထဲရှိ artifact များမှလွဲ၍ network download မလုပ်ရန် |
| `ZAP_REGISTRY_TOKEN` | Registry publish/serve အတွက် bearer token |
| `ZAP_REGISTRY_SIGNING_SECRET` | Local signed-index persistence အတွက် secret |
| `ZAP_ALLOW_INSECURE_HTTP=1` | Local fixture များအတွက်သာ plain HTTP ခွင့်ပြုရန် |

ဥပမာ၊ offline install သည် အောက်ပါအတိုင်း run နိုင်ပါသည်။

```bash
ZAP_REGISTRY_INDEX="$PWD/registry/index.json" \
ZAP_OFFLINE=1 \
zap install
```

Production registry configuration တွင် HTTPS၊ checksum verification၊ token protection နှင့် external ingress policy များကို မဖြစ်မနေ သတ်မှတ်ပါ။ `ZAP_ALLOW_INSECURE_HTTP=1` ကို public deployment တွင် မသုံးပါနှင့်။

## Web server configuration

Generated Web scaffold သည် `server.zp` မှ server ကို run လုပ်ပြီး port ကို `ZAP_WEB_PORT` မှ ဖတ်ပါသည်။ မသတ်မှတ်ထားလျှင် default port သည် `3000` ဖြစ်ပါသည်။

```bash
ZAP_WEB_PORT=3100 zap dev
```

Web project တွင် `routes/` သည် request route များအတွက်၊ `middleware/` သည် request/response policy အတွက်၊ `public/` သည် HTML၊ CSS၊ JavaScript နှင့် frontend build output အတွက် အသုံးပြုပါသည်။ လက်ရှိ native development server သည် bounded၊ single-threaded reference/development server ဖြစ်သောကြောင့် production TLS termination၊ ingress၊ readiness probe၊ graceful shutdown နှင့် process supervision များကို deployment layer တွင် ထပ်မံသတ်မှတ်ရပါမည်။

## Runtime နှင့် diagnostics

Project ကို စစ်ဆေးရန် အောက်ပါ command များကို သုံးပါ။

```bash
zap check .
zap check --json .
zap fmt main.zp
zap lint main.zp
zap test tests
```

Automation တွင် `zap check --json` ကို အသုံးပြုပါက structured diagnostics ရရှိပါသည်။ Secret များကို diagnostic output၊ log နှင့် CI artifact များထဲ မထည့်ပါနှင့်။ Runtime memory၊ execution depth၊ workspace နှင့် request limits များသည် implementation contract အတိုင်း bounded ဖြစ်ပြီး production capacity guarantee အဖြစ် မယူဆရပါ။

## Configuration လုပ်ရာတွင် အကြံပြုချက်များ

1. Project identity နှင့် dependency requirement များကို `zap.toml` ထဲတွင်သာ သတ်မှတ်ပါ။
2. Resolved dependency graph ကို `zap.lock` ဖြင့် commit လုပ်ပြီး CI တွင် `zap build --locked` သုံးပါ။
3. Token၊ signing secret နှင့် private endpoint များကို environment/secret manager မှ ပေးပါ။
4. Local development နှင့် production configuration ကို ခွဲထားပါ။
5. Configuration ပြောင်းလဲပြီးတိုင်း `zap check`၊ `zap install` နှင့် သက်ဆိုင်ရာ test များကို run ပါ။
6. `ZAP_ALLOW_INSECURE_HTTP=1` ကဲ့သို့ bypass setting များကို local fixture ပြင်ပတွင် မသုံးပါနှင့်။

## ဆက်လက်ဖတ်ရှုရန်

- [Burmese Package နှင့် Lockfile Guide](PACKAGE.md)
- [Burmese Web Guide](ZAP_WEB_NATIVE_MM.md)
- [Burmese Deployment Guide](DEPLOYMENT_MM.md)
- [Burmese Documentation Navigation](DOCUMENTATION_NAVIGATION_MM.md)
- [English Package and Lockfile Guide](PACKAGE_EN.md)
- [Zap repository README](https://github.com/ZapLang-Dev/zap/blob/master/README.md)

**လက်ရှိ source baseline:** `v2.11.16`။ Implementation status နှင့် deferred feature များကို [current-status documentation](https://github.com/ZapLang-Dev/zap/blob/master/docs/CURRENT_STATUS_MM.md) တွင် စစ်ဆေးပါ။

[1]: https://github.com/ZapLang-Dev/zap/blob/master/README.md
[2]: https://github.com/ZapLang-Dev/zap/blob/master/docs/CURRENT_STATUS_MM.md
