import gulp from 'gulp';

import webpackStream from "webpack-stream";
import webpack from "webpack";
import webpackConfig from "./webpack.config";
import notifier from "node-notifier";
import browser from "browser-sync";
import pug from "gulp-pug";
import del from "del";
import rename from "gulp-rename";

const paths = {
  styles: {
    src: "app/src/styles/**/*.scss",
    dest: "app/dist/css/"
  },
  scripts: {
    src: "app/src/js/**/*.js",
    dest: "app/dist/js/"
  },
  pugs: {
    src: "app/src/html/**/*.pug",
    exclude: "!app/src/html/**/_*.pug",
    dest: "app/dist/"
  },
  vues: {
    src: "app/src/vue/components/**/*.pug", 
    exclude: "!app/src/vue/components/**/_*.pug",
    dest: "app/src/js/vuecomponents/",
    components_src: "app/src/js/**/*.vue"
  },
  dels: {
    jsincss: {
      src: "app/dist/css/**/*.js"
    },
    vuecomponents: {
      src: "app/src/js/vuecomponents/**/*.vue"
    }
  }
};

function errorHandler(error) {
  var message;
  if(error.message){
    message =  error.message;
  }else{
    message = error;
  }
  notifier.notify({
    title: 'Error occurred in gulp or Webpack processing.',
    wait: true,
    timeout: 30,
    message: message,
  }, function () {
    console.log(error);
  });
}

function webpackJSError(){
  errorHandler("Webpack Error : JS");
  this.emit("end");
}

function webpackCSSError(){
  errorHandler("Webpack Error : CSS / SCSS");
  this.emit("end");
}

function pug2html(){
  return gulp.src([paths.pugs.src, paths.pugs.exclude])
    .pipe(pug())
    .pipe(gulp.dest(paths.pugs.dest))
    .pipe(browser.reload({stream:true}));
}

function pug2vue(){
  return gulp.src([paths.vues.src, paths.vues.exclude])
    .pipe(pug())
    .pipe(rename(function(path){
      path.extname = ".vue";
    }))
    .pipe(gulp.dest(paths.vues.dest));
}

function js2js(){
  return webpackStream(webpackConfig.js, webpack)
    .on('error', webpackJSError)
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browser.reload({stream:true}));
}

function sass2css(){
  return webpackStream(webpackConfig.css, webpack)
    .on("error", webpackCSSError)
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browser.reload({stream:true}));
}

function delfile(){
  return del([paths.dels.jsincss.src, paths.dels.vuecomponents.src]);
}

function watch(){
  gulp.watch(paths.pugs.src, pug2html);
  gulp.watch(paths.vues.src, pug2vue);
  gulp.watch(paths.vues.components_src, js2js);
  gulp.watch(paths.scripts.src, js2js);
  gulp.watch(paths.styles.src, sass2css);
  gulp.watch(paths.dels.jsincss.src, delfile);
}

function server(){
  return browser({
    server:{
      baseDir: "./app/dist/",
      index: "index.html"
    },
    port: 3000,
    browser: "chrome"
  });
}

const build1 = [sass2css, pug2html, pug2vue];
const build2 = [js2js, delfile];
const build = gulp.series(...build1, ...build2);
gulp.task('build', build);

const start = gulp.series(build, gulp.parallel(server, watch));
gulp.task("start", start);

export default start;