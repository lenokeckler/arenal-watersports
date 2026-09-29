import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import MaterialIcon from "../MaterialIcon";
import { MATERIAL_ICON_NAME } from "../constants/MaterialIconName.constants";
import { MATERIAL_ICON_CLASS } from "../styles/MaterialIcon.styles";
import { createMaterialIconPage } from "./MaterialIcon.page";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  CALLER_CLASS,
  IMAGE_ROLE,
} from "./MaterialIcon.constants";

describe("MaterialIcon", () => {
  it("renders the glyph name as the ligature text", () => {
    render(
      <MaterialIcon
        name={MATERIAL_ICON_NAME.VISIBILITY_OFF}
      />
    );
    const page = createMaterialIconPage(
      MATERIAL_ICON_NAME.VISIBILITY_OFF
    );

    expect(page.getIcon()).toBeInTheDocument();
  });

  it("uses the Material Symbols class", () => {
    render(
      <MaterialIcon name={MATERIAL_ICON_NAME.LOGIN} />
    );
    const page = createMaterialIconPage(
      MATERIAL_ICON_NAME.LOGIN
    );

    expect(page.getIcon()).toHaveClass(MATERIAL_ICON_CLASS);
  });

  it("appends the caller class", () => {
    render(
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ERROR}
        className={CALLER_CLASS}
      />
    );
    const page = createMaterialIconPage(
      MATERIAL_ICON_NAME.ERROR
    );

    expect(page.getIcon()).toHaveClass(
      MATERIAL_ICON_CLASS,
      CALLER_CLASS
    );
  });

  it("is hidden from assistive technology", () => {
    render(
      <MaterialIcon
        name={MATERIAL_ICON_NAME.PROGRESS_ACTIVITY}
      />
    );
    const page = createMaterialIconPage(
      MATERIAL_ICON_NAME.PROGRESS_ACTIVITY
    );

    expect(page.getIcon()).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      ARIA_HIDDEN_VALUE
    );
    expect(page.queryByRole(IMAGE_ROLE)).toBeNull();
  });
});
