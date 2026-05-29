import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Registro } from "./pages/Registro";
import { Biblioteca } from "./pages/Biblioteca";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/loja" element={<Home />} />

        <Route path="/registro" element={<Registro />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;