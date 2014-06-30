define(function (require, exports, module) {

    /**
     * sidebar组件
     *
     * @author adam(linyue@live.cn)
     * @time 2014-06-03
     */

    "use strict";

    var $ = require('$');
    var Class = require('Class');

    require('baseCss');

    var Sidebar = Class.extend({
        //可配置参数
        options: {
            width:  250,
            content: '',
            contentType: 'string',          //内容类型，可设置项有：html、iframe、string
            target: 'self',                 //要弹层的页面,可设置项有：self、parent、top
            direction: 'right',             //方向,可选值有：left， right
            animate: 'slide',               //切换效果,可选值有：toggle， fade， slide
            exClass: '',                    //附加的 class
            background: '#3e3e3e',          //背景颜色
            padding: '10px',                //内容区域内边距
            zIndex: 10000,                  //浮层z-index
            isMask: true,                   //是否显示遮罩
            isBlur: false,                  //是否使用毛玻璃效果
            isShowCloseBtn: true,           //是否显示关闭按钮
            isMaskClose: true,              //是否点击遮罩就关闭浮层
            isKeyControl: true              //是否开启esc快捷键关闭浮层
        },

        //组件容器对象
        win: null,
        doc: null,
        container: null,
        content: null,
        closeBtn: null,
        bgMask: null,
        mask: null,
        main: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();
            this.getDocument();

            this.container = this.doc.find("body");
            this.content = $("<div></div>").addClass("i_sidebar");

            this.render();
            this.setStyle();
            this.bindEvent();
        },

        //参数校验
        checkOptions: function(){


        },

        getDocument: function () {
            switch (this.options.target) {
                case 'parent':
                    this.win = $(window.parent);
                    this.doc = $(window.parent.document);
                    break;
                case 'top':
                    this.win = $(window.top);
                    this.doc = $(window.top.document);
                    break;
                default :
                    this.win = $(window)
                    this.doc = $(document);
            }
        },

        setStyle: function(){
            var self = this;
            var options = self.options;

            self.content.addClass(options.exClass);

            self.content.css({
                width: options.width,
                height: '100%',
                position: 'fixed',
                top: 0,
                zIndex: options.zIndex
            })

            self.bgMask.css({
                width: '100%',
                height: '100%',
                background: options.background,
                position: 'absolute',
                top: 0,
                right: 0
            })

            self.closeBtn.css({
                position: 'absolute',
                top: '5px',
                right: '5px',
                fontSize: '24px',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'normal',
                cursor: 'pointer',
                zIndex: options.zIndex + 10
            })

            self.main.css({
                overflow: 'auto',
                position: 'absolute',
                top: 0,
                left: 0,
                padding: options.contentType != 'iframe' ? options.padding : 0
            })

            self.mask.css({
                width: '100%',
                height: '100%',
                background: 'rgba(100, 100 ,100, 0.5)',
                display: 'none',
                position: 'fixed',
                top: 0,
                left: 0
            })

            if(!options.isShowCloseBtn){
                self.closeBtn.hide();
            }

            //根据不同的切换效果，调整定位
            switch (options.animate){
                case 'toggle':
                case 'fade':
                    if(options.direction == 'left'){
                        self.content.css({
                            left: 0,
                            display: 'none'
                        })
                    }
                    if(options.direction == 'right'){
                        self.content.css({
                            right: 0,
                            display: 'none'
                        })
                    }
                    break;
                case 'slide':
                    if(options.direction == 'left'){
                        self.content.css({
                            left: - options.width
                        })
                    }
                    if(options.direction == 'right'){
                        self.content.css({
                            right: - options.width
                        })
                    }
            }

            if(options.isBlur){
                self.bgMask.css({
                    webkitFilter: 'blur(3px)'
                })
            }
        },

        open: function(){
            var self = this;
            var options = self.options;

            switch (options.animate){
                case 'toggle':
                    self.content.show();
                    break;
                case 'fade':
                    self.content.fadeIn();
                    break;
                case 'slide':

                    if(options.isBlur){
                        self.bgMask.css({
                            webkitFilter: 'blur(3px)'
                        })
                    }

                    if(options.direction == 'left'){
                        self.content.animate({
                            left: 0
                        })
                    }
                    if(options.direction == 'right'){
                        self.content.animate({
                            right: 0
                        })
                    }
                    break;
            }

            if(options.isMask){
                self.mask.show();
            }
        },

        close: function(){
            var self = this;
            var options = self.options;

            switch (options.animate){
                case 'toggle':
                    self.content.hide();
                    break;
                case 'fade':
                    self.content.fadeOut();
                    break;
                case 'slide':
                    //为了使动作平滑，需要去毛玻璃效果
                    self.bgMask.css({
                        webkitFilter: 'none'
                    })
                    if(options.direction == 'left'){
                        self.content.animate({
                            left: - options.width
                        })
                    }
                    if(options.direction == 'right'){
                        self.content.animate({
                            right: - options.width
                        })
                    }
                    break;

            }

            if(options.isMask){
                self.mask.hide();
            }
        },

        remove: function(){
            var self = this;
            self.mask.remove();
            self.content.remove();
        },

        render: function(){
            var self = this;
            var options = self.options;

            var content = null;
            switch (options.contentType){
                case 'string':
                    content = options.content;
                    break;
                case 'html':
                    $.ajax({
                        url: options.content,
                        dataType: 'html',
                        async: false,
                        success: function(res){
                            content = res;
                        }
                    })
                    break;
                case 'iframe':
                    content = $("<iframe></iframe>").addClass("i_sidebar_iframe").attr({
                        src: options.content,
                        name: 'i_sidebar_iframe'
                    }).css({
                        width: options.width,
                        height: $(window).height(),
                        border: 'none'
                    }).hide();

                    content.load(function(){
                        content.show();
                    })
                    break;
            }

            self.content.html("");

            self.mask = $("<div></div>").addClass("i_sidebar_mask i_mask");
            self.bgMask = $("<div></div>").addClass("i_sidebar_bgMask");

            self.closeBtn = $("<a></a>").addClass("i_sidebar_colse").text('×');

            self.main = $("<div></div>").addClass("i_sidebar_main").html(content);

            self.content.append(self.bgMask);
            self.content.append(self.closeBtn);
            self.content.append(self.main);

            self.container.append(self.mask);
            self.container.append(self.content);
        },

        bindEvent: function(){
            var self = this;
            var options = self.options;

            self.closeBtn.click(function(){
                self.close();
            })

            self.mask.click(function(){
                self.close();
            })

            if(options.contentType == 'iframe'){
                $(window).resize(function(){
                    self.main.find(".i_sidebar_iframe").height($(window).height());
                })
            }

            if (options.isKeyControl) {
                $(window).bind('keydown', function (event) {
                    switch (event.keyCode) {
                        //esc
                        case 27:
                            self.close();
                            break;
                    }
                })
            }
        }
    })

    module.exports = Sidebar;

})