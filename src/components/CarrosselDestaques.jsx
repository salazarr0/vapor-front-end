import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/SuinoPrime.png";

export function CarrosselDestaques({ jogos }) {
  const [indexAtual, setIndexAtual] = useState(0);

  const jogosDestaque = jogos.slice(0, 5);

  useEffect(() => {
    if (jogosDestaque.length === 0) return;

    const intervalo = setInterval(() => {
      setIndexAtual((index) =>
        index === jogosDestaque.length - 1 ? 0 : index + 1
      );
    }, 5000);

    return () => clearInterval(intervalo);
  }, [jogosDestaque.length]);

  if (jogosDestaque.length === 0) return null;

  const jogo = jogosDestaque[indexAtual];

  const imagemValida =
    jogo.foto &&
    !jogo.foto.includes("example.com") &&
    !jogo.foto.includes("chatgpt.com");

  function proximoSlide() {
    setIndexAtual((index) =>
      index === jogosDestaque.length - 1 ? 0 : index + 1
    );
  }

  function slideAnterior() {
    setIndexAtual((index) =>
      index === 0 ? jogosDestaque.length - 1 : index - 1
    );
  }

  return (
    <section className="mb-10">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-cyan-400/10
          bg-[#08111f]
          shadow-[0_0_35px_rgba(56,189,248,0.12)]
        "
      >
        <div className="relative h-[420px]">
          <img
            src={imagemValida ? jogo.foto : logo}
            alt={jogo.nome}
            onError={(e) => {
              e.currentTarget.src = logo;
            }}
            className="
              w-full
              h-full
              object-cover
              opacity-60
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#020817]
              via-[#020817]/85
              to-[#020817]/20
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#020817]/80
              via-transparent
              to-transparent
            "
          />

          <div
            className="
              absolute
              left-12
              top-1/2
              -translate-y-1/2
              max-w-[700px]
            "
          >
            <span
              className="
                inline-block
                mb-5
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/10
                px-5
                py-2
                text-cyan-300
                text-sm
              "
            >
              Recomendado
            </span>

            <h2
              className="
                text-6xl
                font-bold
                text-white
                mb-5
              "
            >
              {jogo.nome}
            </h2>

            <p
              className="
                text-slate-300
                text-xl
                leading-relaxed
                mb-8
                line-clamp-3
              "
            >
              {jogo.descricao ||
                "Um dos jogos mais recomendados da KeySuina."}
            </p>

            <div className="flex items-center gap-6">
              <Link
                to={`/game/${jogo.id}`}
                className="
                  rounded-2xl
                  bg-[#69c6f4]
                  px-8
                  py-4
                  text-[#08111f]
                  text-lg
                  font-semibold
                  transition-all
                  hover:brightness-110
                  hover:shadow-[0_0_20px_rgba(105,198,244,0.45)]
                "
              >
                Ver detalhes
              </Link>

              <span className="text-slate-400 text-lg">
                {jogo.genero || "Sem gênero"}
              </span>
            </div>
          </div>

          <button
            onClick={slideAnterior}
            className="
              absolute
              left-8
              top-1/2
              -translate-y-1/2
              h-14
              w-14
              rounded-full
              bg-[#020817]/80
              border
              border-cyan-400/20
              text-white
              text-3xl
              transition-all
              hover:bg-cyan-400/10
              hover:scale-110
            "
          >
            ‹
          </button>

          <button
            onClick={proximoSlide}
            className="
              absolute
              right-8
              top-1/2
              -translate-y-1/2
              h-14
              w-14
              rounded-full
              bg-[#020817]/80
              border
              border-cyan-400/20
              text-white
              text-3xl
              transition-all
              hover:bg-cyan-400/10
              hover:scale-110
            "
          >
            ›
          </button>

          <div
            className="
              absolute
              bottom-8
              right-10
              flex
              gap-3
            "
          >
            {jogosDestaque.map((_, index) => (
              <button
                key={index}
                onClick={() => setIndexAtual(index)}
                className={`
                  h-3
                  rounded-full
                  transition-all
                  ${
                    indexAtual === index
                      ? "w-10 bg-[#69c6f4]"
                      : "w-3 bg-slate-500"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}