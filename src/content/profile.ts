export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  type: "professional" | "volunteer";
  description: string;
  bullets: string[];
};


export type Education = {
  degree: string;
  school: string;
  status: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Language = {
  language: string;
  level: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  year: string;
};

export type ProfileData = {
  name: string;
  role: string;
  headline: string;
  location: string;
  phone: string;
  email: string;
  portfolio: string;
  cvPath: string;
  militaryStatus: string;
  about: string;
  careerObjective: string;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  languages: Language[];
  certificates: Certificate[];
};

export const profile: ProfileData = {
  name: "Umut Koç",
  role: "E-Ticaret ve Dijital Operasyon Adayı",
  headline: "Sipariş · Stok · Ürün İçeriği · Web Operasyonu",
  location: "Esenyurt, İstanbul",
  phone: "+90 541 785 39 00",
  email: "umutkoco@outlook.com",
  portfolio: "https://umutkoccv.vercel.app",
  cvPath: "/cv/umut-koc-e-ticaret-cv.pdf",
  militaryStatus: "Tamamlandı (2026)",
  about:
    "Ekonometri lisans mezunuyum. Dijital el terminali ve stok takip sistemleri üzerinden sipariş, envanter ve ürün doğruluğu süreçlerinde yaklaşık dört yıllık operasyon deneyimine sahibim. Web yönetim panellerinde içerik, sayfa, duyuru, kullanıcı yetkisi ve yayın süreçlerini yürütüyorum.",
  careerObjective:
    "Stok, sipariş, ürün içeriği ve web tabanlı sistemlerdeki deneyimimi; iş akışını öğrenebileceğim, kayıt doğruluğunu koruyabileceğim ve zamanla daha fazla sorumluluk alabileceğim bir e-ticaret ve dijital operasyon ekibinde değerlendirmeyi hedefliyorum.",
  experience: [
    {
      role: "Web ve Dijital Operasyon",
      company: "Genç Savunma Avukat Topluluğu",
      period: "Ekim 2025 – Devam ediyor",
      type: "volunteer",
      description:
        "Web sitesi, yönetim paneli, içerik ve dijital yayın süreçlerinde gönüllü operasyon sorumluluğu üstleniyorum.",
      bullets: [
        "Sayfa, duyuru, etkinlik ve diğer içeriklerin düzenleme, veri girişi, kontrol ve yayın süreçlerini yürütüyorum.",
        "Panel içerisindeki içerik, kullanıcı, rol-yetki ve modül süreçlerinin düzenlenmesine katkı sağlıyorum.",
        "Photoshop ve Canva ile dijital kanallarda kullanılacak görsel içerikler hazırlıyorum.",
        "İçerik, tasarım, yayın ve web güncelleme ihtiyaçlarını aynı operasyon akışı içinde takip ediyorum.",
        "Web sitesinin bakım, güncelleme ve yayın sürekliliğini destekliyorum.",
      ],
    },
    {
      role: "Saha / Operasyon Personeli",
      company: "Akçay Kırtasiye | AkOffice",
      period: "Ağustos 2022 – Haziran 2026",
      location: "Esenyurt, İstanbul",
      type: "professional",
      description:
        "Yoğun işlem hacmi içinde sipariş, stok, envanter ve ürün doğruluğu süreçlerinde görev aldım.",
      bullets: [
        "Dijital el terminali ve stok takip sistemleri üzerinden ürün, envanter ve sipariş süreçlerini yürüttüm.",
        "Siparişlerin doğru ürün, miktar ve teslimat kriterlerine göre hazırlanmasını ve kontrolünü sağladım.",
        "Ürün ve stok kayıtlarının doğruluğunu kontrol ederek operasyonel hataların önlenmesine katkı sağladım.",
        "Siparişlerin zamanında tamamlanmasını ve ilgili ekiplerle koordinasyonu takip ettim.",
      ],
    },
  ],
  education: [
    {
      degree: "Ekonometri (Lisans)",
      school: "Trakya Üniversitesi",
      status: "Mezun, 2024",
    },
    {
      degree: "Yönetim Bilişim Sistemleri",
      school: "Anadolu Üniversitesi (AÖF)",
      status: "Devam ediyor",
    },
  ],
  skills: [
    {
      category: "E-Ticaret ve Sipariş Operasyonu",
      items: [
        "Sipariş ve stok takibi",
        "Ürün, miktar ve teslimat kontrolü",
        "Envanter ve stok doğruluğu",
        "İş akışı ve görev takibi",
        "Operasyonel hata kontrolü",
        "Ekipler arası koordinasyon",
      ],
    },
    {
      category: "Ürün ve İçerik Yönetimi",
      items: [
        "Web sitesi ve içerik yönetimi",
        "Yönetim paneli kullanımı",
        "Sayfa ve içerik girişi",
        "Dijital yayın ve güncelleme",
        "Ürün görseli hazırlama",
        "Adobe Photoshop ve Canva",
      ],
    },
    {
      category: "Dijital Sistemler ve Veri",
      items: [
        "Excel, Word ve PowerPoint",
        "Web tabanlı yönetim panelleri",
        "Dijital el terminali",
        "Stok takip sistemleri",
        "Veri ve kayıt düzeni",
        "Yeni sistemlere hızlı adaptasyon",
      ],
    },
    {
      category: "Web ve Dijital Operasyon",
      items: [
        "Web sitesi yayın süreçleri",
        "İkas ve web paneli aşinalığı",
        "Kullanıcı, rol ve yetki yapıları",
        "Domain ve hosting takibi",
        "Yayın ve güncelleme takibi",
        "Dijital içerik ve görsel hazırlama",
      ],
    },
  ],
  languages: [
    {
      language: "Türkçe",
      level: "Ana dil",
    },
    {
      language: "İngilizce",
      level: "A2 – Temel seviye",
    },
  ],
  certificates: [],
};
