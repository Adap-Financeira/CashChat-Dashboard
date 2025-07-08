export function currencyMaskPtBR(value: string) {
  // Convert value to number, default to 0 if invalid
  const number = parseFloat(value) || 0;

  // Format to two decimal places
  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}