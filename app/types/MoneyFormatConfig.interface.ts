export interface MoneyFormatConfig {
  locale: string;
  wholeAmountOptions: Intl.NumberFormatOptions;
  fractionalAmountOptions: Intl.NumberFormatOptions;
}
