import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import VerificarCorreo from "./pages/VerificarCorreo";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/verificar-correo" element={<VerificarCorreo />} />
      </Routes>
    </div>
  );
}
