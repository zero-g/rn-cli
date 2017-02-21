'use strict';

var fs = require('fs');
var path = require('path');
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // This makes `appname` a required argument.
        this.argument('fileName', { type: String, required: true });

        // And you can then access it later; e.g.
        this.log('fileName:=-=============' + this.options.fileName);
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath(this.options.fileName+ '.js'),
            {
                title: 'Templating with Yeoman',
                moduleName: this.options.fileName
            }
        );
    }
};

