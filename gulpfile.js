var $ = require('gulp-load-plugins')();
var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: ['node_modules/foundation-sites/scss',
        'node_modules/motion-ui']
};

var COMPATIBILITY = [
    'last 2 versions',
    'ie >= 10',
    'and_chr >= 2.3'
];

gulp.task('sass', function () {
    return gulp.src('app/styles/scss/app.scss')
        .pipe($.sass(sassOptions))
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('serve', ['sass'], function () {
    browserSync({
        server: {
            baseDir: ['.', 'app']
        }
    });
    gulp.watch(['**/*.html', 'styles/**/*.scss', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});

gulp.task('default', ['serve'], function () {
    // place code for your default task here
});
