'use strict';
const path = require('path');
const TerminalAdapter = require('yeoman-environment/lib/adapter.js');
const yeoman = require('yeoman-environment');

class CreateSuppressingTerminalAdapter extends TerminalAdapter {
  constructor() {
    super();
    // suppress 'create' output generated by yeoman
    this.log.create = function() {};
  }
}

function init(type, name, options) {
    const env = yeoman.createEnv(
        undefined,
        undefined,
        new CreateSuppressingTerminalAdapter()
    );
    let dir = '';
    switch(type) {
        case 'module':
            dir = './generator-module';
            break;
        case 'iosmodule':
            break;
        case 'androidmodule':
            break;
    }

    env.register(
        require.resolve(path.join(__dirname, dir)),
        'rn:app'
    );
    // argv is for instance
    // ['node', 'react-native', 'init', 'AwesomeApp', '--verbose']
    // args should be ['AwesomeApp', '--verbose']
    /*
    const args = Array.isArray(argsOrName)
        ? argsOrName
        : [argsOrName].concat(process.argv.slice(4));
    */
   options = options? options: [];
   options.unshift(name);
   console.log('-======options----------', options);

    const generator = env.create('rn:app', {args: options});
    generator.destinationRoot(process.cwd());
    generator.run();
}
module.exports = init;
