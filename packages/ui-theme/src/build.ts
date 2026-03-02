import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import * as themes from "./theme.js";

interface CssVariableLeaf {
  property: string;
  variable: string;
  value: string | number;
}

type CssVariableNode = { [key: string]: CssVariableAst };

type CssVariableAst = CssVariableLeaf | CssVariableNode;

const destDirectory = "dest";

rmSync(destDirectory, { recursive: true, force: true });

mkdirSync(destDirectory, { recursive: true });

const prefix = "repo";

const build = async () => {
  const cssVariableObjects = Object.values(themes).map((theme) => ({
    theme,
    ast: getCssVariableAst(theme),
  }));

  if (!cssVariableObjects[0]) throw new Error("No css variable objects found");

  const cssContent = cssVariableObjects.map(createThemeCssClass).join("\n\n");
  writeFileSync(`${destDirectory}/css-variables.css`, cssContent);

  writeFileSync(`${destDirectory}/css-variables.ts`, getJs(cssVariableObjects[0].ast));
};

function isLeaf(ast: CssVariableAst): ast is CssVariableLeaf {
  return "property" in ast && "variable" in ast && "value" in ast;
}

const createThemeCssClass = ({ theme, ast }: { theme: typeof themes.lightTheme; ast: CssVariableAst }): string => {
  const declarations = getCss(ast);
  return `.${theme.className} {
  ${declarations}
}`;
};

const getCssVariableAst = (obj: unknown, path: string[] = []): CssVariableAst => {
  if (typeof obj !== "object" || obj === null) {
    const property = `--${prefix}-${path.join("-")}`;
    return {
      property,
      variable: `var(${property})`,
      value: obj as string | number,
    };
  }
  const result: { [key: string]: CssVariableAst } = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = getCssVariableAst(value, [...path, key]);
  }
  return result;
};

const getJs = (object: CssVariableAst) => {
  const simplified = simplifyObject(object);
  return `export const cssVariables = ${JSON.stringify(simplified, null, 2)};`;
};

type SimplifiedCssVariable = string | { [key: string]: SimplifiedCssVariable };

const simplifyObject = (obj: CssVariableAst): SimplifiedCssVariable => {
  if (isLeaf(obj)) {
    return obj.variable;
  }
  const result: { [key: string]: SimplifiedCssVariable } = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = simplifyObject(value);
  }
  return result;
};

const getCss = (cssVariableObject: CssVariableAst) => {
  const flat = flatten(cssVariableObject);
  return flat.join("\n");
};

const flatten = (obj: CssVariableAst): string[] => {
  const result: string[] = [];

  const traverse = (current: CssVariableAst): void => {
    if (isLeaf(current)) {
      result.push(`${current.property}: ${current.value};`);
    } else {
      for (const value of Object.values(current)) {
        traverse(value);
      }
    }
  };

  traverse(obj);
  return result;
};

(async () => {
  await build();
})();
