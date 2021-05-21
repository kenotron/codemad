import fs from 'fs';

export function loadFixtures(fixturesPath: string) {
  const mockContents: { [pathName: string]: { [fileName: string]: string } } = {
    [fixturesPath]: {}
  };

  const fixtures = fs.readdirSync(fixturesPath);

  fixtures.forEach(fixture => {
    if (fixture.endsWith('.ts') || fixture.endsWith('.tsx')) {
      mockContents[fixturesPath][fixture] = fs.readFileSync(`${fixturesPath}/${fixture}`).toString();
    }
  });

  return mockContents;
}
