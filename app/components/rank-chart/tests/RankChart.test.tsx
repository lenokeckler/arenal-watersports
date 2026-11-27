import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import RankChart from "../RankChart";
import { RANK_ROWS } from "./RankChart.constants";

describe("RankChart", () => {
  afterEach(cleanup);

  it("links only the rows that have somewhere to go", () => {
    render(
      <RankChart
        label="Máquinas"
        rows={RANK_ROWS}
      />
    );

    const links = screen.getAllByRole(ARIA_ROLE.LINK);

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute(
      "href",
      RANK_ROWS[0].href
    );
    expect(
      screen.getByText(RANK_ROWS[1].label)
    ).toBeInTheDocument();
  });
});
