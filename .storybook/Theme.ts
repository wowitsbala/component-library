import { create } from 'storybook/theming/create';

// Light Theme
export const lightTheme = create({
  base: "light",
  brandTitle: "UBM Component Library",
  brandUrl: "https://ulta.com",
  appBg: "#ffffff", // Preview background
  appContentBg: "#ffffff",
  appBorderColor: "#e5e7eb", // Tailwind gray-200
  appBorderRadius: 8,
  colorPrimary: "#2563eb", // Tailwind blue-600
  colorSecondary: "#9333ea", // Tailwind purple-600
});

// Dark Theme
export const darkTheme = create({
  base: "dark",
  brandTitle: "UBM Component Library",
  brandUrl: "https://ulta.com",
  appBg: "#1f2937", // Tailwind gray-800
  appContentBg: "#111827", // Tailwind gray-900
  appBorderColor: "#374151", // Tailwind gray-700
  appBorderRadius: 8,
  colorPrimary: "#3b82f6", // Tailwind blue-500
  colorSecondary: "#c084fc", // Tailwind purple-400
});