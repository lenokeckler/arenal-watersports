import {
  pushMock,
  setCompatibilityMock,
  showToastMock,
} from "./extraCompatibilityBoats.harness";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  ARIA_ROLE,
  LENGTH,
  PATHS,
  STATUS,
} from "@/app/constants";
import ExtraCompatibilityBoatsView from "../ExtraCompatibilityBoatsView";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import {
  COMPATIBILITY_CATEGORIES,
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_EXTRA_ID,
  FREE_UNIT_ID,
  FREE_UNIT_ROW,
  LINKED_UNIT_ID,
  SINGLE_UNIT_CATEGORY_NAME,
} from "./ExtraCompatibility.constants";

const LINKED_TOTAL = 1;
const UNIT_TOTAL = 3;

const renderView = () => {
  const user = userEvent.setup();
  render(
    <ExtraCompatibilityBoatsView
      {...COMPATIBILITY_CATEGORIES}
    />
  );
  return user;
};

describe("ExtraCompatibilityBoatsView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCompatibilityMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("shows the total and opens the category that already has boats", () => {
    renderView();

    expect(
      screen.getByText(
        EXTRA_COMPATIBILITY_COPY.BOATS_TOTAL(
          LINKED_TOTAL,
          UNIT_TOTAL
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole(ARIA_ROLE.CHECKBOX, {
        name: new RegExp(FREE_UNIT_ROW.code),
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: new RegExp(SINGLE_UNIT_CATEGORY_NAME),
      })
    ).toHaveAttribute("aria-expanded", String(false));
  });

  it("counts the change and saves only the category that changed", async () => {
    const user = renderView();

    await user.click(
      screen.getByRole(ARIA_ROLE.CHECKBOX, {
        name: new RegExp(FREE_UNIT_ROW.code),
      })
    );

    expect(
      screen.getByText(EXTRA_COMPATIBILITY_COPY.DIRTY_ONE)
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: EXTRA_COMPATIBILITY_COPY.SAVE_BUTTON,
      })
    );

    expect(setCompatibilityMock).toHaveBeenCalledTimes(
      LENGTH.ONE
    );
    expect(setCompatibilityMock).toHaveBeenCalledWith({
      extraId: COMPATIBILITY_EXTRA_ID,
      categoryId: COMPATIBILITY_CATEGORY_ID,
      unitIds: [LINKED_UNIT_ID, FREE_UNIT_ID],
    });
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      EXTRA_COMPATIBILITY_COPY.SAVE_SUCCESS_TOAST
    );
    expect(
      screen.queryByText(EXTRA_COMPATIBILITY_COPY.DIRTY_ONE)
    ).toBeNull();
  });

  it("asks before leaving with unsaved changes and leaves without saving on request", async () => {
    const user = renderView();

    await user.click(
      screen.getByRole(ARIA_ROLE.CHECKBOX, {
        name: new RegExp(FREE_UNIT_ROW.code),
      })
    );
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: EXTRA_COMPATIBILITY_COPY.BACK_BUTTON,
      })
    );

    expect(
      screen.getByRole(ARIA_ROLE.DIALOG, {
        name: EXTRA_COMPATIBILITY_COPY.LEAVE_TITLE,
      })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: EXTRA_COMPATIBILITY_COPY.LEAVE_DISCARD_BUTTON,
      })
    );

    expect(setCompatibilityMock).not.toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.EXTRAS
    );
  });

  it("goes straight back when nothing changed", async () => {
    const user = renderView();

    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: EXTRA_COMPATIBILITY_COPY.BACK_BUTTON,
      })
    );

    expect(screen.queryByRole(ARIA_ROLE.DIALOG)).toBeNull();
    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.EXTRAS
    );
  });
});
