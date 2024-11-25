import { dirname, join } from "path";
import { StorybookConfig } from "@storybook/react-vite"

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  stories: [
    "../docs/*.mdx",
    '../../components/**/__stories__/*.mdx',
    "../../components/**/__stories__/*.stories.@(js|jsx|mjs|ts|tsx)",
    // {--sg-code-remove} Below line need to be removed once base is ready
    "../stories/**/*.stories.@(js|jsx|mdx|mjs|ts|tsx)",
  ],
  staticDirs: ["../public"],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("storybook-dark-mode")
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: { builder: {} },
  },
  core: {
    disableTelemetry: true,
    disableProjectJson: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config;