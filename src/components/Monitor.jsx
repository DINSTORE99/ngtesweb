import { useEffect, useState } from "react";
import { getStatus } from "../api";

export default function Monitor({ setPage }) {

  const [loading, setLoading] = useState(false);

  const [serverOnline, setServerOnline] = useState(false);

  const [botConnected, setBotConnected] = useState(false);

  const [sessions, setSessions] = useState([]);

  const [ping, setPing] = useState(0);

  const [lastUpdate, setLastUpdate] = useState("-");

  const [uptime, setUptime] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });

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

      setUptime(
        data.uptime || {
          hari: 0,
          jam: 0,
          menit: 0,
          detik: 0,
        }
      );

      setLastUpdate(
        new Date().toLocaleTimeString("id-ID")
      );

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

        <div>

          <small>DIN BOT</small>

          <h1>Monitoring Server</h1>

        </div>

        <button
          className="hero-button"
          onClick={() => setPage("dashboard")}
        >
          ← Dashboard
        </button>

      </header>

      <section className="hero-card">

        <div className="hero-left">

          <span className="hero-version">
            SERVER STATUS
          </span>

          <h2>
            Monitoring Realtime
          </h2>

          <p>
            Status API, Bot,
            Ping, Session,
            dan Uptime Server.
          </p>

          <button
            className="hero-button"
            onClick={loadStatus}
          >
            {loading
              ? "Loading..."
              : "Refresh"}
          </button>

        </div>

      </section>

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon purple">
            ⚡
          </div>

          <div>

            <span>Ping</span>

            <h3>
              {ping} ms
            </h3>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon green">
            🤖
          </div>

          <div>

            <span>Bot</span>

            <h3>
              {botConnected
                ? "Connected"
                : "Offline"}
            </h3>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon blue">
            📱
          </div>

          <div>

            <span>Sessions</span>

            <h3>
              {sessions.length}
            </h3>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon purple">
            🌐
          </div>

          <div>

            <span>API</span>

            <h3>
              {serverOnline
                ? "Online"
                : "Offline"}
            </h3>

          </div>

        </div>

      </div>

      <section className="system-card">

        <div className="title-row">

          <div>

            <small>UPTIME</small>

            <h2>
              Lama Server Aktif
            </h2>

          </div>

        </div>

        <div className="system-grid">

          <div className="system-item">
            <span>Hari</span>
            <strong>{uptime.hari}</strong>
          </div>

          <div className="system-item">
            <span>Jam</span>
            <strong>{uptime.jam}</strong>
          </div>

          <div className="system-item">
            <span>Menit</span>
            <strong>{uptime.menit}</strong>
          </div>

          <div className="system-item">
            <span>Detik</span>
            <strong>{uptime.detik}</strong>
          </div>

        </div>

      </section>

      <section className="system-card">

        <div className="title-row">

          <div>

            <small>DETAIL</small>

            <h2>
              Informasi Server
            </h2>

          </div>

        </div>

        <div className="system-grid">

          <div className="system-item">
            <span>Server</span>
            <strong>
              {serverOnline
                ? "Online"
                : "Offline"}
            </strong>
          </div>

          <div className="system-item">
            <span>Bot</span>
            <strong>
              {botConnected
                ? "Connected"
                : "Disconnected"}
            </strong>
          </div>

          <div className="system-item">
            <span>Ping</span>
            <strong>{ping} ms</strong>
          </div>

          <div className="system-item">
            <span>Last Update</span>
            <strong>{lastUpdate}</strong>
          </div>

        </div>

      </section>

    </div>

  );

}
