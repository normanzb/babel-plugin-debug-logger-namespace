# babel-plugin-logger-namespace

Babel plugin that generates the namespace for creating a logger based on the path of the module.

E.g. for file src/test/module.js
```js
import debug from 'debug'

const log = debug(NAMESPACE)
```

And outputs code compatible with CommonJS

```js
const log = debug('src:test:module')
```

## Installation

```javascript
npm install --save-dev babel-plugin-logger-namespace
```

After the plugin is installed, configure it in babel config file

```
  "plugins": [
    "babel-plugin-logger-namespace"
  ]
```

## Plugin Options

* placeholder?: The placeholder that will be replaced with the module name. Default is `NAMESPACE`.
* stripPrefix?: Remove specified prefix from the resulting namespace. You can set multiple of them by separating each item with a `|`. e.g. `foo:|bar:` will remove both foo and bar from the prefix.
* prefix?: Add specified prefix to the resulting namespace
* stripSubfix?: Remove specified subfix from the resulting namespace. Same as `stripPrefix`, it supports multiple subfixes that separated by `|`.
