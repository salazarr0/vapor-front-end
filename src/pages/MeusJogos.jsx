import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api";
import { Header } from "../components/Header";
import { ModalJogo } from "../components/ModalJogo";
import logo from "../assets/SuinoPrime.png";

export function MeusJogos() {
  const [jogos, setJogos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  function extrairJogos(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.itens)) return data.itens;
    if (Array.isArray(data.jogos)) return data.jogos;
    return [];
  }

  function extrairGeneros(jogo) {
    if (Array.isArray(jogo.generos) && jogo.generos.length > 0) {
      return jogo.generos.map((genero) => genero.nome || genero).join(", ");
    }

    if (Array.isArray(jogo.categorias) && jogo.categorias.length > 0) {
      return jogo.categorias.map((categoria) => categoria.nome || categoria).join(", ");
    }

    if (jogo.genero?.nome) return jogo.genero.nome;
    if (jogo.genero) return jogo.genero;

    return "Sem gênero";
  }

  async function buscarJogos() {
    try {
      setLoading(true);

      const { data } = await api.get("/jogos?limite=100");

      const lista = extrairJogos(data);

      const meusJogos = lista.filter(
        (jogo) => jogo.autorId === usuario?.id
      );

      setJogos(meusJogos);
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível carregar seus jogos.");
    } finally {
      setLoading(false);
    }
  }

  async function criarJogo(novoJogo) {
    try {
      await api.post("/jogos", novoJogo);

      toast.success("Jogo criado com sucesso!");

      setModalAberto(false);
      buscarJogos();
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          err.response?.data?.erro ||
          "Não foi possível criar o jogo."
      );
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <Header />

      <main className="pt-[120px] px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-light mb-2">
              Meus Jogos
            </h1>

            <p className="text-slate-400">
              Cadastre novos jogos na loja e visualize os jogos que você adicionou.
            </p>
          </div>

          <button
            onClick={() => setModalAberto(true)}
            className="
              rounded-2xl bg-[#69c6f4] px-6 py-4
              text-[#08111f] font-semibold transition-all
              hover:brightness-110 hover:shadow-[0_0_20px_rgba(105,198,244,0.35)]
            "
          >
            + Criar novo jogo
          </button>
        </div>

        <section
          className="
            rounded-3xl border border-cyan-400/10
            bg-[#08111f]/95 overflow-hidden
            shadow-[0_0_25px_rgba(56,189,248,0.08)]
          "
        >
          <div
            className="
              grid grid-cols-[120px_1fr_1fr_1fr_1fr]
              px-6 py-5 border-b border-cyan-400/10
              text-slate-300 font-semibold
            "
          >
            <span>Capa</span>
            <span>Título</span>
            <span>Desenvolvedora</span>
            <span>Gêneros</span>
            <span>Lançamento</span>
          </div>

          {loading && (
            <p className="p-6 text-slate-400">
              Carregando seus jogos...
            </p>
          )}

          {!loading && jogos.length === 0 && (
            <p className="p-6 text-slate-400">
              Você ainda não cadastrou nenhum jogo.
            </p>
          )}

          {!loading &&
            jogos.map((jogo) => (
              <div
                key={jogo.id}
                className="
                  grid grid-cols-[120px_1fr_1fr_1fr_1fr]
                  items-center px-6 py-5 border-b border-cyan-400/10
                  hover:bg-cyan-400/5 transition-all
                "
              >
                <img
                  src={
                    jogo.capaUrl &&
                    !jogo.capaUrl.includes("example.com") &&
                    !jogo.capaUrl.includes("chatgpt.com")
                      ? jogo.capaUrl
                      : logo
                  }
                  alt={jogo.titulo}
                  onError={(e) => {
                    e.currentTarget.src = logo;
                  }}
                  className="
                    h-24 w-20 rounded-xl object-cover bg-[#020817]
                  "
                />

                <span className="text-white">
                  {jogo.titulo}
                </span>

                <span className="text-slate-400">
                  {jogo.desenvolvedora || "Não informada"}
                </span>

                <span className="text-slate-400">
                  {extrairGeneros(jogo)}
                </span>

                <span className="text-slate-400">
                  {jogo.lancamento
                    ? new Date(jogo.lancamento).toLocaleDateString("pt-BR")
                    : "Sem data"}
                </span>
              </div>
            ))}
        </section>
      </main>

      {modalAberto && (
        <ModalJogo
          onClose={() => setModalAberto(false)}
          onSubmit={criarJogo}
        />
      )}
    </div>
  );
}
