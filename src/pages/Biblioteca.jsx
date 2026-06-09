import { useEffect, useState } from "react";
import api from "../api";
import { Header } from "../components/Header";
import { CardBiblioteca } from "../components/CardBiblioteca";

export function Biblioteca() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function extrairJogos(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.itens)) return data.itens;
    if (Array.isArray(data.jogos)) return data.jogos;
    if (Array.isArray(data.biblioteca)) return data.biblioteca;
    return [];
  }

  function extrairGenero(jogo) {
    return (
      jogo.genero?.nome ||
      jogo.genero ||
      jogo.generos?.map((genero) => genero.nome).join(", ") ||
      jogo.categorias?.map((categoria) => categoria.nome).join(", ") ||
      "Sem gênero"
    );
  }

  async function buscarDetalhesDoJogo(item) {
    const jogoBase = item.jogo || item;
    const jogoId = jogoBase.id || item.jogoId;

    try {
      const { data } = await api.get(`/jogos/${jogoId}`);

      return {
        id: data.id,
        nome: data.titulo,
        foto: data.capaUrl,
        genero: extrairGenero(data),
        generos: data.generos || [],
      };
    } catch (err) {
      console.log("Erro ao buscar detalhes do jogo:", err);

      return {
        id: jogoId,
        nome: jogoBase.titulo || "Jogo sem título",
        foto: jogoBase.capaUrl,
        genero: extrairGenero(jogoBase),
        generos: jogoBase.generos || [],
      };
    }
  }

  async function buscarBiblioteca() {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/biblioteca/me");

      const itensBiblioteca = extrairJogos(data);

      const lista = await Promise.all(
        itensBiblioteca.map((item) => buscarDetalhesDoJogo(item))
      );

      setJogos(lista);
    } catch (err) {
      console.log(err);
      setError("Não foi possível carregar sua biblioteca.");
    } finally {
      setLoading(false);
    }
  }

  async function removerDaBiblioteca(id) {
    try {
      await api.delete(`/biblioteca/${id}`);

      setJogos((jogosAtuais) =>
        jogosAtuais.filter((jogo) => jogo.id !== id)
      );
    } catch (err) {
      console.log(err);
      alert("Não foi possível remover o jogo da biblioteca.");
    }
  }

  useEffect(() => {
    buscarBiblioteca();
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <Header />

      <main className="pt-[120px] px-8">
        <h1 className="text-4xl font-light mb-2">
          Minha Biblioteca
        </h1>

        <p className="text-slate-400 mb-10">
          {jogos.length} jogos
        </p>

        {loading && (
          <p className="text-slate-400">
            Carregando sua biblioteca...
          </p>
        )}

        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && jogos.length === 0 && (
          <p className="text-slate-400">
            Você ainda não possui jogos na biblioteca.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jogos.map((jogo) => (
            <CardBiblioteca
              key={jogo.id}
              game={jogo}
              onRemover={removerDaBiblioteca}
            />
          ))}
        </div>
      </main>
    </div>
  );
}