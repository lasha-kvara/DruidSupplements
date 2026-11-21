"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { getFaqs } from "@/data";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";
import { generalChatUrl } from "@/lib/whatsapp";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Faq() {
  const { lang, t } = useI18n();
  return (
    <section id="faq" className="scroll-mt-24 bg-parchment-dark/60 py-20 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading align="left" eyebrow={t.faq.eyebrow} title={t.faq.title} description={t.faq.description} />
          <Reveal delay={0.1} className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
            <Image src="/images/hands-sapling.jpg" alt="" fill sizes="40vw" className="object-cover" />
            <div className="absolute inset-x-4 bottom-4 flex gap-2 rounded-2xl bg-white/90 p-3 backdrop-blur">
              <a
                href={generalChatUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1 !min-h-[44px] !px-3 text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
              <a href={`tel:${siteConfig.phoneNumber}`} className="btn-forest flex-1 !min-h-[44px] !px-3 text-sm">
                <Phone className="h-4 w-4" /> {t.faq.call}
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Accordion
            key={lang}
            defaultOpen="faq-0"
            items={getFaqs(lang).map((f, i) => ({ id: `faq-${i}`, title: f.question, content: <p>{f.answer}</p> }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
