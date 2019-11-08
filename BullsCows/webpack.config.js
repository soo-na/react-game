const path = require('path');// node module

module.exports={
    name: 'Bulls and Cows game setting',
    mode: 'development',// <->production
    devtool: 'eval', //<-> hidden-source-map
    resolve:{
        extensions:['.js', '.jsx']  //search files with the extensions
    },

    entry:{
        app: ['./client'],
    }, //input

    module:{
        rules:[{
            test:/\.jsx?/,
            loader: 'babel-loader',
            options:{
                presets:[['@babel/preset-env', {
                    targets:{
                        browsers:['> 3% in CA'],//browserslist
                    },
                    debug:true,
                }],
                 '@babel/preset-react'],

                plugins:[
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
            ],
            }

        }],
 
    },

    output:{
        path:path.join(__dirname, 'dist'), //**makes path easier to use
        filename: 'app.js',
        publicPath:'/dist/',
    }, //output

};