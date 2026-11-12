import { describe, expect, it } from "vitest";
import {
  INPUT_TYPES,
  MATERIAL_ICON_NAME,
} from "@/app/constants";
import { PASSWORD_TOGGLE_COPY } from "../constants/PasswordToggleCopy.constants";
import { FIELD_FACTORY_PASSWORD_INPUT_CLASS } from "../styles/FieldFactory.styles";
import {
  BUTTON_ROLE,
  TYPE_ATTRIBUTE,
} from "./FieldFactory.constants";
import { renderFieldFactory } from "./renderFieldFactory";

describe("FieldFactory password toggle", () => {
  it("starts hidden with the show label and the visibility icon", () => {
    const page = renderFieldFactory({
      type: INPUT_TYPES.PASSWORD,
    });

    expect(
      page.getToggle(PASSWORD_TOGGLE_COPY.SHOW)
    ).toHaveAttribute(TYPE_ATTRIBUTE, BUTTON_ROLE);
    expect(
      page.getIcon(MATERIAL_ICON_NAME.VISIBILITY)
    ).toBeInTheDocument();
    expect(page.getInput()).toHaveAttribute(
      TYPE_ATTRIBUTE,
      INPUT_TYPES.PASSWORD
    );
  });

  it("reveals the password and switches label and icon on click", async () => {
    const page = renderFieldFactory({
      type: INPUT_TYPES.PASSWORD,
    });

    await page.clickToggle(PASSWORD_TOGGLE_COPY.SHOW);

    expect(
      page.getToggle(PASSWORD_TOGGLE_COPY.HIDE)
    ).toBeInTheDocument();
    expect(
      page.getIcon(MATERIAL_ICON_NAME.VISIBILITY_OFF)
    ).toBeInTheDocument();
    expect(page.getInput()).toHaveAttribute(
      TYPE_ATTRIBUTE,
      INPUT_TYPES.TEXT
    );
  });
});

describe("FieldFactory password input padding", () => {
  it("reserves right padding for the toggle on the password input", () => {
    const page = renderFieldFactory({
      type: INPUT_TYPES.PASSWORD,
    });

    expect(page.getInput()).toHaveClass(
      FIELD_FACTORY_PASSWORD_INPUT_CLASS
    );
  });

  it("does not add the padding to a text input", () => {
    const page = renderFieldFactory();

    expect(page.getTextbox()).not.toHaveClass(
      FIELD_FACTORY_PASSWORD_INPUT_CLASS
    );
  });
});
