var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');
var size = require('gulp-size');
var copy = require('gulp-copy');
var pages = require('gulp-gh-pages');

var dist = 'dist';

gulp.task('clean', function(){
  return gulp.src([dist, '.publish'])
    .pipe(clean());
});

gulp.task('js', ['clean'], function(){
  return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(`${dist}/js`));
});

gulp.task('css', ['clean'], function(){
  return gulp.src('./css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest(`${dist}/css`));
});

gulp.task('font', ['clean'], function(){
  return gulp.src('./font/*')
    .pipe(gulp.dest(`${dist}/font`));
});

gulp.task('html', ['clean'], function(){
  return gulp.src('./*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('build', ['js', 'css', 'font', 'html'], function(){
  return gulp.src(`${dist}/**/*`)
    .pipe(size({title: 'build', gzip: true}));
});

gulp.task('deploy', ['build'], function(){
  return gulp.src(`${dist}/**/*`)
    .pipe(pages());
});

gulp.task('default', ['build']);