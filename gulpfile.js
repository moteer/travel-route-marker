var $             = require('gulp-load-plugins')();
var gulp          = require('gulp');

//var gulpLoadPlugins = require('gulp-load-plugins');
//var sass = require('gulp-sass');
//var plugins = gulpLoadPlugins(sass);
//plugins.sass = sass;
//console.log(plugins);

var browserSync = require('browser-sync');
var reload = browserSync.reload;

//var sassPaths = [
//  'node_modules/foundation-sites/scss',
//  'node_modules/motion-ui/src'
//];

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

gulp.task('sass', function() {
  return gulp.src('app/styles/scss/app.scss')
      .pipe($.sass(sassOptions))
      .pipe($.sass().on('error', $.sass.logError))
      //.pipe($.autoprefixer({
      //  browsers: COMPATIBILITY
      //}))
    .pipe(gulp.dest('css'));
});

gulp.task('serve', ['sass'], function () {
    browserSync({
        server: {
            baseDir: ['.', 'app']
        }
    });
    gulp.watch(['**/*.html', 'styles/**/*.scss', 'styles/**/*.css', 'scripts/**/*.js'],{cwd: 'app'}, reload);
});

gulp.task('default', function () {
    // place code for your default task here
});



//gulp.task('default', ['sass'], function() {
//  gulp.watch(['scss/**/*.scss'], ['sass']);
//});
