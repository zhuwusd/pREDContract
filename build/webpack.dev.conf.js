'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const express = require("express");
const app = express();


var Login = require("../Data/Login.json");
var LoginError = require("../Data/LoginError.json");

var locationData = require("../Data/location.json");
var flowtype = require("../Data/flowtype.json");

var mytask_VendorProcess = require("../Data/mytask_VendorProcess.json");
var mytask_EmpowermentChange = require("../Data/mytask_EmpowermentChange.json");
var mytask_EmpowermentProcess = require("../Data/mytask_EmpowermentProcess.json");

var myapplys = require("../Data/myapplys.json");
var bu = require("../Data/bu.json");

var common = require("../Data/common.json");
var Hosipitals1 = require("../Data/Hosipitals1.json");
var Hosipitals2 = require("../Data/Hosipitals2.json");
var vendorList = require("../Data/vendorList.json");
var DistributorMaster = require("../Data/DistributorMaster.json");
var getEmpowermentMasterdata = require("../Data/getEmpowermentMasterdata.json");

var getEmpowermentlist = require("../Data/getEmpowermentlist.json");

var getEmpowermentinfo = require("../Data/getEmpowermentinfo.json");


var getEmpowermenttarget = require("../Data/getEmpowermenttarget.json");

var uploadattachment = require("../Data/uploadattachment.json");

var getExcelexportVendor = require("../Data/getExcelexportVendor.json");

var saveVendorData = require("../Data/saveVendorData.json");

var checkemail = require("../Data/checkemail.json");

var getEmpowermentChangeMaster = require("../Data/EmpowermentChangeMaster.json");

var getEmpowermentChangeSnapshot= require("../Data/EmpowermentChangeSnapshot.json");

var getRegister = require("../Data/getRegister.json");
var register = require("../Data/register.json");

var getSnapshot = require("../Data/getSnapshot16.json");

var getEmpowermentSnapshot = require("../Data/getEmpowermentSnapshot.json");

var getRedirectActivity = require("../Data/getRedirectActivity.json");
var getHistory = require("../Data/getHistory.json");
var apiRoutes = express.Router();
app.use("/api", apiRoutes);


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        },
        before(app) {
            app.post('/api/users/signin', (req, res) => {
                //res.status(500)
                res.json({
                    data: Login
                    //data: LoginError
                }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
            }),
                app.post('/api/attachment/upload', (req, res) => {
                    res.json({
                        data: uploadattachment
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),

                app.post('/api/vendor/info', (req, res) => {
                    res.json({
                        data: saveVendorData
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),

                app.post('/api/users/registercode', (req, res) => {
                    res.status(500);
                    res.json({
                        data: getRegister
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.post('/api/users/register', (req, res) => {
                    // res.status(500);
                    res.json({
                        data: register
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),

                app.post('/workflow/dealercreation/start/', (req, res) => {
                    //res.status(500);
                    res.json({
                        data: register
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),

                app.get('/api/sys/masterdata/location', (req, res) => {
                    res.json({
                        data: locationData
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/sys/masterdata/flowtype', (req, res) => {
                    res.json({
                        data: flowtype
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/sys/mytasks', (req, res) => {
                    if (req.query.page === "1") {
                        res.json({
                            data: mytask_VendorProcess
                        }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                    }
                    if (req.query.page === "2") {
                        res.json({
                            data: mytask_EmpowermentChange
                        }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                    }
                    if (req.query.page === "3") {
                        res.json({
                            data: mytask_EmpowermentProcess
                        }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                    }
                }),
                app.get('/api/sys/myapplys', (req, res) => {
                    res.json({
                        data: myapplys
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/empowerment/vendorquery', (req, res) => {
                    res.json({
                        data: getEmpowermentMasterdata
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/users/checkemail', (req, res) => {
                    //res.status(500);
                    res.json({
                        data: checkemail
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/sys/masterdata/bu', (req, res) => {
                    res.json({
                        data: bu
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/sys/masterdata/common', (req, res) => {
                    res.json({
                        data: common
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/sys/masterdata/hospitals', (req, res) => {
                    if (req.query.page === "1") {
                        res.json({
                            data: Hosipitals1
                        }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                    }
                    if (req.query.page === "2") {
                        res.json({
                            data: Hosipitals2
                        }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                    }
                }),
                app.get('/api/empowermentchange', (req, res) => {
                    res.json({
                        data: getEmpowermentChangeMaster
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/vendor/list', (req, res) => {
                    res.json({

                        data: vendorList
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/vendor/info', (req, res) => {
                    res.json({
                        data: DistributorMaster
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/vendor/snapshot', (req, res) => {
                    res.json({
                        data: getSnapshot
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                
                app.get('/api/empowermentchange/vendorquery', (req, res) => {
                    res.json({
                        data: getEmpowermentChangeMaster
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),

                app.get('/api/empowermentchange/snapshot', (req, res) => {
                    res.json({
                        data: getEmpowermentChangeSnapshot
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),

                app.get('/api/empowerment/snapshot', (req, res) => {
                    res.json({
                        data: getEmpowermentSnapshot
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/empowerment/list', (req, res) => {
                    res.json({
                        data: getEmpowermentlist
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/empowerment/info', (req, res) => {
                    res.json({
                        data: getEmpowermentinfo
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/empowerment/target', (req, res) => {
                    res.json({
                        data: getEmpowermenttarget
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/dealercreation/excelexportvendor', (req, res) => {
                    res.json({
                        data: getExcelexportVendor
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/empowerment/excelexporttarget', (req, res) => {
                    res.json({
                        data: getExcelexportVendor
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/empowerment/excelexportempowerment', (req, res) => {
                    res.json({
                        data: getExcelexportVendor
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/workflow/tasks/withdraw', (req, res) => {
                    res.json({
                        data: getRedirectActivity
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                }),
                app.get('/api/sys/approveinfo', (req, res) => {
                    //res.status(403);
                    res.json({
                        data: getHistory
                    }) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
                })
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }])
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})