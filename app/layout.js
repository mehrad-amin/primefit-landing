import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { clubData } from "../src/config/clubData.js";
import "./globals.css";

// فونت هندسی و مدرن عربی
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});

// فونت مدرن انگلیسی برای متون لاتین، اعداد و برندینگ
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: `${clubData.brand.nameAr} | ${clubData.brand.sloganAr}`,
  description: `${clubData.brand.nameAr} في ${clubData.brand.cityAr} - النادي الرياضي الأكثر تكاملاً وفخامة. تجربة تدريب عالمية، صالات خاصة 100% للسيدات، ومناطق استشفاء متطورة. احصل على تصريح يومي مجاني الآن.`,
  keywords: [
    "جيم في الرياض",
    "نادي رياضي نسائي ورجالي",
    "نوادي رياضية فاخرة",
    "Prime Fit Athletic Club",
    "مدرب شخصي معتمد",
    "ساونا وحوض جليد",
    "Fitness Club GCC",
  ],
  authors: [{ name: clubData.brand.name }],
  metadataBase: new URL("https://primefit-gcc.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${clubData.brand.nameAr} | ${clubData.brand.sloganAr}`,
    description: `انضم إلى مجتمع النخبة الرياضي في ${clubData.brand.cityAr}. احجز تصريح يومي مجاني الآن وتعرف على أحدث التجهيزات الرياضية العالمية.`,
    url: "https://primefit-gcc.com",
    siteName: clubData.brand.nameAr,
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: clubData.brand.nameAr,
    description: clubData.brand.sloganAr,
  },
  themeColor: "#050505",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} ${plusJakarta.variable}`}
    >
      <body className="bg-dark-950 text-neutral-100 antialiased selection:bg-gold-500 selection:text-dark-950 min-h-screen flex flex-col font-arabic">
        {children}
      </body>
    </html>
  );
}
