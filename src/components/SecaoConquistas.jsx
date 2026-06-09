import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api";
import { CardConquista } from "./CardConquista";
import { ModalConquista } from "./ModalConquista";

export function SecaoConquistas({
  jogoId,
  conquistas,
  loadingConquistas,
  buscarConquistas,
}) {
  const [modalAberto, setModalAberto] = useState(false);
  const [conquistaEditando, setConquistaEditando] = useState(null);

  async function salvarConquista(dados) {
    try {
      if (conquistaEditando) {
        await api.patch(`/conquistas/${conquistaEditando.id}`, dados);
        toast.success("Conquista editada!");
      } else {
        await api.post(`/jogos/${jogoId}/conquistas`, dados);
        toast.success("Conquista adicionada!");
      }

      setModalAberto(false);
      setConquistaEditando(null);
      buscarConquistas();
    } catch (err) {
      console.log(err.response?.data || err);
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.erro ||
          "Não foi possível salvar a conquista."
      );
    }
  }

  async function removerConquista(id) {
    try {
      await api.delete(`/conquistas/${id}`);
      toast.success("Conquista removida!");
      buscarConquistas();
    } catch (err) {
      toast.error("Não foi possível remover a conquista.");
    }
  }

  function abrirCriacao() {
    setConquistaEditando(null);
    setModalAberto(true);
  }

  function abrirEdicao(conquista) {
    setConquistaEditando(conquista);
    setModalAberto(true);
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light">Conquistas</h2>

        <button
          onClick={abrirCriacao}
          className="rounded-2xl bg-[#69c6f4] px-6 py-3 text-[#08111f] font-semibold hover:brightness-110"
        >
          + Adicionar conquista
        </button>
      </div>

      {loadingConquistas && (
        <p className="text-slate-400">Carregando conquistas...</p>
      )}

      {!loadingConquistas && conquistas.length === 0 && (
        <p className="text-slate-400">
          Este jogo ainda não possui conquistas.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {conquistas.map((conquista) => (
          <CardConquista
            key={conquista.id}
            conquista={conquista}
            onEditar={abrirEdicao}
            onRemover={removerConquista}
          />
        ))}
      </div>

      {modalAberto && (
        <ModalConquista
          conquistaEditando={conquistaEditando}
          onClose={() => {
            setModalAberto(false);
            setConquistaEditando(null);
          }}
          onSubmit={salvarConquista}
        />
      )}
    </section>
  );
}