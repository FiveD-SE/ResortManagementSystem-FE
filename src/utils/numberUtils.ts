export const formatPrice = (price: number): string => {
  return `$${new Intl.NumberFormat('en-US').format(price)}`;
};

export const formatQuantity = (quantity: number): string => {
  return quantity.toLocaleString();
};

export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  const discount = originalPrice - discountedPrice;
  return Math.round((discount / originalPrice) * 100);
};

export const isWithinPercentageRange = (value: number, target: number, percentageRange: number): boolean => {
  const lowerBound = target * (1 - percentageRange / 100);
  const upperBound = target * (1 + percentageRange / 100);
  return value >= lowerBound && value <= upperBound;
};

export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
