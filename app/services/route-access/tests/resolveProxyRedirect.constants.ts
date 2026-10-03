import { PATHS } from "@/app/constants";

export const PROTECTED_PATHS = [
  PATHS.HOME,
  "/tablero",
  "/administracion/trabajadores",
  "/accesorio",
  "/acceso-privado/ingreso",
];

export const PRE_LOGIN_PATHS = [
  PATHS.ACCESS.ROOT,
  PATHS.ACCESS.LOGIN,
  "/acceso/recuperacion",
];
