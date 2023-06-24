export const formatNumber = (number: number | string) => {
  if (number === null || number === undefined || number < 0) return "-";
  let parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const waitTimeout = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};

export const isServerSide = () => typeof window === "undefined";
