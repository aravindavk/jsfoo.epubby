var zipper = require('zipper').Zipper;
var fs = require("fs");
var request = require('request');
var jsdom = require('jsdom');
var sys = require('sys');
var rss = require(__dirname + '/lib/node-rss/node-rss');
var file_tmpl = require(__dirname + '/support_files');

var myfiles = [{"name" : __dirname + "/tmp/mimetype", "path": "mimetype"}, 
               {"name" : __dirname + "/tmp/styles.css", "path": "styles.css"},
               {"name" : __dirname + "/tmp/Lohit-Kannada.ttf", "path": "Lohit-Kannada.ttf"}];
var NO_IMAGES = true;

// Given all the filename, generates epub and updates the link to the client
function generate_epub_file(epubname, myfiles, req, res, params){
    var dte = new Date().getTime();
    var fname = epubname.replace(" ", "_").toLowerCase() + "_" + dte + ".epub";
    var zipfile = new zipper(__dirname + "/files/" + fname);

    var l = myfiles.length;

    function add_file_to_zip(i) {
        zipfile.addFile(myfiles[i].name, myfiles[i].path, function (err) {
                            if (err) throw err;
                            if (i+1 < l) {
                                add_file_to_zip(i+1);
                            }
                            else{
                                res.writeHead(200, {'Content-Type': 'application/json'});
                                res.end('{"ok" : true, "val" : "File generated, <a href=\\"/files/' + fname + '\\">Click here</a> to download"}');
                            }
                        });

    }
    add_file_to_zip(0);
}

function generate_supporting_files(req, res, params){
    fs.writeFile("tmp/container.xml", file_tmpl.container_xml(), function(){
                     myfiles.push({"name":__dirname + "/tmp/container.xml", "path": "META-INF/container.xml"});
                     myfiles.push({"name":__dirname + "/tmp/book.opf", "path": "book.opf"});
                     myfiles.push({"name":__dirname + "/tmp/book.ncx", "path": "book.ncx"});
                     fs.writeFile(__dirname + "/tmp/book.opf", file_tmpl.book(params.author, params.title), function(){
                                      fs.writeFile(__dirname + "/tmp/book.ncx", file_tmpl.book_ncx(params.author, params.title), function(){
                                                       generate_epub_file(params.title, myfiles, req, res, params); 
                                                   });
                                  });
                 });
}

function content_file(data, images_list, req, res, params) {
    var file_data = file_tmpl.index(data);
    fs.writeFile(__dirname + "/tmp/index.html", file_data, function (err) {
                     if (err) throw err;
                     myfiles.push({"name":__dirname + "/tmp/index.html", "path": "index.html"});
                     download_images(images_list, req, res, params);
                 });
}

function download_images(images_list, req, res, params){
    var l = images_list.length;

    if (NO_IMAGES) {
        generate_supporting_files(req, res, params);
        return;
    }
    function save_images(i) {
        var opts = {
            "url" : images_list[i],
            "json" : false
        };
        request(opts, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        // res.writeHead(200, {'Content-Type': 'application/json'});
                        var imagename = images_list[i].replace('http://','').replace(/^.*\//, '_');
                        fs.writeFile(__dirname +  "/tmp/" + imagename, body, function(err){
                                         if (err) throw err;
                                         myfiles.push({"name":__dirname +  "/tmp/" + imagename, "path": imagename});
                                         if (i+1 < l) {
                                             save_images(i+1);
                                         }
                                         else{
                                             generate_supporting_files(req, res, params);
                                         }
                                     });
                    }

                });
    }
    save_images(0);
}

function extract_data(articledata, req, res, params) {
    var clean_html_data = [];
    var images_list = [];

    jsdom.env({
                  html: articledata.join(''),
                  scripts: [
                      __dirname + '/static/jquery-1.5.js'
                  ]
              },
              function (err, window) {
                  var $ = window.jQuery;

                  var html_data = "";
                  // //find each 'item' in the file and parse it
                  $("img").each(function(k,v){
                                    var img_path = $(v).attr("src");
                                    var url = params.url.split("/")[0];
                                    if (img_path.match(/^http/)) {
                                        images_list.push(img_path);
                                    }
                                    else {
                                        images_list.push("http://" + url + img_path);
                                    }
                                    var imagename = img_path.replace('http://','').replace(/^.*\//, '_');
                                    $(this).attr("src", imagename);
                                });

                  //put that feed content on the screen!
                  $(".entry").each(function(k, v){
                                       clean_html_data.push($(v).html());
                                   });
                  content_file(clean_html_data.join(''), images_list, req, res, params);
              });
}

function epubby_init(req, res, params){

    var options = {
        url: params.url,
        title : params.title,
        author : params.author,
        json: false
    };
    
    var response = rss.parseURL("http://" + params.url, function(articles) {
                                        var html_data = [];
                                        for(var i=articles.length-1; i>=0; i--) {
                                            var html = '<div class="entry" id="' + articles[i].title + '"><h1>' + articles[i].title + '</h1>';
                                            html += '<div class="content">' + articles[i].content + '</div></div>';
                                            
                                            html_data.push(html);
                                        }
                                        extract_data(html_data, req, res, params);
                                    });
        
}

exports.init = epubby_init;