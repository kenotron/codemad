import mockfs from 'mock-fs';
import { renameJsxProp } from '../mods/renameJsxProp';
import { replaceJsxPropValue } from '../mods/replaceJsxPropValue';
import { loadFixtures } from './testutils/loadFixtures';
import { testTsHandlerWithFixtureFactory } from './testutils/testTsHandlerWithFixtureFactory';

const FixturesPath = 'src/__tests__/fixtures/mods';

describe('typescript mods', () => {
  const mockContents = loadFixtures(FixturesPath);
  const testWithFixture = testTsHandlerWithFixtureFactory(FixturesPath);

  beforeEach(() => {
    mockfs(mockContents);
  });

  it('replaces a single prop name in jsx', () => {
    testWithFixture('renameJsxProp.tsx', {}, renameJsxProp('App', 'hello', 'moddedProp'));
  });

  it('replaces a single prop value in jsx', () => {
    testWithFixture('replaceJsxPropValue.tsx', {}, replaceJsxPropValue('App', 'hello', '"modded"'));
  });
});