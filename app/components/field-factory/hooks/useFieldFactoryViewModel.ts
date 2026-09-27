"use client";

import { useRef, useCallback } from "react";
import { NullableRef } from "@/app/types";
import {
  KEYBOARD,
  MILISECONDS,
  STRING,
} from "@/app/constants";
import { FieldFactoryViewModel } from "../models/FieldFactoryViewModel.interface";

export const useFieldFactoryViewModel = (
  onSearch?: (_value: string) => void,
  handleChange?: (
    _event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void,
  isSearch?: boolean
): FieldFactoryViewModel => {
  const debounceTimeout =
    useRef<NullableRef<NodeJS.Timeout>>(null);

  const triggerSearch = useCallback(
    (value: string) => {
      if (onSearch) {
        onSearch(value);
      }
    },
    [onSearch]
  );

  const handleDebounceChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement
      >
    ) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        triggerSearch(event.target.value);
      }, MILISECONDS.FIVE_HUNDRED);
    },
    [triggerSearch]
  );

  const handleSearchKeyDown = useCallback(
    (
      event: React.KeyboardEvent<
        HTMLInputElement | HTMLSelectElement
      >
    ) => {
      if (event.key === KEYBOARD.ENTER) {
        event.preventDefault();
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
        triggerSearch(
          (event.target as HTMLInputElement).value
        );
      }

      if (isSearch) {
        if (
          event.key === STRING.SPACE ||
          event.key === KEYBOARD.ENTER
        ) {
          event.stopPropagation();
        }
      }
    },
    [triggerSearch, isSearch]
  );

  const handleOnChangeSearch = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement
      >
    ) => {
      handleChange?.(event);
      handleDebounceChange(event);
    },
    [handleChange, handleDebounceChange]
  );

  return {
    handleDebounceChange,
    handleSearchKeyDown,
    handleOnChangeSearch,
  };
};
