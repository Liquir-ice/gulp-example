var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    // 只處理有修改的檔案，不浪費時間處理沒有修改檔案
    changed = require('gulp-changed'),
    // js檢測
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    //監控檔案如果有新增、修改、刪除
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat');


gulp.task('server', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(notify({ message: 'HTML Scripts task complete' }))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    // 指定input的位置
    gulp.src(['src/css/plugin/**/*.css' ,'src/css/**/*.css'])
        .pipe(minifycss())
        // 把壓縮後的css合併
        .pipe(concat('all.min.css'))
        // 最後輸出的地方
        .pipe(gulp.dest('public/css/'))
        .pipe(notify({ message: 'CSS Scripts task complete' }))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    // 指定input的位置
    gulp.src(['src/js/**/jquery.js', 'src/js/plugin/**/*.js', 'src/js/**/*.js'])
        // ngAnnotate will only get the files that, changed since the last time it was run
        .pipe(changed('public/js/'))
        // 檢視js是否有錯誤
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        // 把壓縮後的js合併
        .pipe(concat('all.min.js'))
        // 最後輸出的地方
        .pipe(gulp.dest('public/js/'))
        .pipe(notify({ message: 'JS Scripts task complete' }))
        .pipe(connect.reload());
});

gulp.task('watch', function (event) {
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('*.html', ['html']);
});

gulp.task('default', ['css', 'js', 'server', 'watch']);







