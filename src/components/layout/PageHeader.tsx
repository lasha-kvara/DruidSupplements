import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}

export function PageHeader({ eyebrow, title, description, image }: Props) {
  return (
    <section className="relative overflow-hidden bg-forest pb-14 pt-32 md:pb-20 md:pt-40">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/60 to-forest" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="container relative">
        <Reveal>
          <p className="eyebrow text-terracotta-light">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold text-parchment md:text-6xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-base text-parchment/75 md:text-lg">{description}</p>}
        </Reveal>
      </div>
    </section>
  );
}
