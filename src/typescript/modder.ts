import ts from 'typescript';
import { Modder, TypescriptMod } from '../interfaces';

export const modder: Modder = {
  replace(node: ts.Node, replacement: string): TypescriptMod {
    return {
      node,
      start: node.getStart(),
      length: node.getText().length,
      replacement
    };
  },

  append(node: ts.Node, suffix: string): TypescriptMod {
    return {
      node,
      start: node.getStart() + node.getText().length,
      length: 0,
      replacement: suffix
    };
  },

  prepend(node: ts.Node, prefix: string): TypescriptMod {
    return {
      node,
      start: node.getStart(),
      length: 0,
      replacement: prefix
    };
  },

  remove(node: ts.Node): TypescriptMod {
    return {
      node,
      start: node.getStart(),
      length: node.getText().length,
      replacement: ''
    };
  },

  removeFull(node: ts.Node): TypescriptMod {
    return {
      node,
      start: node.getFullStart(),
      length: node.getFullText().length,
      replacement: ''
    };
  }
};
