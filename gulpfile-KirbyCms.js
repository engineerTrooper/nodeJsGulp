const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('sass');
const minify = require("gulp-minify");

const debug = require('gulp-debug');  //debug rule if debug should be shown

var originSass = "../assets/sass/**/[^_]*.sass";       // ' [^_] ' exclude all files to render that start with an underscore  
var originScss = "../assets/sass/**/[^_]*.scss";
var originScssCookiePlugin = "../site/plugins/kirby3-cookie-banner/src/**/[^_]*.scss";
var originJsCookiePlugin = "../site/plugins/kirby3-cookie-banner/src/**/[^_]*.js";
var destination = "../assets/css/";
var destinationUncompressed = "../assets/uncompressed/css";
var destinationCookiePlugin = "../site/plugins/kirby3-cookie-banner/assets";
var destinationCookiePluginUncompressed = "../site/plugins/kirby3-cookie-banner/src/uncompressed";

//diabled because there is an issue with the origin js code (2022-04-12)
// function minifyjs() {
//     return (
//         gulp
//             .src(originJsCookiePlugin, { allowEmpty: true }) 
//             .pipe(minify({
//                 ext: {
//                     min: '.js' // Set the file extension for minified files to just .js
//                 },
//                 noSource: true // Don’t output a copy of the source file
//             }))
//             .pipe(gulp.dest(destinationCookiePlugin))
//     );
// }

function ScssToCss() {
    return(
        gulp
            .src(originScss)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .on('error', sass.logError)
            .pipe(gulp.dest(destination))
    );
};

function ScssToCssUncompressed() {
    return(
        gulp
            .src(originScss)
            .pipe(sass().on('error', sass.logError))
            .on('error', sass.logError)
            .pipe(gulp.dest(destinationUncompressed))
    );
};

function SassToCss() {
    return(
        gulp
            .src(originSass)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .on('error', sass.logError)
            .pipe(gulp.dest(destination))
    );
};

function SassToCssUncompressed() {
    return(
        gulp
            .src(originSass)
            .pipe(sass().on('error', sass.logError))
            .on('error', sass.logError)
            .pipe(gulp.dest(destinationUncompressed))
    );
};

//Cookie Plugin
function ScssToCssCookiePlugin() {
    return(
        gulp
            .src(originScssCookiePlugin)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .on('error', sass.logError)
            .pipe(gulp.dest(destinationCookiePlugin))
    );
};

function ScssToCssCookiePluginUncompressed() {
    return(
        gulp
            .src(originScssCookiePlugin)
            .pipe(sass().on('error', sass.logError))
            .on('error', sass.logError)
            .pipe(gulp.dest(destinationCookiePluginUncompressed))
    );
};

// exports.minifyjs = minifyjs;
exports.ScssToCss = ScssToCss;
exports.SassToCss = SassToCss;
exports.ScssToCssUncompressed = ScssToCssUncompressed;
exports.SassToCssUncompressed = SassToCssUncompressed;
exports.ScssToCssCookiePlugin = ScssToCssCookiePlugin;
exports.ScssToCssCookiePluginUncompressed = ScssToCssCookiePluginUncompressed;
exports.watch = function () {
    // gulp.watch(originJsCookiePlugin, gulp.series('minifyjs'));
    gulp.watch(originScss, gulp.series('ScssToCss'));
    gulp.watch(originSass, gulp.series('SassToCss'));
    gulp.watch(originScss, gulp.series('ScssToCssUncompressed'));
    gulp.watch(originSass, gulp.series('SassToCssUncompressed'));
    gulp.watch(originScssCookiePlugin, gulp.series('ScssToCssCookiePlugin'));
    gulp.watch(originScssCookiePlugin, gulp.series('ScssToCssCookiePluginUncompressed'));
};
