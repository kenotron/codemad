import mockfs from 'mock-fs';
import path from 'path';
import fs from 'fs';
import { tsHandler } from '../../typescript';
import { Visitor, ModResult, ModOptions } from '../../interfaces';

export function testTsHandlerWithFixtureFactory(fixturesPath: string) {
  return function (fixtureName: string, options: ModOptions, test: Visitor): ModResult[] {
    const fixture = path.join(fixturesPath, fixtureName);
    const result = tsHandler([fixture], options, test);

    const newContent = fs.readFileSync(fixture).toString();
    mockfs.restore();

    expect(newContent).toMatchSnapshot();
    return result;
  };
}
