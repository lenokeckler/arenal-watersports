import { JSX } from "react";
import Text from "@/app/components/text/Text";
import { USER_LISTS_COPY } from "../constants/UserLists.constants";
import { USER_LISTS_EMPTY_STATE_CLASS } from "../styles/UserListsEmptyState.styles";

const UserListsEmptyState = (): JSX.Element => (
  <Text className={USER_LISTS_EMPTY_STATE_CLASS}>
    {USER_LISTS_COPY.EMPTY_LIST_MESSAGE}
  </Text>
);

export default UserListsEmptyState;
