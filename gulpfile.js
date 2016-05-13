var gulp = require('gulp');
var webserver = require('gulp-webserver');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
 
gulp.task('templates', function() {
  gulp.src('*.jade')
  	.pipe(jade())
    .pipe(gulp.dest(''));
});

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      host: 'localhost',
  		port: '8001',
    	livereload: true,
 			open: true,
      fallback: 'index.html'
    }));
});

gulp.task('scripts', function() {

  // compile vendor js
  gulp.src([
    'bower_components/jquery/dist/jquery.js', 
    'bower_components/reveal.js/js/reveal.js' 
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('scripts/dist/'));

  // compile unique js
  gulp.src(['scripts/js/presentation.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('scripts/dist/'));
  
});

gulp.task('styles', function() {
  return gulp
    .src('scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/'));
});

gulp.task('default', function() {
  gulp.watch('sass/*.scss', ['styles']);
  gulp.watch(['templates', 'webserver', 'scripts']);
});