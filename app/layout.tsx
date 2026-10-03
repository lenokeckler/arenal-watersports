import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { resolveRootLayoutBodyClassName } from "./styles/RootLayout.styles";
import {
  APP_NAME,
  DOCUMENT_LANGUAGE,
} from "@/app/constants";
import { buildThemeInitScript } from "@/app/utils/theme/Theme";

const hankenGrotesk = localFont({
  src: "./fonts/HankenGrotesk-latin-wght.woff2",
  variable: "--font-hanken-grotesk",
  weight: "100 900",
});

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-latin-wght.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
});

const materialSymbolsOutlined = localFont({
  display: "block",
  src: "./fonts/MaterialSymbolsOutlined-static.woff2",
  variable: "--font-material-symbols",
});

export const metadata: Metadata = {
  title: APP_NAME.LABEL,
  description: APP_NAME.DESCRIPTION,
};

const RootLayout = ({
  children,
}: LayoutProps<"/">): React.JSX.Element => (
  <html
    lang={DOCUMENT_LANGUAGE}
    suppressHydrationWarning
  >
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: buildThemeInitScript(),
        }}
      />
    </head>
    <body
      className={resolveRootLayoutBodyClassName(
        hankenGrotesk.variable,
        jetbrainsMono.variable,
        materialSymbolsOutlined.variable
      )}
    >
      {children}
    </body>
  </html>
);

export default RootLayout;
