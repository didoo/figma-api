require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['@knapsack/eslint-config-starter'],
  parserOptions: { tsconfigRootDir: __dirname },
  ignorePatterns: [],
  rules: {},
};
