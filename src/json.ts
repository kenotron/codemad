import fs from 'fs';
import { ModOptions, ModResult } from './interfaces';

export function jsonHandler<T = any>(matches: string[], options: ModOptions, cb: (json: any) => any, spaceIndents: number = 2): ModResult[] {
  let json: T;
  let newJson: T;
  let outputString: string;
  let inputString: string;
  const results: ModResult[] = [];

  matches.forEach(match => {
    inputString = fs.readFileSync(match).toString();

    try {
      json = JSON.parse(inputString);
    } catch {
      console.error('invalid JSON');
    }

    if (cb) {
      newJson = cb(json);
      outputString = JSON.stringify(newJson, null, spaceIndents);

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
