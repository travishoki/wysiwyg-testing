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
    "no-restricted-imports": [
      "error",
      {
        paths: [],
      },
    ],
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
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { classes: false, functions: false, variables: false },
    ],

    /** React */
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx", ".tsx", ".mdx"] }], // Allow JSX for file extensions    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/no-deprecated": "off",
    "react/button-has-type": "off",
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "off",
    "react/no-access-state-in-setstate": "off",
    "react/no-array-index-key": "off",
    "react/no-did-update-set-state": "off",
    "react/no-multi-comp": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unused-prop-types": "off",
    "react/require-default-props": "off",
    "react/sort-comp": "off",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useUpdateEffect)",
      },
    ],

    /** import */
    "import/no-named-as-default-member": "off", // handled by Typescript
    "import/named": "off", // handled by Typescript
    "import/no-cycle": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [],
      },
    ],
    "import/no-default-export": "warn", // Prefer named exports

    "import/prefer-default-export": "off",
  },
}
