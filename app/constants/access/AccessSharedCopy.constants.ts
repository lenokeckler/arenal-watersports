import { PASSWORD_LENGTH } from "./PasswordLength.constants";
import { USERNAME } from "./Username.constants";

export const ACCESS_SHARED_COPY = {
  ACCOUNT_BLOCKED_BY_ADMINISTRATION:
    "Su cuenta está bloqueada por administración. Consulte con administración.",
  ACCOUNT_BLOCKED_BY_ATTEMPTS:
    "Su cuenta está bloqueada por intentos fallidos. Pida a administración que la desbloquee.",
  NETWORK:
    "No hay conexión. Revise su señal e intente de nuevo.",
  PASSWORD_TOO_LONG: `La contraseña no puede tener más de ${PASSWORD_LENGTH.MAX} caracteres.`,
  SESSION_INACTIVE:
    "Su sesión se cerró por inactividad. Ingrese de nuevo.",
  TOO_MANY_REQUESTS:
    "Demasiados intentos. Espere un momento e intente de nuevo.",
  UNKNOWN:
    "No se pudo completar el ingreso. Intente de nuevo.",
  USERNAME_LENGTH: `El nombre de usuario debe tener entre ${USERNAME.LENGTH.MIN} y ${USERNAME.LENGTH.MAX} caracteres.`,
  USERNAME_REQUIRED: "Escriba su nombre de usuario.",
} as const;
