const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: "development",
    entry: {
        main: "./src/js/main.ts",
        // sub: "./src/js/main.ts"
    },
    output: {
        filename: '[name].js', // entryのkeyが[name]に入る
        path: __dirname + '/dist'
    },

    module: {
        rules: [
            {
                test: /\.ts$/, // 拡張子 .ts の場合
                loader: "ts-loader", // TypeScript をコンパイルする
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            vue: "vue/dist/vue.js" // node_modulesのvueをみに行く import Vue from 'vue'[この部分]とかける。
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),
    ]
};