import { useState, useMemo } from "react";
import { products, Product, CartItem } from "../types";
import { Search, SlidersHorizontal, Star, ShoppingBag, Check, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TiendaViewProps {
  addToCart: (product: Product) => void;
}

export default function TiendaView({ addToCart }: TiendaViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [notification, setNotification] = useState<string | null>(null);

  const categories = ["Todos", "Ceras", "Aceites", "Champús", "Sets de Regalo", "Accesorios", "Tratamientos"];

  // Full processing pipelines using useMemo
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by category
    if (selectedCategory !== "Todos") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification(`¡Se añadió ${product.name} al carrito!`);
    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow max-w-7xl mx-auto px-6 py-12 space-y-8 relative"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-sm shadow-xl flex items-center gap-2 border border-white/10"
          >
            <Check className="w-4 h-4 text-white" />
            <span className="text-xs font-bold uppercase tracking-wider">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header layout */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-gray-200 pb-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
            Cuidado Premium
          </span>
          <h1 className="text-4xl font-extrabold text-black text-sans">
            La Tienda BarberSys
          </h1>
          <p className="text-sm text-gray-500 max-w-sm font-normal leading-relaxed">
            Navega por nuestro catálogo curado de productos premium utilizados clínicamente por nuestros barberos.
          </p>
        </div>

        {/* Searching and Sorting Controls */}
        <div className="flex flex-col sm:flex-row gap-3 min-w-[320px] md:min-w-[450px]">
          {/* Search container */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-sm outline-none focus:border-black font-sans text-black"
            />
          </div>

          {/* Sort selection */}
          <div className="relative min-w-[170px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-4 pr-8 py-2.5 text-sm border border-gray-200 rounded-sm appearance-none outline-none focus:border-black font-sans text-black bg-white"
            >
              <option value="default">Novedades</option>
              <option value="price-asc">Precio: Bajo a Alto</option>
              <option value="price-desc">Precio: Alto a Bajo</option>
            </select>
            <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Tabs list */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none scroll-smooth">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold border rounded-full transition-all uppercase tracking-wider shrink-0 ${
              selectedCategory === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-500 border-gray-200 hover:text-black hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products list grid */}
      {processedProducts.length === 0 ? (
        <div className="text-center py-24 space-y-3">
          <p className="text-lg font-bold text-gray-800">No se encontraron productos</p>
          <p className="text-sm text-gray-400">Intenta modificando tu término de búsqueda o la categoría seleccionada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedProducts.map((p, index) => (
            <motion.div
              layoutId={`product-card-${p.id}`}
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white border border-gray-200 rounded-px overflow-hidden flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative bg-gray-50 aspect-[4/5] border-b border-gray-100 overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />

                {/* Left floating Tag */}
                {p.tag && (
                  <span className="absolute top-4 left-4 bg-black text-white text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1.5 rounded-sm">
                    {p.tag}
                  </span>
                )}

                {/* Rating floating tag */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-sm border border-gray-200 text-xs font-bold text-black">
                  <Star className="w-3 h-3 text-black fill-black" />
                  <span>{p.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Data block */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block">
                    {p.category}
                  </span>
                  <h3 className="font-extrabold text-base text-black group-hover:text-black mt-0.5 leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-normal leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-black text-black">
                    {p.price.toFixed(2)}€
                  </span>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="p-3 bg-black hover:bg-gray-800 rounded-sm text-white transition-all hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider px-1">Comprar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
