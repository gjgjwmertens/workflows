var gulp = require('gulp'),
   gutil = require('gulp-util'),
   coffee = require('gulp-coffee'),
   browserify = require('gulp-browserify'),
   concat = require('gulp-concat');

var coffeeSources,
   jsSources,
   outputDir,
   sassStyle;

coffeeSources = ['components/coffee/*.coffee'];
jsSources = [
   'components/scripts/rclick.js',
   'components/scripts/pixgrid.js',
   'components/scripts/tagline.js',
   'components/scripts/template.js'
];

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
   outputDir = 'builds/development/';
   sassStyle = 'expanded';
} else {
   outputDir = 'builds/production/';
   sassStyle = 'compressed';
}

gulp.task('coffee', function () {
   gulp
      .src(coffeeSources)
      .pipe(coffee({bare: true})
               .on('error', gutil.log))
      .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function () {

   gulp.task('js', function () {
      gulp.src(jsSources)
         .pipe(concat('script.js'))
         .pipe(browserify())
         .pipe(gulp.dest(outputDir + 'js'))
   });

})