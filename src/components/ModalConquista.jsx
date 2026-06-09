import { useState } from "react";

export function ModalConquista({ onClose, onSubmit, conquistaEditando }) {
  const [titulo, setTitulo] = useState(
    conquistaEditando?.titulo || conquistaEditando?.nome || ""
  );
  const [descricao, setDescricao] = useState(conquistaEditando?.descricao || "");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      titulo,
      nome: titulo,
      descricao,
    });
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#020817]/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-[560px] rounded-3xl border border-cyan-400/10 bg-[#08111f] shadow-2xl">
        <div className="flex items-center justify-between px-8 py-6 border-b border-cyan-400/10">
          <h2 className="text-3xl font-light text-white">
            {conquistaEditando ? "Editar conquista" : "Nova conquista"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 text-3xl hover:text-white"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <div>
            <label className="block text-slate-300 mb-3">Título</label>

            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="w-full h-[56px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 text-white outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-3">Descrição</label>

            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              rows={4}
              className="w-full rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 py-3 text-white outline-none resize-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
            />
          </div>

          <div className="flex justify-end gap-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl px-8 py-4 text-slate-300 font-semibold hover:text-white"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-[#69c6f4] px-10 py-4 text-[#08111f] font-semibold hover:brightness-110"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}