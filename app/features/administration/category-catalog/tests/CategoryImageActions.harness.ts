import { vi } from "vitest";
import { ADMIN_WORKER_ID } from "./CategoryImage.constants";
import {
  mockStorageFrom,
  mockStorageRemove,
  resetStorageMocks,
} from "./CategoryImageStorage.harness";

export const mockAssertIsAdminWorker = vi.fn();
export const mockReadMaybeSingle = vi.fn();
export const mockUpdateMaybeSingle = vi.fn();
export const mockDeleteEq = vi.fn();
export const mockReadEq = vi.fn(() => ({
  maybeSingle: mockReadMaybeSingle,
}));
export const mockReadSelect = vi.fn((_columns: string) => ({
  eq: mockReadEq,
}));
export const mockUpdateEq = vi.fn(() => ({
  select: () => ({ maybeSingle: mockUpdateMaybeSingle }),
}));
export const mockUpdate = vi.fn((_row: object) => ({
  eq: mockUpdateEq,
}));

export const FAKE_ACTION_SUPABASE = {
  from: () => ({
    delete: () => ({ eq: mockDeleteEq }),
    select: mockReadSelect,
    update: mockUpdate,
  }),
  storage: { from: mockStorageFrom },
};

export const resetActionMocks = (): void => {
  resetStorageMocks();
  mockAssertIsAdminWorker.mockReset();
  mockReadMaybeSingle.mockReset();
  mockReadSelect.mockClear();
  mockReadEq.mockClear();
  mockUpdateMaybeSingle.mockReset();
  mockUpdate.mockClear();
  mockUpdateEq.mockClear();
  mockDeleteEq.mockReset();
  mockAssertIsAdminWorker.mockResolvedValue(
    ADMIN_WORKER_ID
  );
  mockStorageRemove.mockResolvedValue({
    data: [],
    error: null,
  });
};
