// 使用Uglify 压缩也行
const fs = require('fs')
const Path = require('path')
// 压缩
const Uglify = require('uglify-js')

const distPath = 'dist/'

try {
    fs.readdirSync(distPath).forEach(function(dir) {
        if (dir.match(/(.+)\.js$/)) {
            const _dir = Path.resolve(distPath, dir)
            const code = Uglify.minify(_dir).code
        }
        // var entry = m ? m[1] : '';
        // var entryPath = entry ? path.resolve(dir, name) : '';

        // if(entry) map[entry] = entryPath;
    })
} catch (e) {
    console.log(e)
}