define(function (require, exports, module) {
    /**
     * 弹层组件
     *
     * @author elianlin@tencent.com
     * @time 2013-11-08
     */
    "use strict";

    var JSON = require('JSON');
    var $ = require('$');
    var Class = require('Class');

    require('res/css/base.css');
    require('res/css/dialog.css');
    require('res/css/icons.css');

    exports.common = function(options){
        return new Dialog(options);
    }

    exports.alert = function(options){
        var setting = {
            id: 'i_alert_' + new Date().getTime(),
            title: '',
            content: '',
            theme: 'default',               //样式主题，可设置项有：default、bootstrap、metro
            skin: 'grey',                   //主题颜色，可设置项有：grey、red、blue、green、orange、purple
            exClass: '',
            zIndex: 10000,                  //浮层的层级
            isMask: true,                   //是否显示浮层
            ok: function(){

            }
        }

        setting = $.extend({}, setting, options);

        var opt = {
            id: setting.id,
            width: 400,
            height: 'auto',
            title: setting.title,
            content: setting.content,
            btns: [{
                text: '确定',
                className: 'okButton',
                callback: setting.ok
            }],
            target: setting.target,
            onOpenBefore: function(){},
            onOpenAfter: function(){},
            onCloseBefore: function(){},
            onCloseAfter: function(){},
            timeout: 0,
            exClass: setting.exClass,
            theme: setting.theme,
            skin: setting.skin,
            padding: '40px 20px',
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
            zIndex: setting.zIndex,
            isMask: setting.isMask,
            isFixed: true,
            isShowCloseBtn: false,
            isMaskClose: false,
            isKeyControl: false
        }

        return new Dialog(opt);
    }

    exports.confirm = function(options){
        var setting = {
            id: 'i_confirm_' + new Date().getTime(),
            title: '',
            content: '',
            theme: 'default',               //样式主题，可设置项有：default、bootstrap、metro
            skin: 'grey',                   //主题颜色，可设置项有：grey、red、blue、green、orange、purple
            exClass: '',
            zIndex: 10000,                  //浮层的层级
            isMask: true,                   //是否显示浮层
            ok: function(){

            },
            cancel: function(){

            }
        }

        setting = $.extend({}, setting, options);

        var opt = {
            id: setting.id,
            width: 400,
            height: 'auto',
            title: setting.title,
            content: setting.content,
            btns: [{
                text: '确定',
                className: 'okButton',
                callback: setting.ok
            },{
                text: '取消',
                className: 'cancelButton',
                callback: setting.cancel
            }],
            target: setting.target,
            onOpenBefore: function(){},
            onOpenAfter: function(){},
            onCloseBefore: function(){},
            onCloseAfter: function(){},
            timeout: 0,
            exClass: setting.exClass,
            theme: setting.theme,
            skin: setting.skin,
            padding: '40px 20px',
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
            zIndex: setting.zIndex,
            isMask: setting.isMask,
            isFixed: true,
            isShowCloseBtn: false,
            isMaskClose: false,
            isKeyControl: false
        }

        return new Dialog(opt);
    }

    var Dialog = Class.extend({
        //可配置参数
        setting: {
            id: null,                       //浮层ID
            width: 400,                     //浮层的宽
            height: 'auto',                 //浮层的高
            title: '',                      //浮层标题
            content: '',                    //浮层内容
            btns: [],                       //定义浮层按钮,结构：{text: '确定', className: 'submitBtn', callback:function(){}}
            target: 'self',                 //要弹层的页面,可设置项有：self、parent、top
            onOpenBefore: function(){},     //浮层打开前的事件
            onOpenAfter: function(){},      //浮层打开后的事件
            onCloseBefore: function(){},    //关闭浮层前触发的事件
            onCloseAfter: function(){},     //关闭浮层后触发的事件
            timeout: 0,                     //自动关闭时间，单位为秒，设0为不关闭
            exClass: '',                    //附加的 class
            theme: 'default',               //样式主题，可设置项有：default、bootstrap、metro
            skin: 'grey',                   //主题颜色，可设置项有：grey、red、blue、green、orange、purple
            padding: '',                    //内容区域内边距
            top: 'auto',                    //浮层的顶部定位
            bottom: 'auto',                 //浮层的底部定位
            left: 'auto',                   //浮层的左边定位
            right: 'auto',                  //浮层的右边定位
            zIndex: 10000,                  //浮层的层级
            isMask: true,                   //是否显示浮层
            isFixed: true,                  //是否fixed定否
            isShowCloseBtn: true,           //是否显示关闭按钮
            isMaskClose: false,              //是否点击遮罩就关闭浮层
            isKeyControl: true              //是否开启esc快捷键关闭浮层
        },

        options: {},

        //组件容器对象
        win: null,
        doc: null,
        container: null,
        content: null,
        contentBar: null,
        mask: null,

        show: {
            titleBar: true,
            btnsBar: true,
            closeBtn: true
        },

        init: function (options) {
            this.options = $.extend({}, this.setting, options);

            this.checkOptions();
            this.getDocument();

            if (this.doc.find("#" + this.options.id).length > 0) {
                return false;
            }

            this.insertCss();

            this.container = this.doc.find("body");

            this.content = $('<div>').addClass('i_dialog').attr("id", this.options.id);
            this.mask = $('<div>').addClass('i_mask');

            //触发打开前事件
            if (this.options.onOpenBefore) {
                this.options.onOpenBefore();
            }

            this.setShow();
            this.render();
            this.setStyle();
            this.bindEvent();
            this.container.append(this.content);
            this.setLayout();

            //触发打开后事件
            if (this.options.onOpenAfter) {
                this.options.onOpenAfter();
            }
        },

        //参数校验
        checkOptions: function () {
            if (!this.options.id) {
                this.options.id = 'i_dialog_' + (new Date()).getTime();
            }

            if (isNaN(this.options.top) && this.options.top != "center") {
                this.options.top = "auto";
            }
            if (isNaN(this.options.bottom) && this.options.bottom != "center") {
                this.options.bottom = "auto";
            }
            if (isNaN(this.options.left) && this.options.left != "center") {
                this.options.left = "auto";
            }
            if (isNaN(this.options.right) && this.options.right != "center") {
                this.options.right = "auto";
            }

            if (this.options.top == "auto" && this.options.bottom == "auto") {
                this.options.top = "center";
            }
            if (this.options.left == "auto" && this.options.right == "auto") {
                this.options.left = "center";
            }

            //fix IE6 不支持fixed定位，作降级服务
            if (!-[1,] && !window.XMLHttpRequest) {
                this.options.isFixed = false;
            }

            this.options.timeout = parseInt(this.options.timeout);
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

        insertCss: function(){
            var self = this;

            var baseCss = seajs.data.paths.res + '/css/base.css';
            var dialogCss = seajs.data.paths.res + '/css/dialog.css';
            var iconsCss  = seajs.data.paths.res + '/css/icons.css';

            var baseCssStyle = '<link charset="utf-8" rel="stylesheet" href="' + baseCss + '">';
            var dialogCssStyle = '<link charset="utf-8" rel="stylesheet" href="' + dialogCss + '">';
            var iconsCssStyle = '<link charset="utf-8" rel="stylesheet" href="' + iconsCss + '">';

            if(self.doc.find("link[href='" + baseCss + "']").length == 0){
                self.doc.find("head").append(baseCssStyle);
            }

            if(self.doc.find("link[href='" + dialogCss + "']").length == 0){
                self.doc.find("head").append(dialogCssStyle);
            }

            if(self.doc.find("link[href='" + iconsCss + "']").length == 0){
                self.doc.find("head").append(iconsCssStyle);
            }
        },

        setShow: function () {
            var options = this.options;

            if (!options.title || options.title == "null" || options.title == "false") {
                this.show.titleBar = false;
            }else{
                this.show.titleBar = true;
            }

            if (!options.btns || options.btns.length == 0) {
                this.show.btnsBar = false;
            }else{
                this.show.btnsBar = true;
            }

            this.show.closeBtn = options.isShowCloseBtn && true;
        },

        //设置样式
        setStyle: function () {
            var self = this;
            var options = self.options;

            //设置主题风格样式
            self.content.addClass('i_' + this.options.theme);

            //设置主题颜色
            self.content.addClass('i_' + this.options.skin);

            //设置扩展类
            if (self.options.exClass) {
                self.content.addClass(this.options.exClass);
            }

            self.content.css({
                zIndex: options.zIndex
            });

            self.contentBar.css({
                width: options.width,
                height: isNaN(options.height) ? options.height : options.height + 'px'
            })

            self.setLayout();
        },

        //设置定位
        setLayout: function () {
            var options = this.options;
            var winWidth = this.win.width();
            var winHeight = this.win.height();
            var dialogWidth = this.content.width() + 2;
            var dialogHeight = this.content.height() + 2;

            var position = {
                position: options.isFixed ? 'fixed' : 'absolute',
                top: options.top == "center" ? ((winHeight - dialogHeight) / 2) : options.top,
                bottom: options.bottom == "center" ? ((winHeight - dialogHeight) / 2) : options.bottom,
                left: options.left == "center" ? ((winWidth - dialogWidth) / 2) : options.left,
                right: options.right == "center" ? ((winWidth - dialogWidth) / 2) : options.right
            }

            //绝对定位时，只能设置top,若设置了bottom,则进行转换
            if (!options.isFixed) {
                if (!isNaN(position.bottom)) {
                    position.top = this.win.scrollTop() + winHeight - ( position.bottom * 1 + dialogHeight * 1);
                } else {
                    position.top = this.win.scrollTop() + ((winHeight - dialogHeight) / 2);
                }
                position.bottom = "auto";
            }

            //将数字加上单位“px”
            for (var k in position) {
                if (!isNaN(position[k])) {
                    position[k] += 'px';
                }
            }

            this.content.css(position)
        },

        bindEvent: function () {
            var self = this;
            var options = this.options;

            if (options.isFixed) {
                this.win.resize(function () {
                    self.setLayout();
                    self.setMaskStyle();
                });
            }

            //点击浮层关闭
            if (self.mask && options.isMaskClose) {
                self.mask.click(function () {
                    self.close();
                })
            }

            //esc快捷键关闭
            if (options.isKeyControl) {
                $(window).bind('keydown', function (event) {
                    if(event.keyCode == 27){
                        self.close();
                    }
                })
            }

            //自动关闭
            if(options.timeout > 0){
                setTimeout(function(){
                    self.close();
                }, options.timeout * 1000)
            }
        },

        //渲染组件
        render: function () {
            var self = this;
            var options = this.options;
            var content = this.content.html("");
            var show = this.show;

            if (self.options.isMask) {
                self.addMask();
            }

            if (show.titleBar) {
                var titleBar = $("<div>").text(options.title).addClass("i_dialogTitle");
                content.append(titleBar);
            }

            if (show.closeBtn) {
                var closeBtn = $("<a>").addClass("i_closeBtn i_icon i_icon_close").click(function () {
                    self.close();
                })

                if (options.theme == "metro") {
                    closeBtn.addClass("i_btn");
                }

                if (show.titleBar) {
                    closeBtn.appendTo(titleBar);
                } else {
                    closeBtn.appendTo(content);
                }
            }

            self.contentBar = $("<div>").html(options.content).addClass("i_dialogContent").css({
                padding: options.padding
            });
            content.append(self.contentBar);

            if (show.btnsBar) {
                var btnsBar = $("<div>").addClass("i_dialogBtns");
                for (var i in options.btns) {
                    (function(i){
                        $("<a>").addClass("i_btn").addClass(options.btns[i].className).text(options.btns[i].text).click(function () {
                            var rs = options.btns[i].callback();
                            if(rs || typeof rs == "undefined"){
                                self.close();
                            };
                        }).appendTo(btnsBar);
                    }(i));
                }
                content.append(btnsBar);
            }
        },

        close: function () {
            //触发关闭前事件
            if (this.options.onCloseBefore) {
                this.options.onCloseBefore();
            }

            this.content.remove();
            if (this.mask) {
                this.removeMask();
            }

            //触发关闭后事件
            if (this.options.onCloseAfter) {
                this.options.onCloseAfter();
            }

        },

        addMask: function () {
            this.container.append(this.mask);
            this.setMaskStyle();
        },

        setMaskStyle: function () {
            var self = this;
            var maskHeight = self.win.height() > self.doc.height() ? self.win.height() : self.doc.height()

            self.mask.height(maskHeight).css({
                zIndex: self.options.zIndex - 1
            });

        },

        removeMask: function () {
            this.mask.remove();
        }

    });

})