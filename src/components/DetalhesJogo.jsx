import logo from "../assets/SuinoPrime.png";

export function DetalhesJogo({
  jogo,
  reviews,
  mediaNotas,
  percentRecomenda,
  naWishlist,
  alternarWishlist,
}) {
  const imagemValida =
    jogo?.capaUrl &&
    !jogo.capaUrl.includes("example.com") &&
    !jogo.capaUrl.includes("chatgpt.com");

  return (
    <div className="flex flex-col lg:flex-row gap-10 mb-16">
      <div className="w-full lg:w-[320px] shrink-0">
        <div className="overflow-hidden rounded-3xl border border-cyan-400/10 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
          <img
            src={imagemValida ? jogo.capaUrl : logo}
            alt={jogo.titulo}
            onError={(e) => {
              e.currentTarget.src = logo;
            }}
            className="w-full h-[380px] object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-5">
        <div>
          <h1 className="text-5xl font-light mb-2">
            {jogo.titulo}
          </h1>

          <p className="text-cyan-300 text-lg">
            {jogo.genero?.nome ||
              jogo.generos?.map((g) => g.nome).join(", ") ||
              jogo.genero ||
              "Sem gênero"}
          </p>
        </div>

        {jogo.descricao && (
          <p className="text-slate-400 leading-relaxed max-w-[600px]">
            {jogo.descricao}
          </p>
        )}

        {jogo.preco !== undefined && (
          <p className="text-3xl font-semibold text-cyan-300">
            R$ {Number(jogo.preco).toFixed(2).replace(".", ",")}
          </p>
        )}

        <button
          onClick={alternarWishlist}
          className="
            w-fit
            rounded-2xl
            border
            border-cyan-400/20
            bg-[#0b1729]
            px-8
            py-4
            text-cyan-300
            font-semibold
            transition-all
            hover:border-cyan-300
            hover:bg-cyan-400/10
          "
        >
          {naWishlist
            ? "Remover da Wishlist"
            : "Adicionar à Wishlist"}
        </button>

        {reviews.length > 0 && (
          <div className="flex flex-wrap items-center gap-6">
            <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 text-center">
              <p className="text-yellow-400 text-3xl font-semibold">
                ★ {mediaNotas}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Nota média
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 text-center">
              <p className="text-green-400 text-3xl font-semibold">
                {percentRecomenda}%
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Recomendam
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 text-center">
              <p className="text-cyan-300 text-3xl font-semibold">
                {reviews.length}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Reviews
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

