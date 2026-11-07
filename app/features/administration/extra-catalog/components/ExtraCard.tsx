import Link from "@/app/components/link/Link";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraCardViewModel } from "../models/ExtraCardViewModel.interface";
import {
  EXTRA_CARD_CONTAINER_CLASS,
  EXTRA_CARD_EDIT_LINK_CLASS,
  EXTRA_CARD_HEADING_ROW_CLASS,
  EXTRA_CARD_NAME_CLASS,
} from "../styles/ExtraCard.styles";
import ExtraCardStatusChip from "./ExtraCardStatusChip";

const ExtraCard = ({
  editHref,
  name,
  status,
}: ExtraCardViewModel): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={name}
    className={EXTRA_CARD_CONTAINER_CLASS}
  >
    <div className={EXTRA_CARD_HEADING_ROW_CLASS}>
      <Title
        variant={TitleVariant.AUXILIAR}
        text={name}
        className={EXTRA_CARD_NAME_CLASS}
      />
      <ExtraCardStatusChip status={status} />
    </div>
    <Link
      href={editHref}
      className={EXTRA_CARD_EDIT_LINK_CLASS}
    >
      {EXTRA_CATALOG_COPY.EDIT_LINK}
    </Link>
  </div>
);

export default ExtraCard;
