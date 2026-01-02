import React, { useState, useEffect } from "react";
import { Shuffle, RotateCcw, Layers } from "lucide-react";

const CardGame = () => {
  // Definizione dei semi e valori
  const semi = [
    { nome: "cuori", simbolo: "♥", colore: "rosso" },
    { nome: "quadri", simbolo: "♦", colore: "rosso" },
    { nome: "fiori", simbolo: "♣", colore: "nero" },
    { nome: "picche", simbolo: "♠", colore: "nero" },
  ];

  const valori = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  // Creazione del mazzo iniziale
  const creaMazzo = () => {
    const nuovoMazzo = [];
    semi.forEach((seme) => {
      valori.forEach((valore) => {
        nuovoMazzo.push({
          id: `${seme.nome}-${valore}`,
          seme: seme.nome,
          simbolo: seme.simbolo,
          valore: valore,
          colore: seme.colore,
        });
      });
    });
    return nuovoMazzo;
  };

  const [mazzo, setMazzo] = useState(creaMazzo());
  const [carteEstratte, setCarteEstratte] = useState([]);
  const [animazione, setAnimazione] = useState(false);
  const [animazioneRitorno, setAnimazioneRitorno] = useState(false);
  const [animazioneMischia, setAnimazioneMischia] = useState(false);

  // Estrai una carta dal mazzo
  const estraiCarta = () => {
    if (mazzo.length > 0) {
      setAnimazione(true);
      setTimeout(() => {
        const nuovoMazzo = [...mazzo];
        const cartaEstratta = nuovoMazzo.shift();
        setMazzo(nuovoMazzo);
        setCarteEstratte([...carteEstratte, cartaEstratta]);
        setAnimazione(false);
      }, 300);
    }
  };

  // Rimetti tutte le carte nel mazzo nell'ordine di estrazione
  const rimettiNelMazzo = () => {
    if (carteEstratte.length > 0) {
      setAnimazioneRitorno(true);
      setTimeout(() => {
        const nuovoMazzo = [...carteEstratte, ...mazzo];
        setMazzo(nuovoMazzo);
        setCarteEstratte([]);
        setAnimazioneRitorno(false);
      }, 500);
    }
  };

  // Mischia il mazzo
  const mischiaMazzo = () => {
    setAnimazioneMischia(true);
    setTimeout(() => {
      const mazzoCompleto = [...mazzo, ...carteEstratte];
      for (let i = mazzoCompleto.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazzoCompleto[i], mazzoCompleto[j]] = [
          mazzoCompleto[j],
          mazzoCompleto[i],
        ];
      }
      setMazzo(mazzoCompleto);
      setCarteEstratte([]);
      setAnimazioneMischia(false);
    }, 600);
  };

  // Componente Carta
  const Carta = ({ carta, indice }) => {
    const getValoreDisplay = (valore) => {
      if (valore === "J") return "Jack";
      if (valore === "Q") return "Regina";
      if (valore === "K") return "Re";
      if (valore === "A") return "Asso";
      return valore;
    };

    return (
      <div
        className={`carta ${animazioneRitorno ? "carta-ritorno" : ""}`}
        style={{
          animationDelay: `${indice * 50}ms`,
          color: carta.colore === "rosso" ? "#dc2626" : "#171717",
        }}
      >
        <div className="carta-header">
          <div className="valore">{carta.valore}</div>
          <div className="simbolo-piccolo">{carta.simbolo}</div>
        </div>
        <div className="carta-centro">
          <div className="simbolo-grande">{carta.simbolo}</div>
        </div>
        <div className="carta-footer">
          <div className="valore">{carta.valore}</div>
          <div className="simbolo-piccolo">{carta.simbolo}</div>
        </div>
      </div>
    );
  };

  // Componente Dorso Carta
  const DorsoCarta = () => (
    <div className="dorso-carta">
      <div className="pattern">
        <div className="pattern-inner">♠ ♥ ♣ ♦</div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .titolo {
          text-align: center;
          color: white;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 2rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .game-board {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .controlli {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .bottone {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .bottone-estrai {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .bottone-estrai:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .bottone-estrai:disabled {
          background: #e5e5e5;
          color: #999;
          cursor: not-allowed;
        }

        .bottone-rimetti {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }

        .bottone-rimetti:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .bottone-rimetti:disabled {
          background: #e5e5e5;
          color: #999;
          cursor: not-allowed;
        }

        .bottone-mischia {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        .bottone-mischia:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .bottone-mischia:disabled {
          background: #e5e5e5;
          color: #999;
          cursor: not-allowed;
        }

        .contatori {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .contatore {
          background: #f3f4f6;
          padding: 1rem 2rem;
          border-radius: 10px;
          text-align: center;
        }

        .contatore-label {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .contatore-valore {
          font-size: 2rem;
          font-weight: bold;
          color: #1f2937;
        }

        .mazzo-area {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
          position: relative;
          min-height: 200px;
        }

        .mazzo-pile {
          position: relative;
          width: 120px;
          height: 168px;
        }

        .dorso-carta {
          position: absolute;
          width: 120px;
          height: 168px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: 2px solid white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .pattern {
          width: 90%;
          height: 90%;
          border: 2px solid white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          );
        }

        .pattern-inner {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 0.5rem;
        }

        .mazzo-vuoto {
          width: 120px;
          height: 168px;
          border: 3px dashed #d1d5db;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 0.875rem;
          text-align: center;
          padding: 1rem;
        }

        .carte-estratte {
          padding: 2rem;
          background: #f9fafb;
          border-radius: 15px;
          min-height: 200px;
        }

        .carte-estratte-titolo {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
          text-align: center;
        }

        .carte-griglia {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 1rem;
          justify-items: center;
        }

        .carta {
          width: 120px;
          height: 168px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out;
          transition: transform 0.2s ease;
        }

        .carta:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }

        .carta-header,
        .carta-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .carta-footer {
          transform: rotate(180deg);
        }

        .valore {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .simbolo-piccolo {
          font-size: 1.25rem;
        }

        .carta-centro {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
        }

        .simbolo-grande {
          font-size: 3rem;
        }

        .carta-ritorno {
          animation: slideOut 0.5s ease-out forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(50px);
          }
        }

        .animazione-estrai {
          animation: drawCard 0.3s ease-out;
        }

        @keyframes drawCard {
          0% {
            transform: translateX(0) rotateY(0);
          }
          50% {
            transform: translateX(100px) rotateY(90deg);
          }
          100% {
            transform: translateX(200px) rotateY(0);
          }
        }

        .animazione-mischia {
          animation: shuffle 0.6s ease-in-out;
        }

        @keyframes shuffle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
      `}</style>

      <h1 className="titolo">🎴 Gioco di Carte Italiano 🎴</h1>

      <div className="game-board">
        <div className="controlli">
          <button
            className={`bottone bottone-estrai ${
              animazione ? "animazione-estrai" : ""
            }`}
            onClick={estraiCarta}
            disabled={mazzo.length === 0}
          >
            <Layers size={20} />
            Estrai Carta
          </button>

          <button
            className="bottone bottone-rimetti"
            onClick={rimettiNelMazzo}
            disabled={carteEstratte.length === 0}
          >
            <RotateCcw size={20} />
            Rimetti nel Mazzo
          </button>

          <button
            className={`bottone bottone-mischia ${
              animazioneMischia ? "animazione-mischia" : ""
            }`}
            onClick={mischiaMazzo}
            disabled={mazzo.length === 0 && carteEstratte.length === 0}
          >
            <Shuffle size={20} />
            Mischia Mazzo
          </button>
        </div>

        <div className="contatori">
          <div className="contatore">
            <div className="contatore-label">Carte nel Mazzo</div>
            <div className="contatore-valore">{mazzo.length}</div>
          </div>
          <div className="contatore">
            <div className="contatore-label">Carte Estratte</div>
            <div className="contatore-valore">{carteEstratte.length}</div>
          </div>
        </div>

        <div className="mazzo-area">
          <div className="mazzo-pile">
            {mazzo.length > 0 ? (
              <>
                {mazzo.length > 2 && (
                  <div style={{ top: "-4px", left: "-4px" }}>
                    <DorsoCarta />
                  </div>
                )}
                {mazzo.length > 1 && (
                  <div style={{ top: "-2px", left: "-2px" }}>
                    <DorsoCarta />
                  </div>
                )}
                <div style={{ top: "0", left: "0" }}>
                  <DorsoCarta />
                </div>
              </>
            ) : (
              <div className="mazzo-vuoto">Il mazzo è vuoto!</div>
            )}
          </div>
        </div>

        <div className="carte-estratte">
          <h2 className="carte-estratte-titolo">
            Carte Estratte ({carteEstratte.length})
          </h2>
          <div className="carte-griglia">
            {carteEstratte.map((carta, indice) => (
              <Carta key={carta.id} carta={carta} indice={indice} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGame;
