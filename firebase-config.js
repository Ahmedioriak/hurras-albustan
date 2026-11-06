// ===== سيرفر الأونلاين (Firebase Realtime Database) — اختياري =====
// إذا خليتها null: الأونلاين يشتغل بالاتصال المباشر بين الجهازين (بكود من 4 أرقام) بدون أي إعداد.
// إذا حطيت إعدادات مشروعك: اللعبة تستخدم Firebase وتظهر قائمة المباريات المفتوحة.
//   Firebase Console ← ⚙️ Project settings ← Your apps ← (Web </>) ← SDK setup and configuration ← Config
//   لازم يكون فيها databaseURL، ولازم تفعّل Authentication ← Anonymous، وتنشر القواعد من database.rules.json.
window.HURRAS_FIREBASE_CONFIG = null;

/* مثال:
window.HURRAS_FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "my-game.firebaseapp.com",
  databaseURL: "https://my-game-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-game",
  appId: "1:123:web:abc"
};
*/
