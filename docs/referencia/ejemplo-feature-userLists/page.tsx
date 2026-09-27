import { JSX } from "react";
import UserLists from "./UserLists";
import { USER_LISTS_PAGE_CLASS } from "./styles/UserListsPage.styles";

const UserListsPage = (): JSX.Element => (
  <main className={USER_LISTS_PAGE_CLASS}>
    <UserLists />
  </main>
);

export default UserListsPage;
