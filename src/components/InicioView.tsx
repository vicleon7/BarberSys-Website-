import { Scissors, Smile, Sparkles, Clock, Award, ArrowRight, Quote, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface InicioViewProps {
  setTab: (tab: string) => void;
}

export default function InicioView({ setTab }: InicioViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const servicesQuick = [
    {
      icon: <Scissors className="w-6 h-6 text-black" />,
      title: "Corte de Autor",
      desc: "Análisis morfológico y corte personalizado ejecutado con herramientas de máxima precisión.",
      price: "Desde 35€",
    },
    {
      icon: <Smile className="w-6 h-6 text-black" />,
      title: "Ritual de Barba",
      desc: "Esculpido y perfilado con toallas calientes y aceites esenciales para una piel impecable.",
      price: "Desde 25€",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-black" />,
      title: "Cuidado Facial",
      desc: "Tratamiento revitalizante express para eliminar impurezas y recuperar la luminosidad natural.",
      price: "Desde 20€",
    },
  ];

  const testimonials = [
    {
      quote: "La atención al detalle es insuperable. No es solo un corte de pelo, es una experiencia de relajación total en un entorno espectacular.",
      name: "Carlos Rodriguez",
      role: "Cliente habitual",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvVIBThWd7llxh_twpr3cIHyWGwSup-2npfmo01xgyTJblpGXRKrgBh51uHSNSCzK8T3Mzdi6PrlCNsHUIaEci9QBTlFhBCeC90hQKa8GmDoztBLCPCxymtmAS47N0p42oCK6B7EY7AdQbASds-x6TtjRlA1RsH3hGF7IwMgwifgXoVndQjH9Xl1xB0G_CeL7c9WYOyMHbFDZ2N29Huib_dQ4UHb-ZCVtl6sA2Hxrr37IyRkt5O0Q3kBl80grkloShHNM418fdGC4"
    },
    {
      quote: "Por fin una barbería que entiende el minimalismo. El sistema de reservas funciona a la perfección y el resultado es siempre consistente.",
      name: "Marc Jimenez",
      role: "Emprendedor",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFt2KFopQWKaYmlCebru9YJTWXq6hv8haZ9s3cPOm9_S7lnR50aHCL5xPpqPZjMi7V7JQ_LoVp9v382KnIXsTQmdIxy4ZihatShuVkzAPtqkdQJjC2CpEIPIhSx1wrRC6uLsfVIXH7MyfrH6_qmImRgiRWQUYZpzaBDVn-wxebeTCsXnABQK4LIJV42kUZD8z9EzUfOIKjq3oHzv4of6LPVsZxVaBWvh8CZRRqtRIit3i9YpK7xzPBKLALYaf_4uMgUkM5RqSb_vM"
    },
    {
      quote: "El ritual de barba es otro nivel. El ambiente es tan tranquilo que desconectas por completo del estrés diario. Altamente recomendado.",
      name: "David Lopez",
      role: "Director Creativo",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN-r2aI8dvnL06fzH3kFrkajjf7--trhdvZtwdKHhhZLBTHUzUaIL8LalBv5V5tPFHa0--HUkhZ0LJBUh087xjWkefl7UNTYjbv3i3GkCW23oamGCeftxxrAGn-m7pVEOfOO0sMDp7halqfJ13LO5Iiv9axYJ8DwaRWaQIuDGXRVTMtrYEf6ilzkVfwcYVA9WhP3Vln-uDf_VGhbx-6rJUjnz05KXs4nnnNbdzCZNfbG5DJ3tqWdWB89HLCEH-V7YNgqia7DmvOnc"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-grow space-y-20 pb-16"
    >
      {/* Hero Section */}
      <section className="relative min-h-[750px] flex items-center overflow-hidden bg-gray-50">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiFrzhuWZcGEhFUtE2IcuZkyCB7LXS8LFe_5d4j_ftRA7QOD5HawK7lR0Ro52rTNi7IXsl_axEgGex4xKWNsRHBwZJ62liONRhC9FKGHHzhIkDwUuhDDN_QiX9OBlaeLpkl45BzlNour76ulAHqtLVXeMWUKVQPaAubyT0jHfhNBlAsbe9_1bgpo2J_EeVMLxfOIfjPWX665E9Gvbk3KibsMBydvY_5ogj1JqvFmhw4ZkWWroHwFeRxfWNuZy0iQKQgKGkA_ZXLsA"
            alt="Barbería moderna"
            className="w-full h-full object-cover opacity-30 select-none"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient overlay to match Swiss precision */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 max-w-7xl mx-auto py-16">
          <motion.div variants={itemVariants} className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight tracking-tight text-sans">
              Maestros de la Barbería Moderna
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-xl font-normal leading-relaxed">
              Cortes de precisión y cuidado personal en un ambiente contemporáneo diseñado para el hombre de hoy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setTab("reserva")}
                className="bg-black text-white px-8 py-4 rounded-sm text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Reserva tu Cita
                <Calendar className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={() => setTab("servicios")}
                className="border border-black text-black px-8 py-4 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-all"
              >
                Ver Servicios
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services firma */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
            Excelencia
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-black text-sans">
            Servicios de Firma
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesQuick.map((s, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-sm border border-gray-200 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-black text-sans">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-black">{s.price}</span>
                <button
                  onClick={() => setTab("servicios")}
                  className="text-xs font-bold text-black hover:underline flex items-center gap-1"
                >
                  Ver Detalles <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bento Grid Feature */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
            {/* Big image block */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-8 md:row-span-2 relative overflow-hidden rounded-sm border border-gray-200 shadow-sm"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjpO_gteIizwv-m3tbwDyO_3W4s-bJ2VnE6PYJgLiTBYPxLfA5SZMuPUizjOQ70zyxfxx6jmq9AOny5Va8MBzdHuj5ojKU-yS33pbSEEbqLyf3URwRZJtiEsDeGBVaQ6E2A6lsjFXBv7ppiBw2OjELz_UerJyG9JKD2GDztdXhw4uA5_iI1r4k_TLHu71fA8c3xjL_Mo2Q4N14pNniogjnlteEziYgR06mRe0lTvP6xiEzIK75mvfaRE1X_KFwR0NUQD6uA9BHU1w"
                alt="Técnica de precisión"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 space-y-2">
                <h3 className="text-white text-2xl font-bold tracking-tight">
                  Precisión Milimétrica
                </h3>
                <p className="text-white/80 text-sm max-w-lg leading-relaxed">
                  Utilizamos tecnología de vanguardia para asegurar resultados que rozan la perfección.
                </p>
              </div>
            </motion.div>

            {/* Side Block 1 */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-4 md:row-span-1 bg-white p-8 rounded-sm border border-gray-200 shadow-sm flex flex-col justify-center space-y-2"
            >
              <div className="flex items-center gap-2 text-black mb-1">
                <Clock className="w-5 h-5" />
                <h4 className="text-lg font-bold">Sin Esperas</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed font-normal">
                Gestión inteligente de citas para respetar tu tiempo al máximo. Comprometidos con tu puntualidad.
              </p>
            </motion.div>

            {/* Side Block 2 */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-4 md:row-span-1 bg-black text-white p-8 rounded-sm shadow-sm flex flex-col justify-center space-y-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-white" />
                <h4 className="text-lg font-bold">Certificados</h4>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                Barberos titulados de academia de élite con formación internacional de barberos maestros continua.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-black text-sans">
            Opiniones de Clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white p-8 border border-gray-200 rounded-sm shadow-sm flex flex-col justify-between relative relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-100 rotate-180" />
              <div className="space-y-6">
                <p className="text-sm italic text-gray-600 leading-relaxed font-normal">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                  <img
                    src={t.imgUrl}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-100 select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-sm font-bold text-black">{t.name}</div>
                    <div className="text-xs text-gray-400 font-medium">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
