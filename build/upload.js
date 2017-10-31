var path = require( 'path' )
var fs = require( 'fs' )
var qn = require( 'qn' )
var chalk = require( 'chalk' )
var config = require( '../config' )
var pluginName = require( '../package.json' ).name
var rootPath = path.resolve( __dirname, '../' )

var distPath = 'dist'
// os 文件标识 文件
var ignore = [
    '.DS_Store'
]

function getAllFiles( dir ) {
    try {
        var paths = fs.readdirSync( dir ),
            files = []

        paths.forEach( function( file ) {
            var dirname = path.resolve( dir, './', file ),
                stat = fs.lstatSync( dirname )

            var filter = ignore.filter( function( v ) {
                return v === file
            } )
            if( filter.length ) return true

            if( !stat.isDirectory() ) {
                files.push( dirname.replace( rootPath, '.' ) )
            } else {
                files = files.concat( getAllFiles( dirname ) )
            }
        } )

        return files;
    }
    catch (e) {
        console.log(e + '\n')
    }
}

var myFiles = getAllFiles( distPath )

var client = qn.create( config.qiniu )

var length = myFiles.length,
    done = 0

function qnDelete( key, cb ) {
    client.delete( key, function( err ) {
        if( !err ) {
            console.log( chalk.yellow('Delete ') + chalk.green('success') + ': ', key )
            cb && cb();
        } else {
            console.log( chalk.yellow('Delete ') + chalk.red('error') + ': ', err.name + ' [code: '+ err.code + ']' )
        }
    } )
}

function qnUpload( dir ) {
    var key = pluginName + dir.replace( './', '/' );

    client.uploadFile(
        dir,
        { key: key },
        function( err, result ) {
            if( !err ) {
                console.log( 'Upload ' + chalk.green('success') + ': ', result.key )
            } else {
                if( err.code === 614 ) {
                    qnDelete( key, function() {
                        qnUpload( dir )
                    } )
                    return true;
                }
                console.log( 'Upload ' + chalk.red('error') + ': ', err.name + ' [code: '+ err.code + ']' )
            }
            
            if( ++done === length ) {
                console.log('\n')
            }
        }
    )
}

console.log('Upload dist/** to qiniu CDN.\n')

myFiles.forEach( qnUpload )
