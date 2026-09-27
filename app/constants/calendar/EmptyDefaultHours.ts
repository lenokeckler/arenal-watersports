interface DefaultHours {
  monday: unknown[];
  tuesday: unknown[];
  wednesday: unknown[];
  thursday: unknown[];
  friday: unknown[];
  saturday: unknown[];
  sunday: unknown[];
  excluded_dates?: unknown[];
  excluded_days?: unknown[];
  state?: number;
  tourId?: string;
}

const defaultHours: DefaultHours = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
  excluded_dates: [],
  excluded_days: [],
  state: 0,
  tourId: "",
};

export default defaultHours;

export const EMPTY_DEFAULT_HOURS: DefaultHours = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
  excluded_dates: [],
  excluded_days: [],
  state: 0,
  tourId: "",
};
