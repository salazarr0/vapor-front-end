import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { Header } from "../components/Header";
import { CardReview } from "../components/CardReview";
import logo from "../assets/SuinoPrime.png";

export function GameDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jogo, setJogo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingJogo, setLoadingJogo] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorJogo, setErrorJogo] = useState("");

  const [nota, setNota] = useState(8);
  const [texto, setTexto] = useState("");
  const [recomenda, setRecomenda] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erroCriar, setErroCriar] = useState("");
  const [jaReviewou, setJaReviewou] = useState(false);

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

  async function buscarJogo() {
    try {
      const { data } = await api.get(`/jogos/${id}`);
      setJogo(data);
    } catch {
      setErrorJogo("Não foi possível carregar o jogo.");
    } finally {
      setLoadingJogo(false);
    }
  }

  async function buscarReviews() {
    try {
      setLoadingReviews(true);
      const { data } = await api.get(`/jogos/${id}/reviews`);
      const lista = Array.isArray(data) ? data : data.reviews || data.itens || [];
      setReviews(lista);
      if (usuarioId) {
        setJaReviewou(lista.some((r) => r.autorId === usuarioId));
      }
    } catch {
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  }

  async function criarReview(e) {
    e.preventDefault();
    setErroCriar("");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setEnviando(true);
      await api.post(`/jogos/${id}/reviews`, { nota, texto, recomenda });
      setTexto("");
      setNota(8);
      setRecomenda(true);
      await buscarReviews();
    } catch (err) {
      setErroCriar(
        err.response?.data?.message ||
          err.response?.data?.erro ||
          "Não foi possível enviar a review."
      );
    } finally {
      setEnviando(false);
    }
  }

  useEffect(() => {
    buscarJogo();
    buscarReviews();
  }, [id]);

  const imagemPadrao = logo;
  const imagemValida =
    jogo?.capaUrl &&
    !jogo.capaUrl.includes("example.com") &&
    !jogo.capaUrl.includes("chatgpt.com");

  const mediaNotas =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.nota, 0) / reviews.length).toFixed(1)
      : null;

  const percentRecomenda =
    reviews.length > 0
      ? Math.round((reviews.filter((r) => r.recomenda).length / reviews.length) * 100)
      : null;

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <Header />

      <main className="pt-[120px] px-8 max-w-[1200px] mx-auto pb-20">
        {loadingJogo && (
          <p className="text-slate-400">Carregando jogo...</p>
        )}

        {errorJogo && <p className="text-red-400">{errorJogo}</p>}

        {jogo && (
          <>
            <div className="flex flex-col lg:flex-row gap-10 mb-16">
              <div className="w-full lg:w-[320px] shrink-0">
                <div className="overflow-hidden rounded-3xl border border-cyan-400/10 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
                  <img
                    src={imagemValida ? jogo.capaUrl : imagemPadrao}
                    alt={jogo.titulo}
                    onError={(e) => {
                      e.currentTarget.src = imagemPadrao;
                    }}
                    className="w-full h-[380px] object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5">
                <div>
                  <h1 className="text-5xl font-light mb-2">{jogo.titulo}</h1>
                  <p className="text-cyan-300 text-lg">
                    {jogo.genero?.nome ||
                      jogo.generos?.map((g) => g.nome).join(", ") ||
                      jogo.genero ||
                      "Sem gênero"}
                  </p>
                </div>

                {jogo.descricao && (
                  <p className="text-slate-400 leading-relaxed max-w-[600px]">
                    {jogo.descricao}
                  </p>
                )}

                {reviews.length > 0 && (
                  <div className="flex items-center gap-6">
                    <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 text-center">
                      <p className="text-yellow-400 text-3xl font-semibold">
                        ★ {mediaNotas}
                      </p>
                      <p className="text-slate-400 text-sm mt-1">Nota média</p>
                    </div>
                    <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 text-center">
                      <p className="text-green-400 text-3xl font-semibold">
                        {percentRecomenda}%
                      </p>
                      <p className="text-slate-400 text-sm mt-1">Recomendam</p>
                    </div>
                    <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 text-center">
                      <p className="text-cyan-300 text-3xl font-semibold">
                        {reviews.length}
                      </p>
                      <p className="text-slate-400 text-sm mt-1">Reviews</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <section>
              <h2 className="text-3xl font-light mb-8">Reviews</h2>

              {token && !jaReviewou && (
                <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 p-6 mb-10 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
                  <h3 className="text-white text-xl font-semibold mb-6">
                    Escrever uma review
                  </h3>

                  <form onSubmit={criarReview} className="flex flex-col gap-5">
                    <div className="flex items-center gap-6 flex-wrap">
                      <div>
                        <label className="block text-slate-300 mb-2">
                          Nota (0–10)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={nota}
                          onChange={(e) => setNota(Number(e.target.value))}
                          required
                          className="w-28 h-[52px] rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 text-white outline-none transition-all focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
                        />
                      </div>

                      <label className="flex items-center gap-3 text-slate-300 cursor-pointer mt-5">
                        <input
                          type="checkbox"
                          checked={recomenda}
                          onChange={(e) => setRecomenda(e.target.checked)}
                          className="h-4 w-4 accent-cyan-300"
                        />
                        <span>Recomendar este jogo</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2">
                        Seu comentário
                      </label>
                      <textarea
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        required
                        rows={4}
                        maxLength={2000}
                        placeholder="Compartilhe sua experiência com este jogo..."
                        className="w-full rounded-2xl border border-cyan-400/20 bg-[#0b1729] px-5 py-3 text-white placeholder:text-slate-500 outline-none resize-none transition-all focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10"
                      />
                      <p className="text-slate-500 text-sm mt-1 text-right">
                        {texto.length}/2000
                      </p>
                    </div>

                    {erroCriar && (
                      <p className="text-red-400 text-sm">{erroCriar}</p>
                    )}

                    <button
                      type="submit"
                      disabled={enviando}
                      className="self-start h-[52px] rounded-2xl bg-[#69c6f4] px-8 text-[#08111f] font-semibold text-lg transition-all hover:brightness-110 hover:-translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {enviando ? "Enviando..." : "Publicar Review"}
                    </button>
                  </form>
                </div>
              )}

              {token && jaReviewou && (
                <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 mb-10 text-slate-400 text-sm">
                  Você já publicou uma review para este jogo.
                </div>
              )}

              {!token && (
                <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 mb-10 text-slate-400 text-sm">
                  <a href="/login" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                    Faça login
                  </a>{" "}
                  para escrever uma review.
                </div>
              )}

              {loadingReviews && (
                <p className="text-slate-400">Carregando reviews...</p>
              )}

              {!loadingReviews && reviews.length === 0 && (
                <p className="text-slate-400">
                  Nenhuma review ainda. Seja o primeiro!
                </p>
              )}

              <div className="flex flex-col gap-5">
                {reviews.map((review) => (
                  <CardReview
                    key={review.id}
                    review={review}
                    jogoId={id}
                    onAtualizar={buscarReviews}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
