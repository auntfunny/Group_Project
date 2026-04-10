import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ContextoCarrito = createContext();
const CLAVE_CARRITO = "shopping_cart";

function obtenerCarritoGuardado() {
  const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

  if (!carritoGuardado) {
    return [];
  }

  try {
    return JSON.parse(carritoGuardado);
  } catch (error) {
    console.error("No se pudo leer el carrito guardado", error);
    localStorage.removeItem(CLAVE_CARRITO);
    return [];
  }
}

export function CartProvider({ children }) {
  const [itemsCarrito, setItemsCarrito] = useState([]);

  useEffect(() => {
    setItemsCarrito(obtenerCarritoGuardado());
  }, []);

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(itemsCarrito));
  }, [itemsCarrito]);

  function agregarAlCarrito(producto) {
    setItemsCarrito((itemsActuales) => {
      const itemExistente = itemsActuales.find((item) => item.id === producto.id);

      if (!itemExistente) {
        return [...itemsActuales, { ...producto, quantity: 1 }];
      }

      return itemsActuales.map((item) =>
        item.id === producto.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }

  function quitarDelCarrito(idProducto) {
    setItemsCarrito((itemsActuales) =>
      itemsActuales.filter((item) => item.id !== idProducto),
    );
  }

  function actualizarCantidad(idProducto, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
      quitarDelCarrito(idProducto);
      return;
    }

    setItemsCarrito((itemsActuales) =>
      itemsActuales.map((item) =>
        item.id === idProducto ? { ...item, quantity: nuevaCantidad } : item,
      ),
    );
  }

  function limpiarCarrito() {
    setItemsCarrito([]);
  }

  const cantidadCarrito = useMemo(
    () => itemsCarrito.reduce((total, item) => total + item.quantity, 0),
    [itemsCarrito],
  );

  const totalCarrito = useMemo(
    () =>
      itemsCarrito.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0,
      ),
    [itemsCarrito],
  );

  return (
    <ContextoCarrito.Provider
      value={{
        itemsCarrito,
        cantidadCarrito,
        totalCarrito,
        agregarAlCarrito,
        quitarDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
}

export const useCart = () => useContext(ContextoCarrito);
