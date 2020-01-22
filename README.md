### 字体压缩方案

#### 启动编译
```js
// 在当前目录内
$ node index.js
```
#### 基于 **Fontmin**插件实现
`Fontmin`是一个纯 JavaScript 实现的字体子集化方案。 
提供了 ttf 子集化，eot/woff/svg 格式转换，css 生成 等功能，助推 webfont 发展，提升网页文字体验。
[fontmin介绍](https://efe.baidu.com/blog/fontmin-getting-started/)
```js
var Fontmin = require('fontmin');

var srcPath = 'assets/*.ttf'; // 字体源文件
var destPath = 'dist';    // 输出路径
var text = '我说你是人间的四月天；笑响点亮了四面风；轻灵在春的光艳中交舞着变。';

// 初始化
var fontmin = new Fontmin()
    .src(srcPath)               // 输入配置
    .use(Fontmin.glyph({        // 字型提取插件
        text: text              // 所需文字
    }))
    .use(Fontmin.ttf2eot())     // eot 转换插件
    .use(Fontmin.ttf2woff())    // woff 转换插件     
    .use(Fontmin.ttf2svg())     // svg 转换插件
    .use(Fontmin.css())         // css 生成插件
    .dest(destPath);            // 输出配置

// 执行
fontmin.run(function (err, files, stream) {

    if (err) {                  // 异常捕捉
        console.error(err);
    }

    console.log('done');        // 成功
});
```
#### 项目目录介绍
1. assets: 字体库源文件夹
2. dist: 压缩后的字体库文件夹
3. src：需要进行压缩的文案：目前已经将大小写英文，标点符号等加进去了，中文字需要自行添加
4. index.js: 项目启动文件

### 使用方法，看test.html

