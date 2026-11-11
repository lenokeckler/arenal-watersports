export interface ExtraCardReactivationViewModel {
  onReactivateClick: (
    extraId: string
  ) => () => Promise<void>;
}
