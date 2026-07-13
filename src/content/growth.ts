// Kariyer gelişimi içeriği

export type ExperienceGroup = {
  number: string;
  title: string;
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

export const experienceGroups: ExperienceGroup[] = [
  {
    number: "01",
    title: "Donanım ve bakım",
    examples: [
      "Bilgisayar montajı, parça değişimi ve sistem yükseltme",
      "Arıza tespiti, termal bakım ve genel donanım temizliği",
      "SSD, RAM ve depolama bileşenlerinin kurulumu",
    ],
  },
  {
    number: "02",
    title: "Windows ve sistem kurulumu",
    examples: [
      "Windows kurulumu, sürücü yükleme ve temel yapılandırma",
      "BIOS ve UEFI ayarları ile disk bölümlendirme",
      "Veri aktarımı ve yazılımsal temel veri kurtarma",
    ],
  },
  {
    number: "03",
    title: "Ağ ve bağlantı",
    examples: [
      "Modem, router ve access point kurulumu",
      "Birden fazla access point içeren kablosuz ağ yapılandırmaları",
      "Kablosuz güvenlik kamerası kurulumu ve bağlantı desteği",
    ],
  },
  {
    number: "04",
    title: "Kullanıcı desteği",
    examples: [
      "Yerinde teknik destek ve temel sorun giderme",
      "AnyDesk, TeamViewer ve Microsoft Remote Desktop ile uzaktan destek",
      "Kurulum sonrasında kullanıcıya sistem teslimi ve yönlendirme",
    ],
  },
];

export const experienceNarrative =
  "Bu deneyimlerin büyük bölümü, çevremdeki kullanıcıların gerçek bilgisayar ve bağlantı sorunlarına çözüm üretirken oluştu.";

export const developmentItems: DevelopmentItem[] = [
  {
    number: "01",
    title: "Kurumsal IT süreçleri",
    description:
      "Help Desk iş akışı, ticket yönetimi, envanter takibi ve kullanıcı destek prosedürleri.",
  },
  {
    number: "02",
    title: "Microsoft 365 ve kullanıcı yönetimi",
    description:
      "Kullanıcı hesapları, erişim yetkileri, kurumsal e-posta ve temel yönetim süreçleri.",
  },
  {
    number: "03",
    title: "Ağ temelleri",
    description:
      "TCP/IP, DNS, DHCP, bağlantı teşhisi ve temel ağ sorun giderme yaklaşımı.",
  },
  {
    number: "04",
    title: "Teknik İngilizce",
    description:
      "Teknik dokümanları, hata mesajlarını ve ürün arayüzlerini daha rahat takip edebilmek.",
  },
];

export const roadmapStages: RoadmapStage[] = [
  {
    label: "Şimdi",
    title: "İlk kurumsal IT Support deneyimi",
    description:
      "Gerçek kullanıcılar, cihazlar ve iş süreçleri içinde düzenli teknik destek deneyimi kazanmak.",
  },
  {
    label: "Sonraki adım",
    title: "CompTIA A+ ve ev laboratuvarı",
    description:
      "Temel bilgilerimi belgelendirmek ve kurumsal sistem senaryolarını uygulamalı olarak çalışmak.",
  },
  {
    label: "Uzun vadede",
    title: "Daha kapsamlı sistem ve ağ sorumluluğu",
    description:
      "Edindiğim saha deneyimini daha kurumsal bir BT ortamında derinleştirmek.",
  },
];

export const roadmapClosing =
  "Hedefim kısa sürede büyük unvanlar edinmek değil; sağlam temeller üzerinde güvenilir bir BT kariyeri oluşturmak.";
