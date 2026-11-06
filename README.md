# حُرّاس البستان: غزو السلايم

لعبة دفاع عن البستان في المتصفح، بالعربي، كلها مرسومة بالكود (بدون صور خارجية). تختار فريقك: تزرع نباتات وتصد السلايم، أو تقود السلايم وتهاجم حديقة يدافع عنها الكمبيوتر أو صاحبك.

**العب الآن:** https://GH_USER.github.io/hurras-albustan/

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

## اللعب أونلاين

1. "العب" ← "أونلاين".
2. اكتب اسمك واختر فريقك، فيطلع لك كود من 4 أرقام.
3. صاحبك يفتح نفس الرابط من أي جهاز، ويكتب الكود أو يختار مباراتك من القائمة.
4. كل واحد يختار 8، ثم "جاهز".

## السيرفر: Firebase Realtime Database

الأونلاين ما يحتاج سيرفر خاص. اللعبة تتصل بقاعدة بيانات Firebase مباشرة:

- كل لاعب يدخل بحساب مجهول (Anonymous Auth) تلقائياً.
- كل لاعب يكتب عقدة وحدة في الغرفة: `rooms/<الغرفة>/<uid>_<tab>` = `{n: الاسم, p: الحالة (JSON), t: الوقت}`.
- العقدة تنحذف تلقائياً لما اللاعب يقفل الصفحة (`onDisconnect`).
- الغرف: `__lobby` للمباريات المفتوحة، و`pvs-<الكود>` لكل مباراة.
- لاعب الخضروات هو اللي تشتغل عنده المباراة ويرسل حالتها 10 مرات في الثانية (أقل من 4KB)، ولاعب السلايم يرسل أوامر إنزال الوحوش.
- القواعد في `database.rules.json`: لازم تسجيل دخول، وكل لاعب يكتب في عقدته بس، وحد لحجم البيانات.

الخطة المجانية (Spark) تتحمل 100 اتصال في نفس الوقت.

### ربط مشروع Firebase جديد

1. https://console.firebase.google.com ← Create a project.
2. Build ← Realtime Database ← Create database ← Start in locked mode.
3. تبويب Rules ← الصق محتوى `database.rules.json` ← Publish.
4. Build ← Authentication ← Get started ← فعّل Anonymous.
5. Project settings ← Your apps ← Web (`</>`) ← انسخ `firebaseConfig`.
6. حط القيم في `FIREBASE_CONFIG` في أول قسم الأونلاين داخل `docs/game.js`.

## النشر

- **GitHub Pages:** Settings ← Pages ← Deploy from a branch ← `main` و`/docs`.
- **أو Firebase Hosting:** `firebase deploy` (الإعداد في `firebase.json`، وينشر القواعد كمان).

## تشغيل على جهازك

افتح `docs/index.html` في المتصفح. للأونلاين الأفضل تشغيله من سيرفر محلي، مثلاً:

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

*Hurras Al-Bustan: Slime Invasion* is an Arabic lane-defense browser game. Play the plants (campaign, endless ascent, survival) or the slimes (against a computer gardener), locally 1v1 with game controllers, or online with a 4-digit room code. Online play uses Firebase Realtime Database with anonymous auth; each player writes only its own node in a room and the plants player runs the authoritative simulation. Rules are in `database.rules.json`; the game lives in `docs/` for GitHub Pages.
