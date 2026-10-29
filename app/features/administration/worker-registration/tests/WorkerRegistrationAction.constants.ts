import {
  SUPABASE_WORK_AREA,
  WORKER_REGISTRATION_FIELD,
} from "@/app/constants";

export const ACTION_FIXTURE = {
  FULL_NAME: "Celso Rojas Mora",
  USERNAME: "celso.rojas",
  BASE_ROLE: SUPABASE_WORK_AREA.RESERVATIONS,
  TEMPORARY_PASSWORD: "Kq7#vR2mP9!xZt",
} as const;

export const buildRegistrationFormData = (
  overrides: Partial<Record<string, string>> = {}
): FormData => {
  const formData = new FormData();
  const fields = {
    [WORKER_REGISTRATION_FIELD.BASE_ROLE]:
      ACTION_FIXTURE.BASE_ROLE,
    [WORKER_REGISTRATION_FIELD.FULL_NAME]:
      ACTION_FIXTURE.FULL_NAME,
    [WORKER_REGISTRATION_FIELD.USERNAME]:
      ACTION_FIXTURE.USERNAME,
    ...overrides,
  };

  Object.entries(fields).forEach(([name, value]) => {
    formData.set(name, value ?? "");
  });

  return formData;
};
