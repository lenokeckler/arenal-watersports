import { UserItem } from "./UserItem.interface";

export interface UserListsRowProps {
  onDelete: (_userId: string) => void;
  user: UserItem;
}
