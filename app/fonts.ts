import localFont from "next/font/local";

export const Graphik = localFont({
  src: [
    {
      path: "./font_files/Graphik-900-Super.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./font_files/Graphik-800-Black.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./font_files/Graphik-700-Bold.otf",
      weight: "700",
      style: "normal",
    },
    // {
    //   path: "./font_files/Graphik-600-SemiBold.otf",
    //   weight: "600",
    //   style: "normal",
    // },
    {
      path: "./font_files/Graphik-Medium-Web.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font_files/Graphik-Regular-Web.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font_files/Graphik-300-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./font_files/Graphik-200-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./font_files/Graphik-100-Thin.otf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-graphik",
});
export const GuardianEgyp = localFont({
  src: [
    {
      path: "./font_files/GuardianEgyp-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./font_files/GuardianEgyp-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./font_files/GuardianEgyp-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./font_files/GuardianEgyp-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font_files/GuardianEgyp-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font_files/GuardianEgyp-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./font_files/GuardianEgyp-Thin.otf",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-guardian-egyp",
});
