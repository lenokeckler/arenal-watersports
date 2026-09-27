export interface FieldFactoryViewModel {
  handleDebounceChange: (
    _event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
  handleSearchKeyDown: (
    _event: React.KeyboardEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
  handleOnChangeSearch: (
    _event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
  isSearch?: boolean;
}
