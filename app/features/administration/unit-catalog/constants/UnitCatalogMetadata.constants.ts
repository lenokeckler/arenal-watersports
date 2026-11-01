import type { Metadata } from "next";
import { UNIT_LIST_COPY } from "./UnitListCopy.constants";
import { UNIT_FORM_MODE } from "./UnitFormMode.constants";
import { UNIT_FORM_TITLE } from "./UnitFormModeCopy.constants";

export const UNIT_LIST_METADATA: Metadata = {
  title: UNIT_LIST_COPY.LIST_METADATA_TITLE,
};

export const UNIT_CREATE_METADATA: Metadata = {
  title: UNIT_FORM_TITLE[UNIT_FORM_MODE.CREATE],
};

export const UNIT_EDIT_METADATA: Metadata = {
  title: UNIT_FORM_TITLE[UNIT_FORM_MODE.EDIT],
};
