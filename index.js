'use strict';

const fs = require('fs');
const yargs = require('yargs');
const request = require('request');

const js_beautify = require("./beautify").js_beautify;

const raw = `let foobar= async res => {console.log('>>', res);
return +new Date; }`;

const argv = yargs
    .detectLocale(true)
    .usage('Usage: jsformat [options] file/url')
    .option('indent_size', {
        default: 4,
        description: 'indentation size',
        type: 'number'
    })
    .option('indent_char', {
        default: ' ', // whitespace
        description: 'character to indent with',
        type: 'string'
    })
    .option('preserve_newlines', {
        default: true,
        description: 'whether existing line breaks should be preserved',
        type: 'boolean'
    })
    .option('max_preserve_newlines', {
        default: 0,
        description: 'maximum number of line breaks to be preserved in one chunk, ZERO means unlimited',
        type: 'number'
    })
    .option('jslint_happy', {
        default: false,
        description: 'if true, then jslint-stricter mode is enforced',
        type: 'boolean'
    })
    .option('brace_style', {
        default: 'collapse',
        description: `("collapse" | "expand" | "end-expand") put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line.`,
        type: 'string'
    })
    .option('space_before_conditional', {
        default: true,
        description: `should the space before conditional statement be added, "if(true)" vs "if (true)"`,
        type: 'boolean'
    })
    .option('unescape_strings', {
        default: false,
        description: `should printable characters in strings encoded in \\xNN notation be unescaped, "example" vs "\\x65\\x78\\x61\\x6d\\x70\\x6c\\x65"`,
        type: 'boolean'
    })
    .option('wrap_line_length', {
        default: 0,
        description: 'lines should wrap at next opportunity after this number of characters, ZERO means unlimited',
        type: 'number'

    })
    .option('output', {
        description: 'write the beautified source code to file',
        type: 'string'
    })
    .argv;

yargs.showHelp();


function is_url(uri) {
    return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(uri);
}
