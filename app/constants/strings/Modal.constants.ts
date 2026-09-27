export const MODAL = {
  VIEW_COMPLETE_INFORMATION: "modalViewCompleteInformation",
  EDIT_DATA: "modalEditData",
  SEE_NEW_DATA_TABLE_FROM_OTHER_COLLECTION:
    "modalSeeNewDataTableFromOtherCollection",
  ADD_DATA: "modalAddData",
  ONE: "modal-1",
  TWO: "modal-2",
  THREE: "modal-3",
  FOUR: "modal-4",
  ADD: "add",
  EDIT: "edit",
  CONFIRM_CLOSE: "confirm-close",
};

export type String = (typeof MODAL)[keyof typeof MODAL];
