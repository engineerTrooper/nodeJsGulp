const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('sass');

const debug = require('gulp-debug');  //debug rule if debug should be shown

var originSass = "../assets/sass/**/[^_]*.sass";       // ' [^_] ' exclude all files to render that start with an underscore  
var originScss = "../assets/sass/**/[^_]*.scss";
var destination = "../assets/css/";
var destinationUncompressed = "../assets/uncompressed/css";


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

exports.ScssToCss = ScssToCss;
exports.SassToCss = SassToCss;
exports.ScssToCssUncompressed = ScssToCssUncompressed;
exports.SassToCssUncompressed = SassToCssUncompressed;
exports.watch = function () {
    gulp.watch(originScss, gulp.series('ScssToCss'));
    gulp.watch(originSass, gulp.series('SassToCss'));
    gulp.watch(originScss, gulp.series('ScssToCssUncompressed'));
    gulp.watch(originSass, gulp.series('SassToCssUncompressed'));
};
