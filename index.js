const fs =  require('fs')
const path =  require('path')
const Fontmin = require('fontmin');

const destPath = path.join(__dirname, 'output');    // 输出路径

// 查找所有的需要替换的字体列表
const fontList = fs.readdirSync(path.join(__dirname, 'src')).map(item => item = item.split('.')[0])
console.log('fontList', fontList)

fontList.forEach((item, i) => {
    const srcPath = `assets/${item}.*`; // 字体源文件
    let itemPath = path.join(__dirname, 'src', `${item}.txt`, )
    let text = fs.readFileSync(itemPath, 'utf-8');
    getFont(srcPath, text, itemPath)
})

function getFont(srcPath, text, itemPath) {
    console.log('srcPath', srcPath)
    // 初始化
    const fontmin = new Fontmin()
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
}
