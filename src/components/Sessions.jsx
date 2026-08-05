import { useEffect, useState } from "react";
import {
  getStatus,
  logoutSession,
} from "../api";

export default function Sessions({ setPage }) {

  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [logoutTarget, setLogoutTarget] = useState(null);

  const [logoutNumber, setLogoutNumber] = useState("");

  const [logoutLoading, setLogoutLoading] = useState(false);

  const [logoutMessage, setLogoutMessage] = useState("");

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {

    try {

      setLoading(true);

      const data = await getStatus();

      setSessions(
        Array.isArray(data.sessions)
          ? data.sessions
          : []
      );

    } finally {

      setLoading(false);

    }

  }

  function normalize(num) {

    let value = String(num || "")
      .replace(/\D/g, "");

    if (value.startsWith("0")) {
      value = "62" + value.slice(1);
    }

    return value;

  }

  function maskNumber(num) {

    const n = normalize(num);

    if (!n) return "-";

    return (
      n.substring(0, 5) +
      "*****" +
      n.substring(n.length - 3)
    );

  }

  function openLogout(session) {

    setLogoutTarget(session);

    setLogoutNumber("");

    setLogoutMessage("");

  }

  function closeLogout() {

    if (logoutLoading) return;

    setLogoutTarget(null);

    setLogoutNumber("");

    setLogoutMessage("");

  }

  async function confirmLogout() {

    const input = normalize(logoutNumber);

    const target = normalize(
      logoutTarget.number ||
      logoutTarget.sessionId
    );

    if (input !== target) {

      setLogoutMessage(
        "Nomor tidak cocok."
      );

      return;

    }

    try {

      setLogoutLoading(true);

      const result =
        await logoutSession(
          logoutTarget.sessionId
        );

      if (!result.success) {

        setLogoutMessage(
          result.message ||
          "Logout gagal."
        );

        return;

      }

      closeLogout();

      loadSessions();

    } catch {

      setLogoutMessage(
        "Server Error"
      );

    } finally {

      setLogoutLoading(false);

    }

  }

  return (

    <div className="page">

      <header className="header">

        <div>

          <small>
            DIN BOT
          </small>

          <h1>
            Daftar Session
          </h1>

        </div>

        <button
          className="hero-button"
          onClick={() =>
            setPage("dashboard")
          }
        >
          ← Dashboard
        </button>

      </header>

      {loading ? (

        <div className="glass-card">

          Memuat Session...

        </div>

      ) : sessions.length === 0 ? (

        <div className="glass-card">

          <div className="empty-area">

            <div className="empty-icon">
              📱
            </div>

            <h2>
              Belum Ada Session
            </h2>

            <p>

              Hubungkan WhatsApp
              terlebih dahulu.

            </p>

          </div>

        </div>

      ) : (

        <div className="session-grid">

          {sessions.map(
            (session, index) => (

              <div
                key={index}
                className="session-card"
              >

                <div className="session-top">

                  <div className="avatar">

                    📱

                  </div>

                  <div>

                    <h3>

                      {session.name ||
                        "WhatsApp"}

                    </h3>

                    <small>

                      {maskNumber(
                        session.number
                      )}

                    </small>

                  </div>

                </div>

                <div className="session-info">

                  <div>

                    <span>Status</span>

                    <strong
                      className={
                        session.connected
                          ? "online"
                          : "offline"
                      }
                    >

                      {session.connected
                        ? "Connected"
                        : "Disconnected"}

                    </strong>

                  </div>

                  <div>

                    <span>
                      Session ID
                    </span>

                    <strong>

                      {session.sessionId}

                    </strong>

                  </div>

                </div>

                <button
                  className="logout-btn"
                  onClick={() =>
                    openLogout(
                      session
                    )
                  }
                >

                  Logout Session

                </button>

              </div>

            )
          )}

        </div>

      )}

      {logoutTarget && (

        <div className="modal-overlay">

          <div className="logout-modal">

            <h2>

              Logout Session

            </h2>

            <p>

              Masukkan nomor
              WhatsApp berikut.

            </p>

            <strong>

              {logoutTarget.number}

            </strong>

            <input
              type="tel"
              placeholder="628xxxxxxxxxx"
              value={logoutNumber}
              onChange={(e) =>
                setLogoutNumber(
                  e.target.value
                )
              }
            />

            {logoutMessage && (

              <small
                className="offline"
              >

                {logoutMessage}

              </small>

            )}

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={closeLogout}
              >

                Batal

              </button>

              <button
                className="logout-btn"
                disabled={
                  logoutLoading
                }
                onClick={
                  confirmLogout
                }
              >

                {logoutLoading
                  ? "Memproses..."
                  : "Logout"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}
