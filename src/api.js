// src/api.js

const API = "/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Terjadi kesalahan");
  }

  return data;
}

/* ===========================
   STATUS
=========================== */

export async function getStatus() {
  return request("/status");
}

/* ===========================
   HEALTH
=========================== */

export async function getHealth() {
  return request("/health");
}

/* ===========================
   SESSIONS
=========================== */

export async function getSessions() {
  return request("/sessions");
}

/* ===========================
   START PAIRING
=========================== */

export async function startPairing(number) {
  return request("/pair", {
    method: "POST",
    body: JSON.stringify({
      number,
    }),
  });
}

/* ===========================
   GET PAIRING CODE
=========================== */

export async function getPairing(sessionId) {
  return request(
    `/pairing?sessionId=${encodeURIComponent(sessionId)}`
  );
}

/* ===========================
   LOGOUT SESSION
=========================== */

export async function logoutSession(sessionId) {
  return request("/logout", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
    }),
  });
}
