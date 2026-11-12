import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { createUnitAction } from "../services/createUnitAction";
import { updateUnitAction } from "../services/updateUnitAction";
import {
  UNIT_CODE_LENGTH,
  UNIT_PADDED_CODE,
} from "./UnitCodeLength.constants";
import {
  buildCreateUnitInput,
  buildUpdateUnitInput,
  FAKE_UNIT_ADMIN_WORKER_ID,
} from "./Unit.constants";

const NEGATIVE_USAGE = -1;
const mockWrite = vi.fn();
const mockChain = {
  eq: vi.fn(),
  neq: vi.fn(),
  select: vi.fn(),
  single: vi.fn(),
  maybeSingle: vi.fn(),
};

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (): Promise<string> =>
      Promise.resolve(FAKE_UNIT_ADMIN_WORKER_ID),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: vi.fn(() => ({
      insert: (row: object) => mockWrite(row),
      update: (row: object) => mockWrite(row),
    })),
  }),
}));

const ACTIONS = [
  {
    name: "createUnitAction",
    run: (code: string) =>
      createUnitAction(buildCreateUnitInput({ code })),
  },
  {
    name: "updateUnitAction",
    run: (code: string) =>
      updateUnitAction(buildUpdateUnitInput({ code })),
  },
];

describe("unit actions validate the code on the server", () => {
  beforeEach(() => {
    mockWrite.mockReset();
    Object.values(mockChain).forEach((fn) =>
      fn.mockReset()
    );
    const result = Promise.resolve({
      data: { id: "unit-id" },
      error: null,
    });
    mockChain.eq.mockReturnValue(mockChain);
    mockChain.neq.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.single.mockReturnValue(result);
    mockChain.maybeSingle.mockReturnValue(result);
    mockWrite.mockReturnValue(mockChain);
  });

  it.each(
    ACTIONS.flatMap((action) => [
      {
        ...action,
        code: " ",
        error: UNIT_FORM_ERROR_COPY.CODE_REQUIRED,
      },
      {
        ...action,
        code: "A".repeat(UNIT_CODE_LENGTH.TOO_LONG),
        error: UNIT_FORM_ERROR_COPY.CODE_TOO_LONG,
      },
    ])
  )(
    "$name refuses a code that is blank or too long without writing",
    async ({ run, code, error }) => {
      await expect(run(code)).resolves.toEqual({
        status: UNIT_MUTATION_STATUS.ERROR,
        codeError: error,
      });
      expect(mockWrite).not.toHaveBeenCalled();
    }
  );

  it.each(ACTIONS)(
    "$name stores the trimmed code",
    async ({ run }) => {
      await run(UNIT_PADDED_CODE);

      expect(mockWrite).toHaveBeenCalledWith(
        expect.objectContaining({
          code: UNIT_PADDED_CODE.trim(),
        })
      );
    }
  );
  it.each([
    {
      name: "createUnitAction",
      run: () =>
        createUnitAction(
          buildCreateUnitInput({
            usageTotal: NEGATIVE_USAGE,
          })
        ),
    },
    {
      name: "updateUnitAction",
      run: () =>
        updateUnitAction(
          buildUpdateUnitInput({
            nextOilChangeAt: NEGATIVE_USAGE,
          })
        ),
    },
  ])(
    "$name refuses a negative reading without writing",
    async ({ run }) => {
      await expect(run()).resolves.toEqual({
        status: UNIT_MUTATION_STATUS.ERROR,
        message: UNIT_FORM_ERROR_COPY.DECIMAL_INVALID,
      });
      expect(mockWrite).not.toHaveBeenCalled();
    }
  );
});
