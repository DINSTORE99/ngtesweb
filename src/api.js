// src/api.js

const API = "/api";

async function request(url, options = {}) {
  const res = await fetch(`${API}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Request gagal");
  }

  return json;
}

/*
|--------------------------------------------------------------------------
| STATUS
|--------------------------------------------------------------------------
*/

export const getStatus = () =>
  request("/status");

/*
|--------------------------------------------------------------------------
| HEALTH
|--------------------------------------------------------------------------
*/

export const getHealth = () =>
  request("/health");

/*
|--------------------------------------------------------------------------
| SESSIONS
|--------------------------------------------------------------------------
*/

export const getSessions = () =>
  request("/sessions");

/*
|--------------------------------------------------------------------------
| PAIR
|--------------------------------------------------------------------------
*/

export const createPair = (number) =>
  request("/pair", {
    method: "POST",
    body: JSON.stringify({
      number
    })
  });

/*
|--------------------------------------------------------------------------
| GET PAIRING CODE
|--------------------------------------------------------------------------
*/

export const getPairingCode = (sessionId) =>
  request(`/pairing?sessionId=${encodeURIComponent(sessionId)}`);

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

export const logoutSession = (sessionId) =>
  request("/logout", {
    method: "POST",
    body: JSON.stringify({
      sessionId
    })
  });
