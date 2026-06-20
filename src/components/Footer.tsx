import { Mail, Phone, MapPin, Space } from "lucide-react";

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-black text-white py-16 border-t border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand block info */}
        <div className="space-y-4">
          <h3
            onClick={() => setTab("inicio")}
            className="text-2xl font-black tracking-tight cursor-pointer select-none"
          >
            BarberSys
          </h3>
          <p className="text-xs text-gray-400 font-normal leading-relaxed max-w-xs">
            Unimos la precisión de la medicina clínica capilar con la maestría de la barbería tradicional.
          </p>
        </div>

        {/* Links block 1 */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#a8a29e]">
            Menú de Enlaces
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
            <li>
              <button onClick={() => setTab("inicio")} className="hover:text-white transition-colors">
                Inicio Principal
              </button>
            </li>
            <li>
              <button onClick={() => setTab("servicios")} className="hover:text-white transition-colors">
                Servicios & Precios
              </button>
            </li>
            <li>
              <button onClick={() => setTab("galeria")} className="hover:text-white transition-colors">
                Galería de Cortes
              </button>
            </li>
            <li>
              <button onClick={() => setTab("tienda")} className="hover:text-white transition-colors">
                Tienda de Productos
              </button>
            </li>
          </ul>
        </div>

        {/* Hour specs */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#a8a29e]">
            Horario de Atención
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-400 font-semibold leading-relaxed">
            <li>
              <span className="block text-[10px] text-gray-500 font-bold uppercase leading-none">Lunes a Viernes</span>
              <span>09:00 - 20:00 h</span>
            </li>
            <li>
              <span className="block text-[10px] text-gray-500 font-bold uppercase leading-none">Sábados</span>
              <span>09:00 - 18:00 h</span>
            </li>
            <li>
              <span className="block text-[10px] text-gray-500 font-bold uppercase leading-none">Domingos</span>
              <span className="text-red-400">Cerrado</span>
            </li>
          </ul>
        </div>

        {/* Contact Specs */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#a8a29e]">
            Contacto Directo
          </h4>
          <ul className="space-y-3 text-xs text-gray-400 font-medium">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500 shrink-0" />
              <span>+34 912 345 678</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500 shrink-0" />
              <span>contacto@barbersys.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Paseo de la Castellana 45, Madrid</span>
            </li>
          </ul>
        </div>
      </div>

      {/* copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-medium">
        <span>© {new Date().getFullYear()} BarberSys Precision Lab. Todos los derechos reservados.</span>
        <span>Tecnología contemporánea de reserva de estilo.</span>
      </div>
    </footer>
  );
}
