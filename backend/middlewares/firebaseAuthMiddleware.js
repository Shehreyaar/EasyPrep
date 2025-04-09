import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

// privatekey (service account) save as serviceAccountKey.json
const serviceAccountPath = path.resolve("serviceAccountKey.json");
const serviceAccount = JSON.parse(
  readFileSync(serviceAccountPath, "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Token missing");

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("❌ Token inválido:", error); 
    return res.status(401).send("Invalid token");
  }
}

export {admin};