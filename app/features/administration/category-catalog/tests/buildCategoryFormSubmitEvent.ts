import { vi } from "vitest";
import type { CategoryFormSubmitEvent } from "../models/CategoryFormSubmitEvent.type";

export const buildCategoryFormSubmitEvent = (
  preventDefault: () => void = vi.fn()
): CategoryFormSubmitEvent =>
  ({ preventDefault }) as CategoryFormSubmitEvent;
