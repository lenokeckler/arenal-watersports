export const TEMPORARY_PASSWORD_SAMPLE_SIZE = 500;

export const SERVICE_FIXTURE = {
  ADMIN_ID: "11111111-1111-1111-1111-111111111111",
  NEW_WORKER_ID: "44444444-4444-4444-4444-444444444444",
  TEMPORARY_PASSWORD: "Kq7#vR2mP9!xZt",
  ERROR_MESSAGE: "database down",
  OTHER_AUTH_ERROR_CODE: "unexpected_failure",
  OTHER_POSTGRES_ERROR_CODE: "42501",
  REGISTRATION: {
    baseRole: "operaciones",
    fullName: "Celso Rojas Mora",
    username: "celso.rojas",
  },
} as const;
