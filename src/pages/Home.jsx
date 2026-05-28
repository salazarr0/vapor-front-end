import { useEffect, useState } from "react";
import api from "../api";
import { CardJogos } from "../components/CardJogos";
import { Header } from "../components/Header";

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
        console.log(err);
        setError("Não foi possível carregar os jogos.");
      } finally {
        setLoading(false);
      }
    }

    buscarJogos();
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <Header />

      <main className="pt-[120px] px-8">
        <h2 className="text-3xl font-light mb-10">
          Jogos Disponíveis ({jogos.length})
        </h2>

        {loading && (
          <p className="text-slate-400">
            Carregando catálogo de jogos...
          </p>
        )}

        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && jogos.length === 0 && (
          <p>Nenhum jogo encontrado no servidor.</p>
        )}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
          "
        >
          {jogos.map((jogo) => (
            <CardJogos
              key={jogo.id}
              game={{
                id: jogo.id,
                nome: jogo.titulo,
                foto: jogo.capaUrl,
                genero: jogo.genero,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}