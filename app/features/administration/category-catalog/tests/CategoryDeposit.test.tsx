import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { notFound, redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import CategoryDeposit from "../CategoryDeposit";
import CategoryDepositForm from "../CategoryDepositForm";
import { getCategoryDeposit } from "../services/getCategoryDeposit";
import {
  CATEGORY_DEPOSIT_ID,
  DEFAULT_CATEGORY_DEPOSIT,
} from "./CategoryDepositFormValues.constants";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/getCategoryDeposit", () => ({
  getCategoryDeposit: vi.fn(),
}));

const renderEntry = () =>
  CategoryDeposit({ categoryId: CATEGORY_DEPOSIT_ID });

describe("CategoryDeposit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
  });

  it("sends anyone who is not administration to the home without reading the category", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(renderEntry()).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
    expect(getCategoryDeposit).not.toHaveBeenCalled();
  });

  it("shows not found when the category does not exist", async () => {
    vi.mocked(getCategoryDeposit).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow();
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("gives administration the deposit form of the category", async () => {
    vi.mocked(getCategoryDeposit).mockResolvedValue(
      DEFAULT_CATEGORY_DEPOSIT
    );

    const element = await renderEntry();

    expect(element.type).toBe(CategoryDepositForm);
    expect(element.props.deposit).toBe(
      DEFAULT_CATEGORY_DEPOSIT
    );
  });
});
