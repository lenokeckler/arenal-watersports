import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import type { TariffCardViewModel } from "../models/TariffCardViewModel.interface";
import {
  TARIFF_CARD_CONTAINER_CLASS,
  TARIFF_CARD_EDIT_ICON_CLASS,
  TARIFF_CARD_EDIT_LINK_CLASS,
  TARIFF_CARD_HEADER_CLASS,
  TARIFF_CARD_NAME_CLASS,
} from "../styles/TariffCard.styles";
import TariffCardLine from "./TariffCardLine";

const TariffCard = ({
  editHref,
  lines,
  name,
}: TariffCardViewModel): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={name}
    className={TARIFF_CARD_CONTAINER_CLASS}
  >
    <div className={TARIFF_CARD_HEADER_CLASS}>
      <Title
        variant={TitleVariant.AUXILIAR}
        text={name}
        className={TARIFF_CARD_NAME_CLASS}
      />
      <Link
        href={editHref}
        className={TARIFF_CARD_EDIT_LINK_CLASS}
      >
        <InlineText>
          {TARIFF_CATALOG_COPY.EDIT_LINK}
        </InlineText>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.CHEVRON_RIGHT}
          className={TARIFF_CARD_EDIT_ICON_CLASS}
        />
      </Link>
    </div>
    {lines.map((line) => (
      <TariffCardLine
        key={line.label}
        {...line}
      />
    ))}
  </div>
);

export default TariffCard;
