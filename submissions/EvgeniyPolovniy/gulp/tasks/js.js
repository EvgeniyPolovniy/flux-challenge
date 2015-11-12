var gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat'),
  babelify = require('babelify'),
  config = require('../config');

gulp.task('js', function () {
  return gulp.src(config.files.js.base, { read: false })
    .pipe(browserify({
      transform: ['babelify']
    })).on('error', log)
    .pipe(concat(config.files.js.name)).on('error', log)
    .pipe(gulp.dest(config.files.js.buildFolder)).on('error', log);
});

function log(error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}