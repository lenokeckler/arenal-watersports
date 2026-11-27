import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { formatCategoryDurationLabel } from "../utils/formatCategoryDurationLabel";
import { resolveReservationsSummary } from "../utils/resolveReservationsSummary";
import {
  DEFAULT_CATEGORY_CONFIGURATION,
  FAKE_CONFIGURATION_DURATION_MINUTES,
  FAKE_OTHER_DURATION_MINUTES,
  FAKE_PICKED_PRESET_DURATION_MINUTES,
  FAKE_UNSELECTED_PRESET_DURATION_MINUTES,
} from "./CategoryConfiguration.constants";
import { createCategoryConfigureViewPage } from "./CategoryConfigureView.page";
import { renderCategoryConfigureView } from "./renderCategoryConfigureView";

const { behavior } = DEFAULT_CATEGORY_CONFIGURATION;

describe("CategoryConfigureReservations", () => {
  it("shows the switches, the duration chips and the helps of a reservable category", () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    expect(
      page.getActiveSwitch(
        CATEGORY_CONFIGURE_COPY.BOOKABLE_LABEL
      )
    ).toHaveAttribute("aria-checked", STRING.TRUE);
    expect(
      page.getActiveSwitch(
        CATEGORY_CONFIGURE_COPY.GUIDE_ONLY_LABEL
      )
    ).toHaveAttribute("aria-checked", STRING.FALSE);
    expect(
      page.getChip(
        formatCategoryDurationLabel(
          FAKE_CONFIGURATION_DURATION_MINUTES
        )
      )
    ).toHaveAttribute("aria-pressed", STRING.TRUE);
    expect(
      page.getChip(
        formatCategoryDurationLabel(
          FAKE_UNSELECTED_PRESET_DURATION_MINUTES
        )
      )
    ).toHaveAttribute("aria-pressed", STRING.FALSE);
    expect(
      page.getText(CATEGORY_CONFIGURE_COPY.DURATION_HELP)
    ).toBeInTheDocument();
    expect(
      page.queryDurationField()
    ).not.toBeInTheDocument();
  });

  it("follows a picked duration and guide only in the section summary", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();
    const user = userEvent.setup();

    await user.click(
      page.getChip(
        formatCategoryDurationLabel(
          FAKE_PICKED_PRESET_DURATION_MINUTES
        )
      )
    );
    await user.click(
      page.getActiveSwitch(
        CATEGORY_CONFIGURE_COPY.GUIDE_ONLY_LABEL
      )
    );

    expect(
      page.getText(
        resolveReservationsSummary({
          ...behavior,
          defaultDurationMinutes:
            FAKE_PICKED_PRESET_DURATION_MINUTES,
          guideOnly: true,
        })
      )
    ).toBeInTheDocument();
  });

  it("reveals the duration field with Otra and keeps its validation", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();
    const user = userEvent.setup();

    await user.click(
      page.getChip(CATEGORY_CONFIGURE_COPY.DURATION_OTHER)
    );
    const durationField = screen.getByRole(
      ARIA_ROLE.TEXTBOX
    );
    await user.clear(durationField);
    await user.type(
      durationField,
      FAKE_OTHER_DURATION_MINUTES.toString()
    );

    expect(durationField).toHaveValue(
      FAKE_OTHER_DURATION_MINUTES.toString()
    );
    expect(
      page.getText(
        resolveReservationsSummary({
          ...behavior,
          defaultDurationMinutes:
            FAKE_OTHER_DURATION_MINUTES,
        })
      )
    ).toBeInTheDocument();
  });

  it("hides the duration and guide only controls when the category is not reservable", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();
    const user = userEvent.setup();

    await user.click(
      page.getActiveSwitch(
        CATEGORY_CONFIGURE_COPY.BOOKABLE_LABEL
      )
    );

    expect(
      page.getText(
        CATEGORY_CONFIGURE_COPY.RESERVATIONS_NOT_RESERVABLE
      )
    ).toBeInTheDocument();
    expect(
      page.getText(CATEGORY_CONFIGURE_COPY.DURATION_HELP)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole(ARIA_ROLE.SWITCH, {
        name: CATEGORY_CONFIGURE_COPY.GUIDE_ONLY_LABEL,
      })
    ).not.toBeInTheDocument();
  });
});
