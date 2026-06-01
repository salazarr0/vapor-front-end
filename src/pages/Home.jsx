import { useEffect, useState } from "react";
import api from "../api";
import { CardJogos } from "../components/CardJogos";
import { Header } from "../components/Header";

export function Home() {
  const [jogos, setJogos] = useState([]);
  const [biblioteca, setBiblioteca] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function extrairJogos(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.itens)) return data.itens;
    if (Array.isArray(data.jogos)) return data.jogos;
    if (Array.isArray(data.destaques)) return data.destaques;
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

  async function buscarBiblioteca() {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const { data } = await api.get("/biblioteca/me");

      const ids = data.map((item) => item.jogoId || item.jogo?.id || item.id);

      setBiblioteca(ids);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function buscarJogos() {
      try {
        const respostaDestaques = await api.get("/jogos/destaques");

        let listaJogos = extrairJogos(respostaDestaques.data);

        if (listaJogos.length === 0) {
          const respostaTodos = await api.get("/jogos?limite=100");
          listaJogos = extrairJogos(respostaTodos.data);
        }

        setJogos(listaJogos);
      } catch (err) {
        console.log(err);
        setError("Não foi possível carregar os jogos.");
      } finally {
        setLoading(false);
      }
    }

    buscarJogos();
    buscarBiblioteca();
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

        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && jogos.length === 0 && (
          <p className="text-slate-400">
            Nenhum jogo encontrado no servidor.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {jogos.map((item) => {
            const jogo = item.jogo || item;

            return (
              <CardJogos
                key={jogo.id}
                game={{
                  id: jogo.id,
                  nome: jogo.titulo,
                  foto: jogo.capaUrl,
                  genero: extrairGenero(jogo),
                }}
                estaNaBiblioteca={biblioteca.includes(jogo.id)}
                atualizarBiblioteca={buscarBiblioteca}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}