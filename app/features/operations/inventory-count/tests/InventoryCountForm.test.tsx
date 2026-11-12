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

const quantityField = (
  field: (typeof INVENTORY_COUNT_QUANTITY_FIELD)[keyof typeof INVENTORY_COUNT_QUANTITY_FIELD]
) =>
  document.getElementById(
    INVENTORY_COUNT_FIELD_ID.QUANTITY(
      INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
      field
    )
  ) as HTMLInputElement;

const click = (name: string): Promise<void> =>
  userEvent
    .setup()
    .click(screen.getByRole("button", { name }));

describe("InventoryCountForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <InventoryCountForm
        categories={INVENTORY_COUNT_CATEGORIES}
      />
    );
  });

  it("starts with the first category only, filled with what the system has registered", () => {
    expect(
      screen.getByText(
        INVENTORY_COUNT_COPY.STEP_PROGRESS(1, 2)
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText("JET-01")).toHaveValue(
      "available"
    );
    expect(screen.getByLabelText("JET-02")).toHaveValue(
      "damaged"
    );
    expect(screen.queryByText("Chalecos")).toBeNull();
    expect(
      screen.queryByRole("button", {
        name: INVENTORY_COUNT_COPY.SUBMIT,
      })
    ).toBeNull();
  });

  it("moves through the categories one at a time and back", async () => {
    await click(INVENTORY_COUNT_COPY.NEXT);

    expect(
      screen.getByText(
        INVENTORY_COUNT_COPY.STEP_PROGRESS(2, 2)
      )
    ).toBeInTheDocument();
    expect(quantityField("available")).toHaveValue("8");
    expect(screen.queryByLabelText("JET-01")).toBeNull();

    await click(INVENTORY_COUNT_COPY.PREVIOUS);

    expect(
      screen.getByLabelText("JET-01")
    ).toBeInTheDocument();
  });

  it("does not move on while a quantity is wrong and points at it", async () => {
    const user = userEvent.setup();
    await click(INVENTORY_COUNT_COPY.NEXT);
    await user.clear(quantityField("damaged"));
    await user.type(quantityField("damaged"), "-2");

    await user.click(
      screen.getByRole("button", {
        name: INVENTORY_COUNT_COPY.NEXT,
      })
    );

    expect(
      screen.getAllByText(INVENTORY_COUNT_QUANTITY_ERROR)
        .length
    ).toBeGreaterThan(0);
    expect(submitInventoryCount).not.toHaveBeenCalled();
  });

  it("registers the count from the summary with the corrected state and says so", async () => {
    vi.mocked(submitInventoryCount).mockResolvedValue(
      INVENTORY_COUNT_RESULT.RECORDED
    );
    const user = userEvent.setup();

    await user.selectOptions(
      screen.getByLabelText("JET-01"),
      "in_repair"
    );
    await click(INVENTORY_COUNT_COPY.NEXT);
    await click(INVENTORY_COUNT_COPY.NEXT);
    expect(
      screen.getByText(INVENTORY_COUNT_COPY.SUMMARY_TEXT(2))
    ).toBeInTheDocument();
    await click(INVENTORY_COUNT_COPY.SUBMIT);

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

  it("shows the refusal and does not refresh", async () => {
    vi.mocked(submitInventoryCount).mockResolvedValue(
      INVENTORY_COUNT_RESULT.INCOMPLETE
    );
    await click(INVENTORY_COUNT_COPY.NEXT);
    await click(INVENTORY_COUNT_COPY.NEXT);
    await click(INVENTORY_COUNT_COPY.SUBMIT);

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
    await click(INVENTORY_COUNT_COPY.NEXT);
    await click(INVENTORY_COUNT_COPY.NEXT);
    await click(INVENTORY_COUNT_COPY.SUBMIT);

    expect(
      await screen.findByText(
        INVENTORY_COUNT_MESSAGE[
          INVENTORY_COUNT_RESULT.FAILED
        ]
      )
    ).toBeInTheDocument();
  });
});
