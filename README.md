# codemad

Mod that code like you're mad!

This package allows you to write simple code mods. It allows you to transform JSON, Typescript and plain text files.

# Installation

```
npm i -D codemad
```

# Usage

This library is meant to be used as a library inside a node utility. The fluent style API and can be chained. The file matching is provided by the glob utility. See the [glob documentation](https://github.com/isaacs/node-glob) for details on what can be passed into the matcher syntax.

## The API

```typescript
// The JSON object is passed into the callback, it expects a serializable object to be written to disk
mod('some file pattern').asJson(json => {
  //...
});

// The text is given to a callback, return a transformed text to overwrite the original file
mod('some file pattern').asText(text => {
  //...
});

// This mod uses the transformer API from Typescript. Provide a visitor function as a callback
mod('some file pattern').asTypescript(node => {
  //...
});
```

## To modify text

```typescript
import mod from 'codemad';

mod('config.txt').asText(text => {
  return text.replace('hello', 'world');
});
```

## To modify JSON

```typescript
import mod from 'codemad';

interface PackageJson {
  version: string;
}

mod('package.json').asJson((json: PackageJson) => {
  // JSON can be typed
  json.version = '1.0.0'; // Change the JSON
  return json; // Important: be sure to return a serializable JSON
}, 2); // The API also can take in an optional number of spaces for indentation
```

## To modify Typescript

```typescript
import mod from 'codemad';

mod('src/test.ts').asTypescript((node, modder) => {
  if (ts.isExpressionStatement(node)) {
    for (let child of node.getChildren()) {
      if (ts.isCallExpression(child)) {
        return modder.prepend(node, 'console.log("hi");');
      }
    }
  }
});
```

There are several APIs that you can use with the `modder` object:

- `prepend(node: ts.Node, content: string)`
- `append(node: ts.Node, content: string)`
- `replace(node: ts.Node, content: string)`
- `remove(node: ts.Node, content: string)`
- `removeFull(node: ts.Node, content: string)`

The difference between `remove()` and `removeFull()` is that the `removeFull()` version will remove whitespace before and after the node. This is a clean way to remove full statements, for example without leaving whitespace or blank lines in the area of the removed node.
