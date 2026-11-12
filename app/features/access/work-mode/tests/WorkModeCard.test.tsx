import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  SUPABASE_WORK_AREA,
  WORK_MODE_FIELD,
  WORK_MODE_RESULT,
} from "@/app/constants";
import {
  WORK_MODE_COPY,
  WORK_MODE_ERROR,
} from "../constants/WorkModeCopy.constants";
import WorkModeCard from "../components/WorkModeCard";

describe("WorkModeCard", () => {
  it("posts its area and shows a refusal", async () => {
    const action = vi
      .fn()
      .mockResolvedValue(WORK_MODE_RESULT.NOT_ENABLED);
    const user = userEvent.setup();
    render(
      <WorkModeCard
        action={action}
        area={SUPABASE_WORK_AREA.RESERVATIONS}
        isCurrent
      />
    );

    expect(
      screen.getByText(WORK_MODE_COPY.CURRENT)
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button"));

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      WORK_MODE_ERROR[WORK_MODE_RESULT.NOT_ENABLED]
    );
    const formData: FormData = action.mock.calls[0][1];
    expect(formData.get(WORK_MODE_FIELD.AREA)).toBe(
      SUPABASE_WORK_AREA.RESERVATIONS
    );
  });
});
