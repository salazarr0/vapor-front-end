import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api";
import logo from "../assets/SuinoPrime.png";

export function GaleriaMidia({
  imagens = [],
  videos = [],
  souAutor = false,
  buscarImagens,
  buscarVideos,
}) {
  const [imagemAtual, setImagemAtual] = useState(0);

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

  async function removerImagem(id) {
    try {
      await api.delete(`/imagens/${id}`);

      toast.success("Imagem removida!");

      if (imagemAtual > 0) {
        setImagemAtual(imagemAtual - 1);
      }

      buscarImagens();
    } catch (err) {
      console.log(err);

      toast.error("Não foi possível remover a imagem.");
    }
  }

  async function removerVideo(id) {
    try {
      await api.delete(`/videos/${id}`);

      toast.success("Vídeo removido!");

      buscarVideos();
    } catch (err) {
      console.log(err);

      toast.error("Não foi possível remover o vídeo.");
    }
  }

  return (
    <section className="mb-16">
      {imagens.length > 0 && (
        <div className="mb-14">
          <h2 className="text-3xl font-light mb-8">
            Capturas de Tela
          </h2>

          <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 p-5 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
            <div className="relative overflow-hidden rounded-2xl bg-[#020817] mb-5">
              <img
                src={imagens[imagemAtual]?.url || logo}
                alt="Imagem do jogo"
                onError={(e) => {
                  e.currentTarget.src = logo;
                }}
                className="w-full h-[520px] object-cover"
              />

              {souAutor && imagens[imagemAtual] && (
                <button
                  onClick={() =>
                    removerImagem(imagens[imagemAtual].id)
                  }
                  className="
                    absolute
                    top-3
                    right-3
                    p-2
                    rounded-xl
                    bg-black/70
                    backdrop-blur-sm
                    hover:bg-red-500/90
                    transition-all
                    duration-200
                    hover:scale-110
                    shadow-lg
                  "
                  title="Remover imagem"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6932/6932392.png"
                    alt="Remover"
                    className="w-6 h-6"
                  />
                </button>
              )}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {imagens.map((imagem, index) => (
                <button
                  key={imagem.id}
                  onClick={() => setImagemAtual(index)}
                  className={`
                    min-w-[180px]
                    h-[100px]
                    rounded-xl
                    overflow-hidden
                    border
                    transition-all
                    ${
                      imagemAtual === index
                        ? "border-cyan-300 opacity-100"
                        : "border-cyan-400/20 opacity-60 hover:opacity-100"
                    }
                  `}
                >
                  <img
                    src={imagem.url || logo}
                    alt="Miniatura"
                    onError={(e) => {
                      e.currentTarget.src = logo;
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {videos.length > 0 && (
        <div>
          <h2 className="text-3xl font-light mb-8">
            Vídeos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="
                  relative
                  rounded-3xl
                  overflow-hidden
                  border
                  border-cyan-400/10
                  bg-[#08111f]/95
                  shadow-[0_0_25px_rgba(56,189,248,0.08)]
                "
              >
                <iframe
                  src={converterYoutube(video.url)}
                  title={video.titulo || "Vídeo do jogo"}
                  className="w-full h-[300px]"
                  allowFullScreen
                />

                {souAutor && (
                  <button
                    onClick={() => removerVideo(video.id)}
                    className="
                      absolute
                      top-3
                      right-3
                      p-2
                      rounded-xl
                      bg-black/70
                      backdrop-blur-sm
                      hover:bg-red-500/90
                      transition-all
                      duration-200
                      hover:scale-110
                      shadow-lg
                      z-10
                    "
                    title="Remover vídeo"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/6932/6932392.png"
                      alt="Remover"
                      className="w-6 h-6"
                    />
                  </button>
                )}

                {video.titulo && (
                  <div className="p-4">
                    <h3 className="text-white text-xl font-semibold">
                      {video.titulo}
                    </h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}