// Görsel tasarım veri modeli.
// Görsel listesi scripts/generate-design-works.mjs tarafından
// public/images/designs klasöründen otomatik oluşturulur.

import {
  generatedDesignWorks,
} from "./design-works.generated";

export type DesignWork = {
  id: string;
  title: string;
  category: string;
  purpose: string;
  platform: string;
  tools: readonly string[];
  image: string;
  thumbnail?: string;
  alt: string;
};

export const designWorks:
  readonly DesignWork[] = generatedDesignWorks;

export const featuredDesignIds = designWorks
  .slice(0, 6)
  .map((work) => work.id);
