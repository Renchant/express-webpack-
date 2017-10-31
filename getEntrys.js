// 获取多入口方法
var path = require('path');
var fs = require('fs');
var getEntrys = function() {
    let matchs;
    let files = {};
    let entry = [];
    let modules = path.resolve(__dirname, './src/js');
    let dirs = fs.readdirSync(modules);
    dirs.forEach(function(item, index) {
            let itemPath = path.resolve(modules, item);
            // console.log(itemPath);
            let sta = fs.statSync(itemPath);
            if (sta.isDirectory()) {
                let filesDir = fs.readdirSync(itemPath);
                // console.log(filesDir);
                filesDir.forEach(function(val, index) {
                    matchs = /(.+)\.js$/g.test(val);
                    if (matchs) {
                        files[item] = path.resolve(itemPath, val);
                    }
                });
            }
        });
    // console.log(files);
    return files;
};

module.exports = getEntrys;