import { Language } from "@/app/types";
import { STORE_SLICES } from "@/app/constants";
import { setLanguage } from "./slices/languageSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state[STORE_SLICES.LANGUAGE].currentLanguage
  );

  const handleSetLanguage = (language: Language) => {
    dispatch(setLanguage(language));
  };

  return {
    language: currentLanguage,
    setLanguage: handleSetLanguage,
  };
};
