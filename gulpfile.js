var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: ['.', 'app']
        }
    });
    gulp.watch(['*.jsp', '*.html', 'styles/**/*.css', 'scripts/**/*.js'],{cwd: 'app'}, reload);
});

gulp.task('default', function () {
    // place code for your default task here
});
