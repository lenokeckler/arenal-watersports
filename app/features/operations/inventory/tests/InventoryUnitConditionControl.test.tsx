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
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";
import { submitInventoryUnitCondition } from "../actions/submitInventoryUnitCondition";
import InventoryUnitConditionControl from "../components/InventoryUnitConditionControl";
import {
  INVENTORY_UNIT_CONDITION_ACTION_LABEL,
  INVENTORY_UNIT_CONDITION_MESSAGE,
  INVENTORY_UNIT_CONDITION_RESULT,
} from "../constants/InventoryUnitCondition.constants";
import { INVENTORY_UNIT_CONDITION_TEST } from "./InventoryUnitCondition.constants";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

vi.mock("../actions/submitInventoryUnitCondition", () => ({
  submitInventoryUnitCondition: vi.fn(),
}));

const renderControl = (status: ActiveInventoryUnitStatus) =>
  render(
    <InventoryUnitConditionControl
      status={status}
      unitId={INVENTORY_UNIT_CONDITION_TEST.UNIT_ID}
    />
  );

const getButtonLabels = (): (string | null)[] =>
  screen
    .queryAllByRole("button")
    .map((button) => button.textContent);

describe("InventoryUnitConditionControl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    [
      INVENTORY_UNIT_STATUS.AVAILABLE,
      [
        INVENTORY_UNIT_STATUS.DAMAGED,
        INVENTORY_UNIT_STATUS.IN_REPAIR,
      ],
    ],
    [
      INVENTORY_UNIT_STATUS.DAMAGED,
      [
        INVENTORY_UNIT_STATUS.AVAILABLE,
        INVENTORY_UNIT_STATUS.IN_REPAIR,
      ],
    ],
    [
      INVENTORY_UNIT_STATUS.IN_REPAIR,
      [
        INVENTORY_UNIT_STATUS.AVAILABLE,
        INVENTORY_UNIT_STATUS.DAMAGED,
      ],
    ],
  ])(
    "offers the other two conditions for a unit that is %s",
    (status, expected) => {
      renderControl(status);

      expect(getButtonLabels()).toEqual(
        expected.map(
          (next) =>
            INVENTORY_UNIT_CONDITION_ACTION_LABEL[
              next as keyof typeof INVENTORY_UNIT_CONDITION_ACTION_LABEL
            ]
        )
      );
    }
  );

  it.each([
    [INVENTORY_UNIT_STATUS.IN_MAINTENANCE],
    [INVENTORY_UNIT_STATUS.OCCUPIED],
  ])("offers nothing for a unit that is %s", (status) => {
    renderControl(status);

    expect(getButtonLabels()).toEqual([]);
  });

  it("marks the unit damaged, says so and refreshes the list", async () => {
    vi.mocked(
      submitInventoryUnitCondition
    ).mockResolvedValue(
      INVENTORY_UNIT_CONDITION_RESULT.CHANGED
    );
    const user = userEvent.setup();
    renderControl(INVENTORY_UNIT_STATUS.AVAILABLE);

    await user.click(
      screen.getByRole("button", {
        name: INVENTORY_UNIT_CONDITION_ACTION_LABEL[
          INVENTORY_UNIT_STATUS.DAMAGED
        ],
      })
    );

    expect(
      submitInventoryUnitCondition
    ).toHaveBeenCalledWith(
      INVENTORY_UNIT_CONDITION_TEST.UNIT_ID,
      INVENTORY_UNIT_STATUS.DAMAGED
    );
    expect(
      await screen.findByText(
        INVENTORY_UNIT_CONDITION_MESSAGE[
          INVENTORY_UNIT_CONDITION_RESULT.CHANGED
        ]
      )
    ).toBeInTheDocument();
    expect(refresh).toHaveBeenCalledOnce();
  });

  it("explains that a unit in an open trip cannot change and does not refresh", async () => {
    vi.mocked(
      submitInventoryUnitCondition
    ).mockResolvedValue(
      INVENTORY_UNIT_CONDITION_RESULT.OCCUPIED
    );
    const user = userEvent.setup();
    renderControl(INVENTORY_UNIT_STATUS.AVAILABLE);

    await user.click(
      screen.getByRole("button", {
        name: INVENTORY_UNIT_CONDITION_ACTION_LABEL[
          INVENTORY_UNIT_STATUS.IN_REPAIR
        ],
      })
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      INVENTORY_UNIT_CONDITION_MESSAGE[
        INVENTORY_UNIT_CONDITION_RESULT.OCCUPIED
      ]
    );
    expect(refresh).not.toHaveBeenCalled();
  });

  it("shows a failure message when the request throws", async () => {
    vi.mocked(
      submitInventoryUnitCondition
    ).mockRejectedValue(new Error("network"));
    const user = userEvent.setup();
    renderControl(INVENTORY_UNIT_STATUS.DAMAGED);

    await user.click(
      screen.getByRole("button", {
        name: INVENTORY_UNIT_CONDITION_ACTION_LABEL[
          INVENTORY_UNIT_STATUS.AVAILABLE
        ],
      })
    );

    expect(
      await screen.findByText(
        INVENTORY_UNIT_CONDITION_MESSAGE[
          INVENTORY_UNIT_CONDITION_RESULT.FAILED
        ]
      )
    ).toBeInTheDocument();
    expect(refresh).not.toHaveBeenCalled();
  });
});
