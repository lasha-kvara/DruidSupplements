import { createElement } from "react";
import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Keystatic CMS — the admin panel at /keystatic.
 *
 * Content lives in /content as JSON (+ Markdoc for article bodies) and is committed to Git.
 * - `npm run dev`        → edits files on your disk (local mode)
 * - production (Vercel)  → Keystatic Cloud: editors sign in to Keystatic Cloud (no GitHub account needed),
 *                          each save is committed to the GitHub repo and Vercel redeploys automatically.
 *                          Editors are managed in the Keystatic Cloud team (free plan: up to 3 users).
 * Set NEXT_PUBLIC_KEYSTATIC_CLOUD=1 to use Cloud mode while running locally.
 */

/** Keystatic Cloud "team/project" (not a secret; editors are managed in this Cloud team). */
const CLOUD_PROJECT = process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT || "druids/druidsupplements";

const useCloud =
  Boolean(CLOUD_PROJECT) &&
  (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD === "1");

/** Local file editing is only safe on your own machine; production needs Keystatic Cloud. */
export const keystaticEnabled = process.env.NODE_ENV !== "production" || useCloud;

/** Georgian + English pair of plain text inputs */
const bi = (label: string, opts: { multiline?: boolean; required?: boolean; description?: string } = {}) =>
  fields.object(
    {
      ka: fields.text({
        label: `${label} (ქართ.)`,
        multiline: opts.multiline,
        validation: opts.required === false ? undefined : { isRequired: true },
      }),
      en: fields.text({ label: `${label} (English)`, multiline: opts.multiline }),
    },
    { label, description: opts.description, layout: [6, 6] },
  );

const textList = (label: string, itemLabel: string) =>
  fields.array(fields.text({ label: itemLabel, multiline: true }), {
    label,
    itemLabel: (p) => p.value || "—",
  });

/** Per-language block of the product's detailed info (tabs on the product page) */
const productDetails = (lang: string) =>
  fields.object(
    {
      benefits: textList(`სასარგებლო თვისებები (${lang})`, "თვისება"),
      usage: fields.text({ label: `მიღების წესი (${lang})`, multiline: true }),
      dosage: textList(`დოზირება (${lang})`, "პუნქტი"),
      ingredients: fields.text({ label: `შემადგენლობა (${lang})`, multiline: true }),
      origin: fields.text({ label: `წარმომავლობა (${lang})`, multiline: true }),
      contraindications: textList(`უკუჩვენებები (${lang})`, "უკუჩვენება"),
    },
    { label: `დეტალური ინფორმაცია (${lang})` },
  );

/** Images are stored per entry: public/images/<kind>/<slug>/<file> → "/images/<kind>/<slug>/<file>" */
const imageField = (label: string, kind: "products" | "posts") =>
  fields.image({
    label,
    directory: `public/images/${kind}`,
    publicPath: `/images/${kind}/`,
    validation: { isRequired: true },
  });

