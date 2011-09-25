# EPubby

epub generator using the given RSS link.

## Install

1. Install nodejs
2. Clone this project
2. Install all the nodejs modules listed in package.json
3. Run `node main.js`

Website will start running in port 8080. http://localhost:8080


## Why

1. Generate ebook and read articles/blog offline in mobile devices/ebook readers.
2. If we generate ebook from webpage the cleaning the content is difficult. Since we directly get the web content in RSS feed, generation of ebook is easy.
3. Some websites provide RSS link for specific tags. We can generate ebook only from those tags and read offline.
4. Faster ebook generation using RSS feed.(Compared to ebook generation by scraping webpages)
5. Change the RSS feed setting in your website to display complete content in RSS and then generate ebook. We can revert the RSS setting to default once ebook generated :) 

## Screenshots

![Homepage](https://github.com/aravindavk/jsfoo.epubby/raw/master/homepage.png)
![Result page](https://github.com/aravindavk/jsfoo.epubby/raw/master/result.png)

## Limitations

1. If RSS feeds have only partial content, then this app may not be useful.
2. If the number of feeds in RSS is limited, it will get only those feeds and creates ebook.

## Issues

1. Validations are not done yet.
2. Crashes after first run :( (RSS parsing library is giving some error)

## TODO

1. Image download code is available, but it is very messy. Have to cleanup the code to download images and update the manifest accordingly.
2. Unicode font embeding is not working. 
3. Navigation menus and Chapter split into new pages.
