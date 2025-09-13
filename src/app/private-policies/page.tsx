import Hero from '@components/Hero';

const PrivatePoliciesPage = () => {
  return (
    <>
      <Hero
        title="Políticas Privadas"
        description="Nuestra 'Política de Privacidad' en El gran Zorro detalla cómo protegemos y utilizamos la información personal de nuestros usuarios en la plataforma."
        image="private-policies"
      />
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">1. Recopilación de Datos</h2>
          <p>
            <span className="font-medium">
              1.1. Recopilación de Datos Personales:{' '}
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
            <span className="font-medium">1.2. Datos del Dispositivo: </span>
            Se registra información del dispositivo del Usuario, incluyendo tipo
            de dispositivo, sistema operativo y configuración regional.
          </p>
          <p>
            <span className="font-medium">1.3. Datos de Uso: </span>Se recopila
            información sobre la actividad del Usuario en la Página, incluyendo
            juegos utilizados, tiempo de navegación y compras realizadas, con la
            finalidad de mejorar la experiencia.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">2. Uso de los Datos</h2>
          <p>
            <span className="font-medium">2.1. Prestación del Servicio: </span>
            La información del Usuario se utiliza para brindar el servicio,
            incluyendo la creación de cuentas, el procesamiento de pagos y la
            asistencia al cliente.
          </p>
          <p>
            <span className="font-medium">2.2. Mejora de la Página: </span>
            Los datos del Usuario se utilizan para optimizar la experiencia en
            la Página, corregir errores, personalizar el contenido y desarrollar
            nuevas funcionalidades.
          </p>
          <p>
            <span className="font-medium">2.3. Marketing: </span>La información
            del Usuario se emplea para mostrar publicidad personalizada, tanto
            en la Página como en otras plataformas.
          </p>
          <p>
            <span className="font-medium">2.4. Comunicación: </span>Para
            responder a tus consultas y proporcionarte información relevante.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">2. Uso de los Datos</h2>
          <p>
            <span className="font-medium">3.1. Proveedores de Servicios: </span>
            La información del Usuario se comparte con proveedores que colaboran
            en el funcionamiento de la Página, como empresas de procesamiento de
            pagos y proveedores de análisis.
          </p>
          <p>
            <span className="font-medium">3.2. Publicidad: </span>La información
            del Usuario puede ser compartida con anunciantes para mostrar
            publicidad personalizada.
          </p>
          <p>
            <span className="font-medium">3.3. Cumplimiento Legal: </span>La
            información del Usuario puede ser compartida con las autoridades en
            caso de requerimiento legal, siempre que exista documento que lo
            avale.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">4. Opciones del Usuario</h2>
          <p>
            <span className="font-medium">4.1. Acceso y Corrección: </span>
            El Usuario tiene derecho a acceder y modificar su información
            personal en cualquier momento.
          </p>
          <p>
            <span className="font-medium">4.2. Baja de Suscripciones: </span>
            El Usuario puede cancelar la suscripción a correos electrónicos
            promocionales en cualquier momento.
          </p>
          <p>
            <span className="font-medium">4.3. Cookies: </span>El Usuario puede
            configurar su navegador para bloquear las cookies.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            5. Seguridad de la Información
          </h2>
          <p>
            <span className="font-medium">5.1. Medidas de Seguridad: </span>
            Se implementan medidas de seguridad razonables para proteger la
            información del Usuario contra el acceso no autorizado, el uso
            indebido y la divulgación, como la protección SSL, para el debido
            tratamiento y protección de la información de los medios pagos y de
            información sensible, que se vaya a utilizar en la página web.
          </p>
          <p>
            <span className="font-medium">5.2. Menores de Edad: </span>No se
            recopila información personal de menores de edad de forma
            intencionada, todos los jugadores que se registren declaran bajo
            declaración jurada de que son mayores de edad.
          </p>
          <p>
            <span className="font-medium">5.3. Enlaces a Terceros: </span>
            Nuestro sitio web puede contener enlaces a sitios web de terceros.
            No somos responsables de las prácticas de privacidad de estos sitios
            y te recomendamos leer sus políticas de privacidad.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            5. Seguridad de la Información
          </h2>
          <p>
            <span className="font-medium">5.1. Medidas de Seguridad: </span>
            Se implementan medidas de seguridad razonables para proteger la
            información del Usuario contra el acceso no autorizado, el uso
            indebido y la divulgación, como la protección SSL, para el debido
            tratamiento y protección de la información de los medios pagos y de
            información sensible, que se vaya a utilizar en la página web.
          </p>
          <p>
            <span className="font-medium">5.2. Menores de Edad: </span>No se
            recopila información personal de menores de edad de forma
            intencionada, todos los jugadores que se registren declaran bajo
            declaración jurada de que son mayores de edad.
          </p>
          <p>
            <span className="font-medium">5.3. Enlaces a Terceros: </span>
            Nuestro sitio web puede contener enlaces a sitios web de terceros.
            No somos responsables de las prácticas de privacidad de estos sitios
            y te recomendamos leer sus políticas de privacidad.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            6. Finalidades adicionales del Tratamiento:{' '}
          </h2>
          <p>
            Con la aceptación de la presente Política de Privacidad el cliente
            otorga su consentimiento para que los Datos Personales sean tratados
            por un plazo indefinido, y mientras no solicite su cancelación o
            revoque la presente autorización, para las siguientes finalidades:
          </p>
          <ul className="flex flex-col gap-2 list-disc pl-4 text-sm">
            <li>
              Enviar al cliente información comercial, promocional y/o
              publicidad en relación con los torneos disponibles y/o servicios
              brindados por El Gran Zorro, así como realizar prospección
              comercial. El contacto podrá realizarse a través de los siguientes
              medios: sistemas de llamado telefónico, envió de mensajes de texto
              a celular o de mensajes masivos y telemercadeo.
            </li>
            <li>
              Almacenar y tratar los Datos Personales con fines estadísticos y/o
              históricos.
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            7. Ejercicio de derechos ARCO:{' '}
          </h2>
          <p>
            El cliente reconoce que, como titular de los Datos Personales, tiene
            derecho a acceder a los datos en posesión de El Gran Zorro, conocer
            las características de su tratamiento, rectificarlos en caso de ser
            inexactos o incompletos, solicitar que sean suprimidos o cancelados
            al considerarlos innecesarios para las finalidades previamente
            expuestas, o bien exponerse a su tratamiento para fines específicos.
          </p>
          <p>
            A fin de ejercer los derechos antes mencionados, así como para
            revocar el consentimiento brindado para el tratamiento de datos para
            finalidades no relacionadas con la prestación de los servicios y/o
            ejecución de las disposiciones establecidas en los Términos y
            Condiciones, el cliente deberá presentar una solicitud (incluyendo
            el nombre del titular de los Datos Personales, domicilio o medio
            para recibir respuesta, documentos que acrediten su identidad o
            representación legal, descripción clara y precisa de los datos
            respecto de los que se busca ejercer el derecho y otros elementos o
            documentos que faciliten la localización de los datos) por escrito
            al área de Atención al Cliente que se encuentra en el apartado del
            sitio web o a través de la dirección electrónica (…). De considerar
            que no se ha atendido su requerimiento de manera correspondiente,
            puede dirigirse ante la Autoridad Nacional de Protección de Datos
            Personales (Calle Scipión Llona 350, Miraflores), con la finalidad
            de presentar algún reclamo o solicitud complementaria.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">
            8. Modificaciones en la Política
          </h2>
          <p>
            <span className="font-medium">8.1. Notificación de Cambios: </span>
            Se notificará al Usuario sobre cualquier cambio significativo en la
            política de privacidad, quedando bajo estricta responsabilidad del
            usuario, la lectura de esta.
          </p>
          <p>
            <span className="font-medium">
              8.2. Aceptación de la Política:{' '}
            </span>
            Al usar la Página, el Usuario acepta la presente política de
            privacidad y sus futuras modificaciones.
          </p>
        </div>
      </section>
      <section className="bg-secondary-color w-full rounded-[24px] md:rounded-[32px] p-[32px] md:p-[48px]">
        <div className="flex flex-col gap-6 font-light">
          <h2 className="text-lg font-medium">9. Contacto</h2>
          <p>
            <span className="font-medium">9.1. </span>Para cualquier consulta o
            duda sobre la política de privacidad, el Usuario puede contactarnos
            a través de la Página, al correo electrónico que se encuentra en la
            cláusula siete y dentro de la pagina web y al número de atención al
            cliente que se encuentra en la página web.
          </p>
        </div>
      </section>
      <p className="text-sm">
        <span className="font-medium">Recomendación: </span>Se recomienda al
        Usuario revisar la política de privacidad de la Página antes de iniciar
        su uso.
      </p>
    </>
  );
};

export default PrivatePoliciesPage;
