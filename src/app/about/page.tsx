import Hero from '@components/Hero';

const AboutPage = () => {
  return (
    <>
      <Hero
        title="Acerca de 'El Gran Zorro'"
        description="Conoce más sobre nuestra misión, visión y la historia detrás de El Gran Zorro."
        image="about"
      />
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">1. Nuestra Visión</h2>
          <p>
            En El Gran Zorro, aspiramos a ser el principal aliado de los
            entusiastas de las apuestas deportivas y el fútbol de fantasía,
            destacándonos como una plataforma innovadora, segura y rentable.
            Nuestra visión es revolucionar la forma en que se percibe el mundo
            de las apuestas, creando una experiencia única donde la emoción
            deportiva y las oportunidades de ganancias reales se combinan.
            Queremos redefinir la relación de nuestros jugadores con el deporte,
            permitiéndoles disfrutar y prosperar en un entorno transparente y
            lleno de emoción.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">2. Nuestra Misión</h2>
          <p>
            Nos comprometemos a ser el motor que impulsa la pasión y el
            conocimiento de nuestros jugadores, ofreciendo una experiencia que
            va más allá de las apuestas tradicionales. En El Gran Zorro, los
            jugadores pueden transformar su experiencia y comprensión del
            deporte en ganancias tangibles y emocionantes. Fomentamos una
            comunidad dinámica y colaborativa en la que la imaginación y la
            estrategia se fusionan para crear historias memorables y
            oportunidades reales de éxito.
          </p>
          <p>
            Estamos dedicados a proporcionar una plataforma vibrante, innovadora
            y de alta calidad, que se convierta en el destino preferido de los
            amantes del fútbol y de las apuestas. Nos esforzamos por inspirar a
            nuestros jugadores a soñar en grande, disfrutar del juego de una
            manera completamente nueva, y vivir la emoción de cada partido como
            una oportunidad para ganar. Nuestra misión también incluye el
            compromiso con la seguridad y la equidad, estableciendo nuevos
            estándares en la industria para brindar experiencias de juego
            justas, entretenidas y memorables.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">3. Lo que nos define</h2>
          <p>
            El Gran Zorro se posiciona como mucho más que una plataforma de
            apuestas. Representamos una fuente de inspiración y entretenimiento
            donde creatividad y pasión se encuentran. Nos esforzamos por ofrecer
            una experiencia innovadora y justa, en la que cada jugador tiene la
            oportunidad de ganar y disfrutar del fútbol de una manera única y
            emocionante. Además, mantenemos un compromiso firme con la seguridad
            y la excelencia en cada aspecto de la experiencia de juego.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">4. ¿Por qué El Gran Zorro?</h2>
          <p>
            En El Gran Zorro, celebramos la pasión por el fútbol y promovemos
            una participación activa y vibrante en cada uno de nuestros torneos
            virtuales. Nos enorgullece ser una comunidad donde la competencia y
            el espíritu de equipo prosperan, ofreciendo oportunidades
            emocionantes para que nuestros jugadores disfruten, se conecten y se
            desafíen mutuamente.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
