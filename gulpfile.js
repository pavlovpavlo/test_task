let gulp         = require('gulp');

let browserSync  = require('browser-sync').create();

let sass         = require('gulp-sass');

let autoprefixer = require('gulp-autoprefixer');

let concatCss    = require('gulp-concat-css');

let cleanCSS     = require('gulp-clean-css');

let rename       = require("gulp-rename");

let uglify       = require('gulp-uglify');

let useref       = require("gulp-useref");

let babel        = require('gulp-babel');



gulp.task('sass', function(done) {

  return gulp.src("./src/sass/*.scss")

  .pipe(sass().on('error', sass.logError))

  .pipe(autoprefixer({

    overrideBrowserslist: ['last 4 versions'],

    cascade: false

  }))

  .pipe(concatCss("style.css"))

  .pipe(gulp.dest("./src/css"))

  .pipe(browserSync.stream());

  done();

});

gulp.task('mincss', function(done) {

  return gulp.src("./src/css/style.css")

  .pipe(rename({suffix: ".min"}))

  .pipe(cleanCSS())

  .pipe(gulp.dest("./dist/css"));

  done();
})

gulp.task('minjs', function(done) {

  return gulp.src("./src/js/main.js")

  .pipe(rename({suffix: ".min"}))
  
  .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())

  .pipe(gulp.dest("./dist/js"));
  done();

})

gulp.task('min',gulp.series('mincss', 'minjs'));

gulp.task('fonts', function(done) {
  gulp.src('src/fonts/*')                                             
            
    .pipe(gulp.dest('dist/fonts/')); 

    done();                                
});

gulp.task ('useref', function(done) {                                   
 return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));                                   
});

gulp.task ('build', gulp.series('sass', 'min','fonts','useref'));

gulp.task('serve', gulp.series('build'), function() {
  browserSync({
    notify: false,                       // 
    port: 9000,                          // порт
    server: {                            //
      baseDir: 'src'                     // базовая директория
    }
  });
});

gulp.task('watch', function () {
   gulp.watch('src/sass/**/*.scss', gulp.series('sass', 'mincss'));
  gulp.watch('src/js/**/*.js', gulp.series('minjs'));
  gulp.watch('src/fonts/**/*', browserSync.reload);
  gulp.watch('src/img/**/*', browserSync.reload);
  gulp.watch('src/**/*.html', gulp.series('useref'));
});

gulp.task('default', gulp.series('serve', 'watch'));