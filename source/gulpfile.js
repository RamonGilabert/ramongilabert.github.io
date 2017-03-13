var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var mustache = require('gulp-mustache-plus');
var uglify = require('gulp-uglify');
var uglifyHTML = require('gulp-htmlmin');
var uglifyCSS = require('gulp-uglifycss');

gulp.task('stylus', function () {
  gulp.src('stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(uglifyCSS({
      "uglyComments": true
    }))
    .pipe(gulp.dest('../public/css'))
});

gulp.task('mustache', function() {
  gulp.src('mustache/*.mustache')
    .pipe(mustache('data/gilabert.json', {}, {
      head: 'mustache/partials/head.mustache',
      imports: 'mustache/partials/imports.mustache',
      header: 'mustache/partials/header.mustache',
      footer: 'mustache/partials/footer.mustache',
      begin: 'mustache/partials/cases/begin.mustache',
      end: 'mustache/partials/cases/end.mustache',
      image: 'mustache/partials/cases/image.mustache',
      title: 'mustache/partials/cases/title.mustache',
      subtitle: 'mustache/partials/cases/subtitle.mustache',
      visually: 'mustache/partials/cases/visually.mustache',
      quote: 'mustache/partials/cases/quote.mustache',
      text: 'mustache/partials/cases/text.mustache'
    }))
    .pipe(uglifyHTML({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('../public'))
});

gulp.task('javascript', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../public/js/'))
});

gulp.task('watch', ['stylus', 'mustache', 'javascript'], function() {
  gulp.watch('stylus/**/*.styl', ['stylus']);
  gulp.watch('mustache/**/*.mustache', ['mustache']);
  gulp.watch('js/*.js', ['javascript']);
  gulp.watch('data/gilabert.json', ['mustache']);
});
