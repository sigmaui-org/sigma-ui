import React from 'react';
import {themes} from "@storybook/theming";
import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import "./styles.css";

const themeTypo = {
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',
}

const themeBrand = {
  brandTitle: "SigmaUI",
  brandUrl: "https://sigmaui.com",
  brandTarget: "_self",
};

const lightTheme = {
  ...themes.light,
  ...themeTypo,
  ...themeBrand,

  // Color
  colorPrimary: '#3A10E5',
  colorSecondary: '#545a6d',

  // UI
  appBg: "#EEF1F9",
  appContentBg: "#f8f8fb",
  appBorderColor: '#eff2f7',
  appBorderRadius: 14,

  // Text colors
  textColor: '#545a6d',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#545a6d',
  barSelectedColor: '#585C6D',
  barHoverColor: '#585C6D',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#ced4da',
  inputTextColor: '#495057',
  inputBorderRadius: 2,

  // Brand Logo
  brandImage: "/light-logo.svg",
}

const darkTheme = {
  ...themes.dark,
  ...themeTypo,
  ...themeBrand,

  // Color
  colorPrimary: '#3A10E5',
  colorSecondary: '#585C6D',

  // UI
  appBg: "#2a3042",
  appContentBg: "#222736",
  appPreviewBg: '#ffffff',
  appBorderColor: '#32394e',
  appBorderRadius: 14,

  barBg: "#2a3042",

  // Brand
  brandImage: "/dark-logo.svg",
}

const parameters: Preview["parameters"] = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    options: {
      storySort: {
        order: [
          "GettingStarted",
          "Atoms",
          "Foundations",
          "Components"
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      current: "dark",
      stylePreview: true,
      darkClass: "dark",
      lightClass: "light",
      classTarget: "html",
      dark: darkTheme,
      light: lightTheme,
    },
};

const argTypes: Preview["argTypes"] = {
  // Disabling testid to be shown on any Story,
  // it's just used for Jest as an internal id for testing
  // so no need to show it in any controls of Storybook
  _private_testid: { table: { disable: true } },

  // Setting default categories for our commonProps
  customClass: {
    table: {
      category: 'Editor controls',
      subcategory: 'Common',
    },
  },
  customId: {
    table: {
      category: 'Editor controls',
      subcategory: 'Common',
    },
  },
  themeOverride: {
    table: {
      category: 'Editor controls',
      subcategory: 'Common',
    },
    control: 'radio',
  },
};

const decorators: Preview["decorators"] = [
  (Story, context) => {
    return (
      <Story />
    );
  }
]

const preview: Preview = {
  parameters: parameters,
  argTypes: argTypes,
  decorators: decorators,
};

export default preview;