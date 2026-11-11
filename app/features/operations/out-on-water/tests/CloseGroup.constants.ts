import type { CloseGroupInput } from "../models/CloseGroupInput.interface";

export const CLOSE_DISPATCH_ID =
  "cccccccc-0000-0000-0000-000000000001";

export const CLOSE_UNIT_ID =
  "bbbbbbbb-0000-0000-0000-000000000001";

export const CLOSE_RETURN_UNIT_ROW = {
  code: "JS-1",
  consumes_fuel: true,
  fuel_max: 4,
  fuel_out: 3,
  unit_id: CLOSE_UNIT_ID,
  usage_metric: "engine_hours",
  usage_out: 13,
};

export const CLOSE_INPUT_FIXTURE = {
  arrivedAt: "2026-09-07T16:20:00.000Z",
  dispatchId: CLOSE_DISPATCH_ID,
  returns: [
    {
      damage: null,
      fuel: 2,
      maintenance: false,
      unitId: CLOSE_UNIT_ID,
      usage: 14.25,
    },
  ],
};

export const CLOSE_INPUT_WITH_DAMAGE: CloseGroupInput = {
  ...CLOSE_INPUT_FIXTURE,
  returns: [
    {
      ...CLOSE_INPUT_FIXTURE.returns[0],
      damage: {
        cause: "collision",
        description: "  Cracked hull  ",
        impactDelta: 1,
      },
    },
  ],
};

export const CLOSE_RPC_RETURNS = [
  {
    damage: null,
    fuel: 2,
    maintenance: false,
    unit_id: CLOSE_UNIT_ID,
    usage: 14.25,
  },
];

export const CLOSE_RPC_RETURNS_WITH_DAMAGE = [
  {
    damage: {
      cause: "collision",
      description: "Cracked hull",
      impact_delta: 1,
    },
    fuel: 2,
    maintenance: false,
    unit_id: CLOSE_UNIT_ID,
    usage: 14.25,
  },
];

export const INVALID_CLOSE_INPUTS = [
  {
    input: {
      ...CLOSE_INPUT_FIXTURE,
      dispatchId: "not-a-uuid",
    },
    name: "an id that is not a uuid",
  },
  {
    input: { ...CLOSE_INPUT_FIXTURE, arrivedAt: "never" },
    name: "an arrival that is not a date",
  },
  {
    input: {
      ...CLOSE_INPUT_FIXTURE,
      returns: [
        CLOSE_INPUT_FIXTURE.returns[0],
        CLOSE_INPUT_FIXTURE.returns[0],
      ],
    },
    name: "the same unit twice",
  },
  {
    input: {
      ...CLOSE_INPUT_FIXTURE,
      returns: [
        { ...CLOSE_INPUT_FIXTURE.returns[0], fuel: 2.5 },
      ],
    },
    name: "a fuel that is not a whole number of lines",
  },
  {
    input: {
      ...CLOSE_INPUT_FIXTURE,
      returns: [
        { ...CLOSE_INPUT_FIXTURE.returns[0], usage: -1 },
      ],
    },
    name: "a negative reading",
  },
  {
    input: {
      ...CLOSE_INPUT_FIXTURE,
      returns: [
        {
          ...CLOSE_INPUT_FIXTURE.returns[0],
          damage: {
            cause: "collision",
            description: "   ",
            impactDelta: 0,
          },
        },
      ],
    },
    name: "a damage report without description",
  },
  {
    input: {
      ...CLOSE_INPUT_FIXTURE,
      returns: [
        {
          ...CLOSE_INPUT_FIXTURE.returns[0],
          maintenance: "yes",
        },
      ],
    },
    name: "a maintenance mark that is not true or false",
  },
  {
    input: {
      ...CLOSE_INPUT_FIXTURE,
      returns: [
        {
          ...CLOSE_INPUT_FIXTURE.returns[0],
          damage: {
            cause: "sabotage",
            description: "Cracked hull",
            impactDelta: 0,
          },
        },
      ],
    },
    name: "a damage cause that does not exist",
  },
] as const;
