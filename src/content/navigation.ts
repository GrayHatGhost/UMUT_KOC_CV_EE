// Ana sayfa navigasyonu

export const navItems = [
  { label: "Hikâyem", href: "#hikayem" },
  { label: "Operasyon", href: "#gelisim" },
  { label: "Çalışmalar", href: "#projeler" },
  { label: "Tasarım", href: "#tasarim" },
  { label: "CV", href: "#iletisim", isCV: true },
  { label: "İletişim", href: "#iletisim" },
] as const;

export const sectionIndicators = [
  { number: "01", label: "Açılış", href: "#giris" },
  { number: "02", label: "Hikâyem", href: "#hikayem" },
  { number: "03", label: "Operasyon", href: "#gelisim" },
  { number: "04", label: "Çalışmalar", href: "#projeler" },
  { number: "05", label: "Tasarım", href: "#tasarim" },
  { number: "06", label: "İletişim", href: "#iletisim" },
] as const;
