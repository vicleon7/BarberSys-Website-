import { useState, useMemo, FormEvent } from "react";
import { Booking, Product } from "../types";
import { User, ShieldAlert, KeyRound, Search, Calendar, Ban, CheckCircle2, DollarSign, Users, Sparkles, LogOut, PackageCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AccesoViewProps {
  bookings: Booking[];
  updateBookingStatus: (bookingId: string, status: "Confirmado" | "Cancelado") => void;
  orders: { id: string; clientName: string; email: string; total: number; date: string }[];
}

export default function AccesoView({
  bookings,
  updateBookingStatus,
  orders,
}: AccesoViewProps) {
  const [activeTab, setActiveTab] = useState<"clientes" | "admin">("clientes");

  // Client login state
  const [clientEmail, setClientEmail] = useState("");
  const [searched, setSearched] = useState(false);

  // Admin login state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");

  // Search filter inside admin panel
  const [adminSearch, setAdminSearch] = useState("");

  // Look up client bookings
  const clientBookings = useMemo(() => {
    if (!searched || !clientEmail) return [];
    const q = clientEmail.toLowerCase().trim();
    return bookings.filter(
      (b) =>
        b.clientEmail.toLowerCase() === q ||
        b.clientPhone.trim() === q ||
        b.clientName.toLowerCase().includes(q)
    );
  }, [clientEmail, searched, bookings]);

  // Handle Client Search
  const handleClientSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;
    setSearched(true);
  };

  // Handle Admin Auth
  const handleAdminAuth = (e: FormEvent) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "admin") {
      setIsAdminLoggedIn(true);
      setAdminError("");
    } else {
      setAdminError("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser("");
    setAdminPass("");
  };

  // Calculate stats for admin dashboard
  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const activeClients = new Set(bookings.map((b) => b.clientEmail)).size;
    const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
    const pendingCents = bookings.filter((b) => b.status === "Pendiente").length;

    return { totalBookings, activeClients, totalSales, pendingCents };
  }, [bookings, orders]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-grow max-w-7xl mx-auto px-6 py-12 space-y-8"
    >
      {isAdminLoggedIn ? (
        // Admin Dashboard View
        <div className="space-y-8">
          {/* Header Dashboard panel */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-black text-white p-8 rounded-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold tracking-widest text-[#a8a29e] uppercase">
                Panel Administrativo
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Consola Central BarberSys
              </h2>
              <p className="text-sm text-gray-400 font-normal">
                Panel de control comercial en tiempo real para supervisar reservas, ventas de productos e indicadores clave.
              </p>
            </div>
            <button
              onClick={handleAdminLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-sm flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Consola
            </button>
          </div>

          {/* Stats Bento Grid indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                  Citas Agendadas
                </span>
                <span className="text-3xl font-black text-black">
                  {stats.totalBookings}
                </span>
              </div>
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-black rounded-full">
                <Calendar className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                  Clientes Únicos
                </span>
                <span className="text-3xl font-black text-black">
                  {stats.activeClients}
                </span>
              </div>
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-black rounded-full">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                  Ventas Tienda
                </span>
                <span className="text-3xl font-black text-black">
                  {stats.totalSales.toFixed(2)}€
                </span>
              </div>
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-black rounded-full">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                  Citas Pendientes
                </span>
                <span className="text-3xl font-black text-black">
                  {stats.pendingCents}
                </span>
              </div>
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-black rounded-full">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Table list of Bookings and Orders side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Bookings table */}
            <div className="lg:col-span-8 bg-white border border-gray-200 p-6 rounded-sm shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h3 className="text-lg font-bold text-black border-l-4 border-black pl-3 select-none">
                  Gestión Unificada de Citas
                </h3>
                {/* Inline searching */}
                <div className="relative min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Filtrar por nombre o email..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-4 py-2 border border-gray-200 rounded-sm outline-none focus:border-black font-sans text-black"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 uppercase font-bold tracking-wider">
                      <th className="py-3 px-2">Cliente</th>
                      <th className="py-3 px-2">Servicio</th>
                      <th className="py-3 px-2">Especialista</th>
                      <th className="py-3 px-2">Fecha/Hora</th>
                      <th className="py-3 px-2">Estado</th>
                      <th className="py-3 px-2 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {bookings
                      .filter(
                        (b) =>
                          b.clientName.toLowerCase().includes(adminSearch.toLowerCase()) ||
                          b.clientEmail.toLowerCase().includes(adminSearch.toLowerCase())
                      )
                      .map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50">
                          <td className="py-3.5 px-2">
                            <div className="font-bold text-black">{b.clientName}</div>
                            <div className="text-gray-400 text-[10px]">{b.clientEmail}</div>
                          </td>
                          <td className="py-3.5 px-2">
                            <div className="text-black">{b.serviceName}</div>
                            <div className="text-gray-400 text-[10px]">{b.servicePrice}€</div>
                          </td>
                          <td className="py-3.5 px-2 text-gray-600">{b.barberName}</td>
                          <td className="py-3.5 px-2">
                            <div className="text-black font-bold">{b.date}</div>
                            <div className="text-gray-400 text-[10px]">{b.time}</div>
                          </td>
                          <td className="py-3.5 px-2">
                            <span
                              className={`px-2 py-1 text-[10px] font-extrabold uppercase rounded-full ${
                                b.status === "Confirmado"
                                  ? "bg-green-100 text-green-800"
                                  : b.status === "Cancelado"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-right space-x-1 whitespace-nowrap">
                            {b.status === "Pendiente" && (
                              <button
                                onClick={() => updateBookingStatus(b.id, "Confirmado")}
                                className="bg-black hover:bg-gray-800 text-white font-bold p-1 rounded-sm text-[10px]"
                                title="Confirmar Cita"
                              >
                                Aprobar
                              </button>
                            )}
                            {b.status !== "Cancelado" && (
                              <button
                                onClick={() => updateBookingStatus(b.id, "Cancelado")}
                                className="border border-red-200 text-red-600 hover:bg-red-50 font-bold p-1 rounded-sm text-[10px]"
                                title="Cancelar Cita"
                              >
                                Cancelar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-gray-400 font-normal">
                          No hay citas cargadas en el sistema todavía.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Orders list sidebar panel */}
            <div className="lg:col-span-4 bg-white border border-gray-200 p-6 rounded-sm shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-black border-l-4 border-black pl-3 select-none">
                Órdenes de Tienda
              </h3>
              <div className="space-y-3.5 overflow-y-auto max-h-[400px]">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 border border-gray-100 bg-gray-50 rounded-sm space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-start font-bold">
                      <div>
                        <p className="text-black uppercase text-[10px] font-black tracking-wide">
                          ID: {order.id.slice(0, 8)}
                        </p>
                        <h4 className="text-black text-sm">{order.clientName}</h4>
                      </div>
                      <span className="text-black font-extrabold text-sm">
                        {order.total.toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-200 pt-2">
                      <span>{order.date}</span>
                      <span className="flex items-center gap-1 text-black font-semibold uppercase tracking-wider">
                        <PackageCheck className="w-3.5 h-3.5 text-black" /> Retiro Pendiente
                      </span>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="text-center py-12 text-gray-400 font-normal text-xs leading-relaxed">
                    No se han registrado compras de productos en esta sesión todavía. Ve a la tienda para simular una.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Client Search and Auth tab switches
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
              Gestión & Acceso
            </span>
            <h1 className="text-3xl font-extrabold text-black text-sans">
              Área de Acceso BarberSys
            </h1>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-sm border border-gray-200">
            <button
              onClick={() => {
                setActiveTab("clientes");
                setSearched(false);
                setClientEmail("");
              }}
              className={`py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${
                activeTab === "clientes"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Acceso Clientes
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${
                activeTab === "admin"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Administrador
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "clientes" ? (
              // Client lookup form
              <motion.div
                key="clientes"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-white border border-gray-200 p-8 rounded-sm shadow-sm space-y-6"
              >
                <div className="text-center space-y-1.5 border-b border-gray-100 pb-4">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-black mx-auto">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-black text-lg">Consulta de Reservas</h3>
                  <p className="text-xs text-gray-400 leading-normal">
                    Ingresa el nombre, correo electrónico o teléfono con el que agendaste tu cita para revisar tus activos o cancelarla.
                  </p>
                </div>

                <form onSubmit={handleClientSearchSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Tus Datos de Reserva
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez o juan@correo.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full text-sm border-b border-gray-200 py-2 outline-none focus:border-black transition-all font-sans text-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-sm font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Buscar Reservas
                  </button>
                </form>

                {searched && (
                  <div className="border-t border-gray-100 pt-6 space-y-4">
                    <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                      Resultados Encontrados ({clientBookings.length})
                    </h4>

                    {clientBookings.length === 0 ? (
                      <p className="text-xs text-gray-500 bg-gray-50 p-4 border border-gray-100 text-center rounded-sm leading-relaxed">
                        No se encontraron citas activas con ese registro. Te sugerimos realizar una nueva cita en el menú de reservas.
                      </p>
                    ) : (
                      <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                        {clientBookings.map((b) => (
                          <div
                            key={b.id}
                            className="p-4 border border-gray-200 rounded-sm bg-white space-y-3 shadow-2xs relative"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-extrabold text-[13px] text-black">
                                  {b.serviceName}
                                </h5>
                                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                                  Especialista: {b.barberName}
                                </span>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                                  b.status === "Confirmado"
                                    ? "bg-green-100 text-green-800"
                                    : b.status === "Cancelado"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {b.status}
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-[11px] text-gray-600 font-medium">
                              <span className="font-bold text-black border-l border-black pl-1.5">
                                {b.date} a las {b.time}
                              </span>
                              <span className="font-black text-black">{b.servicePrice}€</span>
                            </div>

                            {b.status !== "Cancelado" && (
                              <button
                                onClick={() => updateBookingStatus(b.id, "Cancelado")}
                                className="w-full text-center border border-red-200 text-red-600 hover:bg-red-50 text-[10px] py-1.5 rounded-sm uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1"
                              >
                                <Ban className="w-3.5 h-3.5" />
                                Cancelar Reservación
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ) : (
              // Admin credentials gate
              <motion.div
                key="admin"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-white border border-gray-200 p-8 rounded-sm shadow-sm space-y-6"
              >
                <div className="text-center space-y-1.5 border-b border-gray-100 pb-4">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-black mx-auto">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-black text-lg">Consola de Control</h3>
                  <p className="text-xs text-gray-400 leading-normal">
                    Acceso exclusivo para administradores y personal de BarberSys para gestionar los flujos comerciales y de stock.
                  </p>
                </div>

                <form onSubmit={handleAdminAuth} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Usuario de Acceso
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. admin"
                      value={adminUser}
                      onChange={(e) => setAdminUser(e.target.value)}
                      className="w-full text-sm border-b border-gray-200 py-1.5 outline-none focus:border-black transition-all font-sans text-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Contraseña Secreta
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      className="w-full text-sm border-b border-gray-200 py-1.5 outline-none focus:border-black transition-all font-sans text-black"
                    />
                  </div>

                  {adminError && (
                    <p className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-sm border border-red-200">
                      {adminError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-sm font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Ingresar a Consola
                  </button>
                </form>

                {/* Demonstration helper note */}
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm flex gap-3 text-[11px] leading-relaxed select-none">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-black stroke-[1.5]" />
                  <div>
                    <span className="font-extrabold text-black block uppercase tracking-wider">
                      Credenciales de Demostración
                    </span>
                    <span className="text-gray-500 font-normal">
                      Usuario: <code className="font-bold text-black bg-gray-200 px-1 py-0.5 rounded-xs">admin</code> / Contraseña: <code className="font-bold text-black bg-gray-200 px-1 py-0.5 rounded-xs">admin</code>
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
