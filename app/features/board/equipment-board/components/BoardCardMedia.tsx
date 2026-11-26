import { InlineText, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import type { BoardCardProps } from "../models/BoardCardProps.interface";
import {
  BOARD_CARD_CHIPS_CLASS,
  BOARD_CARD_FREE_CHIP_CLASS,
  BOARD_CARD_LABEL_CLASS,
  BOARD_CARD_MEDIA_CLASS,
  BOARD_CARD_NAME_CLASS,
} from "../styles/BoardCard.styles";
import { resolveBoardCardChipText } from "../utils/resolveBoardCardChipText";
import BoardCardImage from "./BoardCardImage";

const BoardCardMedia = ({
  card,
  filter,
  isPriorityImage,
}: BoardCardProps): React.JSX.Element => (
  <div className={BOARD_CARD_MEDIA_CLASS}>
    <BoardCardImage
      card={card}
      isPriorityImage={isPriorityImage}
    />
    <div className={BOARD_CARD_CHIPS_CLASS}>
      <InlineText className={BOARD_CARD_FREE_CHIP_CLASS}>
        {resolveBoardCardChipText(card, filter)}
      </InlineText>
    </div>
    <div className={BOARD_CARD_NAME_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={card.label}
        className={BOARD_CARD_LABEL_CLASS}
      />
    </div>
  </div>
);

export default BoardCardMedia;
