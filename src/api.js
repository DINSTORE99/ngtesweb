// =========================================
// API CONFIG
// =========================================
const API = "";


// =========================================
// GET STATUS
// =========================================

export async function getStatus() {
  try {
    const response = await fetch(`${API}/api/status`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Server Error");
    }

    return await response.json();
  } catch (err) {
    console.error(err);

    return {
      server: "offline",
      botConnected: false,
      sessions: [],
      uptime: {
        hari: 0,
        jam: 0,
        menit: 0,
        detik: 0,
      },
    };
  }
}

// =========================================
// START PAIRING
// =========================================

export async function startPairing(number) {
  const response = await fetch(`${API}/api/pair`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number,
    }),
  });

  return await response.json();
}

// =========================================
// GET PAIRING CODE
// =========================================

export async function getPairing(sessionId) {
  const response = await fetch(
    `${API}/api/pairing/${encodeURIComponent(sessionId)}`,
    {
      cache: "no-store",
    }
  );

  return await response.json();
}

// =========================================
// LOGOUT SESSION
// =========================================

export async function logoutSession(sessionId) {
  const response = await fetch(`${API}/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
    }),
  });

  return await response.json();
}
