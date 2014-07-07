define(function (require, exports, module) {

    /**
     * 分页组件
     *
     * @author elianlin@tencent.com
     * @time 2013-07-14
     */

    "use strict";

    var JSON = require('JSON');
    var $ = require('$');
    var Class = require('Class');

    require('baseCss');
    require('res/css/page.css');

    var Page = Class.extend({
        //可配置参数
        options: {
            query: '',                      //容器 DOM 节点选择器
            scope: window,                  //回调函数的this指向
            funName: '',                    //点击页码后执行的JS函数。函数原型为：function(curPage, pageSize[, exParams]){ }
            curPage: 1,                     //当前页码
            totalItem: 1,                   //列表数据总数，由cgi返回
            pageSize: 10,                   //每页显示的数据条数
            callback: null,                 //加载完成后执行的回调函数
            exClass: '',                    //附加的 class
            exParams: {},                   //附加参数，在回调中被使用
            type: 'normal',                 //组件类型，可设置项有： normal、number、simple
            theme: 'default',               //样式主题，可设置项有：default、bootstrap、metro
            skin: 'grey',                   //主题颜色，可设置项有：grey、red、blue、green、orange、purple
            align: 'center',                //对齐方式，可设置项有：left、center、right
            pageLimit: 10,                  //页码显示个数，当 isShowNum 为 true 时有效，不小于3
            isShowNum: true,                //是否显示数字页面，当 type 为 normal 时有效
            isShowPN: true,                 //是否显示上一页和下一页按钮，当 type 不为 numbel 时有效
            isShowFE: true,                 //是否显示首页和尾页按钮，当 type 为 normal 时有效
            isShowInfo: true,               //是否显示列表信息，当 type 为 normal 时有效
            isShowSkip: true,               //是否显示跳转按钮，当 type 为 normal 时有效
            isShowSize: true,               //是否支持每页条数选择，当 type 为 normal 时有效
            isKeyControl: true,             //是否支持键盘左右键进行前后页控制
            sizeList: [10, 20, 30, 50, 100] //每页条数选择设置，当 isShowSize 为 true 时有效
        },

        //枚举值
        type: ['normal', 'number', 'simple', 'mail'],
        theme: ['default', 'bootstrap', 'metro'],
        skin: ['grey', 'red', 'blue', 'green', 'orange', 'purple'],
        align: [ 'center', 'left', 'right'],

        //组件容器对象
        container: null,
        content: null,

        //列表信息
        info:{
            totalItem: 0,
            pageSize: 0,
            totalPage: 0,
            curPage: 1,
            start: 0,
            end: 0,
            keyEvnet: false
        },

        //组件显示配置
        show: {
            size: true,
            info: true,
            first: true,
            prev: true,
            numble: true,
            next: true,
            end: true,
            skip: true
        },

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();
            this.container = $(this.options.query).html("");
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

            if(typeof(this.options.scope) != 'object'){
                this.options.scope = window;
            }

            if($.inArray(this.options.type, this.type) == -1){
                this.options.type = this.type[0];
            }
            if($.inArray(this.options.theme,this.theme) == -1){
                this.options.theme = this.theme[0];
            }
            if($.inArray(this.options.skin,this.skin) == -1){
                this.options.skin = this.skin[0];
            }
            if($.inArray(this.options.align,this.align) == -1){
                this.options.align = this.align[0];
            }
        },

        //设置样式
        setStype: function(){
            //设置主题风格样式
            this.content.addClass('i_' + this.options.theme);

            //设置主题颜色
            this.content.addClass('i_' + this.options.skin);

            //设置对齐方式
            this.content.css({
                textAlign: this.options.align
            });

            if(this.options.exClass){
                this.content.addClass(this.options.exClass);
            }
        },

        //设置显示项
        setShow: function () {
            var options = this.options;

            switch (options.type){
                case 'simple':
                    this.show = {
                        size: false,
                        info: false,
                        first: false,
                        prev: true,
                        numble: false,
                        next: true,
                        end: false,
                        skip: false
                    }
                    break;
                case 'number':
                    this.show = {
                        size: false,
                        info: false,
                        first: false,
                        prev: false,
                        numble: true,
                        next: false,
                        end: false,
                        skip: false
                    }
                    break;
                case 'mail':
                    this.show = {
                        size: false,
                        info: true,
                        first: false,
                        prev: true,
                        numble: false,
                        next: true,
                        end: false,
                        skip: true
                    }
                    break;
                default :
                    this.show = {
                        size: options.isShowSize && true,
                        info: options.isShowInfo && true,
                        first: options.isShowFE && true,
                        prev: options.isShowPN && true,
                        numble: options.isShowNum && true,
                        next: options.isShowPN && true,
                        end: options.isShowFE && true,
                        skip: options.isShowSkip && true
                    }
            }
        },

        //设置列表信息
        setInfo: function () {
            var options = this.options;
            var info = {};

            //信息校正
            info.totalItem = parseInt(options.totalItem) >= 0 ? parseInt(options.totalItem) : 0;
            info.pageSize = parseInt(options.pageSize) > 0 ? parseInt(options.pageSize) : 10;
            info.curPage = parseInt(options.curPage) > 0 ? parseInt(options.curPage) : 1;
            info.totalPage = Math.ceil(info.totalItem / info.pageSize);

            if(info.totalPage == 0){
                info.totalPage = 1;
            }
            if (info.curPage > info.totalPage) {
                info.curPage = info.totalPage;
            }

            //设置起始页码,当前页码始终显示在中间
            if (info.totalPage > options.pageLimit) {
                var ceil = Math.ceil((options.pageLimit - 1) / 2);
                var floor = Math.floor((options.pageLimit - 1) / 2);
                if ((info.curPage - floor) > 0 && info.curPage < info.totalPage - ceil) {
                    info.start = info.curPage - floor;
                    info.end = info.curPage + ceil;
                } else if (info.curPage >= (info.totalPage - ceil)) {
                    info.start = info.totalPage - options.pageLimit + 1;
                    info.end = info.totalPage;
                } else {
                    info.start = 1;
                    info.end = options.pageLimit;
                }
            } else {
                info.start = 1;
                info.end = info.totalPage;
            }

            if(options.isKeyControl){
                info.keyEvnet = true;
            }
            this.info = info;
        },

        //绑定事件
        bindEvent: function(){
            var self = this;

            //页码点击事件
            self.content.delegate('.i_pageControl a', 'click', function(){
                var curPage = $(this).attr('data_index') * 1;
                var pageSize = self.info.pageSize;

                self.options.scope[self.options.funName](curPage, pageSize, self.options.exParams);

            });

            //pageSize切换事件
            self.content.delegate('.i_select', 'change', function(){
                var curPage = 1;
                var pageSize = $(this).val();

                self.options.scope[self.options.funName](curPage, pageSize, self.options.exParams);

            });

            //跳转输入框事件
            self.content.delegate('input', 'blur', function(){
                var curPage = $(this).val() * 1;

                if(isNaN(curPage)){
                    curPage = 1;
                }
                if(curPage < 1){
                    curPage = 1;
                }
                if(curPage > self.info.totalPage){
                    curPage = self.info.totalPage;
                }

                $(this).val(curPage);
            });

            //跳转事件
            self.content.delegate('.i_pageSkip_submit', 'click', function(){
                var curPage = self.content.find('.i_pageSkip_input').val() * 1;
                var pageSize = self.info.pageSize;

                if(isNaN(curPage)){
                    curPage = 1;
                }else if(curPage < 1){
                    curPage = 1;
                }else if(curPage > self.info.totalPage){
                    curPage = self.info.totalPage;
                }

                console.log('i_pageSkip_submit', curPage, pageSize);
                self.options.scope[self.options.funName](curPage, pageSize, self.options.exParams);

            });

            //回车跳转页面
            self.content.find('.i_pageSkip_input').keyup(function(event){
                if(event.keyCode==13){
                    var curPage = $(this).val() * 1;
                    var pageSize = self.info.pageSize;

                    if(isNaN(curPage)){
                        curPage = 1;
                    }else if(curPage < 1){
                        curPage = 1;
                    }else if(curPage > self.info.totalPage){
                        curPage = self.info.totalPage;
                    }

                    self.options.scope[self.options.funName](curPage, pageSize, self.options.exParams);
                }
            });


            //键盘快捷键事件
            if(self.options.isKeyControl){
                $(window).bind('keydown',function(event){
                    switch(event.keyCode) {
                        case 37:
                            if(!self.info.keyEvnet){
                                return false;
                            }
                            self.info.keyEvnet = false;
                            var curPage = self.info.curPage - 1;
                            var pageSize = self.info.pageSize;

                            if(isNaN(curPage)){
                                curPage = 1;
                            }else if(curPage < 1){
                                curPage = 1;
                            }else if(curPage > self.info.totalPage){
                                curPage = self.info.totalPage;
                            }

                            self.options.scope[self.options.funName](curPage, pageSize, self.options.exParams);

                            break;
                        case 39:
                            if(!self.info.keyEvnet){
                                return false;
                            }
                            self.info.keyEvnet = false;
                            var curPage = self.info.curPage + 1;
                            var pageSize = self.info.pageSize;

                            if(isNaN(curPage)){
                                curPage = 1;
                            }else if(curPage < 1){
                                curPage = 1;
                            }else if(curPage > self.info.totalPage){
                                curPage = self.info.totalPage;
                            }

                            self.options.scope[self.options.funName](curPage, pageSize, self.options.exParams);

                            break;
                    }
                });
            }
        },

        //渲染组件
        render: function () {
            var options = this.options;
            var info = this.info;
            var show = this.show;
            var content = this.content.html("");

            //每页条数选择
            if(show.size){
                var size = $('<select>').addClass('i_pageSize i_select');
                for(var i in options.sizeList){
                    var option = $("<option>").text('每页' + options.sizeList[i] + '条').attr({
                        value: options.sizeList[i]
                    })
                    if(info.pageSize == options.sizeList[i]){
                        option.attr('selected','selected');
                    }
                    option.appendTo(size);
                }
                content.append(size);
            }

            //列表信息显示
            if(show.info){
                var infoContent = $('<span>').addClass('i_pageInfo');
                if(options.type == 'mail'){
                    infoContent.append($('<span>').html('<strong>' + info.curPage + '</strong>/<strong>' + info.totalPage + '</strong>').addClass('i_pageInfo_CurPage'));
                }else{
                    infoContent.append($('<span>').html('第 <strong>' + info.curPage + '</strong> 页').addClass('i_pageInfo_CurPage'));
                    infoContent.append($('<span>').html('共 <strong>' + info.totalPage + '</strong> 页').addClass('i_pageInfo_totPage'));
                    infoContent.append($('<span>').html('共 <strong>' + info.totalItem + '</strong> 条记录').addClass('i_pageInfo_totalItem'));
                }

                content.append(infoContent);
            }

            var controlContent = $('<span>').addClass('i_pageControl');

            //首页控制
            if (show.first) {
                var first = $('<a>').text('«').addClass('i_pageFirst i_btn').attr({
                    title: '首页',
                    data_index: 1
                });

                if(info.curPage == 1){
                    first.addClass('i_disable');
                }
                controlContent.append(first);
            }

            //上一页菜单控制
            if (show.prev) {
                var text = options.type == 'simple' || options.type == 'mail' ? '上一页' : '‹';
                var prev = $('<a>').text(text).addClass('i_pagePrev i_btn').attr({
                    title: '上一页',
                    data_index: info.curPage == 1 ? 1 : (info.curPage - 1)
                });

                if(info.curPage == 1){
                    if(options.type == 'mail'){
                        prev.hide();
                    }else{
                        prev.addClass('i_disable');
                    }
                    if(options.type == 'mail'){
                        prev.hide();
                    }else{
                        prev.addClass('i_disable');
                    }
                }

                if(options.type == 'mail'){
                    prev.removeClass("i_btn");
                }
                controlContent.append(prev);
            }

            //页码展示
            if (show.numble) {
                for (var i = info.start; i <= info.end; i++) {
                    var num = $('<a>').text(i).addClass('i_pageNum i_btn').attr({
                        title: '第' + i + '页',
                        data_index: i
                    });

                    if (i == info.curPage) {
                        num.addClass('i_active');
                    }
                    controlContent.append(num);
                }
            }

            //下一页菜单控制
            if (show.next) {
                var text = options.type == 'simple' || options.type == 'mail' ? '下一页' : '›';
                var next = $('<a>').text(text).addClass('i_pageNext i_btn').attr({
                    title: '下一页',
                    data_index: info.curPage == info.totalPage ? info.totalPage : (info.curPage + 1)
                });

                if(info.curPage == info.totalPage){
                    if(options.type == 'mail'){
                        next.hide();
                    }else{
                        next.addClass('i_disable');
                    }
                }

                if(options.type == 'mail'){
                    next.removeClass("i_btn");
                }

                controlContent.append(next);
            }

            //末页控制
            if (show.first) {
                var end = $('<a>').text('»').addClass('i_pageEnd i_btn').attr({
                    title: '末页',
                    data_index: info.totalPage
                });

                if(info.curPage == info.totalPage){
                    end.addClass('i_disable');
                }
                controlContent.append(end);
            }

           content.append(controlContent);

            //跳转控制
            if(show.skip){
                var skip = $('<span>').addClass('i_pageSkip');
                skip.append('跳转到<input type="text" class="i_pageSkip_input i_text" value="' + info.curPage + '">');
                skip.append($('<a>').text('确定').addClass('i_pageSkip_submit i_btn'));
                content.append(skip);
            }

            //mail样式下调整info顺序
            if(options.type == 'mail'){
                infoContent.insertAfter(prev);
            }
        }
    })

    module.exports = Page;

})