/**
 * @desc 项目配置文件
 * @author Ivan
 * @lastModify Ivan
 * @date 2017-01-11
 * @return {Object} config
 */


const config = {
    // 七牛配置
    qiniu: {
        accessKey: 'JSJQ9zNlLIyPb3jYK4t31y5ent-1h0Dyaf_2mjV9',
        secretKey: 'AKZ4wiEvBzoGnmJD22ElZdAclsdlhf31_Z3yQAQq',
        bucket: 'youxuanyun',
        origin: 'http://fs.youxuanyun.com',
        uploadURL: 'http://up-z2.qiniu.com'
    },

    // 设置代理
    proxy: {
        /* 以key-value形式, key表示path, value表示options
         * 更多options查看
         * https://github.com/nodejitsu/node-http-proxy#options
         * http://npm.taobao.org/package/http-proxy-middleware#options
         */
        '/api': {
            target: 'http://******.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            },
            logLevel: 'debug'
        }
    },

    // 本地测试域名
    localhost: 'http://localhost',

    // 本地服务器端口
    port: 8010,
}

try {
    /* 可在本地同级目录下创建 local_config.js
     * eg: {
     *   port: 6001,  // 本地测试端口
     *   mainRoute: '#!/index',  // 入口路由, 仅用于显示提醒
     * }
     */
    const localConfig = require('./local_config')

    Object.assign(config, localConfig)
}
catch (e) {
    console.warn('> ' + 'Local Warn'.yellow + ' : ' + e.message + '\n')
}

module.exports = config