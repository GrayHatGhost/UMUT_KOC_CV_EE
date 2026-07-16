// E-ticaret ve dijital operasyon odağındaki kariyer hikâyesi

export type StoryChapter = {
  number: string;
  period: string;
  title: string;
  summary: string;
  details: string[];
  closing: string;
};

export const storyIntro =
  "Operasyon, e-ticaret denemesi ve web yönetim paneli deneyimlerim birbirinden kopuk adımlar değil. Her biri ürünün, verinin ve içeriğin doğru biçimde ilerlemesini takip etmeyi öğretti.";

export const storyToday =
  "Bugün saha operasyonunda kazandığım sipariş ve stok disiplinini, Shopify mağaza deneyimimi ve web yayın süreçlerini e-ticaret odağında birleştiriyorum.";

export const storyChapters: StoryChapter[] = [
  {
    number: "01",
    period: "Üniversite yılları",
    title: "Veri ve kayıt düzeniyle şekillenen temel",
    summary:
      "Trakya Üniversitesi Ekonometri bölümünde aldığım eğitim, sayısal veriyi yorumlama ve kayıt düzenine dikkat etme yaklaşımımı güçlendirdi.",
    details: [
      "Veri, oran ve sonuçlar arasındaki ilişkiyi sorgulama alışkanlığı kazandım.",
      "Eğitim ve çalışma hayatını birlikte yürüterek planlama ve sorumluluk becerilerimi geliştirdim.",
      "Yönetim Bilişim Sistemleri eğitimimle dijital sistemler ve iş süreçleri arasındaki bağı güçlendirmeye devam ediyorum.",
    ],
    closing:
      "Akademik geçmişim, operasyonel kararları yalnızca hızla değil; veri ve doğruluk açısından da değerlendirmemi sağlıyor.",
  },
  {
    number: "02",
    period: "2022–2026",
    title: "Operasyonun öğrettiği sipariş ve stok disiplini",
    summary:
      "Akçay Kırtasiye’de yoğun işlem hacmi içinde sipariş hazırlama, ürün kontrolü, stok doğruluğu ve ekip koordinasyonu sorumlulukları üstlendim.",
    details: [
      "Dijital el terminali ve stok takip sistemlerini günlük iş akışında kullandım.",
      "Siparişleri doğru ürün, miktar ve teslimat kriterlerine göre kontrol ettim.",
      "Stok ve ürün kayıtlarındaki hataların operasyonu nasıl etkilediğini doğrudan gözlemledim.",
    ],
    closing:
      "Bu dönem, bir siparişin arkasındaki kayıt, kontrol ve koordinasyon zincirini gerçek çalışma ortamında öğrenmemi sağladı.",
  },
  {
    number: "03",
    period: "2023–2024",
    title: "Bir Shopify mağazasını sıfırdan kurmak",
    summary:
      "Dropshipping modeliyle çalışan kişisel Shopify mağazamı kurarak ürün, stok ve mağaza içeriği süreçlerini yaklaşık bir yıl boyunca yönettim.",
    details: [
      "Mağaza yapısını, temel sayfaları ve ürün kataloğunu sıfırdan oluşturdum.",
      "Ürün başlıklarını, açıklamalarını, görsellerini ve stok bilgilerini kendim girdim.",
      "Udemy üzerinden eğitim alarak mağaza kurulumu ve temel e-ticaret süreçlerini uygulamalı biçimde öğrendim.",
    ],
    closing:
      "Pazarlama maliyeti, operasyon yükü ve kâr marjı arasındaki dengeyi değerlendirerek sürdürülebilirliğin yalnızca satış yapmaktan ibaret olmadığını gördüm.",
  },
  {
    number: "04",
    period: "2025–Bugün",
    title: "İçerik, panel ve e-ticaret odağını birleştirmek",
    summary:
      "Genç Savunma’da web yönetim paneli, içerik, yayın, kullanıcı yetkisi ve görsel üretim süreçlerini aynı operasyon akışı içinde yürütüyorum.",
    details: [
      "Sayfa, duyuru ve etkinlik içeriklerinin veri girişi, kontrol ve yayın aşamalarını takip ediyorum.",
      "Photoshop ve Canva ile dijital kanallar için görsel içerikler hazırlıyorum.",
      "Saha operasyonu, Shopify ve web paneli deneyimlerimi e-ticaret ve dijital operasyon kariyerine taşıyorum.",
    ],
    closing:
      "Hedefim ürün, stok, içerik ve sipariş akışını birlikte görebilen; düzenli, takipçi ve güvenilir bir operasyon çalışanı olmak.",
  },
];
