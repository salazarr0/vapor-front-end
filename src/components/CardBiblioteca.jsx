import { Link } from "react-router-dom";
import logo from "../assets/SuinoPrime.png";

export function CardBiblioteca({ game, onRemover }) {
  const imagemPadrao = logo;

  const imagemValida =
    game.foto &&
    !game.foto.includes("example.com") &&
    !game.foto.includes("chatgpt.com");

  return (
    <div className="group overflow-hidden rounded-3xl bg-[#08111f]/95 border border-cyan-400/10 shadow-[0_0_25px_rgba(56,189,248,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40">
      <div className="relative h-[260px] bg-[#020817] overflow-hidden">
        <img
          src={imagemValida ? game.foto : imagemPadrao}
          alt={game.nome}
          onError={(e) => {
            e.currentTarget.src = imagemPadrao;
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            onClick={() => onRemover(game.id)}
            className="w-full rounded-2xl border border-red-400/30 bg-red-500/10 py-3 text-red-300 font-semibold transition-all hover:bg-red-500/20 hover:text-red-200"
          >
            Remover da biblioteca
          </button>
        </div>
      </div>
    </div>
  );
}