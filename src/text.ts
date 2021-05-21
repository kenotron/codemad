import fs from 'fs';
import { ModResult, ModOptions } from './interfaces';

export function textHandler<T = any>(matches: string[], options: ModOptions, cb: (text: string) => any): ModResult[] {
  let outputString: string;
  let inputString: string;
  const results: ModResult[] = [];

  matches.forEach(match => {
    inputString = fs.readFileSync(match).toString();

    if (cb) {
      outputString = cb(inputString);

      if (outputString !== inputString) {
        if (!options.dryRun) {
          fs.writeFileSync(match, outputString);
        }
        results.push({ fileName: match, state: 'modified' });
      } else {
        results.push({ fileName: match, state: 'not-modified' });
      }
    }
  });
  return results;
}
