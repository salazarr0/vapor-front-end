import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/SuinoPrime.png";

export function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-[#020817]/95
        backdrop-blur-xl
        border-b
        border-cyan-400/10
      "
    >
      <div
        className="
          max-w-[1600px]
          mx-auto
          h-[82px]
          px-8
          flex
          items-center
          justify-between
        "
      >

        <div className="flex items-center gap-12">
          <Link
            to="/loja"
            className="flex items-center gap-4"
          >
            <img
              src={logo}
              alt="KeySuina"
              className="
                h-[62px]
                w-auto
                object-contain
                drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]
              "
            />

            <h1
              className="
                text-white
                text-4xl
                font-light
                tracking-wide
              "
            >
              KeySuina
            </h1>
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              to="/loja"
              className="
                text-slate-300
                text-lg
                transition-all
                hover:text-cyan-300
              "
            >
              Loja
            </Link>

            <Link
              to="/biblioteca"
              className="
                text-slate-300
                text-lg
                transition-all
                hover:text-cyan-300
              "
            >
              Biblioteca
            </Link>

            <Link
              to="/wishlist"
              className="
                text-slate-300
                text-lg
                transition-all
                hover:text-cyan-300
              "
            >
              Wishlist
            </Link>
          </nav>
        </div>

        {!token ? (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="
                rounded-2xl
                border
                border-cyan-400/20
                bg-[#0b1729]
                px-5
                py-2.5
                text-slate-200
                transition-all
                hover:border-cyan-300
                hover:text-white
              "
            >
              Login
            </Link>

            <Link
              to="/registro"
              className="
                rounded-2xl
                bg-[#69c6f4]
                px-5
                py-2.5
                text-[#08111f]
                font-semibold
                transition-all
                hover:brightness-110
                hover:shadow-[0_0_18px_rgba(105,198,244,0.35)]
              "
            >
              Registrar
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-cyan-400/10
                bg-[#0b1729]
                px-5
                py-2.5
                text-slate-200
                transition-all
                hover:border-cyan-300/30
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  h-10
                  w-10
                  rounded-full
                  bg-cyan-400/20
                  text-cyan-300
                  text-lg
                "
              >
                👤
              </div>

              <span className="text-lg">
                Meu Perfil
              </span>

              <span
                className={`transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {menuOpen && (
              <div
                className="
                  absolute
                  right-0
                  mt-3
                  w-[220px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-[#08111f]
                  shadow-2xl
                "
              >
                <Link
                  to="/perfil"
                  className="
                    block
                    px-5
                    py-4
                    text-slate-200
                    transition-all
                    hover:bg-cyan-400/10
                  "
                  onClick={() => setMenuOpen(false)}
                >
                  Meu Perfil
                </Link>

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    text-left
                    px-5
                    py-4
                    text-red-300
                    transition-all
                    hover:bg-red-500/10
                  "
                >
                  Sair da Conta
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}