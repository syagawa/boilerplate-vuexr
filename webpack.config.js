const WebpackAutoInject = require("webpack-auto-inject-version");
const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

let ENV = process.env.NODE_ENV;
const MODE = process.env.APP_MODE;
if(ENV !== "production"){
  ENV = "development";
}

module.exports = {
  "js": {
    mode: ENV,
    entry: [
      "core-js/modules/es6.promise",
      "core-js/modules/es6.array.iterator",
      path.resolve(__dirname, "./app/src/js/app.js")
    ],
    output: {
      chunkFilename: '[name].js',
      filename: 'app.js'
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: "eslint-loader",
          options: {
            fix: false
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        {
          test: /\.vue$/,
          loader: "vue-loader"
        }
      ]
    },
    plugins: [
      new WebpackAutoInject({
        PACKAGE_JSON_PATH: 'package.json',
        components: {
          InjectAsComment: true
        },
        componentsOptions: {
          InjectAsComment: {
            tag: 'Build Version {version} - {date}'
          }
        }
      }),
      new VueLoaderPlugin()
    ],
    resolve: {
      // [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build. の解決
      alias: {
        vue$: 'vue/dist/vue.js'
      }
    }
  }
  ,
  "css": {
    mode: ENV,
    entry: {
      "bundle": [
        "./app/src/styles/main.scss"
      ]
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'sass-loader',
          ],
        }
      ]
    },
    plugins: [
      new OptimizeCSSAssetsPlugin({
          cssProcessor: require("cssnano")
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new WebpackAutoInject({
        PACKAGE_JSON_PATH: 'package.json',
        components: {
          InjectAsComment: true
        },
        componentsOptions: {
          InjectAsComment: {
            tag: 'Build Version {version}'
          }
        }
      }),
      new FixStyleOnlyEntriesPlugin()
    ]
  }

};

if (ENV !== 'production') {
    module.exports.js.devtool = 'inline-source-map';
}