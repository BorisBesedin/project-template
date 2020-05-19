"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync");
const del = require("del");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const webpack = require("webpack-stream");

let dist = './build/';
// let dist = '../../Загрузки/Open Server 5.3.5/OSPanel/domains/notabene/';

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest(`${dist}css`))
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
      ]))
    .pipe(gulp.dest(`${dist}img`));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest(dist));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**",
    "source/*.html"
    ], {
      base: "source"
    })
    .pipe(gulp.dest(dist));
});

gulp.task("build-js", () => {
    return gulp.src("./source/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
    server: dist,
    port: 4000,
    notify: true
    });
    
    gulp.watch("./source/index.html", gulp.parallel("html"));
    gulp.watch("./source/sass/**/*.{scss,sass}", gulp.parallel("css"));
    gulp.watch(["./source/img/**","source/js/**", "source/fonts/**"], gulp.parallel("copy"));
    gulp.watch("./source/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.series(
  "copy",
  "css",
  "html",
  "build-js"
));

gulp.task("start", gulp.series("build", "watch"));