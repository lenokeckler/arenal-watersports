import { Image, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import {
  IMAGE_ALTS,
  IMAGE_SIZES,
  IMAGES_PATHS,
} from "@/app/components/image/constants";
import {
  ACCESS_SCREEN_COPY,
  ACCESS_SCREEN_TITLE_ID,
} from "./constants/AccessScreen.constants";
import {
  ACCESS_HEADER_CLASS,
  ACCESS_HEADER_LOGO_CLASS,
  ACCESS_HEADER_TITLE_CLASS,
} from "./styles/AccessScreenHeader.styles";

const AccessScreenHeader = (): React.JSX.Element => (
  <header className={ACCESS_HEADER_CLASS}>
    <Image
      src={IMAGES_PATHS.ARENAL_LOGO}
      alt={IMAGE_ALTS.ARENAL_LOGO}
      width={IMAGE_SIZES.LOGO}
      height={IMAGE_SIZES.LOGO}
      aria-hidden={false}
      className={ACCESS_HEADER_LOGO_CLASS}
    />
    <Title
      id={ACCESS_SCREEN_TITLE_ID}
      variant={TitleVariant.PRIMARY}
      text={ACCESS_SCREEN_COPY.TITLE}
      className={ACCESS_HEADER_TITLE_CLASS}
    />
  </header>
);

export default AccessScreenHeader;
