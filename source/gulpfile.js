var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var mustache = require('gulp-mustache-plus');

gulp.task('stylus', function () {
  gulp.src('./stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(gulp.dest('../css'));
});

gulp.task('mustache', function() {
  gulp.src('./mustache/*.mustache')
    .pipe(mustache('./data/gilabert.json', {}, {
      head: './mustache/partials/head.mustache',
      header: './mustache/partials/header.mustache',
      loader: './mustache/partials/loader.mustache',
      detail: './mustache/partials/detail.mustache',
      explanation: './mustache/partials/explanation.mustache',
      footer: './mustache/partials/footer.mustache'
    })).pipe(gulp.dest('../'));
});

gulp.task('watch', ['stylus', 'mustache'], function() {
  gulp.watch('./stylus/**/*.styl', ['stylus']);
  gulp.watch('./gulpfile.js', ['mustache', 'stylus']);
  gulp.watch('./mustache/**/*.mustache', ['mustache']);
  gulp.watch('./data/gilabert.json', ['mustache', 'stylus']);
});

gulp.task('default', ['stylus', 'mustache', 'watch']);
