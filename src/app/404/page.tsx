const NotFoundPage = () => {
  return (
    <section className="my-[64px] md:my-[80px]">
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl md:text-6xl text-center font-semibold">Ups!</p>
        <h1 className="text-8xl md:text-10xl text-center text-red-color-2 font-bold my-6 md:my-12">
          404
        </h1>
        <p className="text-2xl md:text-4xl text-center">Página no encontrada</p>
      </div>
    </section>
  );
};

export default NotFoundPage;
