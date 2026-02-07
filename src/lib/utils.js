import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPKR(amount) {
  if (amount === undefined || amount === null) return '';
  // Format with thousand separators
  const formattedAmount = Number(amount).toLocaleString('en-PK');
  return `₨ ${formattedAmount}`;
}