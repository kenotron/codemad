
import path from 'path';
import { glob } from '../glob';

describe('file globbing', () => {

    const originalDirectory = process.cwd();
    const fixturesRoot = path.join(__dirname, 'fixtures', 'sample_project');

    beforeEach(() => {
        process.chdir(fixturesRoot);
    });

    afterEach(() => {
        process.chdir(originalDirectory);
    });

    it('finds sample.ts', () => {
        expect(glob('**/*.ts')).toContain("sample.ts");
    });

    it('does not find node_modules/lib.ts', () => {
        expect(glob('**/*.ts')).not.toContain("node_modules/lib.ts");
    });
});