//Markdown to reveal.js

/*Read in a markdown document and convert to a reveal.js file
 Writing a small webserver to serve the file*/

var fs = require('fs'); //File system
var http = require('http'); //Processing HTTP requests
//Tiny webserver based on kentbrew's gist:
//https://gist.github.com/kentbrew/764238

var mime = require('mime');
var path = require('path');
var url = require('url');

var p = {
	"port": 8000,
	"dir": "."
};

var server = http.createServer( function(request, response) {

	var pathname = url.parse(request.url).pathname;
	var filename = path.join(process.cwd(), p.dir, pathname);

	if(!path.extname(filename)) { //No file extension, assume it is a directory
		filename = filename + '/index.html';
	}

	path.exists(filename, function(gotPath) {

		if(!gotPath){ //
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found");
			response.end();
			return;
		}

    response.writeHead(200, {'Content-Type': mime.lookup(filename)});
    
    // Read and pass he file as a stream
    fs.createReadStream(filename, {
      'flags': 'r',
      'encoding': 'binary',
      'mode': 0666,
      'bufferSize': 4 * 1024
    }).addListener( "data", function(chunk) {
      response.write(chunk, 'binary');
    }).addListener( "close",function() {
      response.end();
    });

	});
});

server.listen(p.port);