import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api";
import { ModalMidia } from "./ModalMidia";
import logo from "../assets/SuinoPrime.png";

export function SecaoMidia({
  jogoId,
  imagens,
  videos,
  loadingImagens,
  loadingVideos,
  buscarImagens,
  buscarVideos,
}) {
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoMidia, setTipoMidia] = useState("imagem");
  const [itemEditando, setItemEditando] = useState(null);

  function abrirCriacao(tipo) {
    setTipoMidia(tipo);
    setItemEditando(null);
    setModalAberto(true);
  }

  function abrirEdicao(tipo, item) {
    setTipoMidia(tipo);
    setItemEditando(item);
    setModalAberto(true);
  }

  async function salvarMidia(dados) {
    try {
      if (tipoMidia === "imagem") {
        if (itemEditando) {
          await api.patch(`/imagens/${itemEditando.id}`, dados);
          toast.success("Imagem editada!");
        } else {
          await api.post(`/jogos/${jogoId}/imagens`, dados);
          toast.success("Imagem adicionada!");
        }

        buscarImagens();
      } else {
        if (itemEditando) {
          await api.patch(`/videos/${itemEditando.id}`, dados);
          toast.success("Vídeo editado!");
        } else {
          await api.post(`/jogos/${jogoId}/videos`, dados);
          toast.success("Vídeo adicionado!");
        }

        buscarVideos();
      }

      setModalAberto(false);
      setItemEditando(null);
    } catch (err) {
      console.log("ERRO MÍDIA:", err.response?.data || err);

      toast.error(
        err.response?.data?.message ||
          err.response?.data?.erro ||
          "Não foi possível salvar a mídia."
      );
    }
  }

  async function removerImagem(id) {
    try {
      await api.delete(`/imagens/${id}`);
      toast.success("Imagem removida!");
      buscarImagens();
    } catch {
      toast.error("Não foi possível remover a imagem.");
    }
  }

  async function removerVideo(id) {
    try {
      await api.delete(`/videos/${id}`);
      toast.success("Vídeo removido!");
      buscarVideos();
    } catch {
      toast.error("Não foi possível remover o vídeo.");
    }
  }

  function converterYoutube(url) {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-light mb-8">
        Mídia do jogo
      </h2>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-light">
            Imagens
          </h3>

          <button
            onClick={() => abrirCriacao("imagem")}
            className="rounded-2xl bg-[#69c6f4] px-6 py-3 text-[#08111f] font-semibold hover:brightness-110"
          >
            + Adicionar imagem
          </button>
        </div>

        {loadingImagens && (
          <p className="text-slate-400">Carregando imagens...</p>
        )}

        {!loadingImagens && imagens.length === 0 && (
          <p className="text-slate-400">Nenhuma imagem cadastrada.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {imagens.map((imagem) => (
            <div
              key={imagem.id}
              className="rounded-3xl overflow-hidden border border-cyan-400/10 bg-[#08111f]/95"
            >
              <img
                src={imagem.url || logo}
                alt="Imagem do jogo"
                onError={(e) => {
                  e.currentTarget.src = logo;
                }}
                className="w-full h-[240px] object-cover"
              />

              <div className="p-4 flex gap-5">
                <button
                  onClick={() => abrirEdicao("imagem", imagem)}
                  className="text-cyan-300 hover:text-cyan-100"
                >
                  Editar
                </button>

                <button
                  onClick={() => removerImagem(imagem.id)}
                  className="text-red-300 hover:text-red-200"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-light">
            Vídeos
          </h3>

          <button
            onClick={() => abrirCriacao("video")}
            className="rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-6 py-3 text-cyan-300 font-semibold hover:bg-cyan-400/10"
          >
            + Adicionar vídeo
          </button>
        </div>

        {loadingVideos && (
          <p className="text-slate-400">Carregando vídeos...</p>
        )}

        {!loadingVideos && videos.length === 0 && (
          <p className="text-slate-400">Nenhum vídeo cadastrado.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-3xl overflow-hidden border border-cyan-400/10 bg-[#08111f]/95"
            >
              <iframe
                src={converterYoutube(video.url)}
                title="Vídeo do jogo"
                className="w-full h-[280px]"
                allowFullScreen
              />

              <div className="p-4 flex gap-5">
                <button
                  onClick={() => abrirEdicao("video", video)}
                  className="text-cyan-300 hover:text-cyan-100"
                >
                  Editar
                </button>

                <button
                  onClick={() => removerVideo(video.id)}
                  className="text-red-300 hover:text-red-200"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalAberto && (
        <ModalMidia
          tipo={tipoMidia}
          itemEditando={itemEditando}
          onClose={() => {
            setModalAberto(false);
            setItemEditando(null);
          }}
          onSubmit={salvarMidia}
        />
      )}
    </section>
  );
}