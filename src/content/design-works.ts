// Görsel tasarım veri modeli.
// Görsel listesi scripts/generate-design-works.mjs tarafından
// public/images/designs klasöründen otomatik oluşturulur.

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

export {
  designWorks,
  featuredDesignIds,
} from "./design-works.generated";
