import Text from "@/app/components/text/Text";
import { LENGTH } from "@/app/constants";
import type { CategoryCardStatusNotesProps } from "../models/CategoryCardStatusNotesProps.interface";
import {
  CATEGORY_CARD_STATUS_NOTE_CLASS,
  CATEGORY_CARD_STATUS_NOTES_CLASS,
} from "../styles/CategoryCard.styles";

const CategoryCardStatusNotes = ({
  statusNotes,
}: CategoryCardStatusNotesProps): React.JSX.Element | null => {
  if (statusNotes.length === LENGTH.ZERO) {
    return null;
  }

  return (
    <div className={CATEGORY_CARD_STATUS_NOTES_CLASS}>
      {statusNotes.map((statusNote) => (
        <Text
          key={statusNote}
          className={CATEGORY_CARD_STATUS_NOTE_CLASS}
        >
          {statusNote}
        </Text>
      ))}
    </div>
  );
};

export default CategoryCardStatusNotes;
