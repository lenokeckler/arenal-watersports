import { render, screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { describe, expect, it } from "vitest";
import ReservationSplitUnavailable from "../components/ReservationSplitUnavailable";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import { RESERVATION_SPLIT_UNAVAILABLE_COPY } from "../constants/ReservationSplitUnavailableCopy.constants";
import {
  SPLIT_CALENDAR_HREF,
  SPLIT_UNAVAILABLE_REASONS,
} from "./ReservationSplit.constants";

const HREF_ATTRIBUTE = "href";

describe("ReservationSplitUnavailable", () => {
  it.each(SPLIT_UNAVAILABLE_REASONS)(
    "shows the reason and a way back for %s",
    (reason) => {
      render(
        <ReservationSplitUnavailable reason={reason} />
      );
      const copy =
        RESERVATION_SPLIT_UNAVAILABLE_COPY[reason];

      expect(
        screen.getByText(copy.title)
      ).toBeInTheDocument();
      expect(
        screen.getByText(copy.body)
      ).toBeInTheDocument();
      expect(
        screen.getAllByRole(ARIA_ROLE.LINK, {
          name: RESERVATION_SPLIT_UI_COPY.BACK_TO_CALENDAR,
        })
      ).toSatisfy((links: HTMLElement[]) =>
        links.every(
          (link) =>
            link.getAttribute(HREF_ATTRIBUTE) ===
            SPLIT_CALENDAR_HREF
        )
      );
    }
  );
});
