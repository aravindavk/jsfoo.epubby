
function index_file(data){
    return ['<?xml version="1.0" encoding="UTF-8" ?>',
            '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">',
            '<head>',
            '<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />', 
            '<title>Pride and Prejudice</title>',
            '<link rel="stylesheet" href="css/main.css" type="text/css" />',
            '</head>',
            '<body>',
            data,
            '</body></html>'].join('');    
}

function book_file(){
    return ['<?xml version="1.0"?>',
            '<package version="2.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId">',
            '<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">',
            '<dc:title>Pride and Prejudice</dc:title>',
            '<dc:language>en</dc:language>',
            '<dc:identifier id="BookId" opf:scheme="ISBN">123456789X</dc:identifier>',
            '<dc:creator opf:file-as="Austen, Jane" opf:role="aut">Jane Austen</dc:creator>',
            '</metadata>',
            '<manifest>',
            '<item id="index" href="index.html" media-type="application/xhtml+xml"/>',
            '<item id="stylesheet" href="styles.css" media-type="text/css"/>',
            '<item id="ncx" href="book.ncx" media-type="application/x-dtbncx+xml"/>',
            '</manifest>',
            '<spine toc="ncx">',
            '<itemref idref="index" />',
            '</spine>',
            '<guide>',
            '<reference href="index.html" type="cover" title="Cover"/>',
            '</guide>',
            '</package>'].join('');
}

function book_ncx_file(){
    return ['<?xml version="1.0" encoding="UTF-8"?>',
            '<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN"',
            '"http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">',
            '<ncx version="2005-1" xml:lang="en" xmlns="http://www.daisy.org/z3986/2005/ncx/">',
            '<head>',
            '<meta name="dtb:uid" content="123456789X"/> <!-- same as in .opf -->',
            '<meta name="dtb:depth" content="1"/> <!-- 1 or higher -->',
            '<meta name="dtb:totalPageCount" content="0"/> <!-- must be 0 -->',
            '<meta name="dtb:maxPageNumber" content="0"/> <!-- must be 0 -->',
            '</head>',
            '<docTitle>',
            '<text>Pride and Prejudice</text>',
            '</docTitle>',
            '<docAuthor>',
            '<text>Austen, Jane</text>',
            '</docAuthor>',
            '<navMap>',
            '<navPoint class="chapter" id="index" playOrder="1">',
            '<navLabel><text>Chapter 1</text></navLabel>',
            '<content src="index.html"/>',
            '</navPoint>',
            '</navMap>',
            '</ncx>   '].join('');
}


function container_xml(){
    return ['<?xml version="1.0" encoding="UTF-8" ?>',
            '<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">',
            '<rootfiles>',
            '<rootfile full-path="book.opf" media-type="application/oebps-package+xml"/>',
            '</rootfiles>',
            '</container>   '].join('');
}



exports.index = index_file;
exports.book = book_file;
exports.book_ncx = book_ncx_file;
exports.container_xml = container_xml;