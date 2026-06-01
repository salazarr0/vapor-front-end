import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Loja } from "./pages/Loja";
import { Registro } from "./pages/Registro";
import { Biblioteca } from "./pages/Biblioteca";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#08111f",
            color: "#fff",
            border: "1px solid rgba(56,189,248,0.2)",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;