import { UserItem } from "./UserItem.interface";
import {
  UserListsFieldChangeEvent,
  UserListsSubmitEvent,
} from "./UserListsEvents.type";

export interface UserListsViewModel {
  errorMessage: string;
  handleAddUser: (_event: UserListsSubmitEvent) => void;
  handleDeleteUser: (_userId: string) => void;
  handleUsernameChange: (
    _event: UserListsFieldChangeEvent
  ) => void;
  hasUsers: boolean;
  userCount: number;
  username: string;
  users: UserItem[];
}
