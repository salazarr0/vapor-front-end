import { Link } from "react-router-dom";
import api from "../api";
import logo from "../assets/SuinoPrime.png";

export function CardJogos({ game }) {
  const imagemPadrao = logo;

  const imagemValida =
    game.foto &&
    !game.foto.includes("example.com") &&
    !game.foto.includes("chatgpt.com");

  async function adicionarBiblioteca() {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);
      console.log("ID DO JOGO:", game.id);

      if (!token) {
        alert("Você precisa estar logado.");
        return;
      }

      const resposta = await api.post(`/biblioteca/${game.id}`);

      console.log("RESPOSTA BIBLIOTECA:", resposta.data);

      alert("Jogo adicionado à biblioteca!");
    } catch (err) {
      console.log("ERRO COMPLETO:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DADOS:", err.response?.data);

      alert(
        err.response?.data?.message ||
          err.response?.data?.erro ||
          "Não foi possível adicionar o jogo."
      );
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-[#08111f]/95 border border-cyan-400/10 backdrop-blur-xl shadow-[0_0_25px_rgba(56,189,248,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_0_35px_rgba(56,189,248,0.18)]">
      <div className="relative overflow-hidden">
        <img
          src={imagemValida ? game.foto : imagemPadrao}
          alt={game.nome}
          onError={(e) => {
            e.currentTarget.src = imagemPadrao;
          }}
          className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/20 to-transparent"></div>
      </div>

      <div className="p-5">
        <div className="mb-5">
          <h2 className="text-white text-2xl font-semibold mb-2 line-clamp-1">
            {game.nome}
          </h2>

          <p className="text-slate-400 text-sm tracking-wide">
            {game.genero || "Sem gênero"}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to={`/game/${game.id}`}
            className="block w-full text-center rounded-2xl bg-[#69c6f4] py-3 text-[#08111f] font-semibold text-lg transition-all duration-300 hover:brightness-110"
          >
            Ver Detalhes
          </Link>

          <button
            onClick={adicionarBiblioteca}
            className="w-full rounded-2xl border border-cyan-400/20 bg-[#0b1729] py-3 text-cyan-300 font-semibold transition-all hover:border-cyan-300 hover:bg-cyan-400/10"
          >
            Adicionar à Biblioteca
          </button>
        </div>
      </div>
    </div>
  );
}