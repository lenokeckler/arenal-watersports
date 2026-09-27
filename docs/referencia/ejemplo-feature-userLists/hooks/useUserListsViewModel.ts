"use client";

import { useState } from "react";
import { LENGTH, STRING } from "@/app/constants";
import { USER_LISTS_COPY } from "../constants/UserLists.constants";
import { UserItem } from "../models/UserItem.interface";
import { UserListsViewModel } from "../models/UserListsViewModel.interface";
import {
  UserListsFieldChangeEvent,
  UserListsSubmitEvent,
} from "../models/UserListsEvents.type";

const areSameUsername = (
  firstUsername: string,
  secondUsername: string
): boolean =>
  firstUsername.toLocaleLowerCase() ===
  secondUsername.toLocaleLowerCase();

export const useUserListsViewModel =
  (): UserListsViewModel => {
    const [username, setUsername] = useState<string>(
      STRING.Empty
    );
    const [users, setUsers] = useState<UserItem[]>([]);
    const [errorMessage, setErrorMessage] =
      useState<string>(STRING.Empty);

    const handleUsernameChange = (
      event: UserListsFieldChangeEvent
    ) => {
      setUsername(event.target.value);
      setErrorMessage(STRING.Empty);
    };

    const handleAddUser = (event: UserListsSubmitEvent) => {
      event.preventDefault();
      const trimmedUsername = username.trim();

      if (trimmedUsername.length === LENGTH.ZERO) {
        setErrorMessage(
          USER_LISTS_COPY.EMPTY_USERNAME_ERROR
        );
        return;
      }

      const isDuplicated = users.some((user) =>
        areSameUsername(user.username, trimmedUsername)
      );

      if (isDuplicated) {
        setErrorMessage(
          USER_LISTS_COPY.DUPLICATED_USERNAME_ERROR
        );
        return;
      }

      setUsers((currentUsers) => [
        ...currentUsers,
        {
          id: crypto.randomUUID(),
          username: trimmedUsername,
        },
      ]);
      setUsername(STRING.Empty);
      setErrorMessage(STRING.Empty);
    };

    const handleDeleteUser = (userId: string) => {
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userId)
      );
    };

    return {
      errorMessage,
      handleAddUser,
      handleDeleteUser,
      handleUsernameChange,
      hasUsers: users.length > LENGTH.ZERO,
      userCount: users.length,
      username,
      users,
    };
  };
