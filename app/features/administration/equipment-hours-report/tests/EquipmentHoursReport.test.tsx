import {
  render,
  screen,
  within,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import EquipmentHoursReport from "../EquipmentHoursReport";
import { EQUIPMENT_HOURS_COPY } from "../constants/EquipmentHoursReportCopy.constants";
import {
  EquipmentHoursAccessError,
  getEquipmentHours,
} from "../services/getEquipmentHours";
import { EQUIPMENT_HOURS_CATEGORIES } from "./EquipmentHours.constants";

const redirect = vi.fn();

vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    redirect(path);
    throw new Error("NEXT_REDIRECT");
  },
}));
vi.mock(
  "../services/getEquipmentHours",
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import("../services/getEquipmentHours")
    >()),
    getEquipmentHours: vi.fn(),
  })
);

describe("EquipmentHoursReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the hours and the dispatches of each unit and says which ones have no dispatches", async () => {
    vi.mocked(getEquipmentHours).mockResolvedValue({
      categories: EQUIPMENT_HOURS_CATEGORIES,
      pageCount: 1,
    });

    render(await EquipmentHoursReport({ page: 1 }));

    const kayaks = screen
      .getByText("Kayak doble")
      .closest("section") as HTMLElement;
    expect(
      within(kayaks).getByText(
        EQUIPMENT_HOURS_COPY.ROW_VALUE("4,5", 3)
      )
    ).toBeInTheDocument();
    expect(
      within(kayaks).getByText(EQUIPMENT_HOURS_COPY.NO_USE)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        EQUIPMENT_HOURS_COPY.ROW_VALUE("1", 1)
      )
    ).toBeInTheDocument();
  });

  it("offers the next page of categories when there is more than one", async () => {
    vi.mocked(getEquipmentHours).mockResolvedValue({
      categories: EQUIPMENT_HOURS_CATEGORIES,
      pageCount: 2,
    });

    render(await EquipmentHoursReport({ page: 1 }));

    expect(
      screen.getByRole("navigation", {
        name: EQUIPMENT_HOURS_COPY.PAGINATION_LABEL,
      })
    ).toBeInTheDocument();
  });

  it("says there is no equipment yet", async () => {
    vi.mocked(getEquipmentHours).mockResolvedValue({
      categories: [],
      pageCount: 0,
    });

    render(await EquipmentHoursReport({ page: 1 }));

    expect(
      screen.getByText(EQUIPMENT_HOURS_COPY.EMPTY)
    ).toBeInTheDocument();
  });

  it("shows an error when the hours cannot be read", async () => {
    vi.mocked(getEquipmentHours).mockRejectedValue(
      new Error("down")
    );

    render(await EquipmentHoursReport({ page: 1 }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      EQUIPMENT_HOURS_COPY.ERROR
    );
  });

  it("sends anyone who is not an administrator home", async () => {
    vi.mocked(getEquipmentHours).mockRejectedValue(
      new EquipmentHoursAccessError()
    );

    await expect(
      EquipmentHoursReport({ page: 1 })
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(redirect).toHaveBeenCalledOnce();
  });
});
