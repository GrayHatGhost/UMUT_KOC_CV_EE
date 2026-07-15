// E-ticaret ve dijital operasyon deneyim içeriği

export type ExperienceIcon =
  | "order"
  | "stock"
  | "content"
  | "panel";

export type ExperienceGroup = {
  number: string;
  icon: ExperienceIcon;
  eyebrow: string;
  title: string;
  description: string;
  examples: string[];
};

export type DevelopmentItem = {
  number: string;
  title: string;
  description: string;
};

export type RoadmapStage = {
  label: string;
  title: string;
  description: string;
};

export const growthIntro =
  "Sipariş hazırlama ve stok doğruluğundan ürün içeriği ile web yayın süreçlerine uzanan deneyimimi, e-ticaret operasyonunun birbirine bağlı parçaları olarak görüyorum.";

export const experienceGroups: ExperienceGroup[] = [
  {
    number: "01",
    icon: "order",
    eyebrow: "SİPARİŞ OPERASYONU",
    title:
      "Doğru ürünün, doğru miktarla ve zamanında ilerlemesini önemsiyorum.",
    description:
      "Sipariş sürecini yalnızca hazırlama adımı olarak değil; ürün, miktar, teslimat ve zaman kontrolünün birlikte yürüdüğü bir iş akışı olarak ele alıyorum.",
    examples: [
      "Sipariş hazırlama ve görev takibi",
      "Ürün, miktar ve teslimat kriteri kontrolü",
      "Yoğun işlem hacminde zamanında tamamlama",
    ],
  },
  {
    number: "02",
    icon: "stock",
    eyebrow: "STOK VE ENVANTER",
    title:
      "Kayıt doğruluğunun operasyonun devamlılığı için temel olduğunu biliyorum.",
    description:
      "Dijital el terminali ve stok takip sistemleriyle çalışırken ürün ve envanter kayıtlarının fiziksel süreçle uyumunu kontrol ettim.",
    examples: [
      "Dijital el terminali kullanımı",
      "Stok ve envanter kayıtlarının kontrolü",
      "Operasyonel hata tespiti ve önleme",
    ],
  },
  {
    number: "03",
    icon: "content",
    eyebrow: "ÜRÜN VE İÇERİK",
    title:
      "İçeriğin doğru, anlaşılır ve yayına hazır olmasına dikkat ediyorum.",
    description:
      "Kişisel e-ticaret deneyimimde ürün içerikleri ve stok girişleri yaptım; web operasyonlarında sayfa, duyuru ve görsel içerik süreçlerini yürüttüm.",
    examples: [
      "Ürün başlığı, açıklaması ve stok girişi",
      "Sayfa, duyuru ve etkinlik içeriği yönetimi",
      "Photoshop ve Canva ile görsel hazırlama",
    ],
  },
  {
    number: "04",
    icon: "panel",
    eyebrow: "WEB VE YÖNETİM PANELLERİ",
    title:
      "Panel üzerindeki bir güncellemenin yayın sürecindeki etkisini takip ediyorum.",
    description:
      "Web tabanlı yönetim panellerinde içerik, kullanıcı, rol-yetki, yayın ve temel bakım süreçlerinde uygulamalı sorumluluk üstleniyorum.",
    examples: [
      "E-ticaret ve web yönetim paneli kullanımı",
      "Kullanıcı, rol ve yetki yapıları",
      "Yayın, güncelleme ve süreklilik takibi",
    ],
  },
];

export const experienceNarrative =
  "Bu deneyimler farklı ortamlarda oluştu; ancak ortak noktaları aynı: ürünü, kaydı, içeriği ve iş akışını kontrol ederek sürecin sonuca ulaşmasını sağlamak.";

export const developmentItems: DevelopmentItem[] = [
  {
    number: "01",
    title: "E-ticaret panel operasyonları",
    description:
      "Ürün, sipariş, stok, kampanya ve içerik güncellemelerini daha kapsamlı mağaza senaryolarında yönetme pratiği.",
  },
  {
    number: "02",
    title: "Excel ve operasyon raporlaması",
    description:
      "Veri temizleme, kontrol listeleri, temel raporlama ve günlük operasyon takibini daha verimli hâle getirme.",
  },
  {
    number: "03",
    title: "Ürün veri standardizasyonu",
    description:
      "Başlık, açıklama, görsel, kategori ve stok alanlarında tutarlı ürün kayıtları oluşturma yaklaşımı.",
  },
  {
    number: "04",
    title: "Pazaryeri ve sipariş sonrası süreçler",
    description:
      "Pazaryeri panel akışları, müşteri talepleri, iade ve sipariş sonrası operasyon adımlarını öğrenme.",
  },
];

export const developmentNarrative =
  "Öğrenmeyi yalnızca yeni bir araç kullanmak olarak değil; daha az hata, daha düzenli kayıt ve daha takip edilebilir bir operasyon oluşturmanın yolu olarak görüyorum.";

export const roadmapStages: RoadmapStage[] = [
  {
    label: "İlk adım",
    title: "İş akışını öğrenmek",
    description:
      "Kurumun ürün, sipariş, stok ve içerik süreçlerini; kullanılan panel ve kontrol adımlarıyla birlikte tanımak.",
  },
  {
    label: "Güven",
    title: "Kayıt doğruluğunu korumak",
    description:
      "Ürün ve sipariş verilerini kontrol etmek, hataları görünür hâle getirmek ve süreci düzenli biçimde takip etmek.",
  },
  {
    label: "Sorumluluk",
    title: "Operasyonla birlikte gelişmek",
    description:
      "İş hacmi ve ihtiyaçlar genişledikçe yeni panel ve süreçleri öğrenerek ekip içinde daha fazla sorumluluk üstlenmek.",
  },
];

export const roadmapClosing =
  "Hedefim ürün, stok, içerik ve sipariş akışının günlük işleyişinde güvenilir bir operasyon noktası hâline gelmek.";
