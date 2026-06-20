import { useState, FormEvent } from "react";
import { Menu, X, ShoppingBag, Trash2, Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  cart: CartItem[];
  updateCartQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export default function Header({
  currentTab,
  setTab,
  cart,
  updateCartQty,
  removeFromCart,
  clearCart,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Form states for checkout
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !address || !card) return;
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        setCartDrawerOpen(false);
        clearCart();
        setName("");
        setAddress("");
        setCard("");
      }, 3000);
    }, 1500);
  };

  const navLinks = [
    { id: "inicio", label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "galeria", label: "Galería" },
    { id: "tienda", label: "Tienda" },
    { id: "acceso", label: "Acceso" },
  ];

  return (
    <>
      <header id="app-header" className="bg-white/95 backdrop-blur-md w-full top-0 sticky border-b border-gray-200 z-50 transition-all">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto h-20">
          {/* Logo */}
          <div
            id="brand-logo"
            onClick={() => setTab("inicio")}
            className="text-2xl font-extrabold tracking-tight text-black cursor-pointer select-none"
          >
            BarberSys
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-1 text-sm font-medium transition-all relative ${
                  currentTab === link.id
                    ? "text-black font-extrabold"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {link.label}
                {currentTab === link.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Cart & Quick actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              id="btn-cart"
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2.5 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Abrir Carrito"
            >
              <ShoppingBag className="w-[22px] h-[22px]" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 w-[18px] h-[18px] bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* CTA Reserva Button */}
            <button
              id="cta-reserve"
              onClick={() => setTab("reserva")}
              className="bg-black text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors active:scale-95"
            >
              Reservar
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-b border-gray-200 bg-white overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setTab(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left py-2 font-medium text-base ${
                      currentTab === link.id ? "text-black font-extrabold" : "text-gray-500"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer Backdrop */}
      <AnimatePresence>
        {cartDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isCheckingOut && !checkoutSuccess) setCartDrawerOpen(false);
              }}
              className="fixed inset-0 bg-black z-[100]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col h-full"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-black" />
                  <h2 className="text-lg font-bold text-black text-sans">Tu Carrito</h2>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1.5 hover:bg-gray-200 rounded-full text-gray-500 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {checkoutSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-black">¡Pedido Realizado!</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                      Hemos recibido tu orden correctamente. Prepararemos tus productos para entregártelos en tu próxima cita de corte.
                    </p>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-400">
                    <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
                    <div>
                      <p className="font-semibold text-black">Tu carrito está vacío</p>
                      <p className="text-sm text-gray-400 mt-1">Explora la tienda y añade productos de alta calidad.</p>
                    </div>
                    <button
                      onClick={() => {
                        setTab("tienda");
                        setCartDrawerOpen(false);
                      }}
                      className="mt-2 bg-black text-white px-5 py-2 rounded-sm text-xs font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Ir a la Tienda
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-3 bg-white border border-gray-200 rounded-sm"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-16 h-20 object-cover bg-gray-50 border border-gray-100 rounded-sm"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-0.5">
                              {item.product.category}
                            </p>
                            <h4 className="font-bold text-sm text-black truncate">
                              {item.product.name}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 border border-gray-200 p-0.5 rounded-sm">
                              <button
                                onClick={() => updateCartQty(item.product.id, -1)}
                                className="p-1 hover:bg-gray-100 rounded-sm text-gray-500"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-black min-w-[16px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQty(item.product.id, 1)}
                                className="p-1 hover:bg-gray-100 rounded-sm text-gray-500"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-black">
                              {(item.product.price * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col justify-start">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Checkout Form */}
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="font-bold text-sm text-black tracking-wide uppercase mb-4">
                        Formulario de Compra
                      </h3>
                      <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Tu Nombre Completo
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-sm border-b border-gray-200 py-1.5 outline-none focus:border-black transition-all font-sans text-black placeholder:text-gray-300"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Correo Electrónico
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="juan@correo.com"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full text-sm border-b border-gray-200 py-1.5 outline-none focus:border-black transition-all font-sans text-black placeholder:text-gray-300"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Dirección o Retiro en Cita
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Sede Central / Tu Domicilio"
                            value={card}
                            onChange={(e) => setCard(e.target.value)}
                            className="w-full text-sm border-b border-gray-200 py-1.5 outline-none focus:border-black transition-all font-sans text-black placeholder:text-gray-300"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isCheckingOut}
                          className="w-full mt-4 bg-black text-white hover:bg-gray-800 py-3.5 rounded-sm font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                        >
                          {isCheckingOut ? (
                            <span className="inline-block animate-pulse">Procesando...</span>
                          ) : (
                            <span>Pagar e Indicar Retiro (Total: {totalPrice.toFixed(2)}€)</span>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && !checkoutSuccess && (
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-500">Subtotal de la compra</span>
                    <span className="text-xl font-bold text-black">{totalPrice.toFixed(2)}€</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-normal text-center">
                    * Los pagos se simulan de manera segura. Recogerás tus productos comprados en la barbería en tu próxima reserva o te enviaremos detalles de entrega.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
