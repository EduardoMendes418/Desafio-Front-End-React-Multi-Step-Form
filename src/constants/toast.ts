import { ToastType, ToastStyleConfig } from '../types/toast';

export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
} as const;

export const TOAST_POSITION = {
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
} as const;

export const TOAST_STYLES: Record<ToastType, ToastStyleConfig> = {
  success: {
    bgColor: 'bg-green-500',
    textColor: 'text-white',
    icon: '✅',
  },
  error: {
    bgColor: 'bg-red-500',
    textColor: 'text-white',
    icon: '❌',
  },
  warning: {
    bgColor: 'bg-yellow-500',
    textColor: 'text-gray-900',
    icon: '⚠️',
  },
  info: {
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
    icon: 'ℹ️',
  },
};