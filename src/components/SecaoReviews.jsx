import { CardReview } from "./CardReview";
import { FormularioReview } from "./FormularioReview";

export function SecaoReviews({
  token,
  jaReviewou,
  nota,
  setNota,
  texto,
  setTexto,
  recomenda,
  setRecomenda,
  erroCriar,
  enviando,
  criarReview,
  loadingReviews,
  reviews,
  jogoId,
  buscarReviews,
}) {
  return (
    <section>
      <h2 className="text-3xl font-light mb-8">
        Reviews
      </h2>

      {token && !jaReviewou && (
        <FormularioReview
          nota={nota}
          setNota={setNota}
          texto={texto}
          setTexto={setTexto}
          recomenda={recomenda}
          setRecomenda={setRecomenda}
          erroCriar={erroCriar}
          enviando={enviando}
          criarReview={criarReview}
        />
      )}

      {token && jaReviewou && (
        <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 mb-10 text-slate-400 text-sm">
          Você já publicou uma review para este jogo.
        </div>
      )}

      {!token && (
        <div className="rounded-3xl border border-cyan-400/10 bg-[#08111f]/95 px-6 py-4 mb-10 text-slate-400 text-sm">
          <a
            href="/login"
            className="text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            Faça login
          </a>{" "}
          para escrever uma review.
        </div>
      )}

      {loadingReviews && (
        <p className="text-slate-400">
          Carregando reviews...
        </p>
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
            jogoId={jogoId}
            onAtualizar={buscarReviews}
          />
        ))}
      </div>
    </section>
  );
}
