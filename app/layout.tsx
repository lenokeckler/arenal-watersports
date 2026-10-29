import type { Metadata } from "next";
import {
  hankenGrotesk,
  jetbrainsMono,
  materialSymbolsOutlined,
} from "./fonts/AppFonts";
import "./globals.css";
import { resolveRootLayoutBodyClassName } from "./styles/RootLayout.styles";
import {
  APP_NAME,
  DOCUMENT_LANGUAGE,
} from "@/app/constants";
import { buildThemeInitScript } from "@/app/utils/theme/Theme";

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
