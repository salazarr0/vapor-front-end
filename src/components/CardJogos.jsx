import { Link } from "react-router-dom";

export function CardJogos({ game }) {
  const imagemPadrao =
    "https://placehold.co/600x800/020817/69c6f4?text=KeySuina";

  const imagemValida =
    game.foto &&
    !game.foto.includes("example.com") &&
    !game.foto.includes("chatgpt.com");

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        bg-[#08111f]/95
        border
        border-cyan-400/10
        backdrop-blur-xl
        shadow-[0_0_25px_rgba(56,189,248,0.08)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-cyan-300/40
        hover:shadow-[0_0_35px_rgba(56,189,248,0.18)]
      "
    >
      <div className="relative overflow-hidden">
        <img
          src={imagemValida ? game.foto : imagemPadrao}
          alt={game.nome}
          onError={(e) => {
            e.currentTarget.src = imagemPadrao;
          }}
          className="
            w-full
            h-[260px]
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#020817]
            via-[#020817]/20
            to-transparent
          "
        ></div>
      </div>

      <div className="p-5">
        <div className="mb-5">
          <h2
            className="
              text-white
              text-2xl
              font-semibold
              mb-2
              line-clamp-1
            "
          >
            {game.nome}
          </h2>

          <p
            className="
              text-slate-400
              text-sm
              tracking-wide
            "
          >
            {game.genero || "Ação"}
          </p>
        </div>

        <Link
          to={`/game/${game.id}`}
          className="
            block
            w-full
            text-center
            rounded-2xl
            bg-[#69c6f4]
            py-3
            text-[#08111f]
            font-semibold
            text-lg
            transition-all
            duration-300
            hover:brightness-110
            hover:shadow-[0_0_20px_rgba(105,198,244,0.45)]
          "
        >
          Ver Jogo
        </Link>
      </div>
    </div>
  );
}