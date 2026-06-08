import { useEffect, useState } from "react";
import api from "../api";
import { Header } from "../components/Header";
import { CardWishlist } from "../components/CardWishlist";

export function Wishlist() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function extrairJogos(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.itens)) return data.itens;
    if (Array.isArray(data.jogos)) return data.jogos;
    if (Array.isArray(data.wishlist)) return data.wishlist;
    return [];
  }

  function extrairGenero(jogo) {
    return (
      jogo.genero?.nome ||
      jogo.genero ||
      jogo.generos?.map((g) => g.nome).join(", ") ||
      "Sem gênero"
    );
  }

  function tratarJogo(item) {
    const jogo = item.jogo || item;

    return {
      id: jogo.id || item.jogoId,
      nome: jogo.titulo,
      foto: jogo.capaUrl,
      genero: extrairGenero(jogo),
    };
  }

  async function buscarWishlist() {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/wishlist/me");

      const lista = extrairJogos(data).map(tratarJogo);
      setJogos(lista);
    } catch (err) {
      console.log(err);
      setError("Não foi possível carregar sua wishlist.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <Header />

      <main className="pt-[120px] px-8">
        <h1 className="text-4xl font-light mb-2">Minha Wishlist</h1>

        <p className="text-slate-400 mb-10">
          Jogos que você deseja comprar futuramente.
        </p>

        {loading && (
          <p className="text-slate-400">Carregando wishlist...</p>
        )}

        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && jogos.length === 0 && (
          <p className="text-slate-400">
            Sua wishlist está vazia.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {jogos.map((jogo) => (
            <CardWishlist
              key={jogo.id}
              game={jogo}
              onAtualizar={buscarWishlist}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
