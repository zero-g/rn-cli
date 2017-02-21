#! /usr/bin/env node
'use strict';

var program = require('commander');
var colors = require('colors');
var generatorInit = require('./generator/index');
var eslint = require('./core/eslint');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

program
    .version('0.0.1')

if (!process.argv.slice(2).length) {
    program.outputHelp(function(text) {
        return colors.red(text);
    });
}

// rn init
program
    .command('init [env]')
    .description('run setup commands for all envs')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function(env, options){
        //可交互创建
        var mode = options.setup_mode || "normal";
        env = env || 'all';
        console.log('setup for %s env(s) with %s mode', env, mode);
    });

// rn module/m xx.js
program
    .command('module [name]')
    .alias('m [name]')
    .description('create react-native javascript module')
    .option("-t, --type [type]", "Which template to use? [view/tool/service]")
    .action(function(name, options){
        //console.log('commander ------------module ', name, options);
        generatorInit('module', name, []);
    });

// rn iosmodule/im xx.js
program
    .command('iosmodule [name]')
    .alias('im [name]')
    .description('create react-native ios module')
    .option("-t, --type [type]", "Which template to use? [...]")
    .action(function(name, options){
    });

// rn androidmodule/am xx.js
program
    .command('androidmodule [name]')
    .alias('am [name]')
    .description('create react-native android module')
    .option("-t, --type [type]", "Which template to use? [...]")
    .action(function(name, options){
    });

// rn start
program
    .command('start')
    .alias('s')
    .description('运行react-native  + eslint')
    .action(function(cmd, options){
        let reactNativeStart = spawn('react-native', ['start']);
        reactNativeStart.stdout.on('data', function (data) {
            console.log(data.toString());
        });

        reactNativeStart.stderr.on('data', function (data) {
            console.log(data.toString());
        });

        reactNativeStart.on('exit', function (code) {
            console.log('child process exited with code ' + code.toString());
        });
        eslint.initWithWatch();
        process.on('SIGTERM', function() {
            reactNativeStart.kill(9);
            // todo sth
            process.exit(0);
        });
    });

// rn lint
program
    .command('lint [file]')
    .allowUnknownOption(true)
    .description('use eslint to check file')
    .option("--watch", "lint when file changed. default: false")
    .action(function(){
        if (process.argv.indexOf('--watch') > 0) {
            eslint.initWithWatch();
        } else {
            eslint.init();
        }
    }).on('--help', function() {
        console.log('  Examples:');
        console.log();
        console.log('    $ rn lint index.ios.js');
        console.log('    $ rn lint app --watch');
        console.log();
    });

program
    .command('*')
    .action(function(env){
        console.log('command "%s" not found', env);
    });

program.parse(process.argv);
