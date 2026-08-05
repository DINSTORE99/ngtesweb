import { useState } from "react";
import {
  startPairing,
  getPairing,
} from "../api";

export default function Pairing({ setPage }) {

  const [number, setNumber] = useState("");

  const [loading, setLoading] = useState(false);

  const [pairCode, setPairCode] = useState("");

  const [sessionId, setSessionId] = useState("");

  const [copied, setCopied] = useState(false);

  const normalizeNumber = (num) => {

    let value = num.replace(/\D/g, "");

    if (value.startsWith("0")) {
      value = "62" + value.slice(1);
    }

    if (!value.startsWith("62")) {
      value = "62" + value;
    }

    return value;

  };

  const createPairing = async () => {

    if (!number) {
      return alert("Masukkan nomor WhatsApp");
    }

    try {

      setLoading(true);

      setPairCode("");

      const data = await startPairing(
        normalizeNumber(number)
      );

      if (!data.success) {
        return alert(
          data.message || "Pairing gagal."
        );
      }

      setSessionId(data.sessionId);

      if (data.pairingCode) {

        setPairCode(data.pairingCode);

      } else {

        let retry = 0;

        const interval = setInterval(async () => {

          retry++;

          const result = await getPairing(
            data.sessionId
          );

          if (result.code) {

            setPairCode(result.code);

            clearInterval(interval);

          }

          if (retry >= 30) {

            clearInterval(interval);

            alert("Pairing timeout");

          }

        }, 2000);

      }

    } catch {

      alert("Server Error");

    } finally {

      setLoading(false);

    }

  };

  const copyCode = async () => {

    if (!pairCode) return;

    await navigator.clipboard.writeText(pairCode);

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  };

  return (

    <div className="page">

      <header className="header">

        <div>

          <small>DIN BOT</small>

          <h1>Hubungkan WhatsApp</h1>

        </div>

        <button
          className="hero-button"
          onClick={() => setPage("dashboard")}
        >
          ← Dashboard
        </button>

      </header>

      <div className="pairing-grid">

        {/* INPUT */}

        <div className="glass-card">

          <small>
            LANGKAH 1
          </small>

          <h2>
            Nomor WhatsApp
          </h2>

          <p>

            Masukkan nomor yang ingin
            dihubungkan.

          </p>

          <div className="phone-box">

            <span>
              +62
            </span>

            <input
              type="tel"
              placeholder="81234567890"
              value={number.replace(/^62/, "")}
              onChange={(e) =>
                setNumber(
                  "62" +
                  e.target.value.replace(/\D/g, "")
                )
              }
            />

          </div>

          <button
            className="hero-button full"
            disabled={loading}
            onClick={createPairing}
          >
            {loading
              ? "Memproses..."
              : "Hubungkan WhatsApp"}
          </button>

        </div>

        {/* HASIL */}

        <div className="glass-card">

          <small>
            LANGKAH 2
          </small>

          <h2>
            Pairing Code
          </h2>

          {!pairCode ? (

            <div className="empty-area">

              <div className="empty-icon">
                📱
              </div>

              <p>

                Pairing Code
                akan muncul di sini.

              </p>

            </div>

          ) : (

            <div className="pair-result">

              <div className="success-icon">
                ✅
              </div>

              <h1>
                {pairCode}
              </h1>

              <small>

                Session :

                <br />

                {sessionId}

              </small>

              <button
                className="hero-button full"
                onClick={copyCode}
              >
                {copied
                  ? "✓ Berhasil Disalin"
                  : "📋 Salin Pairing Code"}
              </button>

            </div>

          )}

        </div>

      </div>

      <div className="system-card">

        <div className="title-row">

          <div>

            <small>
              PANDUAN
            </small>

            <h2>
              Cara Pairing
            </h2>

          </div>

        </div>

        <div className="system-grid">

          <div className="system-item">
            <strong>1.</strong>
            <span>Masukkan nomor WhatsApp</span>
          </div>

          <div className="system-item">
            <strong>2.</strong>
            <span>Klik Hubungkan</span>
          </div>

          <div className="system-item">
            <strong>3.</strong>
            <span>Salin Pairing Code</span>
          </div>

          <div className="system-item">
            <strong>4.</strong>
            <span>Masukkan ke WhatsApp</span>
          </div>

        </div>

      </div>

    </div>

  );

}
