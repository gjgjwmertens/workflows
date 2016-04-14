var gulp = require('gulp'),
   gutil = require('gulp-util'),
   coffee = require('gulp-coffee'),
   browserify = require('gulp-browserify'),
   compass = require('gulp-compass'),
   connect = require('gulp-connect'),
   concat = require('gulp-concat');

var env,
   coffeeSources,
   jsSources,
   sassSources,
   htmlSources,
   jsonSources,
   outputDir,
   sassStyle;

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
   outputDir = 'builds/development/';
   sassStyle = 'expanded';
} else {
   outputDir = 'builds/production/';
   sassStyle = 'compressed';
}

coffeeSources = ['components/coffee/*.coffee'];
jsSources = [
   'components/scripts/rclick.js',
   'components/scripts/pixgrid.js',
   'components/scripts/tagline.js',
   'components/scripts/template.js'
];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];
jsonSources = [outputDir + 'js/*.json'];

gulp.task('coffee', function () {
   gulp
      .src(coffeeSources)
      .pipe(coffee({bare: true})
               .on('error', gutil.log))
      .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function () {
   gulp.src(jsSources)
      .pipe(concat('script.js'))
      .pipe(browserify())
      .pipe(gulp.dest(outputDir + 'js'))
      .pipe(connect.reload())
});

gulp.task('compass', function () {
   gulp.src(sassSources)
      .pipe(compass({
         sass: 'components/sass',
         image: outputDir + 'images',
         style: sassStyle,
         comments: (env == 'development')
      })
               .on('error', gutil.log))
      .pipe(gulp.dest(outputDir + 'css'))
      .pipe(connect.reload())
});

gulp.task('connect', function () {
   connect.server({
      root: outputDir,
      livereload: true
   });
});

gulp.task('watch', function () {
   gulp.watch(coffeeSources, ['coffee']);
   gulp.watch(jsSources, ['js']);
   gulp.watch('components/sass/*.scss', ['compass']);
   gulp.watch('builds/development/*.html', ['html']);
   gulp.watch('builds/development/js/*.json', ['json']);
   gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('default', ['coffee', 'js', 'compass', 'connect', 'watch']);

console.log(env);
