import { ChangeEvent, FormEvent } from "react";

export type UserListsFieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export type UserListsSubmitEvent =
  FormEvent<HTMLFormElement>;
