const path =require('path')
const webpack=require('webpack')
const env=process.env.NODE_ENV
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:{
        main:'./index.js'
    },
    output:{
        filename:env==='development'?'[name].[hash:8].bundle.js':'[name].[chunkhash:8].bundle.min.js',
        path:path.join(__dirname,'dist')
    },
    module: {
        rules: [
                {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']
                }
                }   
                },
                {   
                    test: /\.css$/,
                    use:[ 
                        'style-loader',
                          'css-loader' 
                        ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                           'file-loader'
                         ]
                }
        ]
      },
      devtool: '#inline-source-map',
     
      devServer: {
        contentBase: path.join(__dirname,'dist'),
        host:'127.0.0.1',
        compress: true,
        port: 9000,
        disableHostCheck:true
      },
      plugins:[
          new HtmlWebpackPlugin({
              template:'index.html'
          })
      ]
}
if(env=='production'){//生产环境
    module.exports.devtool='#source-map';
    module.exports.plugins=(module.exports.plugins||[]).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'production'
        })
    ])
}