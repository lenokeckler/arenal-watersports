import { Image, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import {
  IMAGE_SIZES,
  IMAGES_PATHS,
} from "@/app/components/image/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { ScreenHeaderProps } from "./models/ScreenHeaderProps.interface";
import {
  SCREEN_HEADER_CLASS,
  SCREEN_HEADER_LOGO_CLASS,
  SCREEN_HEADER_TITLE_CLASS,
} from "./styles/ScreenHeader.styles";

const ScreenHeader = ({
  hasLogo = true,
  logoAlt,
  title,
  titleId,
}: ScreenHeaderProps): React.JSX.Element => (
  <header className={SCREEN_HEADER_CLASS}>
    {hasLogo && (
      <Image
        src={IMAGES_PATHS.ARENAL_LOGO}
        alt={safeString(logoAlt)}
        width={IMAGE_SIZES.LOGO}
        height={IMAGE_SIZES.LOGO}
        aria-hidden={false}
        className={SCREEN_HEADER_LOGO_CLASS}
      />
    )}
    <Title
      id={titleId}
      variant={TitleVariant.PRIMARY}
      text={title}
      className={SCREEN_HEADER_TITLE_CLASS}
    />
  </header>
);

export default ScreenHeader;
