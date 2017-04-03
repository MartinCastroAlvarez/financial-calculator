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
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var gulpif = require('gulp-if');

var paths = {
    splash: [
        'src/img/icon.psd',
        'src/img/splash.psd',
    ],
    images: [
        'src/img/**/*.+(png|jpg|gif|svg|ico)',
        'src/img/*.+(png|jpg|gif|svg|ico)',
    ],
    sass: [
        'src/libs/*.css',
        'src/libs/*.scss',
        'src/libs/**/*.css',
        'src/libs/**/*.scss',
        'src/scss/ionic.scss',
        'src/scss/*[!ionic].scss',
    ],
    fonts: [
        'src/fonts/*',
    ],
    libs: [
        'src/ionic/**',
    ],
    worker: ['src/js/worker.js'],
    manifest: ['src/manifest.json'],
    angular: [
        'src/libs/**/*.js',
        'src/libs/*.js',
        'src/js/modules.js',
        'src/js/main.js',
        'src/js/services/*.js',
        'src/js/config.js',
        'src/js/routes.js',
        'src/js/directives/**/*.js',
        'src/js/controllers/**/*.js',
        'src/js/run.js',
    ],
    templates: [
        'src/js/controllers/**/*.html',
        'src/js/directives/**/*.html',
        'src/js/templates/*.html',
    ],
    index: [
        'src/index.html'
    ],
};

/* Run on gulp start */
defaultDependencies = [
  'watch',
]
gulp.task('default', defaultDependencies)

// Compress all types of files.
gulp.task('images', function(){
  return gulp.src(paths.images)
             .pipe(cache(imagemin({
               interlaced: true
             })))
             .pipe(gulp.dest('www/img/'))
});
gulp.task('splash', function(){
  return gulp.src(paths.splash)
             .pipe(cache(imagemin({
               interlaced: true
             })))
             .pipe(gulp.dest('resources/'))
});
gulp.task('sass', function(done) {
  return gulp.src(paths.sass)
             .pipe(gulpif(['*.scss'], sass()))
             //.on('error', sass.logError)
             .pipe(minifyCSS({
               keepSpecialComments: 0
             }))
             .pipe(concat('style.css'))
             // .pipe(rename({extname: '.min.css'}))
             .pipe(gulp.dest('www/'));
});
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
             .pipe(gulp.dest('www/fonts'))
})
gulp.task('libs', function(done) {
  return gulp.src(paths.libs, {base: "src/"})
             .pipe(gulp.dest('www/'));
});
gulp.task('angular', function(done) {
  return gulp.src(paths.angular)
             .pipe(ngmin({mangle: false}))
             .pipe(uglify())
             .pipe(concat('app.js'))
             .pipe(gulp.dest('www/'));
});
gulp.task('worker', function(done) {
  return gulp.src(paths.worker)
             .pipe(uglify())
             .pipe(gulp.dest('www/'));
});
gulp.task('manifest', function(done) {
  return gulp.src(paths.manifest)
             .pipe(jsonminify())
             .pipe(gulp.dest('www/'));
});
gulp.task('templates', function(done) {
  return gulp.src(paths.templates)
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
             .pipe(gulp.dest('www/'));
});
gulp.task('index', function(done) {
  return gulp.src(paths.index)
             .pipe(minifyHTML({
               empty: true
             }))
             .pipe(gulp.dest('www/'));
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
    'splash',
    'worker',
    'sass',
];
gulp.task('watch', watchDependencies, function() {

  gulp.watch(paths.angular, ['angular']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.splash, ['splash']);
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
