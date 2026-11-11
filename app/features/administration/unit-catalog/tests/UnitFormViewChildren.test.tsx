import { describe, expect, it, vi } from "vitest";
import Text from "@/app/components/text/Text";
import { renderUnitForm } from "./renderUnitForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

const CHILD_TEXT = "Section rendered under the form";

describe("UnitFormView children", () => {
  it("renders the children under the form", () => {
    const page = renderUnitForm({
      children: <Text>{CHILD_TEXT}</Text>,
    });

    expect(page.queryText(CHILD_TEXT)).toBeInTheDocument();
  });

  it("renders no extra content when there are no children", () => {
    const page = renderUnitForm();

    expect(page.queryText(CHILD_TEXT)).toBeNull();
  });
});
