import { PASSWORD_LENGTH } from "./PasswordLength.constants";
import { USERNAME } from "./Username.constants";

export const ACCESS_SHARED_COPY = {
  ACCOUNT_BLOCKED_BY_ADMINISTRATION:
    "Su cuenta está bloqueada por administración. Consulte con administración.",
  ACCOUNT_BLOCKED_BY_ATTEMPTS:
    "Su cuenta está bloqueada por intentos fallidos. Pida a administración que la desbloquee.",
  BACK_TO_LOGIN: "Volver a ingresar",
  CONFIRMATION_MISMATCH: "Las contraseñas no coinciden.",
  CONFIRMATION_REQUIRED: "Repita la contraseña nueva.",
  NETWORK:
    "No hay conexión. Revise su señal e intente de nuevo.",
  NEW_PASSWORD_REQUIRED: "Escriba la contraseña nueva.",
  NEW_PASSWORD_RULES:
    "La contraseña nueva no cumple los requisitos.",
  PASSWORD_TOO_LONG: `La contraseña no puede tener más de ${PASSWORD_LENGTH.MAX} caracteres.`,
  SESSION_INACTIVE:
    "Su sesión se cerró por inactividad. Ingrese de nuevo.",
  TOO_MANY_REQUESTS:
    "Demasiados intentos. Espere un momento e intente de nuevo.",
  UNKNOWN:
    "No se pudo completar el ingreso. Intente de nuevo.",
  USERNAME_LABEL: "Nombre de usuario",
  USERNAME_LENGTH: `El nombre de usuario debe tener entre ${USERNAME.LENGTH.MIN} y ${USERNAME.LENGTH.MAX} caracteres.`,
  USERNAME_PLACEHOLDER: "Ingrese su nombre de usuario",
  USERNAME_REQUIRED: "Escriba su nombre de usuario.",
} as const;
