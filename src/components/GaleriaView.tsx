import { useState } from "react";
import { galleryItems, GalleryItem } from "../types";
import { Lock, X, PlayCircle, Eye, CalendarDays, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GaleriaViewProps {
  setTab: (tab: string) => void;
  setSelectedServiceId: (serviceId: string | null) => void;
}

export default function GaleriaView({ setTab, setSelectedServiceId }: GaleriaViewProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Auto matching style category to actual service book id
  const getMatchedServiceId = (tag: string) => {
    const lowercaseTag = tag.toLowerCase();
    if (lowercaseTag.includes("fade") || lowercaseTag.includes("crop")) {
      return "cut-2"; // Degradado (Fade)
    } else if (lowercaseTag.includes("barba") || lowercaseTag.includes("sculpt")) {
      return "beard-1"; // Arreglo de Barba
    } else {
      return "cut-1"; // Corte Clásico
    }
  };

  const handleBookStyle = (item: GalleryItem) => {
    const matchedId = getMatchedServiceId(item.tag);
    setSelectedServiceId(matchedId);
    setSelectedPhoto(null);
    setTab("reserva");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow max-w-7xl mx-auto px-6 py-12 space-y-12"
    >
      {/* Page Title Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
          Inspiración de Estilos
        </span>
        <h1 className="text-4xl font-extrabold text-black text-sans">
          Galería de Diseños de Autor
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          Haz clic en cualquier corte para ver detalles, productos recomendados para peinarlo e instrucciones de cuidado antes de agendar.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5 auto-rows-[220px] md:auto-rows-[250px]">
        {galleryItems.map((item, index) => {
          // Layout configurations for bento grid rhythm
          let gridClass = "md:col-span-4 md:row-span-1"; // default square
          if (index === 0) gridClass = "md:col-span-4 md:row-span-2"; // tall vertical
          if (index === 1) gridClass = "md:col-span-8 md:row-span-1"; // wide horizontal
          if (index === 4) gridClass = "md:col-span-8 md:row-span-1"; // wide horizontal
          if (index === 5) gridClass = "md:col-span-4 md:row-span-2"; // tall vertical

          return (
            <motion.div
              layoutId={`gallery-card-${item.id}`}
              onClick={() => setSelectedPhoto(item)}
              key={item.id}
              whileHover={{ scale: 1.012 }}
              className={`${gridClass} bg-white relative overflow-hidden rounded-sm border border-gray-200 cursor-pointer group shadow-sm flex flex-col justify-end`}
            >
              {/* Image background with modern lazy setup */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />

              {/* Tag overlay */}
              <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-sm border border-white/20">
                {item.tag}
              </span>

              {/* View helper */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-black/60 rounded-full text-white">
                <Eye className="w-4 h-4" />
              </div>

              {/* Details footer */}
              <div className="relative p-6 space-y-1 text-white select-none">
                <h3 className="font-extrabold text-lg tracking-tight truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-white/70">
                  Modelo: <span className="font-medium">{item.model}</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Lightbox / Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/95 z-[120]"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`gallery-card-${selectedPhoto.id}`}
              className="fixed inset-y-0 right-0 max-w-2xl w-full bg-white z-[121] flex flex-col h-full shadow-2xl overflow-y-auto"
            >
              {/* Close Button top element */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                  Detalles del Estilo Seleccionado
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 hover:bg-gray-200 rounded-full text-gray-500 hover:text-black transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Hero Image */}
              <div className="relative h-[400px] w-full bg-gray-100 border-b border-gray-100">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-6 left-6 bg-black text-white text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-2.5 rounded-sm">
                  {selectedPhoto.tag}
                </span>
              </div>

              {/* Body elements */}
              <div className="p-8 space-y-6 flex-1">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                    Modelo de Inspiración: {selectedPhoto.model}
                  </span>
                  <h2 className="text-3xl font-extrabold text-black tracking-tight text-sans">
                    {selectedPhoto.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed font-normal">
                    {selectedPhoto.description}
                  </p>
                </div>

                {/* Structured Fit Chart */}
                <div className="border border-gray-200 rounded-sm p-4 bg-gray-50 space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-black mb-1.5 border-b border-gray-200 pb-1.5">
                    Especificaciones y Recomendaciones
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Para Rostros De Forma
                      </span>
                      <p className="text-xs font-semibold text-black mt-0.5">
                        {selectedPhoto.tag.includes("Taper") ? "Ovalado, Diamante o Cuadrado estructurado" : selectedPhoto.tag.includes("Beard") ? "Alarga caras redondas, estiliza rasgos suaves" : "Universal (Alta adaptabilidad)"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Producto Recomendado Para Peinar
                      </span>
                      <p className="text-xs font-semibold text-black mt-0.5">
                        {selectedPhoto.tag.includes("Taper") ? "Cera Matte Finish Wax (Efecto seco natural)" : selectedPhoto.tag.includes("Slick") ? "Pomada de fijación brillante aspecto húmedo" : "Aceite Sandalwood Beard Oil"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Integration button */}
                <div className="pt-4">
                  <button
                    onClick={() => handleBookStyle(selectedPhoto)}
                    className="w-full bg-black text-white hover:bg-gray-800 py-4 font-bold text-sm uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
                  >
                    <CalendarDays className="w-5 h-5" />
                    Agendar Cita con este Estilo
                  </button>
                  <p className="text-[11px] text-gray-400 text-center mt-2">
                    * El barbero adaptará el estilo de la fotografía mofológicamente a tus facciones.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
