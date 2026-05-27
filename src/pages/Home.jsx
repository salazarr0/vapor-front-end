import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api";

export function Home() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function buscarJogos() {
      try {
        const { data } = await api.get("/jogos?limite=100");
        
        if (data && data.itens) {
          setJogos(data.itens);
        } else if (Array.isArray(data)) {
          setJogos(data);
        }
      } catch (err) {
        setError("Não foi possível carregar os jogos.");
      } finally {
        setLoading(false);
      }
    }

    buscarJogos();
  }, []);

  return (
    <div>
      <header>
        <h1>🎮 Vaporzão - Biblioteca de Jogos</h1>
        <nav>
          <Link to="/login">Sair / Login</Link>
        </nav>
      </header>

      <hr />

      <main>
        <h2>Jogos Disponíveis ({jogos.length})</h2>

        {loading && <p>Carregando catálogo de jogos...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && jogos.length === 0 && (
          <p>Nenhum jogo encontrado no servidor.</p>
        )}

        <ul>
          {jogos.map((jogo) => (
            <li key={jogo.id}>
              <strong>{jogo.titulo}</strong>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}