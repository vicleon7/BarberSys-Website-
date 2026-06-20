import { useState } from "react";
import { services, Service } from "../types";
import { Scissors, Smile, Disc, Star, Sparkles, Box, Check, CalendarDays } from "lucide-react";
import { motion } from "motion/react";

interface ServiciosViewProps {
  setTab: (tab: string) => void;
  setSelectedServiceId: (serviceId: string | null) => void;
}

export default function ServiciosView({ setTab, setSelectedServiceId }: ServiciosViewProps) {
  const [filter, setFilter] = useState<"all" | "cut" | "beard" | "facial" | "pack">("all");

  const filteredServices = services.filter((s) => {
    if (filter === "all") return true;
    return s.category === filter;
  });

  const getIcon = (cat: string) => {
    switch (cat) {
      case "cut":
        return <Scissors className="w-5 h-5" />;
      case "beard":
        return <Smile className="w-5 h-5" />;
      case "facial":
        return <Sparkles className="w-5 h-5" />;
      case "pack":
        return <Box className="w-5 h-5" />;
      default:
        return <Scissors className="w-5 h-5" />;
    }
  };

  const handleBookService = (service: Service) => {
    setSelectedServiceId(service.id);
    setTab("reserva");
  };

  const filterButtons = [
    { id: "all", label: "Todos los Servicios" },
    { id: "cut", label: "Cortes de Cabello" },
    { id: "beard", label: "Cuidado de Barba" },
    { id: "facial", label: "Tratamientos Faciales" },
    { id: "pack", label: "Packs Combinados" },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-grow max-w-7xl mx-auto px-6 py-12 space-y-12"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
          Catálogo & Precios
        </span>
        <h1 className="text-4xl font-extrabold text-black text-sans">
          Artesanía en Cada Detalle
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          Selección meticulosa de servicios diseñados para ofrecer estilo, relajación y la máxima precisión clínica capilar.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-2">
        {filterButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${
              filter === btn.id
                ? "bg-black text-white"
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {filteredServices.map((service, index) => {
          const isVip = service.price >= 40;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className={`p-6 border rounded-sm flex flex-col justify-between relative transition-shadow hover:shadow-md ${
                isVip ? "border-black/30 bg-gray-50" : "border-gray-200 bg-white"
              }`}
            >
              {service.category === "pack" && (
                <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-extrabold px-2.5 py-1 tracking-widest uppercase rounded-full">
                  Recomendado
                </span>
              )}
              {isVip && (
                <span className="absolute top-4 right-4 text-black flex items-center gap-1 text-[10px] font-extrabold bg-amber-100 px-2.5 py-1 tracking-widest uppercase rounded-full border border-amber-200">
                  <Star className="w-3 h-3 fill-black text-black" /> VIP EXPERIENCE
                </span>
              )}

              <div className="space-y-4">
                {/* Header item */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-black">
                    {getIcon(service.category)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-black text-sans">
                      {service.name}
                    </h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {service.duration} Min • {service.category === "cut" ? "Corte" : service.category === "beard" ? "Barba" : service.category === "facial" ? "Facial" : "Pack"}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              {/* Action pricing or scheduling */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center bg-transparent">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 block uppercase tracking-wider">
                    Precio total
                  </span>
                  <span className="text-2xl font-black text-black">
                    {service.price}€
                  </span>
                </div>

                <button
                  onClick={() => handleBookService(service)}
                  className="bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-sm transition-all flex items-center gap-2 active:scale-95"
                >
                  <CalendarDays className="w-4 h-4" />
                  Reservar este Pack
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Satisfaction note banner */}
      <div className="p-8 border border-gray-200 bg-white rounded-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-black text-lg">¿Buscando un estilo personalizado completo?</h4>
          <p className="text-sm text-gray-500 leading-relaxed font-normal">
            Todos nuestros paquetes VIP incluyen una consulta de diagnóstico morfológico capilar.
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedServiceId("pack-1");
            setTab("reserva");
          }}
          className="bg-black text-white px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors w-full md:w-auto text-center"
        >
          Agendar Pack de Lujo
        </button>
      </div>
    </motion.div>
  );
}
