var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var mustache = require('gulp-mustache-plus');

gulp.task('stylus', function () {
  gulp.src('stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(gulp.dest('../public/css'))
});

gulp.task('mustache', function() {
  gulp.src('mustache/*.mustache')
    .pipe(mustache('data/gilabert.json', {}, {
      head: 'mustache/partials/head.mustache',
      imports: 'mustache/partials/imports.mustache',
      header: 'mustache/partials/head.mustache',
      footer: 'mustache/partials/footer.mustache',
      navigation: 'mustache/partials/navigation.mustache',
      grid: 'mustache/partials/grid.mustache',
      hero: 'mustache/partials/hero.mustache',
      projects: 'mustache/partials/projects.mustache',
      card: 'mustache/partials/card.mustache',
    }))
    .pipe(gulp.dest('../public'))
});

gulp.task('javascript', function() {
  gulp.src('js/*.js')
    .pipe(gulp.dest('../public/js/'))
});

gulp.task('watch', ['stylus', 'mustache', 'javascript'], function() {
  gulp.watch('stylus/**/*.styl', ['stylus']);
  gulp.watch('mustache/**/*.mustache', ['mustache']);
  gulp.watch('js/*.js', ['javascript']);
  gulp.watch('data/gilabert.json', ['mustache']);
});
