import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

export function CardReview({ review, jogoId, onAtualizar }) {
  const [editando, setEditando] = useState(false);
  const [nota, setNota] = useState(review.nota);
  const [texto, setTexto] = useState(review.texto);
  const [recomenda, setRecomenda] = useState(review.recomenda);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  function decodificarToken(tk) {
    try {
      const payload = JSON.parse(atob(tk.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  }

  const payload = token ? decodificarToken(token) : null;
  const usuarioId = payload?.id || payload?.userId || payload?.sub;
  const ehAutor = usuarioId && review.autorId === usuarioId;

  async function salvarEdicao() {
    try {
      setLoading(true);
      await api.patch(`/reviews/${review.id}`, { nota, texto, recomenda });
      toast.success("Review atualizada!");
      setEditando(false);
      onAtualizar();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.erro ||
          "Não foi possível atualizar a review."
      );
    } finally {
      setLoading(false);
    }
  }

  async function removerReview() {
    if (!confirm("Remover esta review?")) return;
    try {
      await api.delete(`/reviews/${review.id}`);
      toast.success("Review removida!");
      onAtualizar();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.erro ||
          "Não foi possível remover a review."
      );
    }
  }

  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 p-6 shadow-[0_0_25px_rgba(56,189,248,0.08)] transition-all duration-300 hover:border-cyan-300/20">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-400/20 text-cyan-300 text-lg">
            👤
          </div>
          <div>
            <p className="text-white font-semibold">
              {review.autor?.nome || review.autor?.matricula || "Usuário"}
            </p>
            <p className="text-slate-500 text-sm">
              {new Date(review.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {editando ? null : (
            <>
              <div className="flex items-center gap-1 rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-3 py-1.5">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white font-semibold">{review.nota}</span>
                <span className="text-slate-500 text-sm">/10</span>
              </div>
              {review.recomenda && (
                <span className="rounded-2xl border border-green-400/30 bg-green-500/10 px-3 py-1.5 text-green-300 text-sm font-semibold">
                  Recomenda ✓
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {editando ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-slate-300 text-sm mb-2">
                Nota (0–10)
              </label>
              <input
                type="number"
                min={0}
                max={10}
                value={nota}
                onChange={(e) => setNota(Number(e.target.value))}
                className="w-24 h-[44px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-4 text-white outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10 transition-all"
              />
            </div>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer mt-5">
              <input
                type="checkbox"
                checked={recomenda}
                onChange={(e) => setRecomenda(e.target.checked)}
                className="h-4 w-4 accent-cyan-300"
              />
              <span>Recomendar</span>
            </label>
          </div>

          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={3}
            maxLength={2000}
            className="w-full rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 py-3 text-white placeholder:text-slate-500 outline-none resize-none transition-all focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
          />

          <div className="flex gap-3">
            <button
              onClick={salvarEdicao}
              disabled={loading}
              className="rounded-2xl bg-[#69c6f4] px-5 py-2.5 text-[#08111f] font-semibold transition-all hover:brightness-110 disabled:opacity-70"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              onClick={() => {
                setEditando(false);
                setNota(review.nota);
                setTexto(review.texto);
                setRecomenda(review.recomenda);
              }}
              className="rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 py-2.5 text-slate-200 transition-all hover:border-cyan-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-slate-300 leading-relaxed">{review.texto}</p>

          {ehAutor && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setEditando(true)}
                className="rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-4 py-2 text-cyan-300 text-sm font-semibold transition-all hover:border-cyan-300 hover:bg-cyan-400/10"
              >
                Editar
              </button>
              <button
                onClick={removerReview}
                className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-red-300 text-sm font-semibold transition-all hover:bg-red-500/20 hover:text-red-200"
              >
                Remover
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
