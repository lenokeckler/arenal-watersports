import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";

export const createUnitPhotoDeletePage = () => {
  const user = userEvent.setup();
  const angle = UNIT_PHOTOS_COPY.ANGLE.right_side;
  const click = (name: string): Promise<void> =>
    user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, { name })
    );

  return {
    openLarge: () =>
      click(UNIT_PHOTOS_COPY.VIEW_LARGE(angle)),
    askToDelete: () =>
      click(UNIT_PHOTOS_COPY.DELETE_LABEL(angle)),
    cancel: () => click(UNIT_PHOTOS_COPY.CANCEL),
    confirm: () => click(UNIT_PHOTOS_COPY.DELETE),
    queryConfirmation: () =>
      screen.queryByText(
        UNIT_PHOTOS_COPY.CONFIRM_BODY(angle)
      ),
    findNotice: (message: string) =>
      screen.findByText(message),
  };
};
