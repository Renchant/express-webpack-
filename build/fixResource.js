const fs = require('fs');
// cheerio提供用于遍历/操作生成的数据结构的API。它不会将结果解释为Web浏览器,nodejs版jq
const cheerio = require('cheerio')
const chalk = require( 'chalk' )

const regEx = /.\/src\/|src\//

function isRelativeUrl(url) {
    var r = new RegExp('^\\s*(?:[a-z0-9]+:)?//', 'i');

    return url && !r.test(url) ? 1: 0;
}

function fixPath (filePath, prefix) {
    const static = [
        {
            name: 'img',
            attr: 'src'
        },
        {
            name: 'link',
            attr: 'href'
        },
        {
            name: 'script',
            attr: 'src'
        }
    ];

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const $ = cheerio.load(data);

        console.log('> fix the static resource path of "' + chalk.green(filePath) + '".\n')

        
        for (var i = 0; i < static.length; i++) {
            var obj = static[i],
                attr = obj.attr,
                $els = $(obj.name+'['+attr+']');

            console.log(chalk.green('tag:'),' <'+obj.name+'> ', chalk.green('total: ') + $els.length);

            if($els.length) {

                $els.map(function(i, el) {
                    var $el = $(el);
                    var attribute = $el.attr(attr);

                    if ( attribute.match(/data:image\/([^;]+).*/i) ) {
                        return;
                    }

                    if( isRelativeUrl(attribute) ) {
                        var path = attribute.replace(regEx, prefix);
                        console.log(attribute, ' -> ', chalk.underline.blue(path));
                        $el.attr(attr, path);
                    } else {
                        console.log(attribute, ' -> ' + chalk.bgCyan('No thanks!'));
                    }
                });
            }
        }

        console.log('\n')

        fs.writeFile(filePath, $.html().toString());
    })
}

module.exports = fixPath

