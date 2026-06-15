import { useState } from "react";
import logo from "../assets/SuinoPrime.png";

export function GaleriaMidia({ imagens = [], videos = [] }) {
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

  return (
    <section className="mb-16">
      {imagens.length > 0 && (
        <div className="mb-14">
          <h2 className="text-3xl font-light mb-8">
            Imagens
          </h2>

          <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 p-5 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
            <div className="overflow-hidden rounded-2xl bg-[#020817] mb-5">
              <img
                src={imagens[imagemAtual]?.url || logo}
                alt="Imagem do jogo"
                onError={(e) => {
                  e.currentTarget.src = logo;
                }}
                className="w-full h-[480px] object-cover"
              />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {imagens.map((imagem, index) => (
                <button
                  key={imagem.id}
                  onClick={() => setImagemAtual(index)}
                  className={`
                    min-w-[150px]
                    h-[90px]
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
                className="rounded-3xl overflow-hidden border border-cyan-400/10 bg-[#08111f]/95 shadow-[0_0_25px_rgba(56,189,248,0.08)]"
              >
                <iframe
                  src={converterYoutube(video.url)}
                  title="Vídeo do jogo"
                  className="w-full h-[300px]"
                  allowFullScreen
                />

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