# StatsNode
Use nodejs lib to recursive read directory tree


##Usage

```js
const statNode = require('./stat-node');
var rootNode = new statNode();

rootNode.deepRead(__dirname, rootNode);
rootNode.waitComplete(function(node) {
  // do something
  var stringify = node.print();
});
```


This will take a directory tree:
```
|-
  |-.git
  |-.gitignore
  |-node_modules
  |-package.json
  |-README.md
  |-stat-main.js
  |-stat-src
    |-stat-node.js
```

