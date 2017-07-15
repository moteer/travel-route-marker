var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');

const DIST = 'dist';
const NODE_MODULES = 'libs';

gulp.task('html', () => {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest(DIST));
});

gulp.task('css', () => {
    gulp.src('app/**/*.css')
        .pipe(gulp.dest(DIST));
});

gulp.task('js', () => {
    gulp.src(['app/**/*.js', 'app/**/*spec.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(DIST));
});

gulp.task('libs', () => {
    gulp.src('node_modules/angular/angular.js')
        .pipe(gulp.dest(DIST + '/' + NODE_MODULES));
    gulp.src('node_modules/angular-route/angular-route.js')
        .pipe(gulp.dest(DIST + '/' + NODE_MODULES));
});

gulp.task('browser-reload', () => {
    browserSync.reload();
});

gulp.task('serve', () => {
    browserSync({
        server: {
            baseDir: ['.', DIST]
        }
    });
    gulp.watch('app/**/*.html', ['html', 'browser-reload']);
    gulp.watch('app/**/*.css', ['css', 'browser-reload']);
    gulp.watch('app/**/*.js', ['js', 'browser-reload']);
});

gulp.task('default', ['html', 'js', 'css', 'libs', 'serve'], () => {

});
