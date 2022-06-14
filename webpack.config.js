const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [
                    path.resolve(__dirname, 'src')
                ]
            }
        ]
    },
    output: {
        filename: 'lighthouse.js',
        path: path.resolve(__dirname, 'public'),
        library: {
            name: 'Lighthouse',
            type: 'umd'
        },
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}