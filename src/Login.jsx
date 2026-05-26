import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "./api";

export function Login() {
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState(""); // Mudou de email para matricula
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Endpoint corrigido para "/auth/login" e enviando "matricula"
      const { data } = await api.post("/auth/login", { 
        matricula, 
        senha: password // A API espera "senha" em português conforme o print
      });
      
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Matrícula ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          <span>🎮</span>
          <h1>Vaporzão</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Matrícula</label>
            <input
              type="text"
              placeholder="Digite sua matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Senha</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <p>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div>
            <Link to="/registro">
              Primeiro acesso? Defina sua senha
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}