import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import logo from "../assets/SuinoPrime.png";

export function CardWishlist({ game, onAtualizar }) {
  const imagemValida =
    game.foto &&
    !game.foto.includes("example.com") &&
    !game.foto.includes("chatgpt.com");

  async function adicionarBiblioteca() {
    try {
      await api.post(`/biblioteca/${game.id}`);
      await api.delete(`/wishlist/${game.id}`);

      toast.success("Jogo adicionado à biblioteca!");
      onAtualizar();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.erro ||
          "Não foi possível adicionar à biblioteca."
      );
    }
  }

  async function removerWishlist() {
    try {
      await api.delete(`/wishlist/${game.id}`);

      toast.success("Jogo removido da wishlist!");
      onAtualizar();
    } catch (err) {
      toast.error("Não foi possível remover da wishlist.");
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-[#08111f]/95 border border-cyan-400/10 shadow-[0_0_25px_rgba(56,189,248,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40">
      <div className="relative overflow-hidden">
        <img
          src={imagemValida ? game.foto : logo}
          alt={game.nome}
          onError={(e) => {
            e.currentTarget.src = logo;
          }}
          className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/20 to-transparent"></div>
      </div>

      <div className="p-5">
        <h2 className="text-white text-2xl font-semibold mb-2 line-clamp-1">
          {game.nome}
        </h2>

        <p className="text-slate-400 text-sm mb-5">
          {game.genero || "Sem gênero"}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to={`/game/${game.id}`}
            className="block w-full text-center rounded-2xl bg-[#69c6f4] py-3 text-[#08111f] font-semibold text-lg transition-all hover:brightness-110"
          >
            Ver detalhes
          </Link>

          <button
            onClick={adicionarBiblioteca}
            className="w-full rounded-2xl border border-cyan-400/20 bg-[#0b1729] py-3 text-cyan-300 font-semibold transition-all hover:border-cyan-300 hover:bg-cyan-400/10"
          >
            Adicionar à Biblioteca
          </button>

          <button
            onClick={removerWishlist}
            className="w-full rounded-2xl border border-red-400/30 bg-red-500/10 py-3 text-red-300 font-semibold transition-all hover:bg-red-500/20"
          >
            Remover da Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

