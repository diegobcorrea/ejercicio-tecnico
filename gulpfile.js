/**
 * Dependencies
 */
var browserSync = require('browser-sync'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    taskListing = require('gulp-task-listing'),
    util = require('gulp-util');

/**
 * List the available gulp tasks
 */
gulp.task('default', taskListing);

/**
 * Contact all js files
 */
gulp.task('compile-js', function() {
    log('Compiling JS --> JS');
    
    gulp.src('src/app/**/*.js')
        .pipe(concat('site.min.js'))
        .pipe(gulp.dest('site/js'));
});

/**
 * Compile .scss to css
 */
gulp.task('compile-sass', function() {
    log('Compiling Sass --> CSS');

    return gulp
        .src('src/sass/**/*.scss')
        //.src('src/sass/styles.scss')
        //.pipe($.plumber()) // exit gracefully if something fails after this
        .pipe(sass())
        //        .on('error', errorLogger) // more verbose and dupe output. requires emit.
        .pipe(autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest('site/css'));
});

/**
 * Start dev server
 */
gulp.task('serv-start', function() {
    startBrowserSync();
});

function startBrowserSync(isDev) {
    log('Starting BrowserSync on port 4000');

    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches sass, compiles it to css, browser-sync handles reload
    gulp.watch(['src/sass/**/*.scss'], ['compile-sass' /*, 'browserSyncReload-dev'*/ ])
        .on('change', changeEvent);

    gulp.watch(['src/app/**/*.js'], ['compile-js' /*, 'browserSyncReload-dev'*/ ])
        .on('change', changeEvent);

    var options = {
        port: 4000,
        server: {
            baseDir: '.',
            index: "site/index.html"
        },
        files: [
            'site/*.html',
            'site/css/*.*',
            'site/js/*.*'
            //verificar si hay q agregar los html de los templates de js
        ],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: '329-vamo',
        notify: true,
        reloadDelay: 500
    };

    browserSync(options);
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/src)/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}