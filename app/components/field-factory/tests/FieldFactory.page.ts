import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  BUTTON_ROLE,
  INPUT_SELECTOR,
  TEXTBOX_ROLE,
} from "./FieldFactory.constants";

export const createFieldFactoryPage = (
  container: HTMLElement
) => {
  const getTextbox = () => screen.getByRole(TEXTBOX_ROLE);
  const getInput = () =>
    container.querySelector(INPUT_SELECTOR);
  const getToggle = (name: string) =>
    screen.getByRole(BUTTON_ROLE, { name });
  const clickToggle = (name: string) =>
    userEvent.click(getToggle(name));
  const getIcon = (name: string) => screen.getByText(name);

  return {
    clickToggle,
    getIcon,
    getInput,
    getTextbox,
    getToggle,
  };
};
