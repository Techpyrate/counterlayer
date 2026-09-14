/**
 * Seed admin plan in database for a Firebase user by email.
 * Usage: node scripts/seed-admin.mjs thepassswordis123@gmail.com
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const email = (process.argv[2] ?? "").trim().toLowerCase();

if (!email) {
  console.error("Usage: node scripts/seed-admin.mjs <email>");
  process.exit(1);
}

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const DATA_DIR = path.join(root, ".data");
const USERS_FILE = path.join(DATA_DIR, "user-plans.json");

function saveFileRecord(uid, record) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  let store = { byUid: {}, byEmail: {} };
  if (fs.existsSync(USERS_FILE)) {
    store = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  }
  store.byUid[uid] = record;
  store.byEmail[email] = record;
  fs.writeFileSync(USERS_FILE, JSON.stringify(store, null, 2));
  console.log(`Wrote file store: ${USERS_FILE}`);
}

async function main() {
  let uid = `email:${email}`;
  let firestoreOk = false;

  try {
    const { cert, getApps, initializeApp } = await import("firebase-admin/app");
    const { getAuth } = await import("firebase-admin/auth");
    const { getFirestore } = await import("firebase-admin/firestore");

    let app = getApps()[0];
    if (!app) {
      if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
        app = initializeApp({
          credential: cert({
            projectId: parsed.project_id,
            clientEmail: parsed.client_email,
            privateKey: parsed.private_key.replace(/\\n/g, "\n"),
          }),
        });
      } else if (
        process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_PRIVATE_KEY
      ) {
        app = initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          }),
        });
      }
    }

    if (app) {
      const auth = getAuth(app);
      const db = getFirestore(app);
      try {
        const user = await auth.getUserByEmail(email);
        uid = user.uid;
      } catch {
        console.warn(
          `Firebase user not found for ${email} — using email key until first sign-in.`,
        );
      }

      const record = {
        uid,
        email,
        plan: "admin",
        planStatus: "active",
        updatedAt: new Date().toISOString(),
      };
      await db.collection("users").doc(uid).set(record, { merge: true });
      firestoreOk = true;
      console.log(`Firestore users/${uid} → plan: admin`);
      saveFileRecord(uid, record);
    }
  } catch (err) {
    console.warn("Firestore seed skipped:", err.message);
  }

  if (!firestoreOk) {
    const record = {
      uid,
      email,
      plan: "admin",
      planStatus: "active",
      updatedAt: new Date().toISOString(),
    };
    saveFileRecord(uid, record);
    console.log(`File-only admin seed for ${email}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
