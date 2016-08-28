var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var mustache = require('gulp-mustache-plus');

gulp.task('stylus', function () {
  gulp.src('./stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(gulp.dest('../public/css'));
});

gulp.task('mustache', function() {
  gulp.src('./mustache/*.mustache')
    .pipe(mustache('./data/gilabert.json', {}, {
      head: './mustache/partials/head.mustache',
      header: './mustache/partials/header.mustache',
      detail: './mustache/partials/detail.mustache',
      footer: './mustache/partials/footer.mustache'
    })).pipe(gulp.dest('../public'));
});

gulp.task('watch', ['stylus', 'mustache'], function() {
  gulp.watch('./stylus/**/*.styl', ['stylus']);
  gulp.watch('./mustache/**/*.mustache', ['mustache']);
});

gulp.task('default', ['stylus', 'mustache', 'watch']);
