//Markdown to Reveal.js compatible HTML

var fs = require('fs');
var path = require('path');

var args = require('minimist')(process.argv.slice(2));
var argv = args._;

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

//Args incorrect length / non-markdown file passed / help flag set in command line argument
if(argv.length != 1 || getExtension(argv[0]).toLowerCase() != "md" || args.h || args.v){
	//console.log(args)
	if(args.h){ //Help flag set to true. Need some more robust help message
		console.log("MarkdownToReveal requires a path to a file with a .md extension.");
	}else if(args.v){
		console.log("MarkdownToReveal v0.0.1");
	}else{
		console.log("Incorrect number of arguments. Passed: " + argv.length + ", expected only one.");
		console.log("For help, use the flag -h");
	}
	return;
}

//If still here, we have a correct command line argument specifying a path to a markdown file.
var file = argv[0] //for easier use
