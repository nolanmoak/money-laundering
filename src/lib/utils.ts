import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentTimeDeg() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const secondsFraction = seconds / 60;
  const minutesFraction = (minutes + secondsFraction) / 60;
  const hoursFraction = (hours + minutesFraction) / 24;
  const timeRadians = hoursFraction * 2 * Math.PI;
  return timeRadians * (180 / Math.PI);
}
