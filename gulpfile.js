var gulp = require('gulp'),
    connect = require('gulp-connect'),
    cleanCSS = require('gulp-clean-css'),
    concatJS = require('gulp-concat'),
    concatCSS = require('gulp-concat-css'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    stripComments = require('gulp-strip-comments'),
    uglifyJS = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    zip = require('gulp-zip'),
    // heroku paths
    homeFolder = './app/',
    htmlPath = homeFolder + '*.html',
    htmlDistPath = './dist/app/*.html',
    scssPath = homeFolder + 'css/*.scss',
    bigCSS = homeFolder + 'css/style.css',
    jsPath = homeFolder + 'js/*.js',
    imagesPath = homeFolder + 'images/*.*',
    fontsPath = homeFolder + 'fonts/*.*';//,
    // visualforce paths
    // visualforceFolder = './visualforce/';


// HTML -- Strip comments, save to dist folder, and then reload on change
gulp.task('minify', ['images'], function () {
    return gulp.src(htmlPath)
        .pipe(usemin({
            css: [cleanCSS()],
            js: [uglifyJS()]
        }))
        .pipe(gulp.dest('./dist/app/'));
});

gulp.task('strip-comments', function () {
    return gulp.src(htmlDistPath)
            .pipe(stripComments({ safe: true, trim: true }))
            .pipe(gulp.dest('./dist/app/'));
});

gulp.task('copy-fonts', function () {
    return gulp.src(fontsPath).pipe(gulp.dest('./dist/app/fonts'));
});

gulp.task('copy-big-css', function () {
    return gulp.src(bigCSS)
        .pipe(gulp.dest('./dist/app/css'));
        // .pipe(gulp.dest('./visualforce/dist/css'));
});

// Compile SCSS
gulp.task('compile', function () {
    return gulp.src(scssPath)
        // .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./app/css/'))
        // .pipe(gulp.dest('./visualforce/css/'))
        .pipe(connect.reload());
});

// Decomment JS file
// gulp.task('js', function () {
//     return gulp.src(jsPath)
//         .pipe(gulp.dest('./visualforce/js/'))
//         .pipe(connect.reload());
// });

// Move images
gulp.task('images', function () {
    return gulp.src(imagesPath)
        .pipe(gulp.dest('./dist/app/images/'))
        .pipe(connect.reload());
});

// Decomment router JS files
gulp.task('app', function () {
    return gulp.src('./app.js')
        .pipe(stripComments({ trim: true }))
        .pipe(uglifyJS())
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

// Decomment API files
gulp.task('api', function () {
    return gulp.src('./api/v1/*.js')
        .pipe(stripComments({ trim: true }))
        .pipe(uglifyJS())
        .pipe(gulp.dest('./dist/api/v1/'))
        .pipe(connect.reload());
});

// VISUALFORCE
// gulp.task('minify-vf-css', function () {
//     return gulp.src('./visualforce/css/*.css')
//         .pipe(concatCSS('wiperecord.min.css'))
//         .pipe(cleanCSS())
//         .pipe(gulp.dest('./visualforce/dist/css/'));
// });

// gulp.task('minify-vf-js', function () {
//     return gulp.src('./visualforce/js/*.js')
//         // .pipe(concatJS('wiperecord.min.js'))
//         .pipe(uglifyJS())
//         .pipe(gulp.dest('./visualforce/dist/js/'));
// });

// gulp.task('zip', ['minify-vf-css', 'minify-vf-js', 'copy-big-css'], function () {
//     return gulp.src('./visualforce/dist/**')
//         .pipe(zip('visualforceApp.zip'))
//         .pipe(gulp.dest(visualforceFolder));
// });
 
gulp.task('watch', function () {
    
    // HEROKU
    // Watch assets for changes
    gulp.watch(htmlPath, ['minify']);
    gulp.watch(htmlDistPath, ['strip-comments']);
    gulp.watch(scssPath, ['compile']);
    // gulp.watch(jsPath, ['js']);
    gulp.watch(imagesPath, ['images']);
    gulp.watch(bigCSS, ['copy-big-css']);
    
    // Watch app JS file for changes
    gulp.watch('./app.js', ['app']);

    // Watch API for changes
    gulp.watch('./api/v1/*.js', ['api']);

    // VISUALFORCE
    // gulp.watch('./visualforce/css/*', ['zip']);
    // gulp.watch('./visualforce/js/*', ['zip']);
});

gulp.task('serve', ['watch'], function () {
    connect.server({
        // host: 'localhost',
        host: '0.0.0.0',
        port: 3000,
        livereload: true,
        index: '/app/index.html',
        middleware: function(connect) {
            return [
                connect().use(connect.static('app')),
            ];
        }
    });
});