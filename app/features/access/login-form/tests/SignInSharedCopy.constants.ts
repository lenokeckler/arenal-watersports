import {
  PASSWORD_LENGTH,
  SIGN_IN_ERROR_CODE,
  USERNAME,
} from "@/app/constants";

export const SHARED_COPY_AS_SHIPPED = [
  [
    SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
    "Su cuenta está bloqueada por administración. Consulte con administración.",
  ],
  [
    SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
    "Su cuenta está bloqueada por intentos fallidos. Pida a administración que la desbloquee.",
  ],
  [
    SIGN_IN_ERROR_CODE.NETWORK,
    "No hay conexión. Revise su señal e intente de nuevo.",
  ],
  [
    SIGN_IN_ERROR_CODE.PASSWORD_TOO_LONG,
    `La contraseña no puede tener más de ${PASSWORD_LENGTH.MAX} caracteres.`,
  ],
  [
    SIGN_IN_ERROR_CODE.SESSION_INACTIVE,
    "Su sesión se cerró por inactividad. Ingrese de nuevo.",
  ],
  [
    SIGN_IN_ERROR_CODE.TOO_MANY_REQUESTS,
    "Demasiados intentos. Espere un momento e intente de nuevo.",
  ],
  [
    SIGN_IN_ERROR_CODE.UNKNOWN,
    "No se pudo completar el ingreso. Intente de nuevo.",
  ],
  [
    SIGN_IN_ERROR_CODE.USERNAME_LENGTH,
    `El nombre de usuario debe tener entre ${USERNAME.LENGTH.MIN} y ${USERNAME.LENGTH.MAX} caracteres.`,
  ],
  [
    SIGN_IN_ERROR_CODE.USERNAME_REQUIRED,
    "Escriba su nombre de usuario.",
  ],
] as const;
