import { screen } from "@testing-library/react";
import {
  CHILD_TEXT,
  SECOND_CHILD_TEXT,
} from "./SystemScreen.constants";

export const createSystemScreenPage = () => {
  const getChild = () => screen.getByText(CHILD_TEXT);
  const getSecondChild = () =>
    screen.getByText(SECOND_CHILD_TEXT);
  const getFrame = () => getChild().parentElement;

  return {
    getChild,
    getSecondChild,
    getFrame,
  };
};
