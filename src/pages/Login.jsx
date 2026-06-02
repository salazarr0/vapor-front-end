import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import logo from "../assets/SuinoPrime.png";

export function Login() {
  const navigate = useNavigate();

  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", {
        matricula,
        senha: password,
      });

      const token = data.token;

      if (!token) {
        setError("Token não encontrado.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      navigate("/loja");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Matrícula ou senha inválidos"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center bg-cover bg-center
        relative overflow-hidden
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-sm"></div>

      <div
        className="
          relative z-10 w-full max-w-[540px] rounded-3xl
          border border-cyan-400/20 bg-[#020817]/90
          backdrop-blur-xl shadow-2xl px-12 py-12
        "
      >
        <div className="flex items-center justify-center gap-4 mb-12">
          <img
            src={logo}
            alt="Logo KeySuina"
            className="
              h-[100px] w-auto object-contain
              drop-shadow-[0_0_14px_rgba(56,189,248,0.35)]
            "
          />

          <h1 className="text-white text-5xl font-light tracking-wide">
            KeySuina
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div>
            <label className="block text-white text-[20px] mb-3">
              Matrícula
            </label>

            <input
              type="text"
              placeholder="Digite sua matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
              className="
                w-full h-[62px] rounded-2xl border border-cyan-400/20
                bg-[#0b1729] px-6 text-white text-lg
                placeholder:text-slate-500 outline-none transition-all
                focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10
              "
            />
          </div>

          <div>
            <label className="block text-white text-[20px] mb-3">
              Senha
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  w-full h-[62px] rounded-2xl border border-cyan-400/20
                  bg-[#0b1729] px-6 pr-16 text-white text-lg
                  placeholder:text-slate-500 outline-none transition-all
                  focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-5 top-1/2 -translate-y-1/2
                  text-slate-400 hover:text-white transition-colors text-xl
                "
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm -mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="
              h-[62px] rounded-2xl bg-[#69c6f4]
              text-[#08111f] text-xl font-semibold transition-all
              hover:brightness-110 hover:-translate-y-[1px]
              disabled:opacity-70 disabled:cursor-not-allowed mt-2
            "
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-slate-400">
            Não possui conta?{" "}
            <Link to="/registro" className="text-cyan-300 hover:text-cyan-200">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
