export const sumStockQuantities = (
  quantities: number[]
): number =>
  quantities.reduce(
    (total, quantity) => total + quantity,
    0
  );
