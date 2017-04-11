var gulp = require("gulp");
var $ = require("gulp-load-plugins")(); //其他 gulp 模块通过 $ 符号引用
var open = require("open");

var app = {
    srcPath: "src/",    // 源代码位置
    devPath: "build/",  // 整合之后的代码（开发）
    prdPath: "dist/"    // 用于生产部署（压缩后）（生产）
};

gulp.task("lib",function(){
    gulp.src("bower_components/**/*.js")  //对当前文件下的所有js子文件
    .pipe(gulp.dest(app.devPath + "vendor"))
    .pipe(gulp.dest(app.prdPath + "vendor"))
    .pipe($.connect.reload());          // 刷新，只支持高级浏览器
});

gulp.task('html', function(){
    gulp.src(app.srcPath + '**/*.html')
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.prdPath))
    .pipe($.connect.reload());          // 刷新，只支持高级浏览器

});

gulp.task('json', function(){
    gulp.src(app.srcPath + 'data/**/*.json')
    .pipe(gulp.dest(app.devPath + "data"))
    .pipe(gulp.dest(app.prdPath + "data"))
    .pipe($.connect.reload());          // 刷新，只支持高级浏览器
});

gulp.task('less', function(){
    gulp.src(app.srcPath + 'style/index.less')
    .pipe($.less())             // less 转 css
    .pipe(gulp.dest(app.devPath + "css"))
    .pipe($.cssmin())           // css 代码压缩
    .pipe(gulp.dest(app.prdPath + "css"))
    .pipe($.connect.reload());          // 刷新，只支持高级浏览器
});

gulp.task('js', function(){
    gulp.src(app.srcPath + 'script/**/*.js')
    .pipe($.concat('index.js'))         // 合并成 index.js 文件
    .pipe(gulp.dest(app.devPath + "js"))
    .pipe($.uglify())                   // 对 index.js 文件压缩
    .pipe(gulp.dest(app.prdPath + "js"))
    .pipe($.connect.reload());          // 刷新，只支持高级浏览器
});

gulp.task('image', function() {
    gulp.src(app.srcPath + 'image/**/*')
    .pipe(gulp.dest(app.devPath + 'image'))
    .pipe($.imagemin())                 // 图片压缩
    .pipe(gulp.dest(app.prdPath + 'image'))
    .pipe($.connect.reload());          // 刷新，只支持高级浏览器
});

gulp.task('build',['image','js','less','lib','html','json']);

gulp.task('clean', function() {
    gulp.src([app.devPath, app.prdPath])
    .pipe($.clean());           // 清空目录文件
});

gulp.task('serve',['build'], function() {
   $.connect.server({
       root: [app.devPath], // 启动根目录
       livereload: true,    // 针对高级浏览器，开启服务器自动刷新
       port: 8080            // 端口号
   });
    open('http://localhost:8080');

    gulp.watch('bower_components/**/*',['lib']);
    gulp.watch(app.srcPath + '**/*.html',['html']);
    gulp.watch(app.srcPath + 'data/**/*.json',['json']);
    gulp.watch(app.srcPath + 'style/**/*.less',['less']);
    gulp.watch(app.srcPath + 'script/**/*.js',['js']);
    gulp.watch(app.srcPath + 'images/**/*',['image']);
});

gulp.task('default',['serve']);     // gulp 默认执行



