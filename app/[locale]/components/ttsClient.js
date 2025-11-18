import ttsKey from "./tts.json";
import { SignJWT } from "jose";

async function getAccessToken() {
  // نبني JWT
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // ساعة واحدة

  const payload = {
    iss: ttsKey.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat,
    exp,
  };

  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    str2ab(ttsKey.private_key),
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .sign(privateKey);

  // نجيب Access Token
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

export async function synthesizeText(text) {
  const token = await getAccessToken();

  const res = await fetch(
    "https://texttospeech.googleapis.com/v1/text:synthesize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: "ar-XA", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
      }),
    }
  );

  const data = await res.json();
console.log(data)
  if (data.audioContent) {
    // const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
    // audio.play();
     return data?.audioContent ;
  } else {
    console.error("Error:", data);
  }
}

// Helper لتحويل private_key من نص لـ ArrayBuffer
function str2ab(str) {
  const b64 = str
    .replace(/-----[^-]+-----/g, "")
    .replace(/\n/g, "");
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
