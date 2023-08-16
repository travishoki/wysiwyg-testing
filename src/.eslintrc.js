module.exports = {
  extends: ["react-app"],
  plugins: ["no-only-tests", "typescript-sort-keys", "sort-destructure-keys"],
  rules: {
    /** General */
    // "sort-keys": "off", // Hoki Overriden
    "no-unused-vars": "off", // handled by Typescript
    "linebreak-style": ["error", "unix"], // Handle Mac and PC returns. Not enabled by default.
    "no-console": ["error", { allow: ["warn", "error"] }], // Catches console.logs but allows warn and error
    "no-redeclare": "off", // handled by Typescript
    "no-underscore-dangle": "off", // Allow methods prefixed with "_"
    "no-only-tests/no-only-tests": "error", // Prevents CI from running only one test because it's marked with test.only
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
    // "react/no-multi-comp": "off", // Hoki Overriden
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
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        "newlines-between": "never",
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
      },
    ],
    "import/prefer-default-export": "off",

    /** Syncronizing Rules */
    "class-methods-use-this": "error",
    "prefer-promise-reject-errors": "error",
    "no-restricted-syntax": "error",
    "jsx-a11y/control-has-associated-label": "error",

    // Extra Syntax
    "react/no-multi-comp": "error",
    "sort-keys": "error",
    "no-else-return": "error",
    "no-duplicate-imports": "error",

    // Extra Formatting
    "padding-line-between-statements": [1, { blankLine: "always", prev: "*", next: "return" }],
    "react/jsx-sort-props": ["error"],
    "typescript-sort-keys/interface": "error",
    "sort-destructure-keys/sort-destructure-keys": 2,

    // Nice to have eventually
    // "no-param-reassign": "error",
    // "no-nested-ternary": "error",
  },
  overrides: [
    /** Composer */
    {
      files: ["**/nodes/**/*", "**/plugins/**/*"],
      rules: {
        "class-methods-use-this": 0,
      },
    },
  ],
}
