import { UserItem } from "./UserItem.interface";

export interface UserListsItemsProps {
  onDeleteUser: (_userId: string) => void;
  users: UserItem[];
}
