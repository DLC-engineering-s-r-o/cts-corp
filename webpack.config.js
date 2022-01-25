const webpack = require('webpack');
const path = require('path');
const ScriptsPath = "./Resources/Scripts";

module.exports = {
    entry: {
        init: [`${ScriptsPath}/init.ts`],
    },	
    output: {
        chunkLoading: false,
        wasmLoading: false,		
        filename: '[name].js',
        path: path.resolve(__dirname, './wwwroot/js')
    },
	target: ["web"],
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                }]
            }
        ]
    },
    devtool: 'source-map'
};