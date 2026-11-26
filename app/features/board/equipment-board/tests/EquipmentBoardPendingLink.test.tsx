import { render, screen } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { DISPATCH_BOARD_PAGINATION } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import { readBoardCategories } from "@/app/services/board";
import EquipmentBoard from "../EquipmentBoard";
import EquipmentBoardPendingLink from "../components/EquipmentBoardPendingLink";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import { BOARD_ROWS_WITH_GROUP } from "./EquipmentBoard.constants";
import { renderWithBoardStore } from "./renderWithBoardStore";

vi.mock(
  "@/app/components/board-realtime/BoardRealtime",
  () => ({
    default: () => null,
  })
);

vi.mock("@/app/services/board", () => ({
  readBoardCategories: vi.fn(),
}));

const getPendingLink = () =>
  screen.getByRole(ARIA_ROLE.LINK, {
    name: new RegExp(
      EQUIPMENT_BOARD_COPY.PENDING_DISPATCH_TITLE
    ),
  });

describe("EquipmentBoardPendingLink", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(readBoardCategories).mockResolvedValue(
      BOARD_ROWS_WITH_GROUP
    );
  });

  it("opens the list of the day and says how many reservations are left", () => {
    render(
      <EquipmentBoardPendingLink
        pendingDispatch={{ count: 3, isVisible: true }}
      />
    );

    expect(getPendingLink()).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.PENDING_DISPATCHES
    );
    expect(getPendingLink()).toHaveAccessibleName(
      EQUIPMENT_BOARD_COPY.PENDING_DISPATCH_LABEL(3)
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("says one reservation in the singular", () => {
    expect(
      EQUIPMENT_BOARD_COPY.PENDING_DISPATCH_LABEL(1)
    ).toContain("1 reserva por");
  });

  it("caps the number when the list is longer than a page", () => {
    render(
      <EquipmentBoardPendingLink
        pendingDispatch={{
          count: DISPATCH_BOARD_PAGINATION.PAGE_SIZE + 1,
          isVisible: true,
        }}
      />
    );

    expect(
      screen.getByText(
        `${DISPATCH_BOARD_PAGINATION.PAGE_SIZE}+`
      )
    ).toBeInTheDocument();
  });

  it("keeps the link without a number when the count is unknown", () => {
    render(
      <EquipmentBoardPendingLink
        pendingDispatch={{ count: null, isVisible: true }}
      />
    );

    expect(getPendingLink()).toBeInTheDocument();
    expect(
      screen.queryByText(/^\d+\+?$/)
    ).not.toBeInTheDocument();
  });

  it("is on the board for a worker of operations", async () => {
    renderWithBoardStore(
      await EquipmentBoard({
        pendingDispatch: { count: 2, isVisible: true },
      })
    );

    expect(getPendingLink()).toBeInTheDocument();
  });

  it("is not on the board for a worker without that area", async () => {
    renderWithBoardStore(
      await EquipmentBoard({
        pendingDispatch: { count: null, isVisible: false },
      })
    );

    expect(
      screen.queryByRole(ARIA_ROLE.LINK, {
        name: new RegExp(
          EQUIPMENT_BOARD_COPY.PENDING_DISPATCH_TITLE
        ),
      })
    ).not.toBeInTheDocument();
  });
});
