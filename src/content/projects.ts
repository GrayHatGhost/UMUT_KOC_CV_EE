export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  summary: string[];
  role: string[];
  features: string[];
  learnings: string[];
  images: ProjectImage[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "genc-savunma",
    number: "01",
    title: "Genç Savunma Web ve Dijital Operasyon",
    category:
      "Yönetim Paneli · İçerik · Dijital Yayın",
    shortDescription:
      "Sayfa, duyuru, etkinlik, kullanıcı yetkisi ve görsel içerik süreçlerini tek yönetim akışı içinde takip ettiğim devam eden dijital operasyon çalışması.",
    summary: [
      "Genç Savunma’nın web sitesi ve yönetim panelindeki içerik, duyuru, etkinlik, kullanıcı ve yayın süreçlerinde aktif sorumluluk üstleniyorum.",
      "İçerik girişi, görsel hazırlama, kontrol, yayın ve güncelleme ihtiyaçlarını birbirinden kopuk görevler olarak değil, aynı dijital operasyon akışının parçaları olarak takip ediyorum.",
    ],
    role: [
      "Sayfa, duyuru ve etkinlik içeriklerinin hazırlanması",
      "Yönetim paneli üzerinden veri girişi ve yayın kontrolü",
      "Kullanıcı, rol ve yetki süreçlerine katkı sağlanması",
      "Photoshop ve Canva ile görsel içerik hazırlanması",
      "İçerik ve tasarım ihtiyaçlarının koordine edilmesi",
      "Yayın sonrası güncelleme ve bakım takibi",
      "Domain ve hosting süreçlerinin izlenmesi",
    ],
    features: [
      "İçerik yönetim paneli",
      "Sayfa ve duyuru yönetimi",
      "Etkinlik yayınları",
      "Kullanıcı ve yetki yapıları",
      "Dijital görsel üretimi",
      "Yayın ve güncelleme akışı",
      "Web sitesi sürekliliği",
    ],
    learnings: [
      "İçerik talebini yayına hazır bir çıktıya dönüştürmek",
      "Panel üzerindeki içerik ve yetki akışlarını takip etmek",
      "Farklı ihtiyaçları tek operasyon planında birleştirmek",
      "Yayın öncesi ve sonrası kontrol yapmak",
      "Düzenli güncelleme ve bakım sorumluluğu almak",
    ],
    images: [
      {
        src: "/images/projects/genc-savunma/cover.webp",
        alt: "Genç Savunma ana sayfa",
      },
      {
        src: "/images/projects/genc-savunma/home.webp",
        alt: "Genç Savunma giriş",
      },
      {
        src: "/images/projects/genc-savunma/admin-dashboard.webp",
        alt: "Genç Savunma yönetim paneli",
      },
      {
        src: "/images/projects/genc-savunma/content-management.webp",
        alt: "Genç Savunma içerik yönetimi",
      },
      {
        src: "/images/projects/genc-savunma/qr-system.webp",
        alt: "Genç Savunma dijital araçlar alanı",
      },
    ],
    liveUrl: "https://www.gencsavunma.org",
  },
];
