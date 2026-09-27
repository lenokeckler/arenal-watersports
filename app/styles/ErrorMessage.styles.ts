import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const ERROR_MESSAGE_CONTAINER_CLASS =
  "mt-6 mb-2 p-3 rounded-md shadow-sm mx-2 sm:mx-8 md:mx-12 lg:mx-20";

export const ERROR_MESSAGE_TEXT_CLASS =
  "mt-4 text-sm text-center text-red-500 font-bold";

export const ERROR_MESSAGE_SHAKE_CLASS = "shake";

export const ERROR_MESSAGE_VISIBLE_CLASS = "visible";

export const ERROR_MESSAGE_HIDDEN_CLASS = "invisible";

export const resolveErrorMessageClassName = (
  shouldShake: boolean,
  error: boolean
): string =>
  joinClassNames(
    ERROR_MESSAGE_TEXT_CLASS,
    shouldShake && ERROR_MESSAGE_SHAKE_CLASS,
    error
      ? ERROR_MESSAGE_VISIBLE_CLASS
      : ERROR_MESSAGE_HIDDEN_CLASS
  );
