import Image from "next/image";
import Heading from "./_components/Heading";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-10 md:mt-16 px-4">
      <Heading />
      <div className="relative w-full max-w-[400px] sm:max-w-[500px] h-[350px] md:h-[400px]">
        <Image
          src="/hero-img.png"
          alt="hero-image"
          fill
          className="object-contain border"
        />
      </div>
    </div>
  );
}
