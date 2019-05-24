const { src, dest, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const del = require('del');
const runSequence = require('run-sequence');

const dir = {
  dist: 'dist',
  dist_html: 'dist/**',
  src_html: 'src/email-template/**'
};

// Clean output directory
const clean = () => {
  return del([`${dir.dist}/**`, '!' + dir.dist]);
};

const minifyHtml = () => {
  return src(dir.src_html)
      .pipe(htmlmin({
        collapseWhitespace: true,
        processConditionalComments: true,
        minifyCSS: true,
        ignoreCustomFragments: [ (/\<\g\:[^\%]*?\g\/\>/g) ], // This should do the trick
        removeComments: true}))
      .pipe(dest(dir.dist))
};

// Prepares mail to distribution to Mail API.
const prepMail = () => {
  return src(dir.dist_html)
      .pipe(replace('\"', '\\"'))
      .pipe(replace(/\n\s*/g, ''))
      .pipe(dest(dir.dist));
};

exports.clean = clean;
exports.minifyHtml = minifyHtml;
exports.prepMail = prepMail;
exports.build = series(clean, minifyHtml, prepMail);
