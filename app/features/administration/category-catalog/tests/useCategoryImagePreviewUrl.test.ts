import {
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useCategoryImagePreviewUrl } from "../hooks/useCategoryImagePreviewUrl";
import { buildImageFile } from "./CategoryImage.constants";
import { PICKED_PREVIEW_URL } from "./CategoryImageScreen.constants";

const SECOND_PREVIEW_URL = `${PICKED_PREVIEW_URL}-second`;

describe("useCategoryImagePreviewUrl", () => {
  const createObjectURL = vi.fn();
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    createObjectURL.mockReset();
    revokeObjectURL.mockReset();
    createObjectURL
      .mockReturnValueOnce(PICKED_PREVIEW_URL)
      .mockReturnValueOnce(SECOND_PREVIEW_URL);
    vi.stubGlobal("URL", {
      createObjectURL,
      revokeObjectURL,
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("has no preview without a file", () => {
    const { result } = renderHook(() =>
      useCategoryImagePreviewUrl(null)
    );

    expect(result.current).toBeNull();
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("previews the chosen file", async () => {
    const file = buildImageFile();

    const { result } = renderHook(() =>
      useCategoryImagePreviewUrl(file)
    );

    await waitFor(() =>
      expect(result.current).toBe(PICKED_PREVIEW_URL)
    );
    expect(createObjectURL).toHaveBeenCalledWith(file);
  });

  it("revokes the previous url when the file changes", async () => {
    const { rerender, result } = renderHook(
      ({ file }) => useCategoryImagePreviewUrl(file),
      { initialProps: { file: buildImageFile() } }
    );

    rerender({ file: buildImageFile() });

    await waitFor(() =>
      expect(result.current).toBe(SECOND_PREVIEW_URL)
    );
    expect(revokeObjectURL).toHaveBeenCalledWith(
      PICKED_PREVIEW_URL
    );
  });

  it("revokes the url on unmount", () => {
    const { unmount } = renderHook(() =>
      useCategoryImagePreviewUrl(buildImageFile())
    );

    unmount();

    expect(revokeObjectURL).toHaveBeenCalledWith(
      PICKED_PREVIEW_URL
    );
  });
});
