import {
  render,
  screen,
  within,
} from "@testing-library/react";
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
  INVENTORY_COUNT_STORAGE_KEY,
} from "../constants/InventoryCount.constants";
import {
  INVENTORY_COUNT_COPY,
  INVENTORY_COUNT_MESSAGE,
  INVENTORY_COUNT_QUANTITY_ERROR,
  INVENTORY_COUNT_UNIT_STATUS_COPY,
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

const renderForm = () =>
  render(
    <InventoryCountForm
      categories={INVENTORY_COUNT_CATEGORIES}
    />
  );

const quantityField = (
  field: (typeof INVENTORY_COUNT_QUANTITY_FIELD)[keyof typeof INVENTORY_COUNT_QUANTITY_FIELD]
) =>
  document.getElementById(
    INVENTORY_COUNT_FIELD_ID.QUANTITY(
      INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
      field
    )
  ) as HTMLInputElement;

const button = (name: string | RegExp) =>
  screen.getByRole("button", { name });

const progress = (done: number) =>
  INVENTORY_COUNT_COPY.PROGRESS(
    done,
    INVENTORY_COUNT_CATEGORIES.length
  );

describe("InventoryCountForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it("starts with every category pending, the first one open and the count not yet registrable", () => {
    renderForm();

    expect(
      screen.getByText(progress(0))
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        INVENTORY_COUNT_COPY.CATEGORY_PENDING
      )
    ).toHaveLength(INVENTORY_COUNT_CATEGORIES.length);
    expect(
      within(
        screen.getByRole("group", { name: "JET-01" })
      ).getByRole("button", {
        name: INVENTORY_COUNT_UNIT_STATUS_COPY.available,
        pressed: true,
      })
    ).toBeInTheDocument();
    expect(
      button(INVENTORY_COUNT_COPY.SUBMIT)
    ).toBeDisabled();
  });

  it("confirms a whole category with one tap and moves to the next pending one", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(
      button(INVENTORY_COUNT_COPY.MATCH_ALL)
    );

    expect(
      screen.getByText(progress(1))
    ).toBeInTheDocument();
    expect(
      screen.getByText(INVENTORY_COUNT_COPY.CATEGORY_DONE)
    ).toBeInTheDocument();
    expect(quantityField("available")).toHaveValue("8");
    expect(
      screen.queryByRole("button", {
        name: INVENTORY_COUNT_COPY.MATCH_ALL,
      })
    ).toBeNull();
  });

  it("opens any category from the list, in any order", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(
      within(
        screen.getByRole("list", {
          name: INVENTORY_COUNT_COPY.CATEGORIES_LABEL,
        })
      ).getByRole("button", { name: /Chalecos/ })
    );

    expect(quantityField("damaged")).toHaveValue("1");
  });

  it("does not confirm a category with a wrong quantity and points at it", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(button(/Chalecos/));
    await user.clear(quantityField("damaged"));
    await user.type(quantityField("damaged"), "-2");

    await user.click(
      button(INVENTORY_COUNT_COPY.CONFIRM_CATEGORY)
    );

    expect(
      screen.getAllByText(INVENTORY_COUNT_QUANTITY_ERROR)
        .length
    ).toBeGreaterThan(0);
    expect(
      screen.getByText(progress(0))
    ).toBeInTheDocument();
  });

  it("puts a confirmed category back to pending when it is edited", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(
      button(INVENTORY_COUNT_COPY.MATCH_ALL)
    );
    await user.click(button(/Jet skis/));

    await user.click(
      within(
        screen.getByRole("group", { name: "JET-01" })
      ).getByRole("button", {
        name: INVENTORY_COUNT_UNIT_STATUS_COPY.damaged,
      })
    );

    expect(
      screen.getByText(progress(0))
    ).toBeInTheDocument();
  });

  it("registers the count with the corrected state once every category is confirmed", async () => {
    vi.mocked(submitInventoryCount).mockResolvedValue(
      INVENTORY_COUNT_RESULT.RECORDED
    );
    const user = userEvent.setup();
    renderForm();

    await user.click(
      within(
        screen.getByRole("group", { name: "JET-01" })
      ).getByRole("button", {
        name: INVENTORY_COUNT_UNIT_STATUS_COPY.in_repair,
      })
    );
    await user.click(
      button(INVENTORY_COUNT_COPY.CONFIRM_CATEGORY)
    );
    await user.click(
      button(INVENTORY_COUNT_COPY.CONFIRM_CATEGORY)
    );
    await user.click(button(INVENTORY_COUNT_COPY.SUBMIT));

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
    expect(
      window.localStorage.getItem(
        INVENTORY_COUNT_STORAGE_KEY
      )
    ).toBeNull();
  });

  it("shows the refusal of the database and does not refresh", async () => {
    vi.mocked(submitInventoryCount).mockResolvedValue(
      INVENTORY_COUNT_RESULT.INCOMPLETE
    );
    const user = userEvent.setup();
    renderForm();
    await user.click(
      button(INVENTORY_COUNT_COPY.MATCH_ALL)
    );
    await user.click(
      button(INVENTORY_COUNT_COPY.CONFIRM_CATEGORY)
    );
    await user.click(button(INVENTORY_COUNT_COPY.SUBMIT));

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
    renderForm();
    await user.click(
      button(INVENTORY_COUNT_COPY.MATCH_ALL)
    );
    await user.click(
      button(INVENTORY_COUNT_COPY.CONFIRM_CATEGORY)
    );
    await user.click(button(INVENTORY_COUNT_COPY.SUBMIT));

    expect(
      await screen.findByText(
        INVENTORY_COUNT_MESSAGE[
          INVENTORY_COUNT_RESULT.FAILED
        ]
      )
    ).toBeInTheDocument();
  });

  it("keeps the confirmed categories when the screen is opened again", async () => {
    const user = userEvent.setup();
    const first = renderForm();
    await user.click(
      button(INVENTORY_COUNT_COPY.MATCH_ALL)
    );
    first.unmount();

    renderForm();

    expect(
      screen.getByText(progress(1))
    ).toBeInTheDocument();
  });
});
