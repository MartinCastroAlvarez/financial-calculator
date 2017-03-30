var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var jsonminify = require('gulp-jsonminify');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var bower = require('bower');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  images: [
    'src/img/**/*.+(png|jpg|gif|svg|ico)',
    'src/img/*.+(png|jpg|gif|svg|ico)',
  ],
  sass: ['./src/scss/*.scss'],
  fonts: ['src/fonts/**/*'],
  libs: [
    'src/libs/**/**'
  ],
  worker: ['src/js/worker.js'],
  manifest: ['src/manifest.json'],
  angular: [
    'src/js/modules.js',
    'src/js/services/*.js',
    'src/js/config.js',
    'src/js/routes.js',
    'src/js/directives/**/*.js',
    'src/js/controllers/**/*.js',
    'src/js/run.js',
  ],
  templates: [
    'src/js/controllers/**/template.html',
    'src/js/directives/**/template.html',
  ],
  index: ['src/index.html'],
};

/* Run on gulp start */
defaultDependencies = [
  'watch',
]
gulp.task('default', defaultDependencies)

// This task is called 'sass'.
gulp.task('images', function(){
  gulp.src(paths.images)
    .pipe(cache(imagemin({
       interlaced: true
    })))
   .pipe(gulp.dest('www/img/'))
});
gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(concat('style.css'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    // .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('www/'))
    .on('end', done);
});
gulp.task('fonts', function() {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('www/fonts'))
})
gulp.task('libs', function(done) {
  gulp.src(paths.libs)
    // .pipe(uglify())
    // .pipe(concat('libs.js'))
    .pipe(gulp.dest('www/libs/'))
    .on('end', done);
});
gulp.task('angular', function(done) {
  gulp.src(paths.angular)
    .pipe(ngmin({mangle: false}))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('www/'))
    .on('end', done);
});
gulp.task('worker', function(done) {
  gulp.src(paths.worker)
    .pipe(uglify())
    .pipe(gulp.dest('www/'))
    .on('end', done);
});
gulp.task('manifest', function(done) {
  gulp.src(paths.manifest)
    .pipe(jsonminify())
    .pipe(gulp.dest('www/'))
    .on('end', done);
});
gulp.task('templates', function(done) {
  gulp.src(paths.templates)
    .pipe(minifyHTML({
      empty: true
    }))
    .pipe(templateCache('templates.js', {
      module:'templates',
      standalone: true,
      transformUrl: function(url) {
        return url.replace(path.extname(url), '');
      }
    }))
    .pipe(gulp.dest('www/'))
    .on('end', done);
});
gulp.task('index', function(done) {
  gulp.src(paths.index)
    .pipe(minifyHTML({
      empty: true
    }))
    .pipe(gulp.dest('www/'))
    .on('end', done);
});

// Watch when something is changed.
watchDependencies = [
  'angular',
  'templates',
  'fonts',
  'images',
  'libs',
  'index',
  'manifest',
  'worker',
  'sass',
];
gulp.task('watch', watchDependencies, function() {

  gulp.watch(paths.angular, ['angular']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.libs, ['libs']);
  gulp.watch(paths.manfiest, ['manifest']);
  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.worker, ['worker']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.sass, ['sass']);

});

/* Install git on gulp start. */
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
