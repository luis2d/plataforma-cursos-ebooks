import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import VerificarCorreo from "./pages/VerificarCorreo";
import OlvideContrasena from "./pages/OlvideContrasena";
import RestablecerContrasena from "./pages/RestablecerContrasena";
import CompraExitosa from "./pages/CompraExitosa";
import CompraCancelada from "./pages/CompraCancelada";
import MisCompras from "./pages/MisCompras";
import Noticias from "./pages/Noticias";
import NoticiaDetalle from "./pages/NoticiaDetalle";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminOrdenes from "./pages/admin/AdminOrdenes";
import AdminNoticias from "./pages/admin/AdminNoticias";
import NotFound from "./pages/NotFound";
import { RutaProtegida, RutaAdmin } from "./components/RutaProtegida";

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/verificar-correo" element={<VerificarCorreo />} />
        <Route path="/olvide-password" element={<OlvideContrasena />} />
        <Route path="/restablecer-password" element={<RestablecerContrasena />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-cancelada" element={<CompraCancelada />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<NoticiaDetalle />} />
        <Route
          path="/mis-compras"
          element={
            <RutaProtegida>
              <MisCompras />
            </RutaProtegida>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <RutaAdmin>
              <AdminProductos />
            </RutaAdmin>
          }
        />
        <Route
          path="/admin/ordenes"
          element={
            <RutaAdmin>
              <AdminOrdenes />
            </RutaAdmin>
          }
        />
        <Route
          path="/admin/noticias"
          element={
            <RutaAdmin>
              <AdminNoticias />
            </RutaAdmin>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
