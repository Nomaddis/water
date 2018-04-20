var pug = require('gulp-pug'),
    gulp = require('gulp'),
    less = require('gulp-less');
    browserSync = require("browser-sync"),
    path = require('path'),
    reload = browserSync.reload,
    uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
var config = {
    server: {
        baseDir: "./web"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};
gulp.task('less', function() {
    return gulp.src('less/all.less') // Gets all files ending with .styl in stylys/styl and children dirs
        .pipe(less())
        .pipe(gulp.dest('web/css/'));
});
gulp.task('pug', function buildHTML() {
    return gulp.src('pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('web/')); // указываем gulp куда положить скомпилированные HTML файлы
});
gulp.task('browser-sync', function () {
    browserSync(config);
});
gulp.task('watch', ['browser-sync'], function(){
    gulp.watch('less/**/*.less', ['less', browserSync.reload]);
    gulp.watch('pug/**/*.pug', ['pug', browserSync.reload]);
    gulp.watch('web/js/*.js', ['babel', browserSync.reload]);
    gulp.watch('web/css/**/*.css', ['autoprefixer', browserSync.reload]);
    // Other watchers
});
gulp.task('autoprefixer', function() {
    gulp.src('web/css/all.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('web/css/'));
});
const babel = require('gulp-babel');

gulp.task('babel', () =>
    gulp.src('web/js/main.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('web/js/babel'))
);
gulp.task('default', ['browser-sync', 'watch']);