import { JSX } from "react";
import UserListsRow from "./UserListsRow";
import { UserListsItemsProps } from "../models/UserListsItemsProps.interface";
import { USER_LISTS_ITEMS_CLASS } from "../styles/UserListsItems.styles";

const UserListsItems = ({
  onDeleteUser,
  users,
}: UserListsItemsProps): JSX.Element => (
  <ul className={USER_LISTS_ITEMS_CLASS}>
    {users.map((user) => (
      <UserListsRow
        key={user.id}
        user={user}
        onDelete={onDeleteUser}
      />
    ))}
  </ul>
);

export default UserListsItems;
