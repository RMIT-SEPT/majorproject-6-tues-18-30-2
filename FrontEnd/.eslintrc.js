module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:security/recommended",
    "prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    "eslint-plugin",
    "jest",
    "security"
  ],
  rules: {
    // Typescript
    "@typescript-eslint/consistent-type-definitions": [ "error", "interface" ],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      {
        "allow": [ "arrowFunctions" ]
      },
    ],
    "@typescript-eslint/no-empty-interface": [
      "warn",
      {
        "allowSingleExtends": true
      }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_"
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/unbound-method": "off",

    // Base
    "curly": [ "error", "all"] ,
    "no-console": "error",
    "no-mixed-operators": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxBOF": 0,
        "maxEOF": 0
      }
    ],
    "no-process-exit": "error",

    // React
    "react/prop-types": [
      "error",
      {
        "skipUndeclared": true
      }
    ]
  },
  overrides: [
    {
      "files": [ "*.js" ],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
        "no-undef": "off"
      }
    }
  ],
  settings: {
    react: {
      version: "detect"
    }
  }
};