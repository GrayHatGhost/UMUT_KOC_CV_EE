// Sosyal medya ve görsel iletişim çalışmaları

export type DesignWork = {
  id: string;
  number: string;
  title: string;
  category: string;
  purpose: string;
  platform: string;
  tools: string[];
  year?: string;
  image: string;
  thumbnail?: string;
  alt: string;
};

export const featuredDesignIds = [
  "design-01",
  "design-02",
  "design-03",
] as const;

export const designWorks: DesignWork[] = [
  {
    id: "design-01",
    number: "01",
    title: "Dijital Kolaylık, Güçlü Bağlantı",
    category: "Sosyal Medya Kampanyası",
    purpose:
      "Dijital hizmet ve bağlantı avantajını güçlü bir fiyat ve fayda vurgusuyla anlatan kampanya görseli.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2024",
    image: "/images/designs/design-01.webp",
    thumbnail: "/images/designs/design-01.webp",
    alt: "Dijital Kolaylık, Güçlü Bağlantı sosyal medya kampanyası tasarımı",
  },
  {
    id: "design-02",
    number: "02",
    title: "30 Ağustos Zafer Bayramı",
    category: "Kurumsal Gün Tasarımı",
    purpose:
      "30 Ağustos Zafer Bayramı için kurumsal kimliğe uyumlu biçimde hazırlanan anma ve kutlama görseli.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2024",
    image: "/images/designs/design-02.webp",
    thumbnail: "/images/designs/design-02.webp",
    alt: "30 Ağustos Zafer Bayramı kurumsal sosyal medya tasarımı",
  },
  {
    id: "design-03",
    number: "03",
    title: "Hukuki Bilgilendirme Serisi",
    category: "Bilgilendirme İçeriği",
    purpose:
      "Hukuki bilgiyi sade, okunabilir ve sosyal medya formatına uygun biçimde sunan bilgilendirme tasarımı.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2024",
    image: "/images/designs/design-03.webp",
    thumbnail: "/images/designs/design-03.webp",
    alt: "Hukuki bilgilendirme serisi sosyal medya tasarımı",
  },

  /*
   * 04–10 arası içerikler hazır katalog alanlarıdır.
   * Görselleri eklerken başlık, amaç, platform ve yılı
   * kendi gerçek çalışmalarına göre güncelle.
   */
  {
    id: "design-04",
    number: "04",
    title: "Kurumsal Duyuru Çalışması",
    category: "Kurumsal İletişim",
    purpose:
      "Kurumsal bir duyuruyu kısa metin, güçlü hiyerarşi ve kolay taranabilir görsel yapı ile aktaran çalışma.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2025",
    image: "/images/designs/design-04.webp",
    thumbnail: "/images/designs/design-04.webp",
    alt: "Kurumsal duyuru sosyal medya tasarımı",
  },
  {
    id: "design-05",
    number: "05",
    title: "Etkinlik İletişimi",
    category: "Etkinlik Duyurusu",
    purpose:
      "Etkinlik tarihini, konuşmacı veya program bilgisini anlaşılır bir görsel hiyerarşi içinde sunan çalışma.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2025",
    image: "/images/designs/design-05.webp",
    thumbnail: "/images/designs/design-05.webp",
    alt: "Etkinlik duyurusu sosyal medya tasarımı",
  },
  {
    id: "design-06",
    number: "06",
    title: "Hizmet Tanıtım Serisi",
    category: "Hizmet Tanıtımı",
    purpose:
      "Bir hizmetin temel faydalarını, kullanım alanını ve iletişim mesajını tek bir görselde birleştiren çalışma.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2025",
    image: "/images/designs/design-06.webp",
    thumbnail: "/images/designs/design-06.webp",
    alt: "Hizmet tanıtım serisi sosyal medya tasarımı",
  },
  {
    id: "design-07",
    number: "07",
    title: "Bilgilendirme Kartı",
    category: "Bilgilendirme İçeriği",
    purpose:
      "Yoğun bir bilgiyi başlık, kısa açıklama ve vurgu alanlarıyla daha kolay okunabilir hâle getiren çalışma.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2025",
    image: "/images/designs/design-07.webp",
    thumbnail: "/images/designs/design-07.webp",
    alt: "Bilgilendirme kartı sosyal medya tasarımı",
  },
  {
    id: "design-08",
    number: "08",
    title: "Özel Gün İletişimi",
    category: "Özel Gün Tasarımı",
    purpose:
      "Özel bir günün anlamını kurumsal kimlikle uyumlu, sade ve saygılı bir görsel dil ile aktaran çalışma.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2025",
    image: "/images/designs/design-08.webp",
    thumbnail: "/images/designs/design-08.webp",
    alt: "Özel gün kurumsal sosyal medya tasarımı",
  },
  {
    id: "design-09",
    number: "09",
    title: "Kampanya Duyurusu",
    category: "Kampanya Tasarımı",
    purpose:
      "Kampanya mesajını, teklif bilgisini ve harekete geçirici çağrıyı güçlü bir görsel odakla sunan çalışma.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2025",
    image: "/images/designs/design-09.webp",
    thumbnail: "/images/designs/design-09.webp",
    alt: "Kampanya duyurusu sosyal medya tasarımı",
  },
  {
    id: "design-10",
    number: "10",
    title: "Marka İletişimi",
    category: "Kurumsal Sosyal Medya",
    purpose:
      "Markanın dilini, hizmet yaklaşımını ve görsel kimliğini tutarlı bir sosyal medya kompozisyonunda birleştiren çalışma.",
    platform: "Instagram",
    tools: ["Adobe Photoshop", "Canva"],
    year: "2025",
    image: "/images/designs/design-10.webp",
    thumbnail: "/images/designs/design-10.webp",
    alt: "Marka iletişimi kurumsal sosyal medya tasarımı",
  },
];
