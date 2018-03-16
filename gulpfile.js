var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
// var fontAwesome = require('node-font-awesome');

// var gulp = require('gulp');
// var handlebars = require('gulp-compile-handlebars');
// var rename = require('gulp-rename');

// gulp.task('default', function () {
//     var templateData = {
//         firstName: 'Kaanon'
//     },
//     options = {
//         ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
//         partials : {
//             footer : '<footer>the end</footer>'
//         },
//         batch : ['./src/partials'],
//         helpers : {
//             capitals : function(str){
//                 return str.toUpperCase();
//             }
//         }
//     }

//     return gulp.src('src/hello.handlebars')
//         .pipe(handlebars(templateData, options))
//         .pipe(rename('hello.html'))
//         .pipe(gulp.dest('dist'));
// });

/**
 * Minify images
 */
gulp.task('minify-images', function () {
    return gulp.src('./_images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img/'));
});

// gulp.task('fonts', function() {
//   gulp.src(fontAwesome.fonts)
//     .pipe(gulp.dest('./fonts'));
// });
/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', ['minify-images'], function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build', '--config', '_config.yml,_config_dev.yml'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('css/main.scss')
        .pipe(sass({
            includePaths: ['_sass'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_sass/*.scss', ['sass']);
    gulp.watch(['*.html','js/*.js', '_layouts/*.html', '_includes/*.html', '_posts/*', '_my_work/*', 'blog/*.html', 'taxi_work/*.html','mirum_work/*.html', 'fonts/*', '_config.yml', '_images/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);