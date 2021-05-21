import ts from 'typescript';
import { Modder } from '../interfaces';

export function renameJsxProp(tagName: string, propFrom: string, propTo: string) {
  return function renameJsxPropVisitor(node: ts.Node, modder: Modder) {
    if (ts.isJsxOpeningLikeElement(node)) {
      if (node.tagName.getText() === tagName && node.attributes && node.attributes.properties) {
        for (let prop of node.attributes.properties) {
          if (ts.isJsxAttribute(prop) && prop && prop.name && prop.name.getText() === propFrom && prop.initializer) {
            return modder.replace(prop.name, propTo);
          }
        }
      }
    }
  };
}
