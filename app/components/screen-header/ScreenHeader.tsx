import { Image, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import {
  IMAGE_SIZES,
  IMAGES_PATHS,
} from "@/app/components/image/constants";
import type { ScreenHeaderProps } from "./models/ScreenHeaderProps.interface";
import {
  SCREEN_HEADER_CLASS,
  SCREEN_HEADER_LOGO_CLASS,
  SCREEN_HEADER_TITLE_CLASS,
} from "./styles/ScreenHeader.styles";

const ScreenHeader = ({
  title,
  titleId,
  logoAlt,
}: ScreenHeaderProps): React.JSX.Element => (
  <header className={SCREEN_HEADER_CLASS}>
    <Image
      src={IMAGES_PATHS.ARENAL_LOGO}
      alt={logoAlt}
      width={IMAGE_SIZES.LOGO}
      height={IMAGE_SIZES.LOGO}
      aria-hidden={false}
      className={SCREEN_HEADER_LOGO_CLASS}
    />
    <Title
      id={titleId}
      variant={TitleVariant.PRIMARY}
      text={title}
      className={SCREEN_HEADER_TITLE_CLASS}
    />
  </header>
);

export default ScreenHeader;
