"use client";

import { JSX } from "react";
import Section from "@/app/components/section/Section";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import UserListsEmptyState from "./components/UserListsEmptyState";
import UserListsForm from "./components/UserListsForm";
import UserListsHeading from "./components/UserListsHeading";
import UserListsItems from "./components/UserListsItems";
import {
  USER_LISTS_COPY,
  USER_LISTS_ELEMENT_ID,
} from "./constants/UserLists.constants";
import { useUserListsViewModel } from "./hooks/useUserListsViewModel";
import {
  USER_LISTS_SECTION_CLASS,
  USER_LISTS_TITLE_CLASS,
} from "./styles/UserLists.styles";

const UserLists = (): JSX.Element => {
  const {
    errorMessage,
    handleAddUser,
    handleDeleteUser,
    handleUsernameChange,
    hasUsers,
    userCount,
    username,
    users,
  } = useUserListsViewModel();

  return (
    <Section
      id={USER_LISTS_ELEMENT_ID.SECTION}
      aria-label={USER_LISTS_COPY.SECTION_TITLE}
      className={USER_LISTS_SECTION_CLASS}
    >
      <Title
        variant={TitleVariant.PRIMARY}
        text={USER_LISTS_COPY.SECTION_TITLE}
        className={USER_LISTS_TITLE_CLASS}
      />
      <UserListsForm
        username={username}
        errorMessage={errorMessage}
        onUsernameChange={handleUsernameChange}
        onSubmit={handleAddUser}
      />
      <UserListsHeading
        title={USER_LISTS_COPY.LIST_TITLE}
        userCount={userCount}
      />
      {hasUsers ? (
        <UserListsItems
          users={users}
          onDeleteUser={handleDeleteUser}
        />
      ) : (
        <UserListsEmptyState />
      )}
    </Section>
  );
};

export default UserLists;
