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
import { ToastContainer } from "@/app/components";
import { CheckDeviceWidth_Provider } from "@/app/components/check-device-width";
import { ReduxProvider } from "@/app/providers";
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
      <ReduxProvider>
        <CheckDeviceWidth_Provider>
          {children}
          <ToastContainer />
        </CheckDeviceWidth_Provider>
      </ReduxProvider>
    </body>
  </html>
);

export default RootLayout;
