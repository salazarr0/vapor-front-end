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

  function tratarJogo(item) {
    const jogo = item.jogo || item;

    return {
      id: jogo.id,
      nome: jogo.titulo,
      foto: jogo.capaUrl,
      genero:
        jogo.genero?.nome ||
        jogo.genero ||
        jogo.generos?.map((genero) => genero.nome).join(", ") ||
        jogo.categorias?.map((categoria) => categoria.nome).join(", ") ||
        "Sem gênero",
    };
  }

  async function buscarBiblioteca() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const { data } = await api.get("/biblioteca/me");

      console.log("BIBLIOTECA:", data);

      const lista = extrairJogos(data).map(tratarJogo);

      setJogos(lista);
    } catch (err) {
      console.log("ERRO COMPLETO:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DADOS:", err.response?.data);

      setError("Não foi possível carregar sua biblioteca.");
    } finally {
      setLoading(false);
    }
  }

  async function removerDaBiblioteca(id) {
    try {
      const resposta = await api.delete(`/biblioteca/${id}`);

      console.log("REMOVIDO:", resposta.data);

      setJogos((jogosAtuais) =>
        jogosAtuais.filter((jogo) => jogo.id !== id)
      );
    } catch (err) {
      console.log("ERRO AO REMOVER:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DADOS:", err.response?.data);

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