import { useEffect, useMemo, useState } from "react";
import api from "../api";
import { Header } from "../components/Header";
import { CardJogos } from "../components/CardJogos";
import { FiltroLoja } from "../components/FiltroLoja";

export function Loja() {
  const [jogos, setJogos] = useState([]);
  const [biblioteca, setBiblioteca] = useState([]);
  const [busca, setBusca] = useState("");
  const [generosSelecionados, setGenerosSelecionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function extrairJogos(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.itens)) return data.itens;
    if (Array.isArray(data.jogos)) return data.jogos;
    if (Array.isArray(data.destaques)) return data.destaques;
    return [];
  }

  function extrairGeneros(jogo) {
    if (Array.isArray(jogo.generos) && jogo.generos.length > 0) {
      return jogo.generos.map((genero) => genero.nome || genero);
    }

    if (Array.isArray(jogo.categorias) && jogo.categorias.length > 0) {
      return jogo.categorias.map((categoria) => categoria.nome || categoria);
    }

    if (jogo.genero?.nome) {
      return [jogo.genero.nome];
    }

    if (jogo.genero) {
      return [jogo.genero];
    }

    return ["Sem gênero"];
  }

  async function buscarBiblioteca() {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const { data } = await api.get("/biblioteca/me");

      const ids = data.map(
        (item) => item.jogoId || item.jogo?.id || item.id
      );

      setBiblioteca(ids);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function buscarJogos() {
      try {
        const { data } = await api.get("/jogos?limite=100");

        setJogos(extrairJogos(data));
      } catch (err) {
        console.log(err);
        setError("Não foi possível carregar os jogos.");
      } finally {
        setLoading(false);
      }
    }

    buscarJogos();
    buscarBiblioteca();
  }, []);

  const jogosTratados = jogos.map((item) => {
    const jogo = item.jogo || item;
    const generos = extrairGeneros(jogo);

    return {
      id: jogo.id,
      nome: jogo.titulo,
      foto: jogo.capaUrl,
      generos,
      generoTexto: generos.join(", "),
    };
  });

  const generos = useMemo(() => {
    const lista = jogosTratados.flatMap((jogo) => jogo.generos);

    return [...new Set(lista)].sort();
  }, [jogosTratados]);

  function alternarGenero(genero) {
    if (generosSelecionados.includes(genero)) {
      setGenerosSelecionados(
        generosSelecionados.filter((item) => item !== genero)
      );
    } else {
      setGenerosSelecionados([...generosSelecionados, genero]);
    }
  }

  const jogosFiltrados = jogosTratados.filter((jogo) => {
    const nomeCombina = jogo.nome
      ?.toLowerCase()
      .includes(busca.toLowerCase());

    const generoCombina =
      generosSelecionados.length === 0 ||
      generosSelecionados.some((genero) =>
        jogo.generos.includes(genero)
      );

    return nomeCombina && generoCombina;
  });

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <Header />

      <main className="pt-[120px] px-8">
        <h1 className="text-4xl font-light mb-10">
          Loja de Jogos
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          <FiltroLoja
            busca={busca}
            setBusca={setBusca}
            generos={generos}
            generosSelecionados={generosSelecionados}
            alternarGenero={alternarGenero}
          />

          <section className="flex-1">
            <h2 className="text-slate-300 mb-8">
              {jogosFiltrados.length} jogos encontrados
            </h2>

            {loading && (
              <p className="text-slate-400">
                Carregando catálogo de jogos...
              </p>
            )}

            {error && (
              <p className="text-red-400">
                {error}
              </p>
            )}

            {!loading && !error && jogosFiltrados.length === 0 && (
              <p className="text-slate-400">
                Nenhum jogo encontrado com esses filtros.
              </p>
            )}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-4
                gap-8
              "
            >
              {jogosFiltrados.map((jogo) => (
                <CardJogos
                  key={jogo.id}
                  game={{
                    id: jogo.id,
                    nome: jogo.nome,
                    foto: jogo.foto,
                    genero: jogo.generoTexto,
                  }}
                  estaNaBiblioteca={biblioteca.includes(jogo.id)}
                  atualizarBiblioteca={buscarBiblioteca}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}