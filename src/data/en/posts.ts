import type { BlogPost } from "../types";

export type PostTranslation = Pick<BlogPost, "title" | "excerpt" | "author" | "tags" | "content">;

/** English versions of the articles in ../posts.ts, keyed by slug. */
export const postsEn: Record<string, PostTranslation> = {
  "lomis-fafari-tvinis-soko": {
    title: "Lion's Mane: why is it called the “brain mushroom”?",
    excerpt: "What research says about Lion's Mane, how to take it properly and who may find it most interesting.",
    author: "Nino Beridze, herbalist",
    tags: ["Lion's Mane", "Focus", "Research"],
    content: [
      {
        type: "p",
        text: "Lion's Mane (Hericium erinaceus) is a white mushroom covered in cascading “spines” that really does resemble a lion's mane. In East Asia it has been eaten for centuries, both as food and in traditional medicine. In recent decades it has become a focus of modern science.",
      },
      { type: "h2", text: "What compounds does it contain?" },
      {
        type: "p",
        text: "Lion's Mane contains two unique groups of compounds: hericenones (in the fruiting body) and erinacines (in the mycelium). In laboratory studies these compounds are investigated in connection with the synthesis of nerve growth factor (NGF) — which is why the mushroom is linked to cognitive function.",
      },
      {
        type: "ul",
        items: [
          "Beta-glucans — to support the immune system",
          "Hericenones — the main subject of nervous-system research",
          "Protein, B vitamins and minerals",
        ],
      },
      { type: "h2", text: "Who is it for?" },
      {
        type: "p",
        text: "Lion's Mane is often chosen by students during exam season, by people doing intensive mental work, and by older adults looking for natural ways to support their memory.",
      },
      {
        type: "quote",
        text: "Functional mushrooms are not a miracle — they are a daily ritual whose effects you notice over weeks.",
      },
      { type: "h2", text: "How to take it properly" },
      {
        type: "ul",
        items: [
          "Start with 1 g a day and gradually increase to 2 g",
          "Stir it into your morning coffee or tea — you'll barely taste it",
          "Take it regularly for at least 4–6 weeks",
          "Take a 1–2 week break after each course",
        ],
      },
      {
        type: "p",
        text: "Remember: Lion's Mane is a dietary supplement, not a medicine. If you take any medication or have a chronic condition, be sure to consult your doctor first.",
      },
    ],
  },
  "chaga-arkis-shavi-oqro": {
    title: "Chaga — the “black gold” of the birch and how to brew it",
    excerpt: "Everything about Chaga: where it comes from, what makes it special and three simple recipes for everyday use.",
    author: "Giorgi Maisuradze, mycologist",
    tags: ["Chaga", "Immunity", "Recipes"],
    content: [
      {
        type: "p",
        text: "Chaga (Inonotus obliquus) doesn't look like an ordinary mushroom. It is a black, cracked growth on the bark of birch trees with a golden-orange interior. In Siberia, Scandinavia and the Baltics people have drunk it instead of tea for centuries.",
      },
      { type: "h2", text: "What makes it special?" },
      {
        type: "p",
        text: "Chaga grows on living birch for years and stores compounds from the bark — including betulin. It also contains large amounts of melanin and polyphenols, making it one of the natural products with the highest antioxidant activity.",
      },
      { type: "h2", text: "Three ways to prepare Chaga" },
      {
        type: "ul",
        items: [
          "Classic decoction: 1 tablespoon of Chaga in 1 litre of water, simmered for 1 hour",
          "Thermos method: pour 60–70°C water over it and leave overnight — this preserves more of the active compounds",
          "Chaga latte: add warm almond milk, cinnamon and a spoon of honey to a strong decoction",
        ],
      },
      {
        type: "quote",
        text: "You can simmer the same Chaga chunks 2–3 times, until the brew turns pale.",
      },
      { type: "h2", text: "Who should avoid it?" },
      {
        type: "p",
        text: "Chaga contains oxalates, so people with kidney stones should avoid it. Caution is also needed with blood-thinning and blood-sugar-lowering medication. If in doubt, ask your doctor.",
      },
    ],
  },
  "adaptogenebi-stresi-dzili": {
    title: "Adaptogens and sleep: an evening ritual with Reishi and lemon balm",
    excerpt: "How to build a simple evening ritual that releases the day's stress and prepares your body for deep sleep.",
    author: "Nino Beridze, herbalist",
    tags: ["Reishi", "Lemon balm", "Sleep"],
    content: [
      {
        type: "p",
        text: "Adaptogens are herbs and mushrooms traditionally used to help the body adapt to physical and emotional stress. The best known among mushrooms is Reishi, called the “mushroom of calm” in the East.",
      },
      { type: "h2", text: "An evening ritual in 4 steps" },
      {
        type: "ul",
        items: [
          "1.5 hours before bed, switch off screens or turn on night mode",
          "Make a tea: 1 teaspoon of lemon balm + ½ teaspoon of Reishi powder",
          "Drink it slowly in a quiet place — 5 minutes of deep breathing",
          "Go to bed at the same time every day",
        ],
      },
      {
        type: "p",
        text: "Lemon balm's citrusy aroma balances Reishi's bitterness, and together they make a soft, calming drink. Results are usually felt after 2–3 weeks of regular use.",
      },
      {
        type: "quote",
        text: "Sleep doesn't begin in bed — it begins with the first quiet minute of the evening.",
      },
    ],
  },
};
