import { Rule } from "eslint";
import { Node, VariableDeclarator } from "estree";

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Eslint plugin that helps to improve debugging of components wrapped by React.memo()",
      url:
        "https://github.com/patrykkopycinski/eslint-plugin-no-memo-displayname"
    },
    schema: []
  },
  create: (context: Rule.RuleContext) => {
    const sourceCode = context.getSourceCode();

    const variableDeclarators = sourceCode.ast.body.reduce((acc, item) => {
      if (item.type === "VariableDeclaration") {
        acc = [...acc, item.declarations[0]];
      }

      if (
        item.type === "ExportNamedDeclaration" &&
        item.declaration &&
        item.declaration.type === "VariableDeclaration"
      ) {
        acc = [...acc, item.declaration.declarations[0]];
      }

      return acc;
    }, [] as VariableDeclarator[]);

    const memoComponents = variableDeclarators.reduce((acc, item) => {
      const init = item.init;

      if (init) {
        if (
          init.type === "BinaryExpression" &&
          init.left.type === "BinaryExpression"
        ) {
          if (
            init.left.left.type === "MemberExpression" &&
            init.left.left.object.type === "Identifier" &&
            init.left.left.object.name === "React" &&
            init.left.left.property.type === "Identifier" &&
            init.left.left.property.name === "memo" &&
            item.id.type === "Identifier"
          ) {
            acc = [...acc, item.id.name];
          }

          if (
            init.left.left.type === "Identifier" &&
            init.left.left.name === "memo" &&
            item.id.type === "Identifier"
          ) {
            acc = [...acc, item.id.name];
          }
        }

        if (init.type === "CallExpression") {
          if (
            init.callee.type === "MemberExpression" &&
            init.callee.object.type === "Identifier" &&
            init.callee.object.name === "React" &&
            init.callee.property.type === "Identifier" &&
            init.callee.property.name === "memo" &&
            item.id.type === "Identifier"
          ) {
            acc = [...acc, item.id.name];
          }

          if (
            init.callee.type === "Identifier" &&
            init.callee.name === "memo" &&
            item.id.type === "Identifier"
          ) {
            acc = [...acc, item.id.name];
          }
        }
      }

      return acc;
    }, [] as string[]);

    return {
      ExpressionStatement: (node: Node) => {
        if (node.type === "ExpressionStatement") {
          if (
            node.expression.type === "AssignmentExpression" &&
            node.expression.left &&
            node.expression.left.type === "MemberExpression" &&
            node.expression.left.property &&
            node.expression.left.property.type === "Identifier" &&
            node.expression.left.property.name === "displayName" &&
            node.expression.left.object.type === "Identifier" &&
            memoComponents.includes(node.expression.left.object.name)
          ) {
            context.report({
              node,
              message: "Don't set 'displayName' on memo() component"
            });
          }
        }
      }
    };
  }
};
