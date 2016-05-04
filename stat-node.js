function StatsNode(name) {
	const fs = require("fs");

	var subNodes = [];
	var nodeName = name || '';
	var readCount = 0;

	this.getName = function() {
		return nodeName;
	};

	this.addSubNode = function(node) {
		subNodes.push(node);
	};

	this.startRead = function() {
		readCount++;
	};

	this.endRead = function() {
		readCount--;
	};

	this.readComplete = function() {
		return readCount === 0;
	};

	this.deepRead = function(rootPath, rootNode) {
		var currentPath = rootPath + (nodeName ? '\\' + nodeName : '');
		var self = this;

		rootNode.startRead();

		fs.stat(currentPath, function(err, stats) {
			if (err) {
				return console.error('error on read stat', currentPath, nodeName);
			}

			if (stats.isDirectory() && nodeName !== 'node_modules' && nodeName !== '.git') {
				fs.readdir(currentPath, function(err, files) {
					if (err) {
						return console.error('error on read dir', err);
					}

					files.forEach(function(file) {
						var subNode = new StatsNode(file);

						self.addSubNode(subNode);
						subNode.deepRead(currentPath, rootNode);
					});

					rootNode.endRead();
				});
			} else {
				rootNode.endRead();
			}

		});
	};

	this.waitComplete = function(callback) {
		var self = this;

		setTimeout(function() {
			if (self.readComplete()) {
				if (typeof callback === 'function') {
					callback(self);
				}
			} else {
				self.waitComplete(callback);
			}
		}, 10);
	};

	this.print = function(prefix) {
		var structurePrefix = prefix || '|-',
			newLine = '\n',
			result = structurePrefix + nodeName + newLine;

		subNodes.forEach(function(node) {
			result += node.print('  ' + structurePrefix);
		});

		return result;
	};
}

module.exports = StatsNode;