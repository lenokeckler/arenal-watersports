import Link from "@/app/components/link/Link";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import type { TariffCardViewModel } from "../models/TariffCardViewModel.interface";
import {
  TARIFF_CARD_CONTAINER_CLASS,
  TARIFF_CARD_EDIT_LINK_CLASS,
  TARIFF_CARD_NAME_CLASS,
} from "../styles/TariffCard.styles";
import TariffCardLine from "./TariffCardLine";

const TariffCard = ({
  editHref,
  lines,
  name,
  tone,
}: TariffCardViewModel): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={name}
    className={TARIFF_CARD_CONTAINER_CLASS[tone]}
  >
    <Title
      variant={TitleVariant.AUXILIAR}
      text={name}
      className={TARIFF_CARD_NAME_CLASS}
    />
    {lines.map((line) => (
      <TariffCardLine
        key={line.label}
        {...line}
      />
    ))}
    <Link
      href={editHref}
      className={TARIFF_CARD_EDIT_LINK_CLASS}
    >
      {TARIFF_CATALOG_COPY.EDIT_LINK}
    </Link>
  </div>
);

export default TariffCard;
