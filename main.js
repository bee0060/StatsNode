const http = require('http');
const statNode = require('./stat-node');

http.createServer((request, response) => {
	var rootNode = new statNode(),
		responseText = '';

	rootNode.deepRead(__dirname, rootNode);
	rootNode.waitComplete(function(node) {
		responseText = node.print();

		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		response.write('Current File Structure is:\n');
		response.write(responseText);
		response.end();
	});
	
}).listen(8081);


console.log('Server running at http://127.0.0.1:8081/');