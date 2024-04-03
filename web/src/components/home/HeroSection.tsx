import Image from "next/image";

const HeroSection: React.FC = () => (
  <section className="relative h-[100dvh] flex items-center p-4">
    <Image src="/hero.jpg" alt="Hero" className="object-cover opacity-50" fill />
    <h1 className=" text-7xl sm:text-8xl md:text-9xl tracking-tight z-10">
      Elevating
      <br />
      Experiences
      <br />
      Together
    </h1>
  </section>
);

export default HeroSection;
