import { vi } from "vitest";
import type { CategoryImageStorageHost } from "../models/CategoryImageStorageHost.interface";

export const mockStorageRemove = vi.fn();
export const mockStorageInfo = vi.fn();
export const mockStorageUpload = vi.fn();
export const mockStorageFrom = vi.fn((_bucket: string) => ({
  info: mockStorageInfo,
  remove: mockStorageRemove,
  upload: mockStorageUpload,
}));

export const FAKE_STORAGE_HOST = {
  storage: { from: mockStorageFrom },
} as unknown as CategoryImageStorageHost;

export const resetStorageMocks = (): void => {
  mockStorageRemove.mockReset();
  mockStorageInfo.mockReset();
  mockStorageUpload.mockReset();
  mockStorageFrom.mockClear();
};
