// BU DOSYA OTOMATİK OLUŞTURULUR.
// public/images/designs klasöründeki görseller npm run dev/build öncesinde taranır.
// Başlık ve açıklama özelleştirmeleri için design-metadata.json dosyasını düzenleyin.

export const designWorks = [
  {
    "id": "design-01",
    "title": "İstanbul Adalet Rotası",
    "category": "Etkinlik Duyurusu",
    "purpose": "Av. Yunus Özak eşliğinde düzenlenen İstanbul Adalet Rotası etkinliğinin güzergâhını, tarihini, buluşma noktasını ve etkinlik süresini tek görselde anlaşılır biçimde sunan sosyal medya tasarımı.",
    "platform": "Instagram",
    "tools": [
      "Adobe Photoshop",
      "Canva"
    ],
    "image": "/images/designs/design-01.webp",
    "thumbnail": "/images/designs/design-01.webp",
    "alt": "Galata Kulesi, tramvay ve rota duraklarıyla hazırlanan İstanbul Adalet Rotası etkinlik duyurusu"
  },
  {
    "id": "design-02",
    "title": "Dijital Kartvizit Avantaj Kampanyası",
    "category": "Tanıtım ve Kampanya Tasarımı",
    "purpose": "ICON Dijital Kartvizit hizmetinin Genç Savunma üyelerine sunduğu indirim avantajını; ürün görseli, fayda maddeleri ve fiyat vurgusuyla anlatan kampanya tasarımı.",
    "platform": "Instagram",
    "tools": [
      "Adobe Photoshop",
      "Canva"
    ],
    "image": "/images/designs/design-02.webp",
    "thumbnail": "/images/designs/design-02.webp",
    "alt": "ICON Dijital Kartvizit için indirim ve fiyat vurgulu kampanya tasarımı"
  },
  {
    "id": "design-03",
    "title": "Kitap Kulübü Buluşması",
    "category": "Topluluk Etkinliği",
    "purpose": "Pınar Kür'ün Asılacak Kadın kitabı için düzenlenen kitap kulübü buluşmasının tarih, saat ve mekân bilgilerini sıcak ve davetkâr bir görsel dille duyuran etkinlik tasarımı.",
    "platform": "Instagram",
    "tools": [
      "Adobe Photoshop",
      "Canva"
    ],
    "image": "/images/designs/design-03.webp",
    "thumbnail": "/images/designs/design-03.webp",
    "alt": "Pınar Kür Asılacak Kadın kitabı için hazırlanan kitap kulübü buluşması duyurusu"
  },
  {
    "id": "design-04",
    "title": "İstanbul Barosu Seçim Anketi Sonuçları",
    "category": "Veri Görselleştirme",
    "purpose": "İstanbul Barosu seçim anketinde adayların aldığı oyları ve yüzdelik dağılımı pasta grafik ile karşılaştırmalı ve kolay okunabilir biçimde sunan bilgilendirme tasarımı.",
    "platform": "Instagram",
    "tools": [
      "Adobe Photoshop",
      "Canva"
    ],
    "image": "/images/designs/design-04.webp",
    "thumbnail": "/images/designs/design-04.webp",
    "alt": "İstanbul Barosu seçim anketi sonuçlarını pasta grafikle gösteren sosyal medya tasarımı"
  },
  {
    "id": "design-05",
    "title": "Cebri İcra Kanunu Taslağı Görüş Raporu",
    "category": "Rapor ve Yayın Duyurusu",
    "purpose": "Cebri İcra Kanunu Taslağına ilişkin hazırlanan görüş raporunu güçlü bir başlık hiyerarşisi ve adalet temalı görsel öğelerle duyuran kurumsal yayın tasarımı.",
    "platform": "Instagram",
    "tools": [
      "Adobe Photoshop",
      "Canva"
    ],
    "image": "/images/designs/design-05.webp",
    "thumbnail": "/images/designs/design-05.webp",
    "alt": "Adalet heykeli ile hazırlanan Cebri İcra Kanunu Taslağına İlişkin Görüş Raporu duyurusu"
  },
  {
    "id": "design-06",
    "title": "Açık Hava Sineması",
    "category": "Etkinlik Duyurusu",
    "purpose": "İstanbul Yelken Kulübü'nde düzenlenen Manchester by the Sea / Yaşamın Kıyısında gösteriminin konum, tarih, saat, bilet ve film bilgilerini tek görselde sunan etkinlik duyurusu.",
    "platform": "Instagram",
    "tools": [
      "Adobe Photoshop",
      "Canva"
    ],
    "image": "/images/designs/design-06.webp",
    "thumbnail": "/images/designs/design-06.webp",
    "alt": "İstanbul Yelken Kulübü açık hava sineması etkinlik duyurusu"
  }
] as const;

export const featuredDesignIds = designWorks
  .slice(0, 6)
  .map((work) => work.id);
