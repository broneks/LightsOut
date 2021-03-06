var gulp    = require('gulp');
var path    = require('path');
var plumber = require('gulp-plumber');
var watch   = require('gulp-watch');
var scss    = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var jshint  = require('gulp-jshint');
var uglify  = require('gulp-uglify');
var shell   = require('gulp-shell');

var jshintConfig = {
  strict    : true,
  unused    : true,
  eqeqeq    : true,
  lastsemic : true,
  indent    : 2,
};

gulp.task('scss', function() {
  gulp.src('./scss/main.scss')
    .pipe(plumber())
    .pipe(scss({
      includePaths: bourbon,
      outputStyle: 'compressed' //'nested'
    }))
    .pipe(gulp.dest('./game/css'));
});

gulp.task('jshint', function() {
  gulp.src('./src/**/*.js')
    .pipe(plumber())
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('default'), {
      verbose: true
    });
});

gulp.task('uglify', function() {
  gulp.src('./node_modules/requirejs/require.js')
    .pipe(plumber())
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('./game/js'));
});

gulp.task('build', shell.task([
  './node_modules/requirejs/bin/r.js -o ./build.js'
]));

gulp.task('watch', function() {
  gulp.watch([
    './scss/**/*.scss'
  ], ['scss']);

  gulp.watch([
    './src/**/*.js',
    '!./game/lib/**/*.js'
  ], ['build', 'jshint']);
});

gulp.task('default', [
  'uglify',
  'build',
  'watch'
]);
