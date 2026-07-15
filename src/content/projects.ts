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
    id: "shopify-store",
    number: "01",
    title: "Shopify Mağaza Kurulumu ve Ürün Operasyonu",
    category: "Shopify · Ürün ve Stok · Mağaza Operasyonu",
    shortDescription:
      "Dropshipping modeliyle çalışan kişisel Shopify mağazamı sıfırdan kurduğum; ürün içerikleri, stok kayıtları ve mağaza düzenini yönettiğim uygulamalı e-ticaret deneyimi.",
    summary: [
      "2024 yılında Shopify üzerinde bir dropshipping mağazası kurarak mağaza yapısı, ürün kataloğu, ürün içeriği ve stok kayıtlarını kendim yönettim.",
      "Yaklaşık bir yıllık süreç sonunda pazarlama giderleri, operasyon yükü ve düşük kâr marjı arasındaki dengeyi değerlendirerek faaliyeti sürdürmeme kararı aldım. Bu deneyim, e-ticaretin yalnızca ürün yüklemekten değil; maliyet, içerik, stok ve sürdürülebilirlik kararlarından oluştuğunu görmemi sağladı.",
    ],
    role: [
      "Udemy üzerinden Shopify ve dropshipping eğitimi alınması",
      "Mağaza yapısının ve temel sayfaların kurulması",
      "Ürün kataloğunun oluşturulması",
      "Ürün başlığı, açıklaması ve görsellerinin hazırlanması",
      "Stok kayıtlarının sisteme girilmesi ve güncellenmesi",
      "Mağaza içeriği ve temel ayarların yönetilmesi",
      "Pazarlama maliyeti ve ürün marjının değerlendirilmesi",
      "Faaliyetin sürdürülebilirliğine ilişkin karar alınması",
    ],
    features: [
      "Shopify mağaza kurulumu",
      "Ürün ve kategori yapısı",
      "Ürün içerik girişi",
      "Stok kaydı ve güncelleme",
      "Görsel ve sayfa düzeni",
      "Temel mağaza operasyonu",
      "Maliyet ve kârlılık değerlendirmesi",
    ],
    learnings: [
      "Bir mağazayı sıfırdan yayına hazırlamak",
      "Ürün verisini düzenli ve tutarlı girmek",
      "Stok ve içerik güncellemelerini birlikte takip etmek",
      "Pazarlama maliyetinin ürün marjına etkisini değerlendirmek",
      "Sürdürülebilir olmayan bir modeli veriye göre sonlandırmak",
    ],
    images: [],
  },
  {
    id: "genc-savunma",
    number: "02",
    title: "Genç Savunma İçerik ve Yayın Operasyonu",
    category: "Yönetim Paneli · İçerik · Dijital Yayın",
    shortDescription:
      "Sayfa, duyuru, etkinlik, kullanıcı yetkisi ve görsel içerik süreçlerini tek yönetim akışı içinde takip ettiğim gönüllü dijital operasyon çalışması.",
    summary: [
      "Genç Savunma’nın web sitesi ve yönetim panelindeki içerik, duyuru, etkinlik, kullanıcı ve yayın süreçlerinde aktif sorumluluk üstleniyorum.",
      "İçerik girişi, görsel hazırlama, kontrol, yayın, güncelleme ve temel bakım ihtiyaçlarını birbirinden kopuk görevler olarak değil, aynı dijital operasyon akışının parçaları olarak takip ediyorum.",
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
  {
    id: "venta-legal",
    number: "03",
    title: "Venta Legal Web ve İçerik Yönetimi",
    category: "Kurumsal Web · İçerik Düzeni · Yayın",
    shortDescription:
      "Kurumsal sayfaların, hizmet içeriklerinin, mobil kontrollerin ve yayın sonrası güncellemelerin düzenli biçimde yürütüldüğü web operasyonu.",
    summary: [
      "Venta Legal için kurumsal sayfa yapısını, içerik düzenini ve yönetim paneli akışını bir araya getiren web çalışmasını yürüttüm.",
      "Metin ve görsel hiyerarşisi, responsive kontroller, içerik güncellemeleri ve yayın sonrası bakım adımlarını takip ederek sitenin sürdürülebilir biçimde yönetilmesine odaklandım.",
    ],
    role: [
      "Kurumsal içerik ihtiyaçlarının belirlenmesi",
      "Sayfa ve hizmet içeriklerinin düzenlenmesi",
      "Yönetim paneli akışının oluşturulması",
      "Metin ve görsel hiyerarşisinin kontrolü",
      "Responsive görünüm kontrolleri",
      "Form ve içerik testleri",
      "Yayın, güncelleme ve bakım takibi",
    ],
    features: [
      "Kurumsal sayfa yönetimi",
      "Hizmet alanı içerikleri",
      "Dinamik içerik yapısı",
      "Yönetim paneli",
      "Mobil uyumlu görünüm",
      "İletişim alanları",
      "Yayın ve bakım akışı",
    ],
    learnings: [
      "Kurumsal içeriği düzenli bir sayfa yapısına dönüştürmek",
      "Metin ve görsel hiyerarşisini planlamak",
      "Responsive kontroller yapmak",
      "İçerik güncellemelerini sürdürülebilir hâle getirmek",
      "Yayın sonrası bakım süreçlerini takip etmek",
    ],
    images: [
      {
        src: "/images/projects/venta-legal/cover.webp",
        alt: "Venta Legal ana sayfa",
      },
      {
        src: "/images/projects/venta-legal/home.webp",
        alt: "Venta Legal giriş",
      },
      {
        src: "/images/projects/venta-legal/services.webp",
        alt: "Venta Legal hizmetler sayfası",
      },
      {
        src: "/images/projects/venta-legal/admin-dashboard.webp",
        alt: "Venta Legal yönetim paneli",
      },
      {
        src: "/images/projects/venta-legal/mobile.webp",
        alt: "Venta Legal mobil görünüm",
      },
    ],
    liveUrl: "https://www.ventalegal.org",
  },
];
