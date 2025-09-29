import { SignJWT, importPKCS8 } from "jose";

/**
 * Generates a short-lived Google Cloud OAuth2 access token
 * using a service account private key and JWT signing.
 */
async function getAccessToken() {
  const iat = Math.floor(Date.now() / 1000); // Current time (seconds)
  const exp = iat + 3600; // Token expiration (1 hour)

  // JWT payload required by Google OAuth2
  const payload = {
    iss: process.env.GOOGLE_CLIENT_EMAIL, // Service account email
    scope: "https://www.googleapis.com/auth/cloud-platform", // Required API scope
    aud: process.env.GOOGLE_TOKEN_URI, // Token endpoint
    iat,
    exp,
  };

  // Convert escaped private key into valid PEM format
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  const key = await importPKCS8(privateKey, "RS256");

  // Create signed JWT
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .sign(key);

  // Exchange JWT for access token
  const res = await fetch(process.env.GOOGLE_TOKEN_URI, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to get access token");
  }

  return data.access_token;
}

/**
 * API Route: Converts input text into speech using Google Cloud TTS.
 * - Expects: { text: "string" } in POST body.
 * - Returns: { audioContent: "base64-encoded mp3" }.
 */
export async function POST(req) {
  try {
    const { text } = await req.json();
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

    if (data.audioContent) {
      return Response.json({ audioContent: data.audioContent });
    } else {
      return Response.json({ error: data }, { status: 500 });
    }
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
