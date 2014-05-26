define(function (require, exports, module) {

    /**
     * 地图组件
     *
     * @author elianlin@tencent.com
     * @time 2013-07-14
     */

    "use strict";

    var $ = require('$');
    var Class = require('Class');

    require('baseCss');

    var Maps = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            width: 280,
            height: 280,
            callback: null,                 //加载完成后执行的回调函数
            exClass: '',                    //附加的 class
            theme: 'default'               //样式主题，可设置项有：default、bootstrap、metro
        },

        //枚举值
        theme: ['default', 'bootstrap', 'metro'],

        //组件容器对象
        container: null,
        content: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();
            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_page');
            this.setStype();
            this.setInfo();
            this.setShow();
            this.render();
            this.bindEvent();
            this.container.append(this.content);

            if(this.options.callback){
                var info = {
                    curPage: this.info.curPage,
                    pageSize: this.info.pageSize,
                    totalItem: this.info.totalItem
                }
                this.options.callback(info);
            }
        },

        //参数校验
        checkOptions: function(){

            if($.inArray(this.options.theme,this.theme) == -1){
                this.options.theme = this.theme[0];
            }
        },

        //设置样式
        setStype: function(){
            //设置主题风格样式
            this.content.addClass('i_' + this.options.theme);

            if(this.options.exClass){
                this.content.addClass(this.options.exClass);
            }
        },

        //绑定事件
        bindEvent: function(){
            var self = this;

        },

        //渲染组件
        render: function () {
            var options = this.options;
            var content = this.content.html("");
        }
    })

    module.exports = Maps;

})