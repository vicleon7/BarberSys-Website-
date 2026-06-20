import { useState, useEffect } from "react";
import Header from "./components/Header";
import InicioView from "./components/InicioView";
import ServiciosView from "./components/ServiciosView";
import GaleriaView from "./components/GaleriaView";
import TiendaView from "./components/TiendaView";
import AccesoView from "./components/AccesoView";
import ReservaView from "./components/ReservaView";
import Footer from "./components/Footer";
import { Product, Booking, CartItem } from "./types";

export default function App() {
  const [currentTab, setTab] = useState<string>("inicio");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Shopping Cart state loaded from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem("barbersys_cart");
    return local ? JSON.parse(local) : [];
  });

  // Bookings list state loaded from localStorage with premium default mock log data
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const local = localStorage.getItem("barbersys_bookings");
    if (local) return JSON.parse(local);

    return [
      {
        id: "mock-1",
        clientName: "Carlos Rodriguez",
        clientEmail: "carlos@correo.com",
        clientPhone: "622114455",
        serviceId: "cut-3",
        serviceName: "Corte y Lavado VIP",
        servicePrice: 40,
        barberId: "barber-1",
        barberName: "Marcos R.",
        date: "2026-06-25",
        time: "11:00",
        status: "Confirmado",
      },
      {
        id: "mock-2",
        clientName: "Marc Jimenez",
        clientEmail: "marc@correo.com",
        clientPhone: "600998877",
        serviceId: "beard-2",
        serviceName: "Ritual de Afeitado",
        servicePrice: 25,
        barberId: "barber-2",
        barberName: "Elena G.",
        date: "2026-06-26",
        time: "16:00",
        status: "Pendiente",
      },
      {
        id: "mock-3",
        clientName: "David Lopez",
        clientEmail: "david@correo.com",
        clientPhone: "655443322",
        serviceId: "pack-1",
        serviceName: "Pack Ejecutivo",
        servicePrice: 55,
        barberId: "barber-3",
        barberName: "David M.",
        date: "2026-06-28",
        time: "12:00",
        status: "Pendiente",
      },
    ];
  });

  // Store orders list state loaded from localStorage
  const [orders, setOrders] = useState<{ id: string; clientName: string; email: string; total: number; date: string }[]>(() => {
    const local = localStorage.getItem("barbersys_orders");
    if (local) return JSON.parse(local);

    return [
      {
        id: "order-1",
        clientName: "Carlos Rodriguez",
        email: "carlos@correo.com",
        total: 42.50,
        date: "2026-06-18",
      },
      {
        id: "order-2",
        clientName: "Marc Jimenez",
        email: "marc@correo.com",
        total: 85.00,
        date: "2026-06-19",
      }
    ];
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("barbersys_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("barbersys_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("barbersys_orders", JSON.stringify(orders));
  }, [orders]);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    // Before clearing, let's append a successful simulated order!
    // We can extract local product info or mock a user name based on form values
    const currentPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const newOrder = {
      id: "ord_" + Math.random().toString(36).substr(2, 9),
      clientName: "Comprador Local",
      email: "cliente@tienda.com",
      total: currentPrice,
      date: new Date().toISOString().split("T")[0],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  // Booking operations
  const addNewBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const updateBookingStatus = (bookingId: string, status: "Confirmado" | "Cancelado") => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  // Smooth scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col antialiased">
      {/* Header */}
      <Header
        currentTab={currentTab}
        setTab={setTab}
        cart={cart}
        updateCartQty={updateCartQty}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      {/* Dynamic View Main section */}
      <main className="flex-grow flex flex-col">
        {currentTab === "inicio" && <InicioView setTab={setTab} />}
        {currentTab === "servicios" && (
          <ServiciosView setTab={setTab} setSelectedServiceId={setSelectedServiceId} />
        )}
        {currentTab === "galeria" && (
          <GaleriaView setTab={setTab} setSelectedServiceId={setSelectedServiceId} />
        )}
        {currentTab === "tienda" && <TiendaView addToCart={addToCart} />}
        {currentTab === "acceso" && (
          <AccesoView
            bookings={bookings}
            updateBookingStatus={updateBookingStatus}
            orders={orders}
          />
        )}
        {currentTab === "reserva" && (
          <ReservaView
            selectedServiceId={selectedServiceId}
            setSelectedServiceId={setSelectedServiceId}
            addNewBooking={addNewBooking}
            setTab={setTab}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setTab={setTab} />
    </div>
  );
}
