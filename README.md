# حُرّاس البستان: غزو السلايم

لعبة دفاع عن البستان في المتصفح، بالعربي، كلها مرسومة بالكود (بدون صور خارجية). تختار فريقك: تزرع نباتات وتصد السلايم، أو تقود السلايم وتهاجم حديقة يدافع عنها الكمبيوتر أو صاحبك.

**العب الآن:** https://ahmedioriak.github.io/hurras-albustan/

## الأطوار

| الفريق | الطور | الفكرة |
|---|---|---|
| الخضروات | الطور العادي | 25 مرحلة في 5 عوالم، وثلاثة زعماء |
| الخضروات | الطور المتصاعد | مستويات بلا نهاية، قوة السلايم = 1.04^(المستوى − 1) |
| الخضروات | طور النجاة | بلا توقف حتى تخسر، والصعوبة تزيد مع نقاطك |
| السلايم | ضد الكمبيوتر | تهاجم حديقة يزرعها الكمبيوتر (سهل، عادي، صعب) |
| الاثنين | أونلاين | خضروات ضد سلايم بين جهازين، بكود غرفة من 4 أرقام |
| الاثنين | 1 ضد 1 | على نفس الجهاز بيد بلايستيشن (أو الماوس ولوحة المفاتيح) |

فيها 22 نبتة، و19 نوع سلايم، ودمج النباتات لمستوى 2 و3.

## اللعب أونلاين 1 ضد 1

1. افتح اللعبة ← "أونلاين 1 ضد 1".
2. اكتب اسمك، واختر فريقك (الخضروات أو السلايم)، فيطلع لك كود من 4 أرقام.
3. صاحبك يفتح نفس الرابط من أي جهاز، ويضغط "أونلاين 1 ضد 1" ويكتب الكود، وياخذ الفريق الثاني.
4. كل واحد يختار 8 (نباتات أو وحوش)، ثم "جاهز".

## كيف يشتغل الاتصال

**بدون أي إعداد (الوضع الافتراضي): اتصال مباشر بين الجهازين (WebRTC عن طريق PeerJS).**

- اللي ينشئ الغرفة يسجّل المعرّف `hurras-albustan-v4-<الكود>` في سيرفر PeerJS المجاني، وصاحبه يتصل فيه بالكود.
- بعدها الجهازين يتكلمون مباشرة. لاعب الخضروات هو اللي تشتغل عنده المباراة ويرسل حالتها 10 مرات في الثانية، ولاعب السلايم يرسل أوامر إنزال الوحوش.
- ما فيه قائمة مباريات مفتوحة في هذا الوضع: الدخول بالكود بس.

**مع Firebase (اختياري):** لو حطيت إعدادات مشروع Firebase في `FIREBASE_CONFIG`، اللعبة تستخدم Firebase Realtime Database بدل الاتصال المباشر، وتظهر قائمة المباريات المفتوحة:

- كل لاعب يدخل بحساب مجهول (Anonymous Auth) تلقائياً.
- كل لاعب يكتب عقدة وحدة في الغرفة: `rooms/<الغرفة>/<uid>_<tab>` = `{n: الاسم, p: الحالة (JSON), t: الوقت}`، وتنحذف تلقائياً لما يقفل الصفحة.
- القواعد في `database.rules.json`: لازم تسجيل دخول، وكل لاعب يكتب في عقدته بس، وحد لحجم البيانات.
- الخطة المجانية (Spark) تتحمل 100 اتصال في نفس الوقت.

### ربط مشروع Firebase جديد

1. https://console.firebase.google.com ← Create a project.
2. Build ← Realtime Database ← Create database ← Start in locked mode.
3. تبويب Rules ← الصق محتوى `database.rules.json` ← Publish.
4. Build ← Authentication ← Get started ← فعّل Anonymous.
5. Project settings ← Your apps ← Web (`</>`) ← انسخ `firebaseConfig`.
6. حط القيم في `FIREBASE_CONFIG` في قسم "online server" داخل `docs/game.js` (أو عرّف `window.HURRAS_FIREBASE_CONFIG` قبل تحميل اللعبة).

## النشر

- **GitHub Pages:** Settings ← Pages ← Deploy from a branch ← `main` و`/docs`.
- **أو Firebase Hosting:** `firebase deploy` (الإعداد في `firebase.json`، وينشر القواعد كمان).

## تشغيل على جهازك

افتح `docs/index.html` في المتصفح. أو شغّله من سيرفر محلي، مثلاً:

```bash
npx serve docs
```

## هيكل المشروع

```
docs/                  اللعبة (index.html, style.css, game.js)
database.rules.json    قواعد حماية قاعدة البيانات
firebase.json          إعداد Firebase CLI (القواعد + الاستضافة)
```

---

### English

*Hurras Al-Bustan: Slime Invasion* is an Arabic lane-defense browser game. Play the plants (campaign, endless ascent, survival) or the slimes (against a computer gardener), locally 1v1 with game controllers, or online 1v1 with a 4-digit room code. By default the two browsers connect directly over WebRTC (PeerJS public signaling, no setup); if `FIREBASE_CONFIG` is set, rooms run on Firebase Realtime Database with anonymous auth instead (rules in `database.rules.json`). The plants player runs the authoritative simulation. The game lives in `docs/` for GitHub Pages.
