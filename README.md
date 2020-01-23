# eslint-plugin-no-memo-displayname

Eslint plugin that helps to improve debugging components wrapped by `React.memo()`

## Motivation

![alt text](https://raw.githubusercontent.com/patrykkopycinski/eslint-plugin-no-memo-displayname/master/assets/anonymous-memo.png "motivation")


### Bad

```js
const ReactMemoComponent = () => null;
const ReactMemo = React.memo(ReactMemoComponent);
ReactMemo.displayName = "ReactMemo";

const ReactMemoComponent = React.memo(() => null);
ReactMemoComponent.displayName = "ReactMemoComponent";

const ReactMemoTSComponent = React.memo < {} > (() => null);
ReactMemoTSComponent.displayName = "ReactMemoTSComponent";
```

### Good

```js
const ReactMemoComponent = () => null;
ReactMemoComponent.displayName = "ReactMemoComponent";
const ReactMemo = React.memo(ReactMemoComponent);

// if don't specify displayName it will inherit name from the variable
const ReactMemoComponent = () => null;
const ReactMemo = React.memo(ReactMemoComponent);

// or function name
const ReactMemoComponent = React.memo(function ReactMemoComponent() {
  return null;
});
```

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-no-memo-displayname`:

```
$ npm install eslint-plugin-no-memo-displayname --save-dev
```

If you want to make sure that all your components have proper `displayName` I highly recommend to use [react/display-name](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md) rule from [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react).

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-no-memo-displayname` globally.


## LICENSE

MIT
