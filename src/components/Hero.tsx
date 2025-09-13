import Image from 'next/image';

interface HeroProps {
  title: string;
  description: string;
  image: string;
}

const Hero = ({ title, description, image }: HeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-[#2377FF] to-[#07DBCE] w-full md:h-[300px] px-4 md:px-16 py-8 md:py-24 rounded-xl md:rounded-3xl">
      <div className="md:w-[60%] flex flex-col gap-3 md:gap-5">
        <h1 className="w-full text-2xl md:text-4xl text-white text-center md:text-left font-medium">
          {title}
        </h1>
        <p className="text-white/80 text-center md:text-left text-sm md:text-base">
          {description}
        </p>
      </div>
      <Image
        className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:block w-[35%]"
        src="/rectangles.svg"
        width={60}
        height={60}
        alt=""
      />
      <Image
        className="absolute right-20 top-1/2 transform -translate-y-1/2 hidden md:block w-[200px]"
        src={`${image}.svg`}
        width={60}
        height={60}
        alt=""
      />
    </section>
  );
};

export default Hero;
