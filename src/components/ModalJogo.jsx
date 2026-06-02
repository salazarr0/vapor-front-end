import { useEffect, useState } from "react";
import api from "../api";

export function ModalJogo({ onClose, onSubmit, jogoEditando }) {
  const [titulo, setTitulo] = useState(jogoEditando?.titulo || "");
  const [descricao, setDescricao] = useState(jogoEditando?.descricao || "");
  const [desenvolvedora, setDesenvolvedora] = useState(
    jogoEditando?.desenvolvedora || ""
  );
  const [lancamento, setLancamento] = useState(
    jogoEditando?.lancamento
      ? jogoEditando.lancamento.split("T")[0]
      : ""
  );
  const [capaUrl, setCapaUrl] = useState(jogoEditando?.capaUrl || "");
  const [generos, setGeneros] = useState([]);
  const [generoIds, setGeneroIds] = useState(
    jogoEditando?.generos?.map((g) => g.id) || []
  );

  useEffect(() => {
    async function buscarGeneros() {
      try {
        const { data } = await api.get("/generos");
        setGeneros(Array.isArray(data) ? data : data.itens || []);
      } catch (err) {
        console.log(err);
      }
    }

    buscarGeneros();
  }, []);

  function alternarGenero(id) {
    setGeneroIds((atual) =>
      atual.includes(id)
        ? atual.filter((generoId) => generoId !== id)
        : [...atual, id]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      titulo,
      descricao,
      desenvolvedora,
      lancamento,
      capaUrl,
      generoIds,
    });
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#020817]/80 backdrop-blur-sm px-4 py-8">
      <div className="w-full max-w-[760px] max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-400/10 bg-[#08111f] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 border-b border-cyan-400/10 bg-[#08111f]">
          <h2 className="text-3xl font-light text-white">
            {jogoEditando ? "Editar jogo" : "Criar novo jogo"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 text-3xl hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <div>
            <label className="block text-slate-300 mb-3">Título</label>
            <input
              type="text"
              placeholder="Nome do jogo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="w-full h-[56px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-3">Descrição</label>
            <textarea
              placeholder="Descrição do jogo..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className="w-full h-[140px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] p-5 text-white placeholder:text-slate-500 outline-none resize-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-300 mb-3">
                Desenvolvedora
              </label>
              <input
                type="text"
                placeholder="Nome da desenvolvedora"
                value={desenvolvedora}
                onChange={(e) => setDesenvolvedora(e.target.value)}
                required
                className="w-full h-[56px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-3">Lançamento</label>
              <input
                type="date"
                value={lancamento}
                onChange={(e) => setLancamento(e.target.value)}
                required
                className="w-full h-[56px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 text-white outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-3">URL da capa</label>
            <input
              type="url"
              placeholder="https://exemplo.com/capa.jpg"
              value={capaUrl}
              onChange={(e) => setCapaUrl(e.target.value)}
              required
              className="w-full h-[56px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-3">
              Gêneros existentes
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {generos.map((genero) => (
                <label
                  key={genero.id}
                  className="flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-[#0b1729] px-4 py-3 text-slate-300 cursor-pointer hover:border-cyan-300/30 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={generoIds.includes(genero.id)}
                    onChange={() => alternarGenero(genero.id)}
                    className="h-4 w-4 accent-cyan-300"
                  />

                  <span>{genero.nome}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl px-8 py-4 text-slate-300 font-semibold hover:text-white transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-[#69c6f4] px-12 py-4 text-[#08111f] font-semibold transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(105,198,244,0.35)]"
            >
              {jogoEditando ? "Salvar alterações" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
