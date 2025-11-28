export const Loading = () => {
  return (
    // CONTENEDOR DE PANTALLA COMPLETA (Superposición)
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div
        className="bg-[#ffe082] border-4 border-gray-800 p-8 rounded-xl w-72 md:w-80 
                   shadow-[8px_8px_0_#333] 
                   transform transition-transform duration-300 
                   relative overflow-hidden animate-none" // Deshabilitamos el hover:scale en el contenedor principal
      >
        {/* FONDO ANIMADO DE RAYAS (Patrón de carga) */}
        <div
          className="absolute inset-0 opacity-20 animate-[pulse-stripes_1.5s_infinite_linear]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)",
            backgroundSize: "20px 20px", // Hacemos el patrón más grande
          }}
        ></div>

        <h1 className="text-3xl font-black text-gray-800 mb-2 relative z-10 text-center">
          <span className="inline-block animate-pulse">⏳ CARGANDO...</span>
        </h1>

        <p className="text-gray-700 text-sm relative z-10 text-center">
          ¡Ajustando píxeles y cargando datos!
        </p>

        {/* BARRA DE PROGRESO */}
        <div className="mt-5 h-3 bg-gray-800 rounded-full overflow-hidden relative z-10">
          <div className="h-full bg-[#ffc909] w-full animate-[progress_1.5s_infinite_ease-in-out]"></div>
        </div>

        {/* ESTILOS DE ANIMACIÓN */}
        <style>{`
          @keyframes progress {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes pulse-stripes {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.1; }
          }
        `}</style>
      </div>
    </div>
  );
};
