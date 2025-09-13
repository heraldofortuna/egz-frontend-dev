import Hero from '@components/Hero';

const FaqPage = () => {
  return (
    <>
      <Hero
        title="Preguntas frecuentes"
        description="Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros productos, servicios, envíos y políticas."
        image="faq"
      />
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            1. ¿Cómo funciona el juego con partidos reales?
          </h2>
          <p>
            El juego permite participar en torneos de fantasía preestablecidos
            en la plataforma, donde se agrupan los jugadores registrados en cada
            torneo. Para unirse, es necesario contar con saldo en la cuenta y
            realizar el pago de inscripción, el cual varía entre 20, 50, 100 y
            200 Nuevos Soles, según la modalidad de juego seleccionada.
          </p>
          <p>
            El sistema de puntuación se basa en la predicción de resultados de
            los partidos que el juego asigna al jugador en sus enfrentamientos
            con otros jugadores. Existen cuatro tipos de predicciones, cada una
            otorgando diferentes puntajes: acertar el equipo ganador, el empate,
            o la derrota suma 1 punto, mientras que predecir el resultado exacto
            otorga 3 puntos. Si la predicción es incorrecta, no se recibe
            puntaje.
          </p>
          <p>
            En cada enfrentamiento, se presentan 3 partidos para que el jugador
            realice sus pronósticos, los cuales pueden hacerse hasta 15 minutos
            antes del inicio de cada partido.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            2. ¿Cómo se ganan premios en el juego?
          </h2>
          <p>
            Los premios son entregados a los jugadores que pasen la fase de
            grupos y las fases eliminatorias de cada torneo en el que
            participen, los premios varían dependiendo el tipo de torneo y están
            establecidos en la información de cada torneo, todos los premios son
            monetarios los cuales serán depositados en las cuentas de cada
            jugador.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            3. ¿Cómo se determinan los puntajes de los jugadores en el juego de
            fantasía?
          </h2>
          <p>
            Los puntos son asignados por encuentro ganado, empatado o perdido,
            si gana el encuentro contra otro jugador se le otorgaran 3 puntos,
            si empatan se les otorgara 1 punto y si pierde el encuentro no se
            habrá puntuación, claro esta que en fase eliminatoria no hay
            puntuación alguna y en caso de empate se le otorgara la victoria al
            jugador que haya realizado los pronósticos mas atrevidos y de
            igualar en este punto, se le dará la victoria al jugador que haya
            realizado su pronósticos con diferencia de tiempo anterior a su
            competidor.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            4. ¿Qué sucede si un partido se cancela o se pospone?
          </h2>
          <p>
            Según nuestras políticas sobre partidos cancelados o pospuestos, se
            le otorgara a cada jugador un punto para el encuentro que se
            encuentren disputando.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            5. ¿Cómo puedo depositar y retirar mi dinero de mi cuenta en la
            plataforma?
          </h2>
          <p>(En progreso)</p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            6. ¿Puedo cambiar el equipo que elegí para mi jugada después de que
            comience el partido?
          </h2>
          <p>
            Está completamente prohibido cambiar el equipo que elegiste para tu
            jugada una vez que el partido haya comenzado. Si cambias de opinión
            sobre tu pronóstico, puedes realizar modificaciones hasta 15 minutos
            antes del inicio del partido. Pasado este plazo, la jugada se
            bloqueará y ya no podrás hacer cambios.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            7. ¿Cuándo y cómo se pagan los premios ganados?
          </h2>
          <p>
            Los pagos se realizan en un plazo máximo de 24 horas después de la
            actualización final de la fase de grupos y/o fases eliminatorias. El
            equipo de soporte se pondrá en contacto con el campeón del torneo
            para coordinar la entrega de los premios correspondientes.{' '}
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            8. ¿Hay algún límite en la cantidad de dinero que puedo apostar?
          </h2>
          <p>
            El límite de apuesta está determinado por cada torneo, siendo de 20,
            50, 100 o 200 Nuevos Soles, según la modalidad de juego.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            9. ¿Hay algún límite de torneos en los que me puedo inscribir?
          </h2>
          <p>
            La plataforma no impone un límite en la cantidad de torneos en los
            que puedes participar. Sin embargo, es responsabilidad del jugador
            gestionar sus participaciones en los torneos en los que decida
            registrarse.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-3xl md:rounded-[32px] p-8 md:p-12">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            10. ¿Cómo puedo obtener ayuda si tengo algún problema o pregunta?
          </h2>
          <p>
            Si tienes alguna duda, puedes contactarnos a través de nuestro
            correo electrónico de servicio al cliente, proporcionando tus datos
            completos. También puedes llamarnos al número de atención al cliente
            992-608-303 o escribirnos por WhatsApp al +51 992-608-303.
          </p>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
