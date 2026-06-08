export function FormularioReview({
  nota,
  setNota,
  texto,
  setTexto,
  recomenda,
  setRecomenda,
  erroCriar,
  enviando,
  criarReview,
}) {
  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 p-6 mb-10 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
      <h3 className="text-white text-xl font-semibold mb-6">
        Escrever uma review
      </h3>

      <form onSubmit={criarReview} className="flex flex-col gap-5">
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <label className="block text-slate-300 mb-2">
              Nota (0–10)
            </label>

            <input
              type="number"
              min={0}
              max={10}
              value={nota}
              onChange={(e) => setNota(Number(e.target.value))}
              required
              className="w-28 h-[52px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 text-white outline-none transition-all focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
            />
          </div>

          <label className="flex items-center gap-3 text-slate-300 cursor-pointer mt-5">
            <input
              type="checkbox"
              checked={recomenda}
              onChange={(e) => setRecomenda(e.target.checked)}
              className="h-4 w-4 accent-cyan-300"
            />
            <span>Recomendar este jogo</span>
          </label>
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
            Seu comentário
          </label>

          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
            rows={4}
            maxLength={2000}
            placeholder="Compartilhe sua experiência com este jogo..."
            className="w-full rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 py-3 text-white placeholder:text-slate-500 outline-none resize-none transition-all focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
          />

          <p className="text-slate-500 text-sm mt-1 text-right">
            {texto.length}/2000
          </p>
        </div>

        {erroCriar && (
          <p className="text-red-400 text-sm">
            {erroCriar}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="self-start h-[52px] rounded-2xl bg-[#69c6f4] px-8 text-[#08111f] font-semibold text-lg transition-all hover:brightness-110 hover:-translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {enviando ? "Enviando..." : "Publicar Review"}
        </button>
      </form>
    </div>
  );
}
