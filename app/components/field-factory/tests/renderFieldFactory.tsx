import { render } from "@testing-library/react";
import { vi } from "vitest";
import { INPUT_TYPES } from "@/app/constants";
import FieldFactory from "../FieldFactory";
import type { FieldFactoryProps } from "../models/FieldFactoryProps.interface";
import {
  BASE_CLASS_NAME,
  FIELD_ID,
  FIELD_NAME,
  FIELD_VALUE,
} from "./FieldFactory.constants";
import { createFieldFactoryPage } from "./FieldFactory.page";

const DEFAULT_FIELD_FACTORY_PROPS: FieldFactoryProps = {
  baseClassName: BASE_CLASS_NAME,
  handleChange: vi.fn(),
  hasError: false,
  hasErrorText: false,
  id: FIELD_ID,
  name: FIELD_NAME,
  type: INPUT_TYPES.TEXT,
  value: FIELD_VALUE,
};

export const renderFieldFactory = (
  overrides: Partial<FieldFactoryProps> = {}
) => {
  const { container } = render(
    <FieldFactory
      {...DEFAULT_FIELD_FACTORY_PROPS}
      {...overrides}
    />
  );

  return createFieldFactoryPage(container);
};
