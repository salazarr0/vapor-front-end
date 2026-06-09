export function CardConquista({ conquista, onEditar, onRemover }) {
  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 p-5 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
      <h3 className="text-white text-xl font-semibold mb-2">
        {conquista.titulo || conquista.nome}
      </h3>

      <p className="text-slate-400 mb-5">
        {conquista.descricao || "Sem descrição"}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => onEditar(conquista)}
          className="text-cyan-300 hover:text-cyan-100 transition-all"
        >
          Editar
        </button>

        <button
          onClick={() => onRemover(conquista.id)}
          className="text-red-300 hover:text-red-200 transition-all"
        >
          Remover
        </button>
      </div>
    </div>
  );
}