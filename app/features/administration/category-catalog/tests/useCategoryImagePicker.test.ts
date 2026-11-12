import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { STRING } from "@/app/constants";
import { useCategoryImagePicker } from "../hooks/useCategoryImagePicker";
import type { CategoryImageFileChangeEvent } from "../models/CategoryImageFileChangeEvent.type";
import { buildImageFile } from "./CategoryImage.constants";

const buildChangeEvent = (
  files: File[]
): CategoryImageFileChangeEvent =>
  ({
    target: { files, value: "stale" },
  }) as unknown as CategoryImageFileChangeEvent;

describe("useCategoryImagePicker", () => {
  it("hands the chosen file over and clears the input so the same file can be chosen again", () => {
    const onPickFile = vi.fn();
    const file = buildImageFile();
    const event = buildChangeEvent([file]);
    const { result } = renderHook(() =>
      useCategoryImagePicker({ onPickFile })
    );

    result.current.onChange(event);

    expect(onPickFile).toHaveBeenCalledWith(file);
    expect(event.target.value).toBe(STRING.Empty);
  });

  it("ignores a change with no file", () => {
    const onPickFile = vi.fn();
    const { result } = renderHook(() =>
      useCategoryImagePicker({ onPickFile })
    );

    result.current.onChange(buildChangeEvent([]));

    expect(onPickFile).not.toHaveBeenCalled();
  });

  it("opens the hidden input", () => {
    const { result } = renderHook(() =>
      useCategoryImagePicker({ onPickFile: vi.fn() })
    );
    const click = vi.fn();
    result.current.inputRef.current = {
      click,
    } as unknown as HTMLInputElement;

    result.current.onOpen();

    expect(click).toHaveBeenCalledOnce();
  });
});
