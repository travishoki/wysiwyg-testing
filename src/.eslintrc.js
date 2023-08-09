module.exports = {
  extends: ["react-app"],
  rules: {
    /** General */
    "sort-keys": "off",
    "no-unused-vars": "off", // handled by Typescript
    "linebreak-style": ["error", "unix"], // Handle Mac and PC returns. Not enabled by default.
    "no-console": ["error", { allow: ["warn", "error"] }], // Catches console.logs but allows warn and error
    "no-redeclare": "off", // handled by Typescript
    "no-underscore-dangle": "off", // Allow methods prefixed with "_"
    // "no-only-tests/no-only-tests": "error", // Prevents CI from running only one test because it's marked with test.only
    "no-irregular-whitespace": "off",
    "comma-dangle": ["error", "always-multiline"],
    "consistent-return": "off",
    "no-nested-ternary": "off",
    "no-bitwise": "off",
    "no-else-return": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",

    "no-return-assign": "off",
    "no-shadow": "off",
    "no-throw-literal": "off",
    "no-unused-expressions": "off",
    "no-use-before-define": "off", // handled by Typescript
    "no-useless-constructor": "off",
    "prefer-destructuring": "off",
    eqeqeq: "off",
    "arrow-body-style": "off",
    "max-classes-per-file": "off",
    // Block the commit if any ex-ex-ex comments are staged. See https://www.executeprogram.com/blog/the-code-is-the-to-do-list.
    "no-warning-comments": ["error", { terms: ["xxx"], location: "anywhere" }],

    /** Typescript */
    "@typescript-eslint/no-redeclare": ["error"],
  },
}
