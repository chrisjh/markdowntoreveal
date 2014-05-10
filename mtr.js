//Markdown to Reveal.js compatible HTML

var fs = require('fs');
var path = require('path');
var args = require('minimist')(process.argv.slice(2));
var argv = args._;

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

function getName(filename) {
	var name = path.basename(filename||'').split('.');
	return name[0];
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
var out = getName(file) + ".html";
console.log(out)
var wstream = fs.createWriteStream(out);

wstream.on('finish', function() {
	console.log('File written.');
})

wstream.write('<!DOCTYPE html>\n<html lang="en">\n\n<head>\n<meta charset="utf-8">\n<title>MarkdownToReveal');
wstream.write('<meta name="description" content="Generated reveal.js friendly HTML from Markdown.">\n<meta name="author" content="James Martin">\n');
wstream.write('<meta name="apple-mobile-web-app-capable" content="yes" />\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />\n');
wstream.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n');
wstream.write('<link rel="stylesheet" href="node_modules/reveal/index.css">\n<link rel="stylesheet" href="node_modules/reveal/theme/default.css" id="theme">\n');
wstream.write('<script>if( window.location.search.match( /print-pdf/gi ) ) {var link = document.createElement( \'link\' );link.rel = \'stylesheet\';link.type = \'text/css\';link.href = \'css/print/pdf.css\';document.getElementsByTagName( \'head\' )[0].appendChild( link );}</script>');//Could be an error





