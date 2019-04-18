'use strict';

const gulp = require('gulp');
const	gp = require('gulp-load-plugins')();
const	del = require('del');
const	browserSync = require('browser-sync').create();

/* ---------- SERVER ---------- */
gulp.task('server', function() {
	browserSync.init({
		server: {
      port: 3000,
      baseDir: 'build',
    },
    notify: false
	})
});
/* ------------------------------- */

/* ---------- PUG ---------- */
gulp.task('pug', function () {
	return gulp.src('src/pug/index.pug')
						.pipe(gp.plumber({
							errorHandler: function(err) {
				        gp.notify.onError({
				          title: 'PUG',
				          message: err.message
				        })(err);
				        this.emit('end');
				      }
						}))
						.pipe(gp.pug({
							pretty: true
						}))
						.pipe(gulp.dest('build'))
						.on('end', browserSync.reload);
});
/* -------------------------------------------- */

/* ---------- SASS ---------- */
gulp.task('sass', function () {
	return gulp.src('src/sass/main.scss')
						.pipe(gp.plumber({
							 errorHandler: function(err) {
				          gp.notify.onError({
				            title: 'SASS',
				            message: err.message
				          })(err);
				          this.emit('end');
				        }
						}))
						.pipe(gp.sourcemaps.init())
						.pipe(gp.sass())
						.pipe(gp.autoprefixer({
							browsers: ['last 5 versions']
						}))
						.pipe(gp.csso())
						.pipe(gp.rename('main.min.css'))
						.pipe(gp.sourcemaps.write())
						.pipe(gulp.dest('build/css/'))
						.pipe(browserSync.reload({
							stream: true
						}));
});
/* ------------------------------------------- */

/* ---------- JAVASCRIPT ---------- */
gulp.task('scripts', function() {
	return gulp.src(['node_modules/jquery/dist/jquery.js','node_modules/owl.carousel/dist/owl.carousel.js','src/javascript/main.js'])
				.pipe(gp.plumber({
						errorHandler: function(err) {
				      gp.notify.onError({
				        title: 'JavaScript',
				        message: err.message
				      })(err);
				      this.emit('end');
				    }
				}))
				.pipe(gp.sourcemaps.init())
				.pipe(gp.concat('main.js'))
				.pipe(gp.uglify('main.js'))
				.pipe(gp.rename('main.min.js'))
				.pipe(gp.sourcemaps.write())
				.pipe(gulp.dest('build/js/'))
				.pipe(browserSync.reload({
           stream: true
        }));
});
/* ----------------------------------------- */

/* ---------- IMAGES ---------- */
gulp.task('images', function() {
	return gulp.src('src/images/**/*.{png,jpg,svg}')
				.pipe(gp.imagemin([
						gp.imagemin.gifsicle({interlaced: true}),
				    gp.imagemin.jpegtran({progressive: true}),
				    gp.imagemin.optipng({optimizationLevel: 5}),
				    gp.imagemin.svgo({
				      plugins: [
				        {removeViewBox: true},
				        {cleanupIDs: false}
				      ]
				    })
					])
				)
				.pipe(gulp.dest('build/img/'));
});
/* ---------------------------------------------------------- */

/* ---------- FONTS ---------- */
gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*.*')
  			.pipe(gulp.dest('build/fonts'));
});
/* ------------------------------------ */

/* ---------- DELETE ---------- */
gulp.task('delete', function() {
	return del(['build']);
});
/* ----------------------------- */

/* ---------- WATCH ---------- */
gulp.task('watch', function() {
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('src/javascript/main.js', gulp.series('scripts'));
	gulp.watch('src/images/**/*.{png,jpg,svg}', gulp.series('images'));
	gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));
});
/* ------------------------------------------------------------------- */

/* ---------- GULP DEFAULT TASK ---------- */
gulp.task('default',
	gulp.series(
		'delete',
		gulp.parallel('pug', 'sass', 'scripts', 'images', 'fonts'),
		gulp.parallel('watch', 'server')
	)
);
/* ----------------------------------------------------------- */