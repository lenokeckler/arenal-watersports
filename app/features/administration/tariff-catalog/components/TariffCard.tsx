import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import type { TariffCardViewModel } from "../models/TariffCardViewModel.interface";
import {
  TARIFF_CARD_CONTAINER_CLASS,
  TARIFF_CARD_NAME_CLASS,
} from "../styles/TariffCard.styles";
import TariffCardLine from "./TariffCardLine";

const TariffCard = ({
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
  </div>
);

export default TariffCard;
