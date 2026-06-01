export function FiltroLoja({
  busca,
  setBusca,
  generos,
  generosSelecionados,
  alternarGenero,
}) {
  return (
    <aside
      className="
        w-full
        lg:w-[300px]
        h-fit
        self-start
        rounded-3xl
        border
        border-cyan-400/10
        bg-[#08111f]/95
        p-6
        shadow-[0_0_25px_rgba(56,189,248,0.08)]
      "
    >
      <h2 className="text-white text-2xl font-light mb-6">
        Filtros
      </h2>

      <div className="mb-8">
        <label className="block text-slate-300 mb-3">
          Buscar jogo
        </label>

        <input
          type="text"
          placeholder="Nome do jogo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="
            w-full h-[52px] rounded-2xl border border-cyan-400/20
            bg-[#0b1729] px-5 text-white placeholder:text-slate-500
            outline-none transition-all
            focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10
          "
        />
      </div>

      <div>
        <h3 className="text-slate-300 mb-4">
          Gêneros
        </h3>

        <div className="flex flex-col gap-4">
          {generos.map((genero) => (
            <label
              key={genero}
              className="flex items-center gap-3 text-slate-300 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={generosSelecionados.includes(genero)}
                onChange={() => alternarGenero(genero)}
                className="h-4 w-4 accent-cyan-300"
              />

              <span>{genero}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}