import mockfs from 'mock-fs';
import ts from 'typescript';
import { loadFixtures } from './testutils/loadFixtures';
import { testTsHandlerWithFixtureFactory } from './testutils/testTsHandlerWithFixtureFactory';
import { TypescriptMod } from '../interfaces';

const FixturesPath = 'src/__tests__/fixtures/typescript';

describe('tshandler', () => {
  const mockContents = loadFixtures(FixturesPath);
  const testWithFixture = testTsHandlerWithFixtureFactory(FixturesPath);

  beforeEach(() => {
    mockfs(mockContents);
  });

  it('replaces node with text', () => {
    testWithFixture('variableDeclaration.ts', {}, (node, modder) => {
      if (ts.isVariableDeclaration(node)) {
        return modder.replace(node, `${node.name.getText()} = 'test'`);
      }
    });
  });

  it('prepends node with text', () => {
    testWithFixture('prepend.ts', {}, (node, modder) => {
      if (ts.isVariableDeclaration(node)) {
        return modder.prepend(node.parent, `console.log('prepended');\n`);
      }
    });
  });

  it('appends node with text', () => {
    testWithFixture('append.ts', {}, (node, modder) => {
      if (ts.isVariableDeclaration(node)) {
        return modder.append(node.parent, `\nconsole.log('appended');`);
      }
    });
  });

  it('removes node', () => {
    testWithFixture('remove.ts', {}, (node, modder) => {
      if (ts.isExpressionStatement(node)) {
        return modder.remove(node);
      }
    });
  });

  it('removes node fully', () => {
    testWithFixture('removeFull.ts', {}, (node, modder) => {
      if (ts.isExpressionStatement(node)) {
        return modder.removeFull(node);
      }
    });
  });

  it('mods multiple mods in a generator function', () => {
    testWithFixture('iterable.ts', {}, function* (node, modder) {
      if (ts.isVariableDeclaration(node) && node.name.getText() === 'a') {
        yield modder.replace(node.name, 'aaaa');
      } else if (ts.isVariableDeclaration(node) && node.name.getText() === 'c') {
        yield modder.replace(node.name, 'cccc');
      }
    });
  });

  it('mods multiple mods if results in array', () => {
    testWithFixture('array.ts', {}, (node, modder) => {
      const mods: TypescriptMod[] = [];

      if (ts.isVariableDeclaration(node) && node.name.getText() === 'a') {
        mods.push(modder.replace(node.name, 'aaaa'));
      } else if (ts.isVariableDeclaration(node) && node.name.getText() === 'c') {
        mods.push(modder.replace(node.name, 'cccc'));
      }

      return mods;
    });
  });

  it('does not mod when nothing is returned', () => {
    testWithFixture('nomod.ts', {}, (node, modder) => { });
  });


  it("returns list of files modified", () => {
    const results = testWithFixture("variableDeclaration.ts", {}, (node, modder) => {
      if (ts.isVariableDeclaration(node)) {
        return modder.replace(node, `${node.name.getText()} = 'test'`);
      }
    });
    expect(results[0].fileName).toEqual("src/__tests__/fixtures/typescript/variableDeclaration.ts");
    expect(results[0].state).toEqual("modified");
  });

  it("does not modify files in dry-run mode", () => {
    const results = testWithFixture("dryRun.ts", { dryRun: true }, (node, modder) => {
      if (ts.isVariableDeclaration(node)) {
        return modder.replace(node, `${node.name.getText()} = 'test'`);
      }
    });
    expect(results[0].fileName).toEqual("src/__tests__/fixtures/typescript/dryRun.ts");
    expect(results[0].state).toEqual("modified");
  });
});
