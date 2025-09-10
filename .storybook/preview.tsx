// .storybook/preview.tsx
import type { Preview } from "@storybook/react";
import { useEffect } from "react";
import "../src/index.css";
import { ThemeProvider } from "../src/packages/ThemeProvider/src";
import { ALL_THEMES, Theme } from "../src/packages/ThemeProvider/src/theme";
import "../src/packages/ThemeProvider/src/themes"; // Load all theme CSS
import { darkTheme, lightTheme } from "./Theme";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "UBMedia Themes",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      items: ALL_THEMES,
      showName: true,
    },
  },
};

export const parameters: Preview["parameters"] = {
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: lightTheme.appBg },
      { name: "dark", value: darkTheme.appBg },
    ],
  },
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme as Theme;

    document.body.style.backgroundColor = parameters.backgrounds.values.find(b => b.name === theme)?.value;

    useEffect(() => {
      // Apply theme class to <html>
      const root = document.documentElement;
      ALL_THEMES.forEach((t) => root.classList.remove(t));
      root.classList.add(theme);
    }, [theme]);

    return (
      <ThemeProvider theme={theme}>
          <Story />
      </ThemeProvider>
    );
  },
];

const preview: Preview = {
  parameters,
};

export default preview;
