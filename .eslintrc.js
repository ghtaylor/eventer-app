/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./api/tsconfig.json", "./events/tsconfig.json", "./db/tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  root: true,
};
