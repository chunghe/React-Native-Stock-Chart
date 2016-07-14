
export function tickFormatPercent(n, previousClose) {
  const percent = (n - previousClose) * 100 / previousClose;
  const round = Math.round(percent * 100) / 100;
  return `${round}%`;
}

