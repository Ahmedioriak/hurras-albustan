# حُرّاس البستان: غزو السلايم

لعبة دفاع عن البستان في المتصفح، بالعربي، كلها مرسومة بالكود: **أونلاين 1 ضد 1 بكود غرفة** (واحد خضروات والثاني سلايم)، وطور القصة، وضد الكمبيوتر، و1 ضد 1 على نفس الجهاز بيد بلايستيشن.

- **Vercel:** https://hurras-albustan.vercel.app
- **نسخة الجوال:** https://hurras-albustan.vercel.app/mobile
- **GitHub Pages:** https://ahmedioriak.github.io/hurras-albustan/

| الملف | وش هو |
|---|---|
| `index.html` | **النسخة الأساسية** — اللعبة كاملة في ملف واحد |
| `mobile.html` | **نسخة الجوال** ← الرابط `/mobile`: ملء الشاشة تلقائياً بالعرض، بدون تكبير أو تمرير بالغلط |
| `firebase-config.js` | إعدادات سيرفر الأونلاين (Firebase) — اختياري، الصق إعدادات مشروعك هنا |
| `lib/` | مكتبات الأونلاين (PeerJS و Firebase) عشان ما تعتمد اللعبة على مواقع ثانية |
| `manifest.webmanifest` / `manifest-mobile.webmanifest` / `sw.js` / `icons/` | تثبيت اللعبة كتطبيق وتشغيلها بدون إنترنت |
| `database.rules.json` | قواعد قاعدة البيانات في Firebase |
| `firebase.json` / `vercel.json` | إعدادات الاستضافة |
| `src/` | ملفات المصدر مقسّمة — بعد أي تعديل: `python3 src/build.py` (يحدّث `index.html` و`mobile.html`) |

## الأطوار

| الفريق | الطور | الفكرة |
|---|---|---|
| الاثنين | **أونلاين 1 ضد 1** | خضروات ضد سلايم بين جهازين، بكود من 4 أرقام |
| الاثنين | 1 ضد 1 | على نفس الجهاز بيد بلايستيشن (أو الماوس ولوحة المفاتيح) |
| الخضروات | الطور العادي | 25 مرحلة في 5 عوالم، وثلاثة زعماء |
| الخضروات | الطور المتصاعد | مستويات بلا نهاية، قوة السلايم = 1.04^(المستوى − 1) |
| الخضروات | طور النجاة | بلا توقف حتى تخسر، والصعوبة تزيد مع نقاطك |
| السلايم | ضد الكمبيوتر | تهاجم حديقة يزرعها الكمبيوتر (سهل، عادي، صعب) |

فيها 22 نبتة، و19 نوع سلايم، ودمج النباتات لمستوى 2 و3.

## اللعب أونلاين

1. افتح اللعبة ← **أونلاين 1 ضد 1**.
2. اكتب اسمك، واختر فريقك (الخضروات أو السلايم)، فيطلع لك كود من 4 أرقام.
3. صاحبك يفتح نفس الرابط من أي جهاز، ويضغط "أونلاين 1 ضد 1" ويكتب الكود، وياخذ الفريق الثاني.
4. كل واحد يختار 8 (نباتات أو وحوش)، ثم "جاهز".

بدون أي إعداد، الجهازين يتصلون مباشرة (WebRTC عن طريق سيرفر PeerJS المجاني). لاعب الخضروات هو اللي تشتغل عنده المباراة ويرسل حالتها 10 مرات في الثانية، ولاعب السلايم يرسل أوامر إنزال الوحوش.

## سيرفر الأونلاين (Firebase) — اختياري

مع Firebase تظهر قائمة المباريات المفتوحة، والاتصال يمر عن طريق السيرفر:

1. https://console.firebase.google.com ← **Create a project**.
2. **Build ← Realtime Database ← Create Database** ← المكان: **Belgium (europe-west1)** ← **Start in locked mode**.
3. تبويب **Rules**: الصق محتوى `database.rules.json` واضغط **Publish**.
4. **Build ← Authentication ← Get started** ← فعّل **Anonymous**.
5. ⚙️ **Project settings ← Your apps ← Web (`</>`)** ← سجّل التطبيق ← انسخ `firebaseConfig`.
6. الصقه في `firebase-config.js` مكان `null` (تقدر تعدّله من GitHub مباشرة، وVercel ينشره تلقائياً).

كل لاعب يكتب عقدة وحدة في الغرفة `rooms/<الغرفة>/<uid>_<tab>`، وتنحذف تلقائياً لما يقفل الصفحة. الخطة المجانية (Spark) تتحمل 100 اتصال في نفس الوقت.

## الاستضافة

- **Vercel**: Add New ← Project ← اختر هذا المستودع ← Deploy. (مربوط الحين، وكل push على `main` ينشر تلقائياً.)
- **GitHub Pages**: Settings ← Pages ← Deploy from a branch ← `main` و`/ (root)`.
- **Firebase Hosting** (اختياري): `npm i -g firebase-tools` ← `firebase login` ← `firebase use --add` ← `firebase deploy`.

## تثبيت اللعبة كتطبيق

افتح رابط اللعبة من الكمبيوتر، أو **نسخة الجوال** `/mobile` من الجوال:

- **أندرويد / Chrome / Edge:** القائمة ← "تثبيت التطبيق" أو "Add to Home screen".
- **آيفون (Safari):** زر المشاركة ← "إضافة إلى الشاشة الرئيسية".

بعد التثبيت تفتح بملء الشاشة، والطور العادي يشتغل حتى بدون إنترنت.

## التحكم

- الخضروات: اختر بطاقة النبتة ثم اضغط على المربع، واجمع قطرات الندى. اختصارات: 1-8 النباتات، S الاقتلاع، Q و W المهارات، Space للإيقاف.
- السلايم: اختر الوحش من الشريط ثم اضغط على الممر، أو الأرقام والأسهم و Enter، وحرف N للعش.
- يد بلايستيشن (1 ضد 1 وضد الكمبيوتر): ✕ زراعة/إنزال، ○ اقتلاع، △ الجذور/العش، □ النسيم، L1/R1 والأسهم للاختيار.

---

### English

*Hurras Al-Bustan: Slime Invasion* is an Arabic lane-defense browser game in one `index.html`. Main mode: online 1v1 with a 4-digit room code, plants vs slimes. By default the two browsers connect directly over WebRTC (PeerJS public signaling, no setup); if `firebase-config.js` holds a Firebase config, rooms run on Firebase Realtime Database with anonymous auth instead (rules in `database.rules.json`). Also: a 25-level campaign, endless ascent, survival, slimes vs a computer gardener, and local 1v1 with game controllers. Deployed on Vercel and GitHub Pages; installable as a PWA.