export default config({
  storage: useCloud ? { kind: "cloud" } : { kind: "local" },
  ...(CLOUD_PROJECT ? { cloud: { project: CLOUD_PROJECT } } : {}),

  ui: {
    brand: {
      name: "დრუიდი · ადმინი",
      // Brand mark (brand/logo, variant A) — readable in Keystatic's light and dark themes.
      mark: () => createElement("img", { src: "/brand/druid-mark.svg", alt: "", height: 28, style: { height: 28, width: "auto" } }),
    },
    navigation: {
      "მაღაზია": ["products"],
      "კონტენტი": ["posts", "testimonials", "faq"],
      "პარამეტრები": ["settings"],
    },
  },

  collections: {
    products: collection({
      label: "პროდუქტები",
      path: "content/products/*",
      format: { data: "json" },
      slugField: "name",
      entryLayout: "form",
      columns: ["name", "category", "inStock"],
      schema: {
        name: fields.slug({
          name: { label: "სახელი (ქართ.)", validation: { isRequired: true } },
          slug: {
            label: "URL (ლათინურად)",
            description: "პროდუქტის მისამართი: /product/<URL>. გამოქვეყნების შემდეგ ნუ შეცვლით — ძველი ბმულები გაფუჭდება.",
          },
        }),
        nameEn: fields.text({ label: "სახელი (English)" }),
        latinName: fields.text({ label: "ლათინური სახელი", description: "მაგ. Hericium erinaceus" }),
        order: fields.integer({ label: "რიგითობა", description: "პატარა რიცხვი = უფრო წინ კატალოგში", defaultValue: 100 }),

        category: fields.select({
          label: "კატეგორია",
          options: [
            { label: "სამკურნალო სოკოები", value: "mushrooms" },
            { label: "სამკურნალო მცენარეები", value: "herbs" },
            { label: "ექსტრაქტები და ნაყენები", value: "extracts" },
          ],
          defaultValue: "mushrooms",
        }),
        benefits: fields.multiselect({
          label: "დანიშნულება",
          options: [
            { label: "იმუნიტეტი", value: "immunity" },
            { label: "ენერგია და ფოკუსი", value: "energy" },
            { label: "ძილი და სტრესის მოხსნა", value: "sleep" },
            { label: "საჭმლის მონელება", value: "digestion" },
          ],
        }),

        inStock: fields.checkbox({ label: "მარაგშია", defaultValue: true }),
        bestseller: fields.checkbox({ label: "ბესტსელერი (მთავარ გვერდზე)", defaultValue: false }),
        isNew: fields.checkbox({ label: "ნიშანი „ახალი“", defaultValue: false }),

        variants: fields.array(
          fields.object(
            {
              label: fields.text({
                label: "მოცულობა",
                description: "მაგ. 50გ ან 30მლ (ინგლისურში ავტომატურად გახდება 50g / 30ml)",
                validation: { isRequired: true },
              }),
              price: fields.number({ label: "ფასი (₾)", validation: { isRequired: true, min: 0 } }),
              oldPrice: fields.number({ label: "ძველი ფასი (₾, ფასდაკლებისთვის — არასავალდებულო)" }),
            },
            { layout: [4, 4, 4] },
          ),
          {
            label: "მოცულობა და ფასები",
            description: "პირველი ვარიანტი არჩეულია ნაგულისხმევად.",
            itemLabel: (p) => `${p.fields.label.value || "?"} — ${p.fields.price.value ?? "?"} ₾`,
            validation: { length: { min: 1 } },
          },
        ),

        images: fields.array(imageField("ფოტო", "products"), {
          label: "ფოტოები",
          description: "პირველი ფოტო მთავარია (ბარათზე და გაზიარებისას).",
          itemLabel: (p) => (p.value ? (p.value as { filename?: string }).filename ?? "ფოტო" : "ფოტო"),
          validation: { length: { min: 1 } },
        }),

        shortBenefit: bi("მოკლე ტეგი ბარათზე"),
        form: bi("ფორმა (ფხვნილი, ნაჭრები…)"),
        excerpt: bi("მოკლე აღწერა", { multiline: true }),
        description: bi("სრული აღწერა", { multiline: true }),
        detailsKa: productDetails("ქართ."),
        detailsEn: productDetails("English"),

        rating: fields.number({ label: "შეფასება (0–5)", defaultValue: 5, validation: { min: 0, max: 5 } }),
        reviewCount: fields.integer({ label: "შეფასებების რაოდენობა", defaultValue: 0 }),
        keywords: fields.array(fields.text({ label: "სიტყვა" }), {
          label: "საძიებო სიტყვები",
          description: "სინონიმები/ინგლისური სახელები, რომლითაც ძიებაში იპოვიან",
          itemLabel: (p) => p.value || "—",
        }),
      },
    }),

    posts: collection({
      label: "ბლოგის სტატიები",
      path: "content/posts/*/",
      format: { data: "json" },
      slugField: "title",
      entryLayout: "form",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "სათაური (ქართ.)", validation: { isRequired: true } },
          slug: { label: "URL (ლათინურად)", description: "სტატიის მისამართი: /blog/<URL>" },
        }),
        titleEn: fields.text({ label: "სათაური (English)" }),
        date: fields.date({ label: "თარიღი", validation: { isRequired: true } }),
        readingMinutes: fields.integer({ label: "კითხვის დრო (წთ)", defaultValue: 5 }),
        cover: imageField("მთავარი ფოტო", "posts"),
        excerpt: bi("მოკლე აღწერა", { multiline: true }),
        author: bi("ავტორი"),
        tagsKa: fields.array(fields.text({ label: "ტეგი" }), { label: "ტეგები (ქართ.)", itemLabel: (p) => p.value }),
        tagsEn: fields.array(fields.text({ label: "Tag" }), { label: "ტეგები (English)", itemLabel: (p) => p.value }),
        relatedProducts: fields.array(fields.relationship({ label: "პროდუქტი", collection: "products" }), {
          label: "სტატიაში ნახსენები პროდუქტები",
          itemLabel: (p) => p.value ?? "—",
        }),
        bodyKa: fields.markdoc({ label: "ტექსტი (ქართ.)", extension: "mdoc" }),
        bodyEn: fields.markdoc({ label: "ტექსტი (English)", extension: "mdoc" }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "საკონტაქტო და მიწოდება",
      path: "content/settings",
      format: { data: "json" },
      schema: {
        phoneDisplay: fields.text({ label: "ტელეფონი (როგორც ჩანს საიტზე)", description: "მაგ. +995 555 12 34 56" }),
        phoneNumber: fields.text({ label: "ტელეფონი დასარეკად", description: "მაგ. +995555123456 (გამოტოვებების გარეშე)" }),
        whatsappNumber: fields.text({ label: "WhatsApp ნომერი", description: "მხოლოდ ციფრები ქვეყნის კოდით, მაგ. 995555123456" }),
        email: fields.text({ label: "ელფოსტა" }),
        address: bi("მისამართი"),
        workingHours: bi("სამუშაო საათები"),
        facebook: fields.url({ label: "Facebook" }),
        instagram: fields.url({ label: "Instagram" }),
        tiktok: fields.url({ label: "TikTok" }),
        tbilisiPrice: fields.number({ label: "მიწოდება თბილისში (₾)" }),
        regionsPrice: fields.number({ label: "მიწოდება რეგიონებში (₾)" }),
        freeFrom: fields.number({ label: "უფასო მიწოდება ამ თანხიდან (₾)" }),
      },
    }),

    testimonials: singleton({
      label: "მომხმარებლების შეფასებები",
      path: "content/testimonials",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            name: bi("სახელი"),
            city: bi("ქალაქი"),
            product: bi("პროდუქტი"),
            rating: fields.integer({ label: "ვარსკვლავები (1–5)", defaultValue: 5, validation: { min: 1, max: 5 } }),
            text: bi("შეფასება", { multiline: true }),
          }),
          { label: "შეფასებები", itemLabel: (p) => `${p.fields.name.fields.ka.value} — ${p.fields.product.fields.ka.value}` },
        ),
      },
    }),

    faq: singleton({
      label: "ხშირად დასმული კითხვები",
      path: "content/faq",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            question: bi("კითხვა"),
            answer: bi("პასუხი", {
              multiline: true,
              description:
                "მიწოდების ფასები ტექსტში ციფრით ნუ ჩაწერეთ — გამოიყენეთ {tbilisiPrice}, {regionsPrice}, {freeFrom}. საიტი მათ ავტომატურად ჩაანაცვლებს „საკონტაქტო და მიწოდება“-ში მითითებული ფასებით.",
            }),
          }),
          { label: "კითხვები", itemLabel: (p) => p.fields.question.fields.ka.value },
        ),
      },
    }),
  },
});
