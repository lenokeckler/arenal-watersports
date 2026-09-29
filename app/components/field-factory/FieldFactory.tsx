"use client";

import React, { forwardRef, useState } from "react";
import { FieldFactoryProps } from "../field-factory/models/FieldFactoryProps.interface";
import {
  STRING,
  INPUT_TYPES,
  DISPLAY_NAME,
  BUTTON,
  MATERIAL_ICON_NAME,
} from "@/app/constants";
import { useFieldFactoryViewModel } from "./hooks/useFieldFactoryViewModel";
import Button from "../button/Button";
import MaterialIcon from "../icons/material-icon/MaterialIcon";
import { PASSWORD_TOGGLE_LABEL } from "./constants/PasswordToggle.constants";
import { resolveFieldAriaAttributes } from "./utils/resolveFieldAriaAttributes";
import {
  FIELD_FACTORY_CHECKBOX_INPUT_CLASS,
  FIELD_FACTORY_CHECKBOX_LABEL_CLASS,
  FIELD_FACTORY_CHECKBOX_WRAPPER_CLASS,
  FIELD_FACTORY_OPTION_CLASS,
  FIELD_FACTORY_PASSWORD_TOGGLE_CLASS,
  FIELD_FACTORY_PASSWORD_WRAPPER_CLASS,
  FIELD_FACTORY_PLACEHOLDER_OPTION_CLASS,
  resolveFieldFactorySelectClassName,
  resolveFieldFactoryTextareaClassName,
} from "./styles/FieldFactory.styles";

const FieldFactory = forwardRef<
  HTMLInputElement,
  FieldFactoryProps
>(
  (
    {
      id,
      name,
      value,
      type = INPUT_TYPES.TEXT,
      options = [],
      checked,
      placeholder = STRING.Empty,
      baseClassName,
      handleChange,
      readOnly = false,
      disabled = false,
      selectSizeClassName,
      onKeyDown,
      onSearch,
      reference,
      isSearch,
      accept,
      hasError = false,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const { handleSearchKeyDown, handleOnChangeSearch } =
      useFieldFactoryViewModel(
        onSearch,
        handleChange,
        isSearch
      );

    const ariaAttributes = resolveFieldAriaAttributes(
      id,
      hasError
    );

    const toggleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    switch (type) {
      case INPUT_TYPES.TEXTAREA:
        return (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            className={resolveFieldFactoryTextareaClassName(
              baseClassName
            )}
            placeholder={placeholder}
            {...ariaAttributes}
            readOnly={readOnly}
            disabled={disabled}
          />
        );

      case INPUT_TYPES.SELECT:
        return (
          <select
            id={id}
            name={name}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            className={resolveFieldFactorySelectClassName(
              baseClassName,
              value === STRING.Empty,
              selectSizeClassName
            )}
            {...ariaAttributes}
          >
            {placeholder && (
              <option
                value={STRING.Empty}
                disabled
                hidden
                className={
                  FIELD_FACTORY_PLACEHOLDER_OPTION_CLASS
                }
              >
                {placeholder}
              </option>
            )}
            {options &&
              options.map((option) => (
                <option
                  key={option.key}
                  value={option.value}
                  className={FIELD_FACTORY_OPTION_CLASS}
                >
                  {option.label}
                </option>
              ))}
          </select>
        );

      case INPUT_TYPES.CHECKBOX:
        return (
          <div
            className={FIELD_FACTORY_CHECKBOX_WRAPPER_CLASS}
          >
            <input
              id={id}
              name={name}
              type={type}
              checked={checked}
              onChange={handleChange}
              readOnly={readOnly}
              disabled={disabled}
              className={FIELD_FACTORY_CHECKBOX_INPUT_CLASS}
              {...ariaAttributes}
            />
            <label
              htmlFor={id}
              className={FIELD_FACTORY_CHECKBOX_LABEL_CLASS}
            >
              {value}
            </label>
          </div>
        );

      case INPUT_TYPES.SEARCH:
        return (
          <input
            id={id}
            name={name}
            value={value}
            onChange={handleOnChangeSearch}
            onKeyDown={handleSearchKeyDown}
            type={INPUT_TYPES.TEXT}
            readOnly={readOnly}
            disabled={disabled}
            className={baseClassName}
            placeholder={placeholder}
            {...ariaAttributes}
            ref={reference ?? ref}
          />
        );

      case INPUT_TYPES.FILE:
        return (
          <input
            id={id}
            name={name}
            type={INPUT_TYPES.FILE}
            onChange={handleChange}
            className={baseClassName}
            accept={accept}
            readOnly={readOnly}
            disabled={disabled}
            {...ariaAttributes}
            ref={reference ?? ref}
          />
        );

      case INPUT_TYPES.SELECT_SEARCH:
        return (
          <select
            id={id}
            name={name}
            value={value}
            disabled={disabled}
            onChange={handleOnChangeSearch}
            onKeyDown={handleSearchKeyDown}
            className={resolveFieldFactorySelectClassName(
              baseClassName,
              value === STRING.Empty,
              selectSizeClassName
            )}
            {...ariaAttributes}
          >
            {placeholder && (
              <option
                value={STRING.Empty}
                disabled
                hidden
                className={
                  FIELD_FACTORY_PLACEHOLDER_OPTION_CLASS
                }
              >
                {placeholder}
              </option>
            )}
            {options &&
              options.map((option) => (
                <option
                  key={option.key}
                  value={option.value}
                  className={FIELD_FACTORY_OPTION_CLASS}
                >
                  {option.label}
                </option>
              ))}
          </select>
        );

      case INPUT_TYPES.PASSWORD:
        return (
          <div
            className={FIELD_FACTORY_PASSWORD_WRAPPER_CLASS}
          >
            <input
              id={id}
              name={name}
              value={value}
              onChange={handleChange}
              onKeyDown={onKeyDown}
              type={
                isVisible
                  ? INPUT_TYPES.TEXT
                  : INPUT_TYPES.PASSWORD
              }
              readOnly={readOnly}
              disabled={disabled}
              className={baseClassName}
              placeholder={placeholder}
              {...ariaAttributes}
              ref={reference ?? ref}
            />
            <Button
              type="button"
              variant={BUTTON.BASE}
              className={
                FIELD_FACTORY_PASSWORD_TOGGLE_CLASS
              }
              onClick={toggleVisibility}
              aria-label={
                isVisible
                  ? PASSWORD_TOGGLE_LABEL.HIDE
                  : PASSWORD_TOGGLE_LABEL.SHOW
              }
              aria-controls={id}
            >
              <MaterialIcon
                name={
                  isVisible
                    ? MATERIAL_ICON_NAME.VISIBILITY_OFF
                    : MATERIAL_ICON_NAME.VISIBILITY
                }
              />
            </Button>
          </div>
        );

      default:
        return (
          <input
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            type={type}
            readOnly={readOnly}
            disabled={disabled}
            className={baseClassName}
            placeholder={placeholder}
            {...ariaAttributes}
            ref={reference ?? ref}
          />
        );
    }
  }
);

FieldFactory.displayName = DISPLAY_NAME.FIELD_FACTORY;

export default FieldFactory;
