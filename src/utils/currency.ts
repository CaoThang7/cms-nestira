export const formatVND = (value: number | string): string => {
  return Number(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const VND_TO_USD_RATE = 26014;

export const formatUSD = (value: number | string): string => {
  const vnd = Number(value);
  const usd = vnd / VND_TO_USD_RATE;
  return usd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
