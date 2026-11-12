import localFont from "next/font/local";

export const hankenGrotesk = localFont({
  src: "./HankenGrotesk-latin-wght.woff2",
  variable: "--font-hanken-grotesk",
  weight: "100 900",
});

export const jetbrainsMono = localFont({
  src: "./JetBrainsMono-latin-wght.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
});

export const materialSymbolsOutlined = localFont({
  display: "block",
  src: "./MaterialSymbolsOutlined-static.woff2",
  variable: "--font-material-symbols",
});
