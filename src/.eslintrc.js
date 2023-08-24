module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  plugins: ["no-only-tests", "typescript-sort-keys", "sort-destructure-keys", "promise"],
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

    /** Syncronizing Rules (Errors) */
    "class-methods-use-this": "error",
    "jsx-a11y/control-has-associated-label": "error",
    "lines-between-class-members": "error",
    "no-continue": "error",
    "no-restricted-syntax": "error",
    "no-useless-return": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-template": "error",
    "react/jsx-boolean-value": "error",
    "react/jsx-curly-brace-presence": "error",
    "spaced-comment": "error",
    camelcase: "error",

    /** Syncronizing Rules (Warnings) */
    "no-dupe-class-members": "warn", // TODO: change to error
    "jsx-a11y/click-events-have-key-events": "warn",

    // Extra Syntax
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "promise/catch-or-return": ["error", { allowFinally: true }],
    "react/no-multi-comp": "error",

    // Extra Sorting
    "react/jsx-sort-props": ["error"],
    "sort-destructure-keys/sort-destructure-keys": 2,
    "sort-keys": "error",
    "typescript-sort-keys/interface": "error",

    // Extra Spacing
    "padding-line-between-statements": [1, { blankLine: "always", prev: "*", next: "return" }],
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
