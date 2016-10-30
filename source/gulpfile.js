var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var mustache = require('gulp-mustache-plus');
var uglify = require('gulp-uglify');

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
      loader: './mustache/partials/loader.mustache',
      detail: './mustache/partials/detail.mustache',
      explanation: './mustache/partials/explanation.mustache',
      footer: './mustache/partials/footer.mustache'
    })).pipe(gulp.dest('../public'));
});

gulp.task('minify', function() {
  gulp.src('../public/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('../public/js/'));
});

gulp.task('watch', ['stylus', 'mustache', 'minify'], function() {
  gulp.watch('./stylus/**/*.styl', ['stylus', 'minify']);
  gulp.watch('./mustache/**/*.mustache', ['mustache', 'minify']);
  gulp.watch('./gulpfile.js', ['mustache', 'stylus', 'minify']);
  gulp.watch('./data/gilabert.json', ['mustache', 'stylus']);
});

gulp.task('default', ['stylus', 'mustache', 'minify', 'watch']);
