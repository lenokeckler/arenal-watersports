import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { submitInventoryCount } from "../actions/submitInventoryCount";
import InventoryCountForm from "../components/InventoryCountForm";
import {
  INVENTORY_COUNT_FIELD_ID,
  INVENTORY_COUNT_QUANTITY_FIELD,
  INVENTORY_COUNT_RESULT,
} from "../constants/InventoryCount.constants";
import {
  INVENTORY_COUNT_COPY,
  INVENTORY_COUNT_MESSAGE,
  INVENTORY_COUNT_QUANTITY_ERROR,
} from "../constants/InventoryCountCopy.constants";
import {
  INVENTORY_COUNT_CATEGORIES,
  INVENTORY_COUNT_TEST,
} from "./InventoryCount.constants";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

vi.mock("../actions/submitInventoryCount", () => ({
  submitInventoryCount: vi.fn(),
}));

const submitButton = () =>
  screen.getByRole("button", {
    name: INVENTORY_COUNT_COPY.SUBMIT,
  });

describe("InventoryCountForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <InventoryCountForm
        categories={INVENTORY_COUNT_CATEGORIES}
      />
    );
  });

  it("starts with what the system has registered", () => {
    expect(screen.getByLabelText("JET-01")).toHaveValue(
      "available"
    );
    expect(screen.getByLabelText("JET-02")).toHaveValue(
      "damaged"
    );
    expect(
      document.getElementById(
        INVENTORY_COUNT_FIELD_ID.QUANTITY(
          INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
          INVENTORY_COUNT_QUANTITY_FIELD.AVAILABLE
        )
      )
    ).toHaveValue("8");
  });

  it("registers the count with the corrected state and says so", async () => {
    vi.mocked(submitInventoryCount).mockResolvedValue(
      INVENTORY_COUNT_RESULT.RECORDED
    );
    const user = userEvent.setup();

    await user.selectOptions(
      screen.getByLabelText("JET-01"),
      "in_repair"
    );
    await user.click(submitButton());

    expect(submitInventoryCount).toHaveBeenCalledOnce();
    expect(
      vi.mocked(submitInventoryCount).mock.calls[0][0]
        .lines[0]
    ).toMatchObject({
      confirmedStatus: "in_repair",
      unitId: INVENTORY_COUNT_TEST.FIRST_UNIT_ID,
    });
    expect(
      await screen.findByText(
        INVENTORY_COUNT_MESSAGE[
          INVENTORY_COUNT_RESULT.RECORDED
        ]
      )
    ).toBeInTheDocument();
    expect(refresh).toHaveBeenCalledOnce();
  });

  it("does not send a count with a wrong quantity and points at it", async () => {
    const user = userEvent.setup();
    const field = document.getElementById(
      INVENTORY_COUNT_FIELD_ID.QUANTITY(
        INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
        INVENTORY_COUNT_QUANTITY_FIELD.DAMAGED
      )
    ) as HTMLInputElement;

    await user.clear(field);
    await user.type(field, "-2");
    await user.click(submitButton());

    expect(submitInventoryCount).not.toHaveBeenCalled();
    expect(
      screen.getAllByText(INVENTORY_COUNT_QUANTITY_ERROR)
        .length
    ).toBeGreaterThan(0);
  });

  it("shows the refusal and does not refresh", async () => {
    vi.mocked(submitInventoryCount).mockResolvedValue(
      INVENTORY_COUNT_RESULT.INCOMPLETE
    );
    const user = userEvent.setup();

    await user.click(submitButton());

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      INVENTORY_COUNT_MESSAGE[
        INVENTORY_COUNT_RESULT.INCOMPLETE
      ]
    );
    expect(refresh).not.toHaveBeenCalled();
  });

  it("shows a failure when the request throws", async () => {
    vi.mocked(submitInventoryCount).mockRejectedValue(
      new Error("network")
    );
    const user = userEvent.setup();

    await user.click(submitButton());

    expect(
      await screen.findByText(
        INVENTORY_COUNT_MESSAGE[
          INVENTORY_COUNT_RESULT.FAILED
        ]
      )
    ).toBeInTheDocument();
  });
});
