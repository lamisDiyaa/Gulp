const {src,dest,watch,series}=require('gulp')
const htmlmin = require('gulp-htmlmin')


const globs={
    html:"project/*.html",
    css:"project/css/**/*.css",
    js:"project/js/**/*.js",
    img:"project/pics/*"
}




function htmlTask(){
    return src(globs.html)
    .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
    .pipe(dest("dist"))
}
// exports.html=htmlTask
exports.default=htmlTask

var concat=require('gulp-concat')
const cleanCSS=require('gulp-clean-css')
function cssTask(){
    return src(globs.css)
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(dest("dist/assets"))
}
// exports.css=cssTask
exports.default=cssTask


const terser=require("gulp-terser")
function jsTask(){
    return src(globs.js)
    .pipe(concat("script.min.js"))
    .pipe(terser())
    .pipe(dest("dist/assets"))
}
// exports.default=jsTask
exports.js=jsTask


const imgMin=require("gulp-imagemin")
const { watch } = require('browser-sync')
function imgTask(){
    return src(globs.img)
    .pipe(imgMin())
    .pipe(dest("dist/images"))
}
exports.img=imgTask


function watchTask(){
    watch(globs.html,htmlTask)
    watch(globs.css,cssTask)
    watch(globs.js,jsTask)
    watch(globs.img,imgTask)
}
exports.default=series(htmlTask,cssTask,jsTask)
