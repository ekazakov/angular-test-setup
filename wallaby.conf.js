var path = require('path');
var babel = require('babel');
var wallabyWebpack = require('wallaby-webpack');
var webpackTestConfig = {
    module: {
        cache: {},

        node: {__dirname: true},

        loaders: [
            {
                // Reference: https://github.com/webpack/file-loader
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            {
                test: /\.css$/,
                loader: 'null'
            }
        ]
    },

    devtool: "cheap-module-source-map",

    entryPatterns: [
        'test/index.js',
        'test/**/*_spec.js'
    ]
};

module.exports = function (wallaby) {
    webpackTestConfig.context = path.join(wallaby.projectCacheDir, 'src');

    return {
        files: [
            {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
            {pattern: 'node_modules/jquery/dist/jquery.js', instrument: false},
            {pattern: 'src/**/*.js', load: false},
            {pattern: 'src/**/*.html', load: false},
            {pattern: 'css/**/*.css', load: false},
            {pattern: 'test/index.js', load: false},
            {pattern: 'test/utils.js', load: false}
        ],
        tests: [
            {pattern: 'test/**/*_spec.js', load: false}
        ],

        testFramework: 'jasmine',


        compilers: {
            '**/*.js': wallaby.compilers.babel({babel: babel, stage: 0})
        },

        postprocessor: wallabyWebpack(webpackTestConfig),

        env: {
            type: 'browser'
        },

        bootstrap: function () {
            // required to trigger test loading
            window.__moduleBundler.loadTests();
        }
    };
};