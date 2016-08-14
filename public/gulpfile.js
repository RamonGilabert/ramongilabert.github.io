var gulp = require('gulp');
var mustache = require('gulp-mustache-plus');

// Gulp Mustache Task
gulp.task('mustache', function() {
    gulp.src("./mustache/*.mustache")
        .pipe(mustache({},{},{
            file_1: "partials/*.mustache"
        })).pipe(gulp.dest("./"));
});

gulp.task('default', ['mustache'], function () {
    gulp.watch('./mustache/{,*/}*.{mustache}', ['mustache']);
});
