import { Rule, RuleTester } from "eslint";
import parser from "@typescript-eslint/parser";

import rule from "./no-memo-displayname";

console.log("rule", rule);

const tester = new RuleTester({
  parser: parser,
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 6,
    jsx: true
  }
});

tester.run("no-memo-displayname", rule as Rule.RuleModule, {
  valid: [
    `
      const ReactMemoComponent = () => null;
      ReactMemoComponent.displayName = 'ReactMemoComponent'
      const ReactMemo = React.memo(ReactMemoComponent);
    `,
    `
      const ReactMemoComponent = () => null;
      ReactMemoComponent.displayName = 'ReactMemoComponent'
      export const ReactMemo = React.memo(ReactMemoComponent);
    `,
    `
      const ReactMemoComponent = () => null;
      ReactMemoComponent.displayName = 'ReactMemoComponent'
      const ReactMemo = memo(ReactMemoComponent);
    `,
    `
      const ReactMemoComponent = () => null;
      ReactMemoComponent.displayName = 'ReactMemoComponent'
      export const ReactMemo = memo(ReactMemoComponent);
    `
  ],
  invalid: [
    {
      code: `
        const ReactMemoComponent = () => null;
        const ReactMemo = React.memo(ReactMemoComponent);
        ReactMemo.displayName = 'ReactMemo';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    },
    {
      code: `
        const ReactMemoComponent = () => null;
        export const ReactMemo = React.memo(ReactMemoComponent);
        ReactMemo.displayName = 'ReactMemo';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    },
    {
      code: `
        const ReactMemoComponent = React.memo(() => null);
        ReactMemoComponent.displayName = 'ReactMemoComponent';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    },
    {
      code: `
        export const ReactMemoComponent = React.memo(() => null);
        ReactMemoComponent.displayName = 'ReactMemoComponent';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    },
    {
      code: `
        const ReactMemoTSComponent = React.memo<{}>(() => null);
        ReactMemoTSComponent.displayName = 'ReactMemoTSComponent';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    },
    {
      code: `
        export const ReactMemoTSComponent = React.memo(() => null);
        ReactMemoTSComponent.displayName = 'ReactMemoTSComponent';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    },
    {
      code: `
        const MemoComponent = memo(() => null);
        MemoComponent.displayName = 'MemoComponent';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    },
    {
      code: `
        export const MemoComponent = memo(() => null);
        MemoComponent.displayName = 'MemoComponent';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    },
    {
      code: `
        const MemoTSComponent = memo<{}>(() => null);
        MemoTSComponent.displayName = 'MemoTSComponent';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    },
    {
      code: `
        export const MemoTSComponent = memo<{}>(() => null);
        MemoTSComponent.displayName = 'MemoTSComponent';
      `,
      errors: [{ message: "Don't set 'displayName' on memo() component" }]
    }
  ]
});
