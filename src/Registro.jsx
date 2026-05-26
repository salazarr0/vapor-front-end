import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";

export function Registro() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", { password });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao definir senha");
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
        <p>Defina sua senha para acessar</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nova senha</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
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

          <div>
            <label>Confirmar senha</label>
            <div>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <p>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Definir senha e entrar"}
          </button>

          <div>
            <Link to="/login">
              Já possui senha? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}