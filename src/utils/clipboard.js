define(function (require, exports, module) {
    /**
     * 剪贴板组件
     *
     * @author adam[linyue@live.cn]
     * @time 2014-10-05
     */
    "use strict";

    var $ = require('$');
    var Class = require('Class');
    require('src/plugin/ZeroClipboard.js');

    var Clipboard = Class.extend({
        //可配置参数
        options: {
            query: null,
            content: '',
            callback: function(content){

            }
        },

        dom: null,
        client: null,

        allowClipboard: false,

        init: function (options) {
            var self = this;
            self.options = $.extend({}, self.options, options);

            self.dom = null;
            self.client = null;

            self.main();
            self.bindEvent();
        },

        main: function(){
            var self = this;
            var options = self.options;

            self.dom = $(options.query);

            if (window.clipboardData) {
                self.allowClipboard = true;
            }else{
                var swf2 = navigator.plugins['Shockwave Flash'];
                if(swf2 != undefined){
                    ZeroClipboard.config({
                        swfPath: seajs.data.paths.res + '/swf/ZeroClipboard.swf'
                    })

                    self.client = new ZeroClipboard(self.dom);
                    self.allowClipboard = true;
                }else{
                    self.allowClipboard = false;
                }
            }
        },

        setText: function(content){
            var self = this;
            var options = self.options;

            options.content = content;
        },

        bindEvent: function(){
            var self = this;
            var options = self.options;

            if(self.allowClipboard){
                if (window.clipboardData) {
                    self.dom.click(function(){
                        window.clipboardData.setData("Text", options.content);
                        options.callback && options.callback(options.content);
                    })
                }else{
                    self.client.on('ready', function(event) {

                        self.client.on('copy', function(event) {
                            event.clipboardData.setData('text/plain', options.content);
                        } );

                        self.client.on('aftercopy', function(event) {
                            options.callback && options.callback(options.content);
                        } );
                    } );

                    self.client.on('error', function(event) {
                        ZeroClipboard.destroy();
                    });
                }
            }else{
                self.dom.click(function(){
                    alert('您的设备不支持复制功能');
                })
            }
        }
    })

    module.exports = Clipboard;
})