const numberFormatter = new Intl.NumberFormat("bn-BD");

const percentageFormatter = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const unitNames = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function formatNumber(value) {
  return numberFormatter.format(value);
}

export function formatPercentage(value) {
  return percentageFormatter.format(Math.abs(value));
}

export function getUnitName(unit) {
  return unitNames[unit] || unit;
}