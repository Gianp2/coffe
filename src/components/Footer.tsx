import React, { useState } from 'react';
import { useMenu } from '../context/MenuContext';
import { 
  Coffee, 
  Wifi, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  CreditCard, 
  Sparkles, 
  Check, 
  Copy, 
  ArrowUp,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, categories, setActiveCategory, showToast } = useMenu();
  const [copiedWifi, setCopiedWifi] = useState(false);

  const handleCopyWifi = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(settings.wifiPassword);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = settings.wifiPassword;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setCopiedWifi(true);
      showToast('Clave de Wi-Fi copiada: ' + settings.wifiPassword, 'success');
      setTimeout(() => setCopiedWifi(false), 2500);
    } catch (err) {
      console.error('Error al copiar Wi-Fi:', err);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  };

  return (
    <footer 
      id="app-footer" 
      className="min-h-screen w-full bg-[#180F0B] text-[#F9F6F0] border-t border-[#3A271D] flex flex-col justify-between pt-16 pb-12 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background Decorative Ambient Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#8B4513]/20 via-[#D4A373]/5 to-transparent blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center space-y-12 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#281A13] border border-[#523A2B] text-[#D4A373] shadow-lux">
            <Coffee className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4A373] uppercase block mb-1.5">
              Cafetería & Obrador
            </span>
            <h2 className="font-serif-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F9F6F0] tracking-tight">
              {settings.name}
            </h2>
            <p className="font-editorial italic text-base text-[#D4C3B3] mt-1.5">
              {settings.tagline}
            </p>
          </div>

          <p className="text-xs leading-relaxed text-[#B8A696] max-w-md mx-auto pt-1">
            Seleccionamos microlotes de café de altura tostados semanalmente y horneamos a diario piezas de masa madre, pastelería artesanal y opciones conscientes.
          </p>
        </div>

        {/* Organized Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Wi-Fi Clientes */}
          <div 
            id="footer-card-wifi"
            className="p-5 rounded-2xl bg-[#241711]/90 border border-[#452F22] flex flex-col justify-between space-y-4 hover:border-[#D4A373]/50 transition-colors shadow-lux"
          >
            <div>
              <div className="flex items-center gap-2.5 text-[#D4A373] mb-3">
                <div className="p-2 rounded-xl bg-[#332017] text-[#D4A373]">
                  <Wifi className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F9F6F0]">
                  Wi-Fi Clientes
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-baseline justify-between text-[#C2B2A3]">
                  <span>Red:</span>
                  <span className="font-mono font-bold text-[#F9F6F0]">{settings.wifiSsid}</span>
                </div>
                <div className="flex items-baseline justify-between text-[#C2B2A3]">
                  <span>Clave:</span>
                  <span className="font-mono font-bold text-[#D4A373]">{settings.wifiPassword}</span>
                </div>
              </div>
            </div>

            <button
              id="btn-copy-wifi-pwd"
              onClick={handleCopyWifi}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-[#352117] hover:bg-[#472D1F] text-[#F9F6F0] border border-[#523A2B] transition-all cursor-pointer active:scale-98"
            >
              {copiedWifi ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#6BBF8C] stroke-[2.5]" />
                  <span className="text-[#6BBF8C]">Contraseña copiada</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Copiar contraseña</span>
                </>
              )}
            </button>
          </div>

          {/* Card 2: Horarios y Salón */}
          <div 
            id="footer-card-hours"
            className="p-5 rounded-2xl bg-[#241711]/90 border border-[#452F22] flex flex-col justify-between space-y-4 hover:border-[#D4A373]/50 transition-colors shadow-lux"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5 text-[#D4A373]">
                  <div className="p-2 rounded-xl bg-[#332017] text-[#D4A373]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F9F6F0]">
                    Horarios de Atención
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#1C3B2B] text-[#6BBF8C] border border-[#2B5640]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6BBF8C] animate-pulse" />
                  Abierto
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#C2B2A3]">
                <p className="font-medium text-[#F9F6F0]">{settings.hours}</p>
                <p className="text-[11px] text-[#A69382]">
                  Cocina y cafetería activa hasta 15 min antes del cierre.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#3A271D] text-[11px] text-[#8F7E70] flex items-center justify-between">
              <span>Mesas en salón & terraza</span>
              <span>Take-away disponible</span>
            </div>
          </div>

          {/* Card 3: Ubicación y Contacto */}
          <div 
            id="footer-card-location"
            className="p-5 rounded-2xl bg-[#241711]/90 border border-[#452F22] flex flex-col justify-between space-y-4 sm:col-span-2 lg:col-span-1 hover:border-[#D4A373]/50 transition-colors shadow-lux"
          >
            <div>
              <div className="flex items-center gap-2.5 text-[#D4A373] mb-3">
                <div className="p-2 rounded-xl bg-[#332017] text-[#D4A373]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F9F6F0]">
                  Ubicación & Contacto
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#C2B2A3]">
                <p className="text-[#F9F6F0] font-medium">{settings.address}</p>
                <div className="flex items-center gap-2 text-[11px] text-[#B8A696]">
                  <Phone className="w-3 h-3 text-[#D4A373] shrink-0" />
                  <span>{settings.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#B8A696]">
                  <Instagram className="w-3 h-3 text-[#D4A373] shrink-0" />
                  <span>{settings.instagram}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#3A271D] flex items-center justify-between text-[11px] text-[#A69382]">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3 h-3 text-[#D4A373]" />
                Todos los medios de pago
              </span>
              <span className="text-[#D4A373] font-medium">10% off efectivo</span>
            </div>
          </div>

        </div>

        {/* Quality Commitments / Compromisos de Calidad */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#20140E] border border-[#3A271D]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#170E09] border border-[#2E1D13] flex flex-col items-center">
              <Sparkles className="w-4 h-4 text-[#D4A373] mb-1" />
              <span className="text-[11px] font-bold text-[#F9F6F0]">Tueste Semanal</span>
              <span className="text-[10px] text-[#8F7E70]">Granos arábica seleccionados</span>
            </div>

            <div className="p-3 rounded-xl bg-[#170E09] border border-[#2E1D13] flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-[#D4A373] mb-1" />
              <span className="text-[11px] font-bold text-[#F9F6F0]">Opciones Sin TACC</span>
              <span className="text-[10px] text-[#8F7E70]">Elaboración cuidada</span>
            </div>

            <div className="p-3 rounded-xl bg-[#170E09] border border-[#2E1D13] flex flex-col items-center">
              <Coffee className="w-4 h-4 text-[#D4A373] mb-1" />
              <span className="text-[11px] font-bold text-[#F9F6F0]">Leches Vegetales</span>
              <span className="text-[10px] text-[#8F7E70]">Avena, almendra y campo</span>
            </div>

            <div className="p-3 rounded-xl bg-[#170E09] border border-[#2E1D13] flex flex-col items-center">
              <HeartHandshake className="w-4 h-4 text-[#D4A373] mb-1" />
              <span className="text-[11px] font-bold text-[#F9F6F0]">Masa Madre Propia</span>
              <span className="text-[10px] text-[#8F7E70]">Fermentación 24 a 48 hs</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Back to Top & Legal */}
      <div className="max-w-4xl mx-auto w-full pt-10 mt-8 border-t border-[#3A271D] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#C2B2A3]">
            {settings.name} • Carta Digital de Salón y Take-Away
          </p>
          <p className="text-[10px] text-[#806E61]">
            Precios expresados en moneda nacional argentina con IVA incluido. Prohibida su venta a menores de 18 años para bebidas con alcohol.
          </p>
        </div>

        <button
          id="btn-footer-back-to-top"
          onClick={handleScrollToTop}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#F9F6F0] bg-[#281A13] hover:bg-[#38251B] border border-[#523A2B] flex items-center gap-2 transition-all cursor-pointer shrink-0 active:scale-95 shadow-md"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>Volver al inicio</span>
        </button>
      </div>
    </footer>
  );
};
