import Image from 'next/image';

export default function Home() {
  return (
    <section className="w-full h-full py-4 md:py-8">
      <div className="h-full flex items-center flex-col md:flex-row md:justify-between gap-8 md:gap-12">
        {/* Texto informativo */}
        <div className="w-full md:w-[40%] flex flex-col gap-4">
          <h1 className="text-3xl md:text-5xl font-medium !leading-tight">
            Conviértete en el zorro más astuto de todos
          </h1>
          <div className="hidden md:flex items-center gap-4">
            <span className="bg-gradient-to-b from-red-color-1 to-red-color-2 p-4 rounded-2xl">
              <Image
                src="/trophy.svg"
                width={36}
                height={36}
                alt="Compite, predice y demuestra tu instinto ganador"
              />
            </span>
            <p className="text-xl font-medium">
              Compite, predice y demuestra tu instinto ganador
            </p>
          </div>
          <p className="hidden md:block text-xl mt-2 opacity-60">
            Un reto único en el que tu intuición es la clave del éxito. ¿Estás
            listo para ser el gran zorro?
          </p>
        </div>
        {/* Videotutorial */}
        <div className="bg-white w-full min-h-[300px] md:w-[60%] md:h-[400px] rounded-md md:rounded-xl"></div>
      </div>
    </section>
  );
}
