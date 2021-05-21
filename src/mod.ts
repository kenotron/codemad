import { jsonHandler } from './json';
import { textHandler } from './text';
import { tsHandler } from './typescript';
import { ModHandlers, Visitor, ModResult, ModOptions } from './interfaces';
import { glob } from './glob';

export function mod(pattern: string, options: ModOptions = {}, files: ModResult[] = []) {
  const fileList = glob(pattern);

  const handlers: ModHandlers<any> = {
    asJson: <T>(cb: (json: T) => T, indent?: number) => {
      const results = jsonHandler(fileList, options, cb, indent);
      return mod(pattern, options, files.concat(results));
    },
    asText: (cb: (text: string) => string) => {
      const results = textHandler(fileList, options, cb);
      return mod(pattern, options, files.concat(results));
    },
    asTypescript: (visitor: Visitor) => {
      const results = tsHandler(fileList, options, visitor);
      return mod(pattern, options, files.concat(results));
    },
    files
  };

  return handlers;
}
