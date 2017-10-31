// ShellJS是在Node.js API之上的Unix shell命令的便携式实现
require('shelljs/global')

// 优雅的终端输出，挺有意思的 https://www.npmjs.com/package/ora
var ora = require('ora')
var webpack = require('webpack')

var build = function (config, env, cb) {
    var spinner = ora( {
        text: '开始🐶 建项目...',
        spinner: {
            interval: 150,
            frames: [
                " 🐵 🐵 🐵 ",
                " 🙈 🐵 🐵 ",
                " 🐵 🙉 🐵 ",
                " 🐵 🐵 🙊 "
            ]
        }
    } )
    spinner.start()

    // 路径是相对于进程 即process.cwd()
    // 去除旧的编译文件，根据env区分
    rm('-rf', env)
    mkdir('-p', env)

    webpack(config, function(err, stats) {
        spinner.stop()

        process.stdout.write( stats.toString( {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        } ) + '\n' )

        if (err) {
            throw err
        } else {
            cb && cb()
            console.log('\n')

            try{
                // copy 文件
                // cp('-R', 'src/images/*', 'dist/images/')
                cp('-R', 'src/libs/', env + '/libs/')
                cp('-R', 'favicon.ico', env + '/')
            } catch (e) {
                throw e
            }
        }
    })
}

module.exports = build
