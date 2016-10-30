var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var mustache = require('gulp-mustache-plus');
var uglify = require('gulp-uglify');
var uglifyHTML = require('gulp-htmlmin');
var uglifyCSS = require('gulp-uglifycss');
var spawn = require('child_process').spawn;

gulp.task('stylus', function () {
  gulp.src('./stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(uglifyCSS({
      "uglyComments": true
    }))
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
    }))
    .pipe(uglifyHTML({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('../public'));
});

gulp.task('javascript', function() {
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../public/js/'));
});

gulp.task('load', ['stylus', 'mustache', 'javascript'], function() {
  gulp.watch('./stylus/**/*.styl', ['stylus']);
  gulp.watch('./mustache/**/*.mustache', ['mustache']);
  gulp.watch('./js/*.js', ['javascript']);
  gulp.watch('./data/gilabert.json', ['mustache']);
});

gulp.task('watch', function() {
  var process;

  gulp.watch('gulpfile.js', spawnChildren);

  spawnChildren();

  function spawnChildren(error) {
    if (process) {
      process.kill();
    }

    process = spawn('gulp', ['load'], {
      stdio: 'inherit'
    });
  }
});
