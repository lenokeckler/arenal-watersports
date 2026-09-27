import {
  UserListsFieldChangeEvent,
  UserListsSubmitEvent,
} from "./UserListsEvents.type";

export interface UserListsFormProps {
  errorMessage: string;
  onSubmit: (_event: UserListsSubmitEvent) => void;
  onUsernameChange: (
    _event: UserListsFieldChangeEvent
  ) => void;
  username: string;
}
