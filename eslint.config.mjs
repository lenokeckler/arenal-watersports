import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "coverage/**",
      "functions/lib/**",
      "functions/.eslintrc.js",
      "playwright-artifacts/**",
      "playwright-report/**",
      "playwright-screenshots/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "import", next: "*" },
        {
          blankLine: "any",
          prev: "import",
          next: "import",
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXAttribute[name.name='className'] > Literal",
          message:
            "Tailwind classes live in a styles/*.styles.ts constant (styles-standards).",
        },
        {
          selector:
            "JSXAttribute[name.name='className'] > JSXExpressionContainer > Literal",
          message:
            "Tailwind classes live in a styles/*.styles.ts constant (styles-standards).",
        },
        {
          selector:
            "JSXAttribute[name.name='className'] > JSXExpressionContainer > TemplateLiteral",
          message:
            "Compose the class in a styles/*.styles.ts constant or resolver (styles-standards).",
        },
        {
          selector:
            "JSXAttribute[name.name='className'] > JSXExpressionContainer > ConditionalExpression",
          message:
            "Resolve the class through a typed map in styles/*.styles.ts (styles-standards).",
        },
      ],
      semi: ["error"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "for-direction": ["error"],
      "no-class-assign": ["error"],
      "no-cond-assign": ["error"],
      "no-const-assign": ["error"],
      "no-dupe-args": ["error"],
      "no-dupe-class-members": ["error"],
      "no-dupe-else-if": ["error"],
      "no-dupe-keys": ["error"],
      "no-duplicate-case": ["error"],
      "no-empty-pattern": ["error"],
      "no-ex-assign": ["error"],
      "no-fallthrough": ["error"],
      "no-func-assign": ["error"],
      "no-inner-declarations": ["error"],
      "no-invalid-regexp": ["error"],
      "no-irregular-whitespace": ["error"],
      "no-self-assign": ["error"],
      "no-self-compare": ["error"],
      "no-sparse-arrays": ["error"],
      "no-template-curly-in-string": ["error"],
      "no-unexpected-multiline": ["error"],
      "no-unreachable": ["error"],
      "no-unreachable-loop": ["error"],
      "no-unsafe-negation": ["error"],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-use-before-define": ["error"],
      "arrow-body-style": ["error", "as-needed"],
      "block-scoped-var": ["error"],
      "consistent-return": ["error"],
      curly: ["error"],
      "default-case-last": ["error"],
      "default-param-last": ["error"],
      eqeqeq: ["error"],
      "no-console": ["error"],
      "no-else-return": ["error"],
      "no-empty": ["error"],
      "no-empty-function": ["error"],
      "no-lonely-if": ["error"],
      "no-multi-assign": ["error"],
      "no-new": ["error"],
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "off",
      "no-return-assign": ["error"],
      "no-shadow": ["error"],
      "no-unused-expressions": ["error"],
      "no-var": ["error"],
      "no-useless-return": ["error"],
      "operator-assignment": ["error"],
      "prefer-const": ["error"],
      "require-await": ["error"],
    },
  },
  {
    files: [
      "app/components/**/*.{ts,tsx}",
      "app/constants/**/*.{ts,tsx}",
      "app/providers/**/*.{ts,tsx}",
      "app/services/**/*.{ts,tsx}",
      "app/store/**/*.{ts,tsx}",
      "app/styles/**/*.{ts,tsx}",
      "app/types/**/*.{ts,tsx}",
      "app/utils/**/*.{ts,tsx}",
    ],
    ignores: ["app/store/index.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app/features/**"],
              message:
                "A shared folder never imports a feature (component-architecture §1).",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["app/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app/features/**"],
              message:
                "A feature never imports another feature; it imports its own files with relative paths (component-architecture §1).",
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      "app/services/observability/reportServerError.ts",
    ],
    rules: {
      "no-console": ["error", { allow: ["error"] }],
    },
  },
  {
    files: [".github/scripts/**/*.mjs", "scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        Buffer: "readonly",
        console: "readonly",
        fetch: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },
];

export default eslintConfig;
