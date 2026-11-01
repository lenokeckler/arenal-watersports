import { ARIA_ROLE } from "@/app/constants";
import type { BoardCardCategoryLinesProps } from "../models/BoardCardCategoryLinesProps.interface";
import { BOARD_CARD_LINES_CLASS } from "../styles/BoardCard.styles";
import BoardCardCategoryLine from "./BoardCardCategoryLine";

const BoardCardCategoryLines = ({
  categories,
}: BoardCardCategoryLinesProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.LIST}
    className={BOARD_CARD_LINES_CLASS}
  >
    {categories.map((category) => (
      <BoardCardCategoryLine
        key={category.id}
        category={category}
      />
    ))}
  </div>
);

export default BoardCardCategoryLines;
