'use strict';

var exec = require('child_process').exec;
var chokidar = require('chokidar');

let lint = {
    execLint: function(filesOrDirs) {
        let args = this.getArgv();
        //输入默认参数
        if (args.indexOf('--color') === -1) {
            args.push('--color');
        }

        if (filesOrDirs) {
            args = args.concat(filesOrDirs);
        }
        console.log('==========eslint start==========');
        exec('./node_modules/eslint/bin/eslint.js ' + args.join(' '), function(e, stdout, stderr) {
            if (e) {
                console.log(stdout);
                console.error(stderr);
            } else {
                console.log(stdout);
            }
            console.log('==========eslint end========== ');
        });
    },
    init: function() {
        this.execLint();
    },
    getArgv: function() {
        let arr = process.argv.slice(3);
        if (arr.indexOf('--watch') !== -1) {
            arr.splice(arr.indexOf('--watch'),1);
        }
        return arr;
    },
    getFilesOrDirsFromArgv: function() {
        let filterArr = [];
        let arr = this.getArgv();
        arr.map(function(item) {
            if (!/^-.*/.test(item)) {
                filterArr.push(item);
            }
        });
        return filterArr;
    },
    initWithWatch: function() {
        let filesOrDirs = this.getFilesOrDirsFromArgv();
        if (filesOrDirs.length === 0) {
            filesOrDirs.push('.');
        }
        chokidar.watch(filesOrDirs, {ignored: /(^|[\/\\])\..|node_modules/, persistent: true}).on('all', (event, path) => {
            if (event === 'change') {
                if (this.getFilesOrDirsFromArgv().length === 0) {
                    this.execLint([path]);
                } else {
                    this.execLint();
                }
            }
        });
    },
};
module.exports = lint;
