import { useState } from "react";

export function ModalMidia({ tipo, itemEditando, onClose, onSubmit }) {
  const [titulo, setTitulo] = useState(
    itemEditando?.titulo || itemEditando?.nome || ""
  );
  const [url, setUrl] = useState(
    itemEditando?.url || itemEditando?.videoUrl || itemEditando?.imagemUrl || ""
  );

  function handleSubmit(e) {
    e.preventDefault();

    const payload =
      tipo === "video"
        ? {
            titulo,
            url,
          }
        : {
            url,
          };

    console.log("PAYLOAD MÍDIA:", payload);

    onSubmit(payload);
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#020817]/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-[560px] rounded-3xl border border-cyan-400/10 bg-[#08111f] shadow-2xl">
        <div className="flex items-center justify-between px-8 py-6 border-b border-cyan-400/10">
          <h2 className="text-3xl font-light text-white">
            {itemEditando
              ? `Editar ${tipo === "imagem" ? "imagem" : "vídeo"}`
              : `Adicionar ${tipo === "imagem" ? "imagem" : "vídeo"}`}
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
          {tipo === "video" && (
            <div>
              <label className="block text-slate-300 mb-3">
                Título do vídeo
              </label>

              <input
                type="text"
                placeholder="Ex: Trailer oficial"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                className="w-full h-[56px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-300 mb-3">
              URL {tipo === "imagem" ? "da imagem" : "do vídeo"}
            </label>

            <input
              type="url"
              placeholder={
                tipo === "imagem"
                  ? "https://exemplo.com/imagem.jpg"
                  : "https://youtube.com/watch?v=..."
              }
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full h-[56px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
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