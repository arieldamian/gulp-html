var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var del = require('del');
var runSequence = require('run-sequence');

var dir = {
  dist: 'dist',
  dist_html: 'dist/**',
  src_html: 'src/email-template/**'
};

// Clean output directory
gulp.task('clean', function() {
  return del.sync(dir.dist);
});

gulp.task('minifyHtml', function() {
  return gulp.src(dir.src_html)
      .pipe(htmlmin({
        collapseWhitespace: true,
        processConditionalComments: true,
        minifyCSS: true,
        ignoreCustomFragments: [ (/\<\g\:[^\%]*?\g\/\>/g) ], // This should do the trick
        removeComments: true}))
      .pipe(gulp.dest(dir.dist))
});

// Prepares mail to distribution to Mail API.
gulp.task('prepMail', function() {
  return gulp.src(dir.dist_html)
      .pipe(replace('\"', '\\"'))
      .pipe(gulp.dest(dir.dist));
});

// builders
gulp.task('build', function (callback) {
  runSequence(
      'clean', 'minifyHtml', 'prepMail', callback
  );
});
