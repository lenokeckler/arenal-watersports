import {
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_RESULT,
  WORKER_ACCOUNT_STATE,
  type WorkerAccountAction,
  type WorkerAccountResult,
  type WorkerAccountState,
} from "@/app/constants";

export const WORKER_ACCOUNT_COPY = {
  ADMIN_ACCOUNT_NOTE:
    "La cuenta de administración no se bloquea ni se da de baja.",
  HAS_PERSONAL_EMAIL_NOTE:
    "Tiene correo personal: recupera su contraseña con el PIN.",
  TEMPORARY_PASSWORD: "Dar contraseña temporal",
  TEMPORARY_PASSWORD_DONE:
    "Se creó una contraseña temporal y se cerraron sus sesiones abiertas.",
  TEMPORARY_PASSWORD_PENDING: "Creando…",
  TITLE: "Estado de la cuenta",
} as const;

export const WORKER_ACCOUNT_STATE_LABEL: Record<
  WorkerAccountState,
  string
> = {
  [WORKER_ACCOUNT_STATE.ACTIVE]: "Activa",
  [WORKER_ACCOUNT_STATE.BLOCKED_BY_ADMINISTRATION]:
    "Bloqueada por administración",
  [WORKER_ACCOUNT_STATE.BLOCKED_BY_ATTEMPTS]:
    "Bloqueada por diez intentos fallidos",
  [WORKER_ACCOUNT_STATE.RETIRED]: "Dada de baja",
};

export const WORKER_ACCOUNT_ACTION_LABEL: Record<
  WorkerAccountAction,
  { label: string; pendingLabel: string }
> = {
  [WORKER_ACCOUNT_ACTION.BLOCK]: {
    label: "Bloquear",
    pendingLabel: "Bloqueando…",
  },
  [WORKER_ACCOUNT_ACTION.RETIRE]: {
    label: "Dar de baja",
    pendingLabel: "Dando de baja…",
  },
  [WORKER_ACCOUNT_ACTION.UNLOCK]: {
    label: "Desbloquear",
    pendingLabel: "Desbloqueando…",
  },
};

export const WORKER_ACCOUNT_NOTICE: Partial<
  Record<WorkerAccountResult, string>
> = {
  [WORKER_ACCOUNT_RESULT.BLOCKED]:
    "Se bloqueó la cuenta y se cerraron sus sesiones abiertas.",
  [WORKER_ACCOUNT_RESULT.RETIRED]:
    "Se dio de baja la cuenta: sus sesiones se cerraron y sus PIN pendientes se anularon. Su historial se conserva.",
  [WORKER_ACCOUNT_RESULT.UNLOCKED]:
    "Se desbloqueó la cuenta. La persona ya puede entrar.",
};

export const WORKER_ACCOUNT_ERROR: Record<
  WorkerAccountResult,
  string
> = {
  [WORKER_ACCOUNT_RESULT.ADMIN_ACCOUNT]:
    "La cuenta de administración no se bloquea ni se da de baja.",
  [WORKER_ACCOUNT_RESULT.BLOCKED]: "",
  [WORKER_ACCOUNT_RESULT.FAILED]:
    "No se pudo cambiar la cuenta. Intente de nuevo.",
  [WORKER_ACCOUNT_RESULT.HAS_PERSONAL_EMAIL]:
    "Tiene correo personal: recupera su contraseña con el PIN.",
  [WORKER_ACCOUNT_RESULT.NOT_ALLOWED]:
    "Solo la cuenta de administración puede cambiar cuentas.",
  [WORKER_ACCOUNT_RESULT.NOT_FOUND]:
    "Esa cuenta ya no existe.",
  [WORKER_ACCOUNT_RESULT.READY]: "",
  [WORKER_ACCOUNT_RESULT.RETIRED]:
    "La cuenta está dada de baja: solo se puede recontratar.",
  [WORKER_ACCOUNT_RESULT.UNLOCKED]: "",
};
