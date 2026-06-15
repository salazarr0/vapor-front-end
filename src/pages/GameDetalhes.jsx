import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { Header } from "../components/Header";
import { DetalhesJogo } from "../components/DetalhesJogo";
import { SecaoReviews } from "../components/SecaoReviews";
import { SecaoConquistas } from "../components/SecaoConquistas";
import { GaleriaMidia } from "../components/GaleriaMidia";

export function GameDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jogo, setJogo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [conquistas, setConquistas] = useState([]);
  const [imagens, setImagens] = useState([]);
  const [videos, setVideos] = useState([]);

  const [loadingJogo, setLoadingJogo] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingConquistas, setLoadingConquistas] = useState(true);
  const [loadingImagens, setLoadingImagens] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [errorJogo, setErrorJogo] = useState("");

  const [nota, setNota] = useState(8);
  const [texto, setTexto] = useState("");
  const [recomenda, setRecomenda] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erroCriar, setErroCriar] = useState("");
  const [jaReviewou, setJaReviewou] = useState(false);
  const [naWishlist, setNaWishlist] = useState(false);

  const token = localStorage.getItem("token");

  function decodificarToken(tk) {
    try {
      return JSON.parse(atob(tk.split(".")[1]));
    } catch {
      return null;
    }
  }

  const payload = token ? decodificarToken(token) : null;
  const usuarioId = payload?.id || payload?.userId || payload?.sub;

  async function buscarJogo() {
    try {
      setLoadingJogo(true);
      setErrorJogo("");

      const { data } = await api.get(`/jogos/${id}`);

      setJogo(data);
    } catch (err) {
      console.log(err);
      setErrorJogo("Não foi possível carregar o jogo.");
    } finally {
      setLoadingJogo(false);
    }
  }

  async function buscarReviews() {
    try {
      setLoadingReviews(true);

      const { data } = await api.get(`/jogos/${id}/reviews`);

      const lista = Array.isArray(data)
        ? data
        : data.reviews || data.itens || [];

      setReviews(lista);

      if (usuarioId) {
        setJaReviewou(
          lista.some((review) => review.autorId === usuarioId)
        );
      }
    } catch (err) {
      console.log(err);
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  }

  async function buscarConquistas() {
    try {
      setLoadingConquistas(true);

      const { data } = await api.get(`/jogos/${id}/conquistas`);

      const lista = Array.isArray(data)
        ? data
        : data.conquistas || data.itens || [];

      setConquistas(lista);
    } catch (err) {
      console.log(err);
      setConquistas([]);
    } finally {
      setLoadingConquistas(false);
    }
  }

  async function buscarImagens() {
    try {
      setLoadingImagens(true);

      const { data } = await api.get(`/jogos/${id}/imagens`);

      const lista = Array.isArray(data)
        ? data
        : data.imagens || data.itens || [];

      setImagens(lista);
    } catch (err) {
      console.log(err);
      setImagens([]);
    } finally {
      setLoadingImagens(false);
    }
  }

  async function buscarVideos() {
    try {
      setLoadingVideos(true);

      const { data } = await api.get(`/jogos/${id}/videos`);

      const lista = Array.isArray(data)
        ? data
        : data.videos || data.itens || [];

      setVideos(lista);
    } catch (err) {
      console.log(err);
      setVideos([]);
    } finally {
      setLoadingVideos(false);
    }
  }

  async function verificarWishlist() {
    try {
      if (!token) return;

      const { data } = await api.get("/wishlist/me");

      const lista = Array.isArray(data)
        ? data
        : data.itens || data.jogos || data.wishlist || [];

      const existe = lista.some((item) => {
        const jogoWishlist = item.jogo || item;

        return Number(jogoWishlist.id || item.jogoId) === Number(id);
      });

      setNaWishlist(existe);
    } catch (err) {
      console.log(err);
    }
  }

  async function alternarWishlist() {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (naWishlist) {
        await api.delete(`/wishlist/${id}`);
        setNaWishlist(false);
      } else {
        await api.post(`/wishlist/${id}`);
        setNaWishlist(true);
      }
    } catch (err) {
      console.log(err);
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

      await api.post(`/jogos/${id}/reviews`, {
        nota,
        texto,
        recomenda,
      });

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
    buscarConquistas();
    buscarImagens();
    buscarVideos();
    verificarWishlist();
  }, [id]);

  const mediaNotas =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.nota, 0) /
          reviews.length
        ).toFixed(1)
      : null;

  const percentRecomenda =
    reviews.length > 0
      ? Math.round(
          (reviews.filter((review) => review.recomenda).length /
            reviews.length) *
            100
        )
      : null;

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <Header />

      <main className="pt-[120px] px-8 max-w-[1200px] mx-auto pb-20">
        {loadingJogo && (
          <p className="text-slate-400">
            Carregando jogo...
          </p>
        )}

        {errorJogo && (
          <p className="text-red-400">
            {errorJogo}
          </p>
        )}

        {jogo && (
          <>
            <DetalhesJogo
              jogo={jogo}
              reviews={reviews}
              mediaNotas={mediaNotas}
              percentRecomenda={percentRecomenda}
              naWishlist={naWishlist}
              alternarWishlist={alternarWishlist}
            />

            {!loadingImagens && !loadingVideos && (
              <GaleriaMidia
                imagens={imagens}
                videos={videos}
              />
            )}

            <SecaoConquistas
              jogoId={id}
              conquistas={conquistas}
              loadingConquistas={loadingConquistas}
              buscarConquistas={buscarConquistas}
            />

            <SecaoReviews
              token={token}
              jaReviewou={jaReviewou}
              nota={nota}
              setNota={setNota}
              texto={texto}
              setTexto={setTexto}
              recomenda={recomenda}
              setRecomenda={setRecomenda}
              erroCriar={erroCriar}
              enviando={enviando}
              criarReview={criarReview}
              loadingReviews={loadingReviews}
              reviews={reviews}
              jogoId={id}
              buscarReviews={buscarReviews}
            />
          </>
        )}
      </main>
    </div>
  );
}