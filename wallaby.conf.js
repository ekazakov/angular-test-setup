var path = require('path');
var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack({
        module: {
            node: {__dirname: true},

            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel?optional[]=runtime'
                },
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

        resolve: {
            root: __dirname + '/src',
            modulesDirectories: [require('path').join(__dirname, '../', 'node_modules')],
            //alias: {
            //    angular: path.join(__dirname, '../node_modules/angular/index.js')
            //}
        },

        entryPatterns: [
            'test/index.js',
            'test/**/*_spec.js'
        ]
    }
);


module.exports = function (wallaby) {
    return {
        files: [
            {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
            {pattern: 'node_modules/jquery/dist/jquery.js', instrument: false},
            {pattern: 'src/**/*.js', load: false},
            {pattern: 'src/**/*.html', load: false},
            {pattern: 'css/**/*.css', load: false},
            {pattern: 'test/index.js', instrument: false, load: false},
            {pattern: 'test/utils.js', load: false}
        ],
        tests: [
            {pattern: 'test/**/*_spec.js', load: false}
        ],

        testFramework: 'jasmine',

        postprocessor: wallabyPostprocessor,

        bootstrap: function () {
            // required to trigger test loading
            window.__moduleBundler.loadTests();
        }
    };
};