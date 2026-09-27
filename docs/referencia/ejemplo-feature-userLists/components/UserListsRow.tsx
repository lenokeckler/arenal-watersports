import { JSX } from "react";
import Button from "@/app/components/button/Button";
import DeleteIcon from "@/app/components/icons/delete/DeleteIcon";
import Text from "@/app/components/text/Text";
import {
  BUTTON,
  BUTTON_TYPES,
  STRING,
} from "@/app/constants";
import { USER_LISTS_COPY } from "../constants/UserLists.constants";
import { UserListsRowProps } from "../models/UserListsRowProps.interface";
import {
  USER_LISTS_ROW_CLASS,
  USER_LISTS_ROW_DELETE_BUTTON_CLASS,
  USER_LISTS_ROW_DELETE_ICON_CLASS,
  USER_LISTS_ROW_USERNAME_CLASS,
} from "../styles/UserListsRow.styles";

const UserListsRow = ({
  onDelete,
  user,
}: UserListsRowProps): JSX.Element => (
  <li className={USER_LISTS_ROW_CLASS}>
    <Text className={USER_LISTS_ROW_USERNAME_CLASS}>
      {user.username}
    </Text>
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON.BASE}
      className={USER_LISTS_ROW_DELETE_BUTTON_CLASS}
      aria-label={`${USER_LISTS_COPY.DELETE_BUTTON_ARIA_PREFIX}${STRING.SPACE}${user.username}`}
      onClick={() => onDelete(user.id)}
    >
      <DeleteIcon
        className={USER_LISTS_ROW_DELETE_ICON_CLASS}
        color="#EF4444"
      />
      {USER_LISTS_COPY.DELETE_BUTTON}
    </Button>
  </li>
);

export default UserListsRow;
