import gulp from 'gulp';

import webpackStream from "webpack-stream";
import webpack from "webpack";
import webpackConfig from "./webpack.config";
import notifier from "node-notifier";
import browser from "browser-sync";
import pug from "gulp-pug";
import del from "del";
import rename from "gulp-rename";
import path from "path";
import through2 from "through2";

let jshash;

const APP_ROOT = "app/dist";
const paths = {
  styles: {
    src: "app/src/styles/**/*.scss",
    dest: path.join(APP_ROOT, "css/")
  },
  scripts: {
    src: "app/src/js/**/*.js",
    dest: path.join(APP_ROOT, "js/")
  },
  pugs: {
    src: "app/src/html/**/*.pug",
    exclude: "!app/src/html/**/_*.pug",
    dest: APP_ROOT
  },
  vues: {
    components_src: "app/src/js/components/**/*.vue"
  },
  dels: {
    jsincss: {
      src: path.join(APP_ROOT, "css/**/*.js")
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
    .pipe(pug({
      locals: {
        "hash": jshash,
        "appjsname": `app-${jshash}.js`
      },
    }))
    .pipe(gulp.dest(paths.pugs.dest))
    .pipe(browser.reload({stream:true}));
}


function setJsHashToGlobal(path){
  if(!path){
    return;
  }
  const res = path.match(/app-(.+)\.js$/);
  if(res){
    const _hash = res[1];
    if(_hash){
      jshash = _hash;
      return _hash;
    }
  }
  return;
}
function js2js(){
  // for chunkname
  const chunkname = webpackConfig.js.output.chunkFilename;
  const chunkdirname = "chunk";
  const prefix = path.basename(paths.scripts.dest.replace(APP_ROOT, ""));
  webpackConfig.js.output.chunkFilename = path.join(prefix + "/" + chunkdirname, chunkname);

  return webpackStream(webpackConfig.js, webpack)
    .on('error', webpackJSError)
    .pipe(through2.obj(function (file, enc, cb) {
      setJsHashToGlobal(file.path);
      cb(null, file);
    }))

    // for chunkname
    .pipe(rename(function(path){
      const detect_chunk = new RegExp("^" + prefix + ".*" + chunkdirname);
      if(detect_chunk.test(path.dirname)){
        path.dirname = "./" + chunkdirname;
      }
    }))

    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(through2.obj(function (file, enc, cb) {
      pug2html();
      cb(null, file);
    }))
    .pipe(browser.reload({stream:true}));
}

function sass2css(){
  return webpackStream(webpackConfig.css, webpack)
    .on("error", webpackCSSError)
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browser.reload({stream:true}));
}

function delfile(){
  return del([paths.dels.jsincss.src]);
}

function watch(){
  gulp.watch(paths.pugs.src, pug2html);
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

const build1 = [sass2css, pug2html];
const build2 = [js2js, delfile];
const build = gulp.series(...build1, ...build2);
gulp.task('build', build);

const start = gulp.series(build, gulp.parallel(server, watch));
gulp.task("start", start);

export default start;