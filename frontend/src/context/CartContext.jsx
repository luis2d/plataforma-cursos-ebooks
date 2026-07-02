import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CLAVE_STORAGE = "carrito";

function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(leerCarritoGuardado);

  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
  }, [items]);

  function agregarAlCarrito(producto) {
    setItems((prev) => {
      if (prev.some((item) => item.id === producto.id)) return prev;
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precioCentavos: producto.precioCentavos,
          imagenUrl: producto.imagenUrl,
        },
      ];
    });
  }

  function quitarDelCarrito(productoId) {
    setItems((prev) => prev.filter((item) => item.id !== productoId));
  }

  function vaciarCarrito() {
    setItems([]);
  }

  const cantidad = items.length;
  const total = items.reduce((suma, item) => suma + item.precioCentavos, 0);

  return (
    <CartContext.Provider
      value={{ items, cantidad, total, agregarAlCarrito, quitarDelCarrito, vaciarCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
