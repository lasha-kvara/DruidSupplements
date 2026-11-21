import type { ProductDetails } from "../types";

/** English text for each product, keyed by slug. Prices, images and stock come from ../products.ts. */
export interface ProductTranslation {
  name: string;
  shortBenefit: string;
  excerpt: string;
  description: string;
  form: string;
  details: ProductDetails;
}

export const productsEn: Record<string, ProductTranslation> = {
  "lomis-fafari": {
    name: "Lion's Mane",
    shortBenefit: "Memory & focus",
    excerpt: "The “brain mushroom” — for mental clarity, memory and concentration.",
    description:
      "Lion's Mane is one of the most studied functional mushrooms. It contains hericenones and erinacines — compounds researchers study in connection with nerve growth factor (NGF). Ours is grown on organic oak substrate, gently dried at low temperature and finely milled so it blends easily into coffee, tea or smoothies.",
    form: "Fine powder",
    details: {
      benefits: [
        "Supports concentration and mental clarity",
        "Traditionally used to support memory",
        "Helps nervous-system balance and emotional calm",
        "Contains beta-glucans for the immune system",
      ],
      usage:
        "Stir the powder into hot (not boiling) coffee, tea, cocoa or a smoothie. Best taken in the morning or first half of the day. We recommend a 6–8 week course followed by a 1–2 week break.",
      dosage: ["Adults: 1–2 g (½–1 teaspoon) per day", "Start with a small dose and increase gradually", "Do not exceed 3 g per day"],
      ingredients: "100% Lion's Mane (Hericium erinaceus) fruiting body, milled. No additives, fillers or preservatives.",
      origin: "Grown on an organic farm in Imereti on natural oak substrate. Every batch is tested for heavy metals and microbiology.",
      contraindications: [
        "During pregnancy and breastfeeding — only after consulting a doctor",
        "Do not take if you are allergic to mushrooms",
        "Consult a doctor if you take anticoagulants or diabetes medication",
        "Not intended for children under 12",
      ],
    },
  },
  reishi: {
    name: "Reishi",
    shortBenefit: "Calm & sleep",
    excerpt: "The “mushroom of immortality” — an adaptogen for stress and deep sleep.",
    description:
      "For thousands of years Reishi has been called the “spirit mushroom” in Eastern traditional medicine. It is rich in triterpenes and polysaccharides that help the body adapt to stress. Our Reishi slices are dried at low temperature — ideal for an evening tea or decoction, with a slightly bitter, earthy taste.",
    form: "Dried slices / powder",
    details: {
      benefits: [
        "Supports relaxation and adaptation to stress",
        "Helps improve sleep quality",
        "Traditionally used to support immunity",
        "Contains antioxidant triterpenes",
      ],
      usage:
        "Decoction: simmer 3–5 g of slices in 500 ml of water on low heat for 30–40 minutes. Powder: stir into a warm drink. Best in the evening, 1–2 hours before bed.",
      dosage: ["Powder: 1–1.5 g per day", "Slices: 3–5 g for a decoction per day", "Course: 8 weeks, then a 2-week break"],
      ingredients: "100% Reishi (Ganoderma lucidum) fruiting body.",
      origin: "Grown under controlled organic conditions on natural wood substrate. Batches are lab-tested.",
      contraindications: [
        "Stop taking 2 weeks before surgery",
        "If you take blood thinners or blood-pressure medication — consult a doctor",
        "Not recommended during pregnancy and breastfeeding",
        "May rarely cause dry mouth or stomach discomfort",
      ],
    },
  },
  chaga: {
    name: "Chaga",
    shortBenefit: "Immunity & antioxidants",
    excerpt: "The “black gold” of the birch tree — one of the richest natural antioxidants.",
    description:
      "Chaga grows on living birch trees in cold climates and accumulates betulin, melanin and polyphenols over many years. Our Chaga is wild-harvested only from living trees without harming them and crushed into coarse pieces — the ideal form for a decoction. Mild taste with notes of vanilla and wood.",
    form: "Crushed chunks",
    details: {
      benefits: [
        "Supports the body's natural defences",
        "High antioxidant activity (ORAC)",
        "Traditionally used for digestive comfort",
        "Supports skin health thanks to melanin",
      ],
      usage:
        "Simmer 1 tablespoon of Chaga in 1 litre of water on low heat for 1 hour, or pour 60–70°C water over it in a thermos for 6–8 hours. The same chunks can be reused 2–3 times.",
      dosage: ["1–3 cups of decoction per day", "Take 20–30 minutes before meals", "Course: 2–3 months, then a 2-week break"],
      ingredients: "100% wild Chaga (Inonotus obliquus), crushed.",
      origin: "Wild-harvested from northern birch forests. Every batch is lab-tested for heavy metals and radiation.",
      contraindications: [
        "Contains oxalates — do not take if you have a history of kidney stones",
        "Do not combine with penicillin antibiotics or intravenous glucose",
        "If you take anticoagulants or diabetes medication — consult a doctor",
        "Not recommended during pregnancy and breastfeeding",
      ],
    },
  },
  kordicepsi: {
    name: "Cordyceps",
    shortBenefit: "Energy & endurance",
    excerpt: "A natural source of energy — a favourite of athletes and active people.",
    description:
      "Cordyceps militaris is rich in cordycepin and adenosine — compounds studied in connection with cellular energy (ATP). It doesn't cause the crash typical of coffee and gives steady, long-lasting energy. Great before a workout or at the start of a busy day.",
    form: "Fine powder",
    details: {
      benefits: [
        "Supports physical endurance and energy",
        "Traditionally used to support the respiratory system",
        "Helps recovery from fatigue",
        "Natural support for libido and vitality",
      ],
      usage:
        "Mix the powder into water, coffee, a smoothie or a protein shake. Take in the morning or 30–45 minutes before training. Avoid taking it in the evening.",
      dosage: ["Adults: 1–2 g per day", "During training: 2–3 g per day in 2 doses", "Course: 6–8 weeks"],
      ingredients: "100% Cordyceps militaris fruiting body.",
      origin: "Grown on a sterile organic substrate using a vegan method. Tested for cordycepin content.",
      contraindications: [
        "Autoimmune conditions — only after consulting a doctor",
        "Not recommended while taking blood-thinning medication",
        "Do not take during pregnancy and breastfeeding",
        "May cause sleeplessness if taken in the evening",
      ],
    },
  },
  trametesi: {
    name: "Turkey Tail",
    shortBenefit: "Immunity & gut flora",
    excerpt: "A colourful forest mushroom rich in PSK and PSP polysaccharides.",
    description:
      "Turkey Tail (Trametes versicolor) also grows in Georgian forests and is one of the most studied immunomodulating mushrooms in the world. Its polysaccharides also act as prebiotics and support a healthy gut microbiome.",
    form: "Fine powder",
    details: {
      benefits: [
        "Supports immune balance",
        "Prebiotic action for the gut microbiome",
        "Rich in antioxidants",
        "Traditionally used during recovery",
      ],
      usage: "Stir into a warm drink, soup or porridge. For a decoction, simmer 2 g of powder in 300 ml of water for 15 minutes.",
      dosage: ["Adults: 1–3 g per day", "Take with food", "Course: 8–12 weeks"],
      ingredients: "100% Turkey Tail (Trametes versicolor) fruiting body.",
      origin: "Wild-harvested in the ecologically clean forests of Samegrelo and Guria.",
      contraindications: [
        "During pregnancy and breastfeeding — consult a doctor",
        "During chemotherapy take only with your oncologist's approval",
        "Do not take if you are allergic to mushrooms",
      ],
    },
  },
  askili: {
    name: "Rosehip",
    shortBenefit: "Vitamin C & immunity",
    excerpt: "Wild Caucasian mountain rosehip — natural vitamin C for the cold season.",
    description:
      "Rosehip is one of the richest sources of natural vitamin C — several times more than citrus. Ours is picked in autumn after the first frosts on the mountain slopes of Trialeti and Javakheti and slowly dried in the shade to keep its vitamins and sweet-tart taste.",
    form: "Whole dried hips",
    details: {
      benefits: [
        "Natural vitamin C for seasonal immunity",
        "Rich in carotenoids and flavonoids",
        "Traditionally used to support bile flow and digestion",
        "Mild diuretic effect",
      ],
      usage:
        "Lightly crush 2 tablespoons of hips, place in a thermos and pour over 500 ml of 80–90°C water. Steep for 6–8 hours (overnight). Strain before drinking.",
      dosage: ["1–2 cups of infusion per day", "Children from 6 years: ½ cup per day", "Rinse your mouth after drinking"],
      ingredients: "100% wild rosehip (Rosa canina) fruit.",
      origin: "Wild-harvested on the Trialeti ridge at 1,200–1,600 m, far from roads and industry.",
      contraindications: [
        "Use with caution if you have high stomach acidity or ulcers",
        "History of thrombophlebitis — consult a doctor",
        "Long-term use may affect tooth enamel — drink through a straw",
      ],
    },
  },
  barambo: {
    name: "Lemon Balm",
    shortBenefit: "Calm & sleep",
    excerpt: "A lemon-scented Georgian garden herb for a calming evening tea.",
    description:
      "Lemon balm (barambo) has been used in Georgian homes for centuries to calm the nerves and improve sleep. Ours is grown in Kakheti without chemical fertilisers and picked at the start of flowering, when its essential-oil content is highest.",
    form: "Dried leaves",
    details: {
      benefits: [
        "Helps relaxation and relieves nervous tension",
        "Supports falling asleep and sleep quality",
        "Eases bloating and cramps",
        "Traditionally used to lift the mood",
      ],
      usage: "Pour 250 ml of 90°C water over 1 teaspoon of leaves, cover and steep for 7–10 minutes. Add honey or lemon if you like.",
      dosage: ["2–3 cups of tea per day", "For better sleep — 1 cup 30–60 minutes before bed"],
      ingredients: "100% dried lemon balm (Melissa officinalis) leaves.",
      origin: "Grown in an organic garden in Kakheti, hand-picked and dried in the shade.",
      contraindications: [
        "Underactive thyroid — consult a doctor",
        "May enhance the effect of sedative medication",
        "Avoid driving if you feel drowsy after drinking",
      ],
    },
  },
  pitna: {
    name: "Peppermint",
    shortBenefit: "Digestion & lightness",
    excerpt: "Aromatic peppermint leaves — for a light, fresh feeling after meals.",
    description:
      "Menthol-rich peppermint is one of the best-known herbs for digestive comfort. Ours is picked at the height of summer, slowly dried and packed airtight to keep its aroma.",
    form: "Dried leaves",
    details: {
      benefits: [
        "Eases bloating and discomfort after a heavy meal",
        "Traditionally used to relieve nausea",
        "Cooling and refreshing",
        "Helps clear the nose during colds (steam inhalation)",
      ],
      usage: "Pour 250 ml of hot water over 1 teaspoon of leaves, cover and steep for 5–7 minutes. Best after meals.",
      dosage: ["2–3 cups of tea per day", "Children from 6 years: 1 cup of weak tea per day"],
      ingredients: "100% dried peppermint (Mentha × piperita) leaves.",
      origin: "Grown organically in Kvemo Kartli without pesticides.",
      contraindications: [
        "May worsen heartburn (gastro-oesophageal reflux)",
        "Not recommended for children under 3",
        "Gallstones — consult a doctor",
      ],
    },
  },
  "lomis-fafris-eqstrakti": {
    name: "Lion's Mane Dual Extract",
    shortBenefit: "Concentrated focus",
    excerpt: "Dual (water + alcohol) extraction 10:1 — maximum bioavailability.",
    description:
      "Dual extraction means both the water-soluble polysaccharides and the alcohol-soluble hericenones are drawn from the mushroom separately. The result is a concentrated, fast-absorbing tincture — a full daily serving fits in one dropper.",
    form: "Liquid tincture with dropper",
    details: {
      benefits: [
        "Concentrated support for memory and focus",
        "Both polysaccharides and hericenones in one product",
        "Fast absorption and easy dosing",
      ],
      usage: "Shake well. Hold under the tongue for 30 seconds or dissolve in water, tea or juice. Take in the morning.",
      dosage: ["1 dropper (≈1 ml) 1–2 times a day", "Course: 6–8 weeks, then a 2-week break"],
      ingredients: "Lion's Mane fruiting-body dual extract (10:1), purified water, organic grape alcohol (25%).",
      origin: "Made in Georgia in small batches from our own organic Lion's Mane.",
      contraindications: [
        "Contains alcohol — not for children, pregnant women or people with alcohol dependence",
        "Do not take if you are allergic to mushrooms",
        "If you take medication — consult a doctor",
      ],
    },
  },
  "chagas-nayeni": {
    name: "Chaga Tincture",
    shortBenefit: "Everyday immunity",
    excerpt: "Dual-extracted Chaga — betulin and polysaccharides in every drop.",
    description:
      "Chaga tincture is for people who don't have time to brew a decoction. Double extraction with hot water and alcohol delivers the full spectrum of beta-glucans and betulinic acid. Lightly sweet taste with woody notes.",
    form: "Liquid tincture with dropper",
    details: {
      benefits: [
        "Daily support for the immune system",
        "High antioxidant activity",
        "Convenient for travel and work",
      ],
      usage: "Shake well. Dissolve 1 dropper in a glass of water or tea. Take 15–20 minutes before meals.",
      dosage: ["1 dropper (≈1 ml) twice a day", "Course: 2 months, then a 2-week break"],
      ingredients: "Chaga dual extract (8:1), purified water, organic grape alcohol (25%).",
      origin: "Made in Georgia from wild, lab-tested Chaga.",
      contraindications: [
        "Contains alcohol — not for children or pregnant women",
        "Do not take if you have a history of kidney stones",
        "If you take anticoagulants or diabetes medication — consult a doctor",
      ],
    },
  },
};
