import Hero from '@components/Hero';

const TycPage = () => {
  return (
    <>
      <Hero
        title="Términos y Condiciones"
        description="Los 'Términos y Condiciones' de El gran Zorro explican las reglas de uso, derechos y responsabilidades de los usuarios en nuestra plataforma de apuestas deportivas"
        image="tyc"
      />
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">1. Alcance y Acceso</h2>
          <p>
            <span className="font-medium">1.1. Aplicabilidad: </span>Los
            presentes Términos y Condiciones (en adelante, los &quot;T&C&quot;)
            regulan el uso de la página web de El GRAN ZORRO (en adelante,
            &quot;EL GRAN ZORRO&quot;) y sus servicios asociados.
          </p>
          <p>
            <span className="font-medium">1.2. Acceso: </span>Para acceder a la
            Página y sus servicios, el usuario (en adelante, el
            &quot;Usuario&quot;) deberá ser mayor de edad en su país de
            residencia.
          </p>
          <p>
            <span className="font-medium">1.3. Registro: </span>El acceso para
            hacer uso de los servicios de la Página requiere de la creación de
            una cuenta por parte del Usuario. El Usuario deberá proporcionar
            información precisa y veraz al registrarse.
          </p>
          <p>
            <span className="font-medium">1.4. Territorio: </span>La pagina web
            solo estará disponible para usuarios que se encuentre en territorio
            peruano, de manera gradual se irán abriendo servidores para cada
            país en concreto, para que, de esta manera, lo jugadores puedan
            pagar y jugar con sus monedas nacionales y evitar el tipo de cambio
            de divisas.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            2. Uso de la Página y los Servicios
          </h2>
          <p>
            <span className="font-medium">2.1. Uso Permitido: </span>El Usuario
            podrá utilizar la Página y los servicios para jugar, interactuar con
            otros usuarios y acceder a contenido relacionado con juegos:
          </p>
          <ul className="flex flex-col gap-2 list-disc pl-4 text-sm">
            <li>
              Jugar en todos los torneos que el usuario crea conveniente
              inscribirse, en cada torneo participara con el mismo nombre de
              equipo creado al momento del registro.
            </li>
            <li>
              Podrá realizar sus predicciones hasta 20 minutos antes de que
              inicie el primer partido asignado a su encuentro.
            </li>
            <li>
              Poner el nombre que mas le guste a su equipo, con el cual
              participara en los torneos.
            </li>
            <li>
              Cambiar sus pronósticos hasta 10 minutos antes de que inicie el
              partido asignado para su pronóstico.
            </li>
          </ul>
          <p>
            <span className="font-medium">2.2. Uso Prohibido: </span>Queda
            expresamente prohibido al Usuario:
          </p>
          <ul className="flex flex-col gap-2 list-disc pl-4 text-sm">
            <li>
              Hacer trampa, utilizar software de terceros para obtener ventajas
              injustas, o cualquier otra acción que vulnere el juego limpio.
            </li>
            <li>Compartir o vender cuentas o información de acceso.</li>
            <li>
              Publicar contenido ilegal, ofensivo o que vulnere los derechos de
              terceros.
            </li>
            <li>Suplantar la identidad de otros usuarios.</li>
            <li>
              Cualquier otra acción que pueda dañar la Página, los servicios o
              sus usuarios.
            </li>
            <li>
              Realizar un cambio de pronostico fuera del plazo señalado en el
              párrafo anterior.
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">3. Propiedad Intelectual</h2>
          <p>
            <span className="font-medium">3.1. Contenido de la Página: </span>
            El contenido de la Página, incluyendo juegos, imágenes, videos y
            música, está protegido por derechos de autor y otros derechos de
            propiedad intelectual.
          </p>
          <p>
            <span className="font-medium">3.2. Contenido del Usuario: </span>
            El contenido que el Usuario elija en el juego, imágenes, el nombre
            de su equipo con el cual se identificara en el juego, le pertenece,
            pero nos otorga una licencia para usarlo en la Página y en otros
            medios.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">4. Compras y Pagos</h2>
          <p>
            <span className="font-medium">4.1. Productos y Servicios: </span>
            La Página puede ofrecer productos y servicios de pago, como juegos,
            artículos virtuales o suscripciones.
          </p>
          <p>
            <span className="font-medium">
              4.2. Precios y Métodos de Pago:{' '}
            </span>
            Los precios y métodos de pago disponibles se mostrarán en la Página.
          </p>
          <p>
            <span className="font-medium">4.3. Reembolsos: </span>No se admiten
            reembolsos por compras digitales, excepto en los casos previstos por
            la ley.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            5. Privacidad y Protección de Datos
          </h2>
          <p>
            <span className="font-medium">
              5.1. Recopilación de Datos Personales:{' '}
            </span>
            En El Gran Zorro, nos comprometemos a proteger la privacidad de
            nuestros usuarios. A utilizar a nuestro sitio web, aceptas las
            siguientes condiciones relacionadas con la Recopilación y uso de
            datos personales:
          </p>
          <ul className="flex flex-col gap-2 list-disc pl-4 text-sm">
            <li>
              <span className="font-medium">Formularios de Contacto: </span>
              Si completas el formulario de registro en nuestro sitio web,
              recopilaremos la información que proporciones, como tu nombre,
              dirección de correo electrónico, equipo de futbol favorito, fecha
              de nacimiento, numero de celular, dirección IP y toda información
              que nos ayude a identificarlo e individualizarlo como usuario.
            </li>
            <li>
              <span className="font-medium">Suscripción a la Newsletter: </span>
              Si te suscribes a nuestras newsletter, recopilaremos tu dirección
              de correo electrónico para enviarte actualizaciones y noticias
              relevantes.
            </li>
          </ul>
          <p>
            <span className="font-medium">5.2. Uso de Datos: </span>
            Utilizamos los datos del usuario para proporcionarle el servicio,
            mejorar la Página y mostrarle publicidad personalizada sobre los
            torneos.
          </p>
          <p>
            <span className="font-medium">5.3. Política de Privacidad: </span>
            El Usuario puede consultar nuestra política de privacidad para
            obtener más información sobre cómo recopilamos y usamos sus datos.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            6. Responsabilidad y Garantías
          </h2>
          <p>
            <span className="font-medium">
              6.1. Limitación de Responsabilidad:{' '}
            </span>
            No seremos responsables por daños indirectos o consecuenciales
            derivados del uso de la Página o sus servicios.
          </p>
          <p>
            <span className="font-medium">
              6.2 Responsabilidad de Entrega del Premio:{' '}
            </span>
            Somos responsables de realizar la entrega del premio de cada torneo
            creado en el tiempo, forma y cantidad, especificados en cada torneo.
          </p>
          <p>
            <span className="font-medium">6.3. Garantías: </span>Que tanto los
            datos personales como los datos de los medios de pago utilizados en
            nuestro sitio web con la finalidad de participar de los torneos y
            juegos que en ella existan, cuentan con seguro de SSL con la
            finalidad de proteger a nuestros usuarios y las que sean
            obligatorias por ley.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            7. Modificaciones y Terminación
          </h2>
          <p>
            <span className="font-medium">7.1. Modificaciones: </span>
            Podemos modificar estos T&C en cualquier momento. Notificaremos al
            Usuario de cualquier cambio importante, la lectura de esta es bajo
            responsabilidad de cada usuario.
          </p>
          <p>
            <span className="font-medium">7.2. Terminación: </span>Podemos
            cancelar la cuenta del Usuario o suspender su acceso a la Página si
            incumple estos T&C y/o cuando no haya participado en ninguno de los
            torneos que se dan en el sitio web durante 3 meses.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            8. Ley Aplicable y Jurisdicción
          </h2>
          <p>
            <span className="font-medium">8.1. Ley Aplicable: </span>Estos T&C
            se rigen por la ley del país donde se encuentra la empresa
            propietaria de la Página, las cuales son las leyes peruanas.
          </p>
          <p>
            <span className="font-medium">8.2. Jurisdicción: </span>
            Cualquier disputa relacionada con estos T&C se resolverá ante los
            tribunales del país donde se encuentra la empresa propietaria de la
            Página.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">9. Contacto</h2>
          <p>
            <span className="font-medium">9.1. </span>Si el Usuario tiene
            preguntas o dudas sobre estos T&C, puede contactarnos a través de la
            Página, al correo electrónico el cual aparece en el apartado de
            Políticas de Privacidad o al numero de teléfono que aparece en el
            pie de la página.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">10. Aceptación de los T&C</h2>
          <p>
            <span className="font-medium">10.1. </span>El uso de la Página por
            parte del Usuario implica la aceptación de estos T&C.
          </p>
        </div>
      </section>
      <p className="text-sm">
        <span className="font-medium">Recomendación: </span>Es importante que el
        Usuario consulte los T&C de la Página antes de empezar a usarla.
      </p>
    </>
  );
};

export default TycPage;
