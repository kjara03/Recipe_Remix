import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 12,
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
    },
    rules: {
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
    },
  },
  pluginJs.configs.recommended,
];
