var http = require("http");
var url = require("url");
var qs = require("querystring");
var staticfiles = require('node-static');
var request = require('request');
var epubby = require("./generate_epub");
var fs = require("fs");
var mustache = require("./static/mustache");

function serve_epub(req, res){
    var file = new(staticfiles.Server)(__dirname);
    file.serve(req, res);
}
function render(req, res){
    fs.readFile(__dirname + '/templates/index.html', function(err, main_template){
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(mustache.to_html(main_template.toString(), {"title":"EPubby"}));
                });                        
                    
}


http.createServer(function(req, res){
                      //console.log(req.connection.remoteAddress + " " + req.method + " " + req.url + " " + req.headers['user-agent']);
                      var params = {};
                      var full_url = url.parse( req.url, true ) ;
                      var pathname = full_url.pathname ;
                      var q_params = full_url.query ;
                      var op = "";

                      if (pathname.match(/\/generate\/?/i)) {
                          epubby.init(req, res, q_params);
                      }
                      else if (pathname.match(/\/files\/?/i)) {
                          serve_epub(req, res, q_params);
                      }
                      else if (pathname.match(/\/static\/?/i)) {
                          serve_epub(req, res, q_params);
                      }
                      else {
                          render(req, res);
                      }

                  }).listen(8080);