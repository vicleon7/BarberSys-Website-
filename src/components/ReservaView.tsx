import { useState, useEffect, FormEvent } from "react";
import { Service, Barber, Booking, services, barbers } from "../types";
import { Check, Scissors, Smile, Calendar, Clock, Contact, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReservaViewProps {
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  addNewBooking: (booking: Booking) => void;
  setTab: (tab: string) => void;
}

export default function ReservaView({
  selectedServiceId,
  setSelectedServiceId,
  addNewBooking,
  setTab,
}: ReservaViewProps) {
  const [step, setStep] = useState(1);

  // Core wizard states
  const [chosenService, setChosenService] = useState<Service | null>(null);
  const [chosenBarber, setChosenBarber] = useState<Barber | null>(null);
  const [chosenDate, setChosenDate] = useState("");
  const [chosenTime, setChosenTime] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [justCreatedBooking, setJustCreatedBooking] = useState<Booking | null>(null);

  // If selectedServiceId is preselected, auto-load chosenService and jump to Barber stage or stay at Step 1
  useEffect(() => {
    if (selectedServiceId) {
      const match = services.find((s) => s.id === selectedServiceId);
      if (match) {
        setChosenService(match);
        // Let's stay on step 1 so they can see what they selected or jump to step 2 directly to make it super fast!
        setStep(2);
      }
    }
  }, [selectedServiceId]);

  // Handle next button
  const handleNextStep = () => {
    if (step === 1 && !chosenService) return;
    if (step === 2 && !chosenBarber) return;
    if (step === 3 && (!chosenDate || !chosenTime)) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  // Submit booking
  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!chosenService || !chosenBarber || !chosenDate || !chosenTime || !clientName || !clientEmail || !clientPhone) return;

    const newRes: Booking = {
      id: "booking_" + Math.random().toString(36).substr(2, 9),
      clientName,
      clientEmail,
      clientPhone,
      serviceId: chosenService.id,
      serviceName: chosenService.name,
      servicePrice: chosenService.price,
      barberId: chosenBarber.id,
      barberName: chosenBarber.name,
      date: chosenDate,
      time: chosenTime,
      status: "Pendiente"
    };

    addNewBooking(newRes);
    setJustCreatedBooking(newRes);
    setShowSuccessModal(true);

    // Reset fields
    setStep(1);
    setChosenService(null);
    setChosenBarber(null);
    setChosenDate("");
    setChosenTime("");
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setSelectedServiceId(null);
  };

  // Available slots array
  const activeHours = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow max-w-4xl mx-auto px-6 py-12 space-y-8"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
          Sistema de Citas
        </span>
        <h1 className="text-3xl font-extrabold text-black tracking-tight text-sans">
          Reserva tu Experiencia
        </h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
          Sigue los pasos secuenciales a continuación para agendar fecha y especialista en un par de clics.
        </p>
      </div>

      {/* Progress timeline Tracker */}
      <div className="flex justify-between items-center max-w-lg mx-auto relative px-2 bg-transparent select-none">
        {/* Gray progress background track bar */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 -z-10" />

        <div
          className="absolute top-1/2 left-0 h-0.5 bg-black -translate-y-1/2 -z-10 transition-all transition-duration-300"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />

        {[
          { id: 1, label: "Servicio", icon: <Scissors className="w-3.5 h-3.5" /> },
          { id: 2, label: "Barbero", icon: <Smile className="w-3.5 h-3.5" /> },
          { id: 3, label: "Agenda", icon: <Calendar className="w-3.5 h-3.5" /> },
          { id: 4, label: "Datos", icon: <Contact className="w-3.5 h-3.5" /> },
        ].map((node) => (
          <div key={node.id} className="flex flex-col items-center gap-1.5 bg-white px-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center border font-bold text-xs transition-all ${
                step >= node.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-400 border-gray-200"
              }`}
            >
              {step > node.id ? <Check className="w-4 h-4" /> : node.icon}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= node.id ? "text-black" : "text-gray-400"}`}>
              {node.label}
            </span>
          </div>
        ))}
      </div>

      {/* Active wizard stage panel Card */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-sm">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="space-y-6"
            >
              <h3 className="font-extrabold text-base text-black border-l-4 border-black pl-3 select-none">
                Paso 1: Selecciona el Servicio
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => {
                  const isMatch = chosenService?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setChosenService(s)}
                      className={`p-4 border rounded-sm cursor-pointer transition-all flex flex-col justify-between ${
                        isMatch
                          ? "border-black bg-gray-50 ring-1 ring-black/10"
                          : "border-gray-200 hover:border-black/50"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-black leading-snug">{s.name}</h4>
                          {isMatch && <span className="w-4 h-4 bg-black text-white rounded-full flex items-center justify-center text-[9px]">✓</span>}
                        </div>
                        <p className="text-xs text-gray-500 font-normal leading-relaxed line-clamp-2">
                          {s.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-3 text-xs text-gray-400 font-bold">
                        <span>{s.duration} MIN</span>
                        <span className="text-sm font-black text-black">{s.price}€</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="space-y-6"
            >
              <h3 className="font-extrabold text-base text-black border-l-4 border-black pl-3 select-none">
                Paso 2: Elige el Especialista
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {barbers.map((b) => {
                  const isMatch = chosenBarber?.id === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setChosenBarber(b)}
                      className={`p-5 border rounded-sm cursor-pointer transition-all flex flex-col items-center text-center space-y-4 ${
                        isMatch
                          ? "border-black bg-gray-50 ring-1 ring-black/10"
                          : "border-gray-200 hover:border-black/50"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={b.imageUrl}
                          alt={b.name}
                          className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-xs select-none"
                          referrerPolicy="no-referrer"
                        />
                        {isMatch && (
                          <span className="absolute bottom-0 right-0 w-6 h-6 bg-black text-white border border-white rounded-full flex items-center justify-center text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-black">{b.name}</h4>
                        <p className="text-xs text-gray-400 font-medium">{b.specialty}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="space-y-6"
            >
              <h3 className="font-extrabold text-base text-black border-l-4 border-black pl-3 select-none">
                Paso 3: Fecha y Horario
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Datepicker side */}
                <div className="md:col-span-6 space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                    Selecciona Fecha
                  </label>
                  <input
                    type="date"
                    required
                    value={chosenDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setChosenDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-sm p-3.5 text-sm outline-none focus:border-black text-black font-sans bg-white"
                  />
                  <p className="text-[10px] text-gray-400">
                    * Atendemos de Lunes a Sábado de 09:00 a 20:00 h.
                  </p>
                </div>

                {/* Clock slot side */}
                <div className="md:col-span-6 space-y-3">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                    Horas de Turno Disponibles
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {activeHours.map((hour) => {
                      const isMatch = chosenTime === hour;
                      return (
                        <button
                          key={hour}
                          type="button"
                          onClick={() => setChosenTime(hour)}
                          className={`py-2 text-xs font-bold rounded-sm border transition-all ${
                            isMatch
                              ? "bg-black text-white border-black"
                              : "bg-white text-gray-700 border-gray-200 hover:border-black"
                          }`}
                        >
                          {hour}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="space-y-6"
            >
              <h3 className="font-extrabold text-base text-black border-l-4 border-black pl-3 select-none">
                Paso 4: Datos de Contacto
              </h3>
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full text-sm border-b border-gray-200 py-1.5 outline-none focus:border-black transition-all font-sans text-black"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Teléfono Celular
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. +34 600 000 000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full text-sm border-b border-gray-200 py-1.5 outline-none focus:border-black transition-all font-sans text-black"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="juan@correo.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full text-sm border-b border-gray-200 py-1.5 outline-none focus:border-black transition-all font-sans text-black"
                  />
                </div>

                <div className="sm:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-colors shadow-sm"
                  >
                    Confirmar Reservación de Cita
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Footer Control Buttons (Visible for Steps 1, 2, 3) */}
        {step < 4 && (
          <div className="flex justify-between items-center border-t border-gray-100 mt-8 pt-6 bg-transparent">
            <button
              disabled={step === 1}
              onClick={handlePrevStep}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider hover:text-black transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>

            <button
              onClick={handleNextStep}
              disabled={
                (step === 1 && !chosenService) ||
                (step === 2 && !chosenBarber) ||
                (step === 3 && (!chosenDate || !chosenTime))
              }
              className="bg-black hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none text-white px-6 py-2.5 rounded-sm text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Success Modal confirmation panel */}
      <AnimatePresence>
        {showSuccessModal && justCreatedBooking && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[200]"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-[201] m-auto max-w-md h-fit bg-white p-8 rounded-sm shadow-2xl space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-black tracking-tight">¡Cita Solicitada!</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-normal">
                  Tu reservación ha sido generada con éxito de manera pendiente en nuestro sistema local.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="border border-gray-200 p-4 rounded-sm bg-gray-50 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">Servicio:</span>
                  <span className="font-bold text-black">{justCreatedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">Barbero:</span>
                  <span className="font-bold text-black">{justCreatedBooking.barberName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 uppercase font-bold">Horario:</span>
                  <span className="font-bold text-black">{justCreatedBooking.date} / {justCreatedBooking.time}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-bold text-sm">
                  <span className="text-black uppercase">Total a pagar:</span>
                  <span className="text-black font-black">{justCreatedBooking.servicePrice}€</span>
                </div>
              </div>

              <div className="space-y-2 Pt-2">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setTab("acceso");
                  }}
                  className="w-full bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-widest py-3 rounded-sm shadow-sm transition-all"
                >
                  Ver mis Reservas en Acceso
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full text-center text-gray-500 hover:text-black font-bold uppercase tracking-wider text-[10px] transition-colors"
                >
                  Volver al Inicio
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
