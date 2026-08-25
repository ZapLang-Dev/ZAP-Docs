# Zap Examples — မြန်မာလမ်းညွှန်

**Verified baseline:** Zap v2.11.16  
**ရည်ရွယ်ချက်:** Zap ကို စတင်လေ့လာသူများနှင့် project တည်ဆောက်သူများအတွက် အလုပ်လုပ်နိုင်သော configuration နှင့် source examples များကို စုစည်းပေးရန် ဖြစ်ပါသည်။

> ဥပမာများသည် လက်ရှိ language/runtime contract ကို ရှင်းပြရန် ရည်ရွယ်ပါသည်။ Production deployment မပြုမီ သက်ဆိုင်ရာ security၊ memory၊ async နှင့် deployment boundaries ကို စစ်ဆေးပါ။

## ၁။ Hello Zap

`hello.zp` ဖိုင်တစ်ခု ဖန်တီးပါ။

```zap
fn greet(name: text) -> text:
    return "မင်္ဂလာပါ၊ " + name

say greet("Zap")
```

Run လုပ်ရန်—

```bash
zap hello.zp
# သို့မဟုတ်
zap run hello.zp
```

## ၂။ အခြေခံ project နှင့် manifest

```bash
zap new my_app
cd my_app
zap check
zap run main.zp
```

`zap.toml` ၏ အခြေခံပုံစံမှာ—

```toml
[package]
name = "my-app"
version = "0.1.0"
main = "main.zp"
```

Project အတွင်း dependency များထည့်လိုပါက—

```toml
[dependencies]
json-tools = "1.2"
local-lib = { path = "../local-lib" }
```

ထို့နောက် canonical lockfile ထုတ်ပါ။

```bash
zap lock
zap install
zap build --locked
```

## ၃။ Collection နှင့် function

```zap
let scores: list<number> = [80, 45, 90]

fn passed(score: number) -> bool:
    return score >= 50

for score in scores:
    if passed(score):
        say "အောင်မြင်သည်: " + str(score)
    else:
        say "ထပ်မံလေ့ကျင့်ရန်: " + str(score)
```

`text`၊ `number`၊ `bool` နှင့် `list<number>` ကဲ့သို့ type annotation များသည် code ကို ဖတ်ရှုရလွယ်ကူစေပြီး `zap check` တွင် စစ်ဆေးနိုင်ပါသည်။

## ၄။ Map နှင့် JSON

```zap
let user = {
    "name": "Aye Aye",
    "active": true,
    "score": 88
}

say user["name"]
say json_encode(user)
```

JSON builtin အမည်နှင့် return behavior ကို project ၏ standard-library guide နှင့် language specification တွင် အတည်ပြုပါ။ မိမိအသုံးပြုနေသော release တွင် မပါဝင်သေးသော builtin ကို production code တွင် မခန့်မှန်းသုံးပါနှင့်။

## ၅။ Web project နှင့် port configuration

```bash
zap new web_app
cd web_app
ZAP_WEB_PORT=3100 zap dev
```

`public/index.html`—

```html
<!doctype html>
<html lang="my">
  <head>
    <meta charset="utf-8">
    <title>Zap Web App</title>
  </head>
  <body>
    <h1>Zap Web App</h1>
    <script type="module" src="/assets/app.js"></script>
  </body>
</html>
```

Web route နှင့် handler structure ကို `routes/`၊ server entry ကို `server.zp` နှင့် static asset များကို `public/` ထဲတွင် ထားပါ။ လက်ရှိ native server သည် development/reference boundary ဖြစ်သောကြောင့် production TLS၊ ingress၊ timeout၊ readiness နှင့် graceful shutdown ကို deployment layer တွင် ထပ်မံစီမံပါ။

## ၆။ Structured diagnostics

```bash
zap check .
zap check --json . > diagnostics.json
```

CI သို့မဟုတ် editor integration တွင် `diagnostics.json` ကို ဖတ်ပြီး error၊ warning နှင့် source location များကို ပြသနိုင်ပါသည်။ Diagnostic output ထဲသို့ password၊ token၊ signing secret သို့မဟုတ် private URL များ မထည့်ပါနှင့်။

## ၇။ Registry နှင့် offline install

Local registry index သတ်မှတ်ထားသော project ဥပမာ—

```bash
export ZAP_REGISTRY_INDEX="$PWD/registry/index.json"
zap registry check "$ZAP_REGISTRY_INDEX"
zap lock
zap install
```

Network မသုံးဘဲ cache ထဲရှိ artifact များကိုသာ အသုံးပြုရန်—

```bash
ZAP_REGISTRY_INDEX="$PWD/registry/index.json" \
ZAP_OFFLINE=1 \
zap install
```

Registry package archive များကို SHA-256 checksum ဖြင့် စစ်ဆေးပြီးမှသာ လက်ခံပါသည်။ Offline mode တွင် လိုအပ်သော direct နှင့် transitive packages အားလုံး cache ထဲရှိပြီး checksum ကိုက်ညီရမည်။

## ၈။ Registry publish configuration

```bash
export ZAP_REGISTRY_TOKEN="use-a-secret-manager"
zap registry publish \
  https://registry.example/publish \
  ./demo.pkg demo 1.0.0 \
  0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

Token ကို shell history၊ source file၊ README သို့မဟုတ် Git commit ထဲ မရေးပါနှင့်။ HTTPS endpoint နှင့် external access policy ကို သုံးပါ။ `ZAP_ALLOW_INSECURE_HTTP=1` သည် local fixture အတွက်သာ ဖြစ်ပြီး public registry အတွက် မသုံးသင့်ပါ။

## ၉။ Test နှင့် formatter workflow

```bash
zap fmt main.zp
zap lint main.zp
zap check .
zap test tests
zap build --locked
```

ပြောင်းလဲမှုတစ်ခုစီပြီးနောက် formatter၊ linter၊ checker နှင့် tests များကို run လုပ်ပါ။ Dependency ပြောင်းလဲပါက `zap lock` နှင့် `zap install` ကို ထပ်မံ run လုပ်ပါ။

## ၁၀။ Example project checklist

| စစ်ဆေးရမည့်အရာ | Command သို့မဟုတ် ဖိုင် |
|---|---|
| Package identity | `zap.toml` → `[package]` |
| Dependency requirements | `zap.toml` → `[dependencies]` |
| Reproducible resolution | `zap.lock` |
| Entry source | `main.zp` သို့မဟုတ် `main` field |
| Web port | `ZAP_WEB_PORT` |
| Registry index | `ZAP_REGISTRY_INDEX` |
| Offline operation | `ZAP_OFFLINE=1` |
| Code validation | `zap check .` |
| Structured output | `zap check --json .` |
| Tests and formatting | `zap test tests`, `zap fmt`, `zap lint` |

## ဆက်လက်ဖတ်ရှုရန်

- [မြန်မာ Configuration Guide](CONFIGURATION_GUIDE_MM.md)
- [မြန်မာ Package နှင့် Lockfile Guide](PACKAGE.md)
- [မြန်မာ Web Guide](ZAP_WEB_NATIVE_MM.md)
- [မြန်မာ Deployment Guide](DEPLOYMENT_MM.md)
- [မြန်မာ Language Guide](LEARN_ZAP_MM.md)
- [မြန်မာ Documentation Navigation](DOCUMENTATION_NAVIGATION_MM.md)
- [Zap source repository](https://github.com/ZapLang-Dev/zap)

[1]: https://github.com/ZapLang-Dev/zap/blob/master/README.md
[2]: https://github.com/ZapLang-Dev/zap/blob/master/docs/CURRENT_STATUS_MM.md
