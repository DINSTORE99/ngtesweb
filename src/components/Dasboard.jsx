import { useEffect, useState } from "react";
import { getStatus } from "../api";

export default function Dashboard({ setPage }) {

  const [loading, setLoading] = useState(false);

  const [serverOnline, setServerOnline] = useState(false);

  const [botConnected, setBotConnected] = useState(false);

  const [sessions, setSessions] = useState([]);

  const [ping, setPing] = useState(0);

  const [lastUpdate, setLastUpdate] = useState("-");

  const loadStatus = async () => {

    try {

      setLoading(true);

      const start = performance.now();

      const data = await getStatus();

      const end = performance.now();

      setPing(Math.round(end - start));

      setServerOnline(data.server === "online");

      setBotConnected(data.botConnected === true);

      setSessions(
        Array.isArray(data.sessions)
          ? data.sessions
          : []
      );

      setLastUpdate(
        new Date().toLocaleTimeString("id-ID")
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadStatus();

    const interval = setInterval(loadStatus, 5000);

    return () => clearInterval(interval);

  }, []);
    return (

    <div className="page">

      <header className="header">

        <div className="logo-area">

          <img
            src="/logo.png"
            className="logo"
            alt="DIN BOT"
          />

          <div>

            <h2>DIN BOT</h2>

            <small>
              Dashboard
            </small>

          </div>

        </div>

        <div className="online-box">

          <span
            className={
              serverOnline
                ? "dot online"
                : "dot offline"
            }
          />

          {serverOnline
            ? "Online"
            : "Offline"}

        </div>

      </header>
            <section className="welcome">

        <small>
          Selamat datang!
        </small>

        <h1>
          WhatsApp Bot
        </h1>

        <p>

          Kelola koneksi WhatsApp,
          Pairing Code,
          Session,
          dan Monitoring Server
          dari satu dashboard.

        </p>

      </section>
            <div className="action-grid">

        <button
          className="action-card"
          onClick={loadStatus}
        >

          <span>🔄</span>

          <div>

            <h3>
              {loading
                ? "Loading..."
                : "Refresh"}
            </h3>

            <small>
              Perbarui data
            </small>

          </div>

        </button>

        <button
          className="action-card"
          onClick={() => setPage("monitor")}
        >

          <span>📊</span>

          <div>

            <h3>
              Monitoring Server
            </h3>

            <small>
              Lihat status
            </small>

          </div>

        </button>

      </div>

            {/* =========================
          STATUS CARD
      ========================== */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon purple">
            ⚡
          </div>

          <div className="stat-content">

            <span>API SERVER</span>

            <h3>
              {serverOnline
                ? "Online"
                : "Offline"}
            </h3>

            <small
              className={
                serverOnline
                  ? "online"
                  : "offline"
              }
            >
              ● {serverOnline
                ? `${ping} ms`
                : "Tidak Terhubung"}
            </small>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon green">
            💬
          </div>

          <div className="stat-content">

            <span>WHATSAPP</span>

            <h3>
              {botConnected
                ? "Connected"
                : "Waiting"}
            </h3>

            <small
              className={
                botConnected
                  ? "online"
                  : "waiting"
              }
            >
              ● {botConnected
                ? "CONNECTED"
                : "BELUM TERHUBUNG"}
            </small>

          </div>

        </div>

        <div
          className="stat-card clickable"
          onClick={() => setPage("sessions")}
        >

          <div className="stat-icon blue">
            📱
          </div>

          <div className="stat-content">

            <span>SESSIONS</span>

            <h3>
              {sessions.length}
            </h3>

            <small>
              Lihat Semua Session
            </small>

          </div>

        </div>

      </div>

            <section className="hero-card">

        <div className="hero-left">

          <span className="hero-version">
            DIN BOT V2
          </span>

          <h2>
            Hubungkan
            WhatsApp
            dalam
            hitungan detik.
          </h2>

          <p>

            Dashboard modern untuk
            Pairing Code,
            Monitoring Server,
            Session Management,
            dan Status Bot.

          </p>

          <button
            className="hero-button"
            onClick={() => setPage("pairing")}
          >
            Hubungkan WhatsApp →
          </button>

        </div>

        <div className="hero-right">

          <img
            src="/robot.png"
            alt="Robot"
          />

        </div>

      </section>
      <section className="system-card">

        <div className="title-row">

          <div>

            <small>
              SYSTEM
            </small>

            <h2>
              Informasi Sistem
            </h2>

          </div>

          <div className="status-badge">

            <span />

            {serverOnline
              ? "ACTIVE"
              : "OFFLINE"}

          </div>

        </div>

        <div className="system-grid">

          <div className="system-item">

            <span>Website</span>

            <strong>
              DIN BOT
            </strong>

          </div>

          <div className="system-item">

            <span>Version</span>

            <strong>
              V2.0.0
            </strong>

          </div>

          <div className="system-item">

            <span>Platform</span>

            <strong>
              WhatsApp
            </strong>

          </div>

          <div className="system-item">

            <span>Last Update</span>

            <strong>
              {lastUpdate}
            </strong>

          </div>

        </div>

      </section>

    </div>

  );

}
      
