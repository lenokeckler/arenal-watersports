import { PATHS } from "@/app/constants";

export const PROTECTED_PATHNAME = "/tablero";

export const PROTECTED_PATHS = [
  PATHS.HOME,
  PROTECTED_PATHNAME,
  "/administracion/trabajadores",
  "/accesorio",
  "/acceso-privado/ingreso",
] as const;

export const PRE_LOGIN_PATHS = [
  PATHS.ACCESS.ROOT,
  PATHS.ACCESS.LOGIN,
  "/acceso/recuperacion",
] as const;
