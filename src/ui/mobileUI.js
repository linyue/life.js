define(function (require, exports, module) {

    /**
     * 自定义UI控件
     *
     * @author elianlin@tencent.com
     * @time 2013-07-14
     */

    "use strict";

    var $ = require('$');
    var Class = require('Class');

    require("src/plugin/jquery.mobiscroll")($);

    require('baseCss');
    require('res/css/mobiscroll.css');
//    require('../../res/css/mobileUI.css');


    var Alert = Class.extend({
        //可配置参数
        options: {
            title: '温馨提示',           //标题
            content: '',                //内容
            onOk: null,                 //加载完成后执行的回调函数
            isMask: true,               //是否打开遮罩
            skin: 'grey',
            exClass: ''                 //附加的 class
        },

        skin: ['grey', 'red', 'blue', 'yellow', 'green', 'purple'],

        //组件容器对象
        win: $(window.top),
        doc: $(window.top.document),
        container: null,
        title: null,
        content: null,
        mask: null,
        btnBar: null,
        okBtn: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.render();
            this.setStyle();
            this.bindEvent();

            this.doc.find("body").append(this.mask).append(this.container);
        },

        //参数校验
        checkOptions: function(){

            this.options.isMask = this.options.isMask && true;

            if($.inArray(this.options.skin, this.skin) == -1){
                this.options.skin = this.skin[0];
            }

        },

        //设置样式
        setStyle: function(){
            var self = this;
            var options = self.options;

            //设置颜色
            this.content.addClass('i_mui_' + this.options.skin);

            //设置扩展类
            if (options.exClass) {
                self.content.addClass(options.exClass);
            }

            self.mask.width('100%').height(self.win.height()).css({
                background: 'rgba(0, 0, 0, .7)',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 1010000000
            })

            self.container.width(280).css({
                background: '#292829',
                position: 'fixed',
                left: '50%',
                top: '50%',
                zIndex: 1110000000,
                marginLeft: '-140px',
                marginTop: '-80px',
                fontSize: '14px'
            })

            self.title.height(35).css({
                borderBottom: '2px solid ' + self.getColor(),
                padding: 0,
                margin: 0,
                lineHeight: '35px',
                textIndent: '10px'
            })

            self.content.width(240).css({
                padding: '25px 20px',
                lineHeight: '30px',
                textAlign: 'center'
            })

            self.btnBar.height(37).css({
                borderTop: '1px solid #424542'
            })

            self.okBtn.width('100%').height(37).css({
                display: 'block',
                margin: '0',
                textDecoration: 'none',
                textAlign: 'center',
                lineHeight: '37px',
                cursor: 'pointer'
            })
        },

        getColor: function(){
            var colorMap = {
                red: '#ee4e10',
                blue: '#2aa1d3',
                orange: '#faa732',
                green: '#77bb00',
                purple: '#aa44ff',
                grey: '#909090'
            }
            return colorMap[this.options.skin];
        },

        colse: function(){
            var self = this;
            var options = self.options;

            self.mask.remove();
            self.container.remove();
        },

        //绑定事件
        bindEvent: function(){
            var self = this;
            var options = self.options;

            self.okBtn.click(function(){
                self.colse();
                if(options.onOk){
                    options.onOk();
                }
            })

            self.okBtn.mousedown(function(){
                $(this).css({
                    background: self.getColor()
                })
            })

            self.okBtn.mouseleave(function(){
                $(this).css({
                    background: 'none'
                })
            })
            self.okBtn.mouseup(function(){
                $(this).css({
                    background: 'none'
                })
            })

        },


        //渲染组件
        render: function () {
            var self = this;
            var options = self.options;

            self.container = $('<div>').addClass('i_mui_dialog');
            self.mask = $("<div>").addClass("i_mui_mask");

            self.title = $("<p>").text(options.title || '温馨提示').addClass("i_mui_dialog_title")
            if(options.title){
                self.title.appendTo(self.container);
            }
            self.content = $("<div>").addClass("i_mui_dialog_content").html(options.content).appendTo(self.container);
            self.btnBar = $("<div>").addClass("i_mui_dialog_btnBar").appendTo(self.container);
            self.okBtn = $("<a>").text("确定").addClass("i_mui_dialog_btn").appendTo(self.btnBar);

        }
    })

    var Confirm = Alert.extend({

        options: {
            title: '温馨提示',
            content: '',                    //内容
            onOk: null,                 //加载完成后执行的回调函数
            onCancel: null,
            isMask: true,                   //是否打开遮罩
            skin: 'grey',
            exClass: ''                     //附加的 class
        },

        cancelBtn: null,


        //设置样式
        setStyle: function(){
            var self = this;
            self._super();

            self.okBtn.width('50%').css({
                float: 'left'
            });
            self.cancelBtn.width('50%').height(37).css({
                float: 'left',
                marginLeft: '-1px',
                borderLeft: '1px solid #424542',
                textDecoration: 'none',
                textAlign: 'center',
                lineHeight: '37px',
                cursor: 'pointer'
            })
        },

        //绑定事件
        bindEvent: function(){
            var self = this;
            var options = self.options;
            self._super();

            self.cancelBtn.click(function(){
                self.colse();
                if(options.onCancel){
                    options.onCancel();
                }
            })

            self.cancelBtn.mousedown(function(){
                $(this).css({
                    background: self.getColor()
                })
            })
            self.cancelBtn.mouseleave(function(){
                $(this).css({
                    background: 'none'
                })
            })
            self.cancelBtn.mouseup(function(){
                $(this).css({
                    background: 'none'
                })
            })
        },

        render: function(){
            var self = this;
            self._super();

            self.cancelBtn = $("<a>").text("取消").addClass("i_mui_dialog_btn").appendTo(self.btnBar);
        }
    })

    var Number = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            initData: null,                 //初始化数据
            callback: null,                 //加载完成后执行的回调函数
            onChange: function(num){},      //数据更改时的回调,参数为更改后的值
            exClass: '',                    //附加的 class
            step: 1,                        //最次增减幅度
            min: null,                      //最小值限制，null为不限制
            max: null,                      //最大值限制，null为不限制
            theme: 'light',
            skin: 'grey',
            type: 'int',                    //数字类型，int、float
            isModify: true                  //是否允许修改
        },

        //枚举值
        type: ['int', 'float'],
        skin: ['grey', 'red', 'blue', 'orange', 'green', 'purple'],
        theme: ['light', 'dark'],

        //组件容器对象
        container: null,
        content: null,
        input: null,
        add: null,
        cut: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_mui_number');

            this.render();
            this.setStyle();
            this.bindEvent();

            this.container.append(this.content);

            if(this.options.callback){
                this.options.callback(this.input.val());
            }
        },

        //参数校验
        checkOptions: function(){

            if(!$.isNumeric(this.options.step)){
                this.options.step = 1;
            }

            if(!$.isNumeric(this.options.initData)){
                this.options.initData = 0;
            }

            if(!$.isNumeric(this.options.min)){
                this.options.min = null;
            }

            if(!$.isNumeric(this.options.max)){
                this.options.max = null;
            }

            if($.inArray(this.options.type, this.type) == -1){
                this.options.type = this.type[0];
            }

            if($.inArray(this.options.theme, this.theme) == -1){
                this.options.theme = this.theme[0];
            }

            if($.inArray(this.options.skin, this.skin) == -1){
                this.options.skin = this.skin[0];
            }

            this.options.isModify = this.options.isModify && true;

        },

        //设置样式
        setStyle: function(){
            var self = this;
            var options = self.options;

            //设置风格
            this.content.addClass('i_mui_' + this.options.theme);

            //设置颜色
            this.content.addClass('i_mui_' + this.options.skin);

            //设置扩展类
            if (options.exClass) {
                self.content.addClass(options.exClass);
            }

            //设置是否允许修改
            if (!options.isModify){
                self.input.attr("readonly","readonly")
            }
        },

        //设置值
        setValue: function(num){
            var self = this;
            var options = self.options;

            if($.isNumeric(num)){
                self.input.val(num);
                self.input.trigger("change");
            }
        },

        //获取值
        getValue: function(){
            return this.input.val() * 1;
        },


        //绑定事件
        bindEvent: function(){
            var self = this;
            var options = self.options;

            self.cut.click(function(){
                if(options.isModify){
                    self.setValue(self.getValue() - options.step);
                }
            })

            self.add.click(function(){
                if(options.isModify){
                    self.setValue(self.getValue() + options.step);
                }
            })

            self.input.change(function(){
                var value = self.getValue();

                if(options.type == 'int'){
                    value = parseInt(value);
                }else{
                    value = parseFloat(value).toFixed(2);
                }

                if(options.max && value > options.max){
                    value = options.max;
                }


                if(options.min && value < options.min){
                    value = options.min;
                }

                self.input.val(value);

                if(options.onChange){
                    options.onChange(value);
                }
            })

        },

        //渲染组件
        render: function () {
            var self = this;
            var options = self.options;
            self.content.html("");

            self.cut = $("<div>－</div>").addClass("i_mui_number_cut i_mui_button").appendTo(self.content);

            self.input = $("<input type='text' name='i_mui_number'>").addClass("i_mui_number_input i_mui_input").appendTo(self.content);

            self.add = $("<div>＋</div>").addClass("i_mui_number_add i_mui_button").appendTo(self.content);

            this.setValue(options.initData);

        }
    })


    /**
     * 进度条组件
     * @type {*|void}
     */
    var Progress = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            width: 200,                     //组件宽度
            initData: null,                 //初始化数据
            callback: null,                 //加载完成后执行的回调函数
            onChange: function(num){},      //进度更改时的回调,参数当前进度值
            onComplete: null,       //进度为100时的事件
            theme: 'light',
            skin: 'grey',
            exClass: '',                    //附加的 class
            isAnimate: true                 //是否有动画效果
        },

        skin: ['grey', 'red', 'blue', 'orange', 'green', 'purple'],
        theme: ['light', 'dark'],

        //组件容器对象
        container: null,
        content: null,
        chart: null,
        text: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_mui_progress');

            this.render();
            this.setStyle();
            this.bindEvent();

            this.container.append(this.content);

            if(this.options.callback){
                this.options.callback(this);
            }
        },

        //参数校验
        checkOptions: function(){

            if(!$.isNumeric(this.options.initData)){
                this.options.initData = 0;
            }

            this.options.isAnimate = this.options.isAnimate && true;

            if($.inArray(this.options.theme, this.theme) == -1){
                this.options.theme = this.theme[0];
            }

            if($.inArray(this.options.skin, this.skin) == -1){
                this.options.skin = this.skin[0];
            }

        },

        //设置样式
        setStyle: function(){
            var self = this;
            var options = self.options;

            self.content.width(options.width);

            //设置风格
            this.content.addClass('i_mui_' + this.options.theme);

            //设置颜色
            this.content.addClass('i_mui_' + this.options.skin);

            //设置扩展类
            if (options.exClass) {
                self.content.addClass(options.exClass);
            }
        },

        //设置值
        setValue: function(num){
            var self = this;
            var options = self.options;

            if(self.content.width() == 0){
                var width = num + '%';
            }else{
                var width = self.content.width() / 100 * num + 'px';
            }

            if($.isNumeric(num)){
                if(options.isAnimate){
                    self.chart.stop();
                    self.chart.animate({
                        width: width
                    },500);
                }else{
                    self.chart.width(width);
                }

                self.text.html(num + '%');

                if(options.onChange){
                    options.onChange(num);
                }

                if(options.onComplete && num == 100){
                    options.onComplete();
                }

            }
        },

        //获取值
        getValue: function(){
            return this.text.text();
        },


        //绑定事件
        bindEvent: function(){
            var self = this;
            var options = self.options;

        },

        //渲染组件
        render: function () {
            var self = this;
            var options = self.options;
            self.content.html("");

            self.chart = $("<div>").addClass("i_mui_progress_chart").appendTo(self.content);

            self.text = $("<div>").addClass("i_mui_progress_text").appendTo(self.content);

            this.setValue(options.initData);
        }
    })



    /**
     * 切换开关组件
     * @type {*|void}
     */
    var SwitchBar = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            initData: null,                 //初始化数据
            callback: null,                 //加载完成后执行的回调函数
            onChange: function(status){},   //状态更改时的回调,参数当前状态度值
            theme: 'light',
            skin: 'grey',
            exClass: '',                    //附加的 class
            isAnimate: true                 //是否有动画效果
        },

        //枚举值
        status: ['on', 'off'],
        skin: ['grey', 'red', 'blue', 'orange', 'green', 'purple'],
        theme: ['light', 'dark'],

        //组件容器对象
        container: null,
        content: null,
        btn: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_mui_switchBar');

            this.render();
            this.setStyle();
            this.bindEvent();

            this.container.append(this.content);

            if(this.options.callback){
                this.options.callback(this);
            }
        },

        //参数校验
        checkOptions: function(){

            if($.inArray(this.options.initData, this.status) == -1){
                this.options.initData = this.status[0];
            }

            this.options.isAnimate = this.options.isAnimate && true;

            if($.inArray(this.options.theme, this.theme) == -1){
                this.options.theme = this.theme[0];
            }

            if($.inArray(this.options.skin, this.skin) == -1){
                this.options.skin = this.skin[0];
            }

        },

        //设置样式
        setStyle: function(){
            var self = this;
            var options = self.options;

            //设置风格
            this.content.addClass('i_mui_' + this.options.theme);

            //设置颜色
            this.content.addClass('i_mui_' + this.options.skin);

            //设置扩展类
            if (options.exClass) {
                self.content.addClass(options.exClass);
            }
        },

        //设置值
        setValue: function(status){
            var self = this;
            var options = self.options;

            if(status == 'on'){
                if(options.isAnimate){
                    self.btn.animate({
                        left: '42px'
                    },400);
                    setTimeout(function(){
                        self.content.addClass("i_active");
                        if(options.onChange){
                            options.onChange(self.getValue());
                        }
                    },400);
                }else{
                    self.btn.css({
                        left: '42px'
                    });
                    self.content.addClass("i_active");
                    if(options.onChange){
                        options.onChange(self.getValue());
                    }
                }
            }else{
                if(options.isAnimate){
                    self.btn.animate({
                        left: '2px'
                    },400);
                    setTimeout(function(){
                        self.content.removeClass("i_active");
                        if(options.onChange){
                            options.onChange(self.getValue());
                        }
                    },400);
                }else{
                    self.btn.css({
                        left: '2px'
                    });
                    self.content.removeClass("i_active");
                    if(options.onChange){
                        options.onChange(self.getValue());
                    }
                }
            }
        },

        //获取值
        getValue: function(){
            return this.content.hasClass("i_active") ? 'on' : 'off';
        },


        //绑定事件
        bindEvent: function(){
            var self = this;
            var options = self.options;

            self.btn.click(function(){
                self.setValue(!self.content.hasClass("i_active") ? 'on' : 'off');
            })

        },

        //渲染组件
        render: function () {
            var self = this;
            var options = self.options;
            self.content.html("");

            self.btn = $("<a>").addClass("i_mui_switchBar_btn").appendTo(self.content);

            this.setValue(options.initData);
        }
    })


    /**
     * 滑动条控件
     * @type {*|void}
     */
    var SlideBar = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            width: 250,
            min: 0,
            max: 100,
            initData: 0,                    //初始化数据
            callback: null,                 //加载完成后执行的回调函数
            onChange: function(status){},   //状态更改时的回调,参数当前状态度值
            theme: 'light',
            skin: 'grey',
            type: 'int',                    //是否只允许为整数
            exClass: ''                     //附加的 class
        },

        //枚举值
        type: ['int', 'float'],
        skin: ['grey', 'red', 'blue', 'orange', 'green', 'purple'],
        theme: ['light', 'dark'],

        //组件容器对象
        container: null,
        content: null,
        bar: null,
        btn: null,
        text: null,

        isModuseDown: false,
        touch: {

        },

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_mui_slideBar');

            this.render();
            this.setStyle();
            this.bindEvent();

            if(this.options.callback){
                this.options.callback(this);
            }
        },

        //参数校验
        checkOptions: function(){
            if($.inArray(this.options.type, this.type) == -1){
                this.options.type = this.type[0];
            }

            if($.inArray(this.options.theme, this.theme) == -1){
                this.options.theme = this.theme[0];
            }

            if($.inArray(this.options.skin, this.skin) == -1){
                this.options.skin = this.skin[0];
            }

        },

        //设置样式
        setStyle: function(){
            var self = this;
            var options = self.options;


            self.content.width(options.width);
            self.bar.width(options.width - 22);

            self.text.css({
                marginLeft: - self.text.width() / 2 - 5 + 'px'
            })

            //设置风格
            this.content.addClass('i_mui_' + this.options.theme);

            //设置颜色
            this.content.addClass('i_mui_' + this.options.skin);

            //设置扩展类
            if (options.exClass) {
                self.content.addClass(options.exClass);
            }
        },

        //设置值
        setValue: function(value){
            var self = this;
            var options = self.options;

            if(value < options.min){
                value = options.min;
            }

            if(value > options.max){
                value = options.max;
            }

            if(options.type == 'int'){
                value = parseInt(value);
            }else{
                value = parseFloat(value).toFixed(2);
            }

            var length = options.max - options.min;
            var width = (value - options.min) / length * 100 + '%';

            self.btn.css({
                left: width
            }).attr("data_value", value);
            self.text.html(value);

            self.text.css({
                marginLeft: - self.text.width() / 2 - 5 + 'px'
            })

            if(options.onChange){
                options.onChange(value);
            }
        },

        //获取值
        getValue: function(){
            return this.btn.attr("data_value");
        },


        eventDown: function(e){
            var self = this;

            self.mousedown=true;

            e=e.originalEvent;
            if(e.changedTouches){
                e=e.changedTouches[e.changedTouches.length-1];
            }

            self.touch.startX = e.pageX;
            self.touch.startLeft = this.btn.css("left").replace("px","") * 1;
        },

        eventMove: function(e){
            var self = this;
            var options = self.options;

            if(self.mousedown){

                e = e.originalEvent;
                if(e.changedTouches){
                    e = e.changedTouches[e.changedTouches.length-1];
                }

                self.touch.moveX = e.pageX;

                var moveWidth = self.touch.startX - self.touch.moveX;
                var endLeft = self.touch.startLeft - moveWidth;
                var value = (endLeft / (self.bar.width())) * (options.max - options.min);

                self.setValue(value)
            }

        },

        eventUp: function(e){
            var self = this;
            var options = self.options;

            if(self.mousedown){

                e = e.originalEvent;
                if(e.changedTouches){
                    e = e.changedTouches[e.changedTouches.length-1];
                }

                self.touch.endX = e.pageX;

                var moveWidth = self.touch.startX - self.touch.endX;
                var endLeft = self.touch.startLeft - moveWidth;
                var value = (endLeft / (self.bar.width())) * (options.max - options.min);

                self.setValue(value)

                self.mousedown = false;
            }
        },


        //绑定事件
        bindEvent: function(){
            var self = this;
            var options = self.options;

            self.btn.bind('touchstart', function(e){
                self.eventDown(e)
            });
            $(document).bind('touchend', function(e){
                self.eventUp(e)
            });
            $(document).bind('touchmove', function(e){
                self.eventMove(e)
            });
            self.btn.bind('mousedown', function(e){
                self.eventDown(e)
            });
            $(document).bind('mouseup', function(e){
                self.eventUp(e)
            });
            $(document).bind('mousemove', function(e){
                self.eventMove(e)
            });

        },

        //渲染组件
        render: function () {
            var self = this;
            var options = self.options;
            self.content.html("");

            var bar = $("<div class='i_mui_slideBar_bar'><div></div></div>").appendTo(self.content);
            self.bar = bar.find("div");
            self.btn = $("<div>").addClass("i_mui_slideBar_btn").appendTo(self.bar);
            self.text = $("<div>").addClass("i_mui_slideBar_text").appendTo(self.btn);

            this.container.append(this.content);

            self.setValue(options.initData);
        }
    })

    /**
     * 滑动条控件
     * @type {*|void}
     */
    var RangeBar = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            width: 250,
            min: 0,
            max: 100,
            initData: [38,88],              //初始化数据
            callback: null,                 //加载完成后执行的回调函数
            onChange: function(values){},   //状态更改时的回调,参数当前状态度值
            theme: 'light',
            skin: 'grey',
            type: 'int',
            exClass: ''                     //附加的 class
        },

        //枚举值
        type: ['int', 'float'],
        skin: ['grey', 'red', 'blue', 'orange', 'green', 'purple'],
        theme: ['light', 'dark'],

        //组件容器对象
        container: null,
        content: null,
        bar: null,
        btn: null,
        text: null,

        isModuseDown: false,
        eventBtn: null,
        eventBtnIndex: null,
        touch: {

        },

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_mui_rangeBar');

            this.render();
            this.setStyle();
            this.bindEvent();

            if(this.options.callback){
                this.options.callback(this);
            }
        },

        //参数校验
        checkOptions: function(){

            if($.inArray(this.options.type, this.type) == -1){
                this.options.type = this.type[0];
            }

            if($.inArray(this.options.theme, this.theme) == -1){
                this.options.theme = this.theme[0];
            }

            if($.inArray(this.options.skin, this.skin) == -1){
                this.options.skin = this.skin[0];
            }

        },

        //设置样式
        setStyle: function(){
            var self = this;
            var options = self.options;


            self.content.width(options.width);
            self.bar.width(options.width - 22);

            self.bigText.css({
                marginLeft: - self.bigText.width() / 2 - 5 + 'px'
            })
            self.smallText.css({
                marginLeft: - self.smallText.width() / 2 - 5 + 'px'
            })

            //设置风格
            this.content.addClass('i_mui_' + this.options.theme);

            //设置颜色
            this.content.addClass('i_mui_' + this.options.skin);

            //设置扩展类
            if (options.exClass) {
                self.content.addClass(options.exClass);
            }
        },

        //设置值
        setValue: function(values){
            var self = this;
            var options = self.options;

            if(values[0] < options.min){
                values[0] = options.min;
            }

            if(values[1] > options.max){
                values[1] = options.max;
            }

            if(self.mousedown){
                if(self.eventBtnIndex == 0){
                    if(values[0] > values[1]){
                        values[0] = values[1];
                    }
                }else{
                    if(values[1] < values[0]){
                        values[1] = values[0];
                    }
                }
            }else{
                if(values[0] >= values[1]){
                    values[0] = values[1];
                }
            }

            if(options.type == 'int'){
                values[0] = parseInt(values[0]);
                values[1] = parseInt(values[1]);
            }else{
                values[0] = parseFloat(values[0]).toFixed(2);
                values[1] = parseFloat(values[1]).toFixed(2);
            }

            var length = options.max - options.min;
            var smallWidth = (values[0] - options.min) / length * 100 + '%';
            var bigWidth = (values[1] - options.min) / length * 100 + '%';

            self.smallBtn.css({
                left: smallWidth
            }).attr("data_value", values[0]);
            self.smallText.html(values[0]);
            self.smallText.css({
                marginLeft: - self.smallText.width() / 2 - 5 + 'px'
            })

            self.bigBtn.css({
                left: bigWidth
            }).attr("data_value", values[1]);
            self.bigText.html(values[1]);
            self.bigText.css({
                marginLeft: - self.bigText.width() / 2 - 5 + 'px'
            })



            if(options.onChange){
                options.onChange(self.getValue());
            }

        },

        //获取值
        getValue: function(){
            return [this.smallBtn.attr("data_value") * 1, this.bigBtn.attr("data_value") * 1];
        },


        eventDown: function(e){
            var self = this;

            self.mousedown=true;

            e = e.originalEvent;
            if(e.changedTouches){
                e = e.changedTouches[e.changedTouches.length-1];
            }

            self.touch.startX = e.pageX;
            self.touch.startLeft = self.eventBtn.css("left").replace("px","") * 1;
        },

        eventMove: function(e){
            var self = this;
            var options = self.options;

            if(self.mousedown){
                e = e.originalEvent;
                if(e.changedTouches){
                    e = e.changedTouches[e.changedTouches.length-1];
                }

                self.touch.moveX = e.pageX;

                var moveWidth = self.touch.startX - self.touch.moveX;
                var endLeft = self.touch.startLeft - moveWidth;
                var value = (endLeft / (self.bar.width())) * (options.max - options.min);

                var values = self.getValue();
                values[self.eventBtnIndex] = value;
                self.setValue(values);
            }

        },

        eventUp: function(e){
            var self = this;
            var options = self.options;

            if(self.mousedown){
                e = e.originalEvent;
                if(e.changedTouches){
                    e = e.changedTouches[e.changedTouches.length-1];
                }

                self.touch.endX = e.pageX;

                var moveWidth = self.touch.startX - self.touch.endX;
                var endLeft = self.touch.startLeft - moveWidth;
                var value = (endLeft / (self.bar.width())) * (options.max - options.min);

                var values = self.getValue();
                values[self.eventBtnIndex] = value;
                self.setValue(values);

                self.mousedown = false;
            }
        },


        //绑定事件
        bindEvent: function(){
            var self = this;
            var options = self.options;

            self.bigBtn.bind('touchstart', function(e){
                self.eventBtn = self.bigBtn;
                self.eventBtnIndex = 1;
                self.eventDown(e)
            });
            self.smallBtn.bind('touchstart', function(e){
                self.eventBtn = self.smallBtn;
                self.eventBtnIndex = 0;
                self.eventDown(e)
            });
            self.bigBtn.bind('mousedown', function(e){
                self.eventBtn = self.bigBtn;
                self.eventBtnIndex = 1;
                self.eventDown(e)
            });
            self.smallBtn.bind('mousedown', function(e){
                self.eventBtn = self.smallBtn;
                self.eventBtnIndex = 0;
                self.eventDown(e)
            });

            $(document).bind('touchend', function(e){
                self.eventUp(e)
            });
            $(document).bind('mouseup', function(e){
                self.eventUp(e)
            });

            $(document).bind('touchmove', function(e){
                self.eventMove(e)
            });
            $(document).bind('mousemove', function(e){
                self.eventMove(e)
            });

        },

        //渲染组件
        render: function () {
            var self = this;
            var options = self.options;
            self.content.html("");

            var bar = $("<div class='i_mui_rangeBar_bar'><div></div></div>").appendTo(self.content);
            self.bar = bar.find("div");

            self.bigBtn = $("<div>").addClass("i_mui_rangeBar_btn").appendTo(self.bar);
            self.bigText = $("<div>").addClass("i_mui_rangeBar_text").appendTo(self.bigBtn);

            self.smallBtn = $("<div>").addClass("i_mui_rangeBar_btn").appendTo(self.bar);
            self.smallText = $("<div>").addClass("i_mui_rangeBar_text").appendTo(self.smallBtn);

            this.container.append(this.content);

            self.setValue(options.initData);
        }
    })


    /**
     * 滑动条控件
     * @type {*|void}
     */
    var Calendar = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            min: null,
            max: null,
            minuteStep: 5,
            callback: null,                 //加载完成后执行的回调函数
            skin: 'grey',
            type: 'date'
        },

        //枚举值
        type: ['date', 'time'],
        skin: ['grey', 'red', 'blue', 'orange', 'green', 'purple'],

        theme:{
            defaults: {
                dateOrder: 'Mddyy',
                mode: 'mixed',
                rows: 5,
                width: 70,
                height: 36,
                showLabel: false,
                useShortLabels: true
            }
        },

        setting: {
            theme: "android-ics",
            mode: "scroller",
            display: "bottom",
            lang: "zh"
        },

        //组件容器对象
        container: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            $.mobiscroll.themes['android-ics'] = this.theme;
            $.mobiscroll.themes['android-ics light'] = this.theme;

            this.container = $("#" + this.options.id);

            this.setLimit();
            this.render();
            this.bindEvent();

            if(this.options.callback){
                this.options.callback(this);
            }
        },

        //参数校验
        checkOptions: function(){

            if($.inArray(this.options.type, this.type) == -1){
                this.options.type = this.type[0];
            }

            this.options.minuteStep = parseInt(this.options.minuteStep);
            if(this.options.minuteStep > 60){
                this.options.minuteStep = 60;
            }
            if(this.options.minuteStep < 1){
                this.options.minuteStep = 1;
            }

        },


        setLimit: function(){
            var self = this;
            var options = self.options;
            var dateReg = /^([1|2]\w{3})-(1[0-2]|0?[1-9])-((30|31)|((1|2)[0-9])|(0?[1-9]))$/;
            var timeReg = /^((20|21|22|23)|[0-1][0-9]):([0-5][0-9])$/;
            var now = new Date();

            if(options.min){
                var min;

                if(options.type == 'time'){
                    if(timeReg.test(options.min)){
                        var time = options.min.split(":");
                        min = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time[0], time[1]);
                        self.setting.minDate = min;
                    }
                }else{
                    if(dateReg.test(options.min)){
                        var date = options.min.split("-");
                        min = new Date(date[0] * 1, date[1] - 1, date[2] * 1);
                        self.setting.minDate = min;
                    }
                }
            }

            if(options.max){
                var max;

                if(options.type == 'time'){
                    if(timeReg.test(options.max)){
                        var time = options.max.split(":");
                        max = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time[0], time[1]);
                        self.setting.maxDate = max;
                    }
                }else{
                    if(dateReg.test(options.max)){
                        var date = options.max.split("-");
                        max = new Date(date[0] * 1, date[1] - 1, date[2] * 1);
                        self.setting.maxDate = max;
                    }
                }
            }
        },

        getValue: function(){
            return this.container.val();
        },

        setValue: function(value){
            this.container.val(value);
        },

        //绑定事件
        bindEvent: function(){
            var self = this;
            var options = self.options;

            self.container.change(function(){
                if(options.onChange){
                    options.onChange(self.getValue());
                }
            })
        },

        render: function(){
            var self = this;
            var options = self.options;

            self.setting.preset = options.type;
            self.setting.stepMinute = options.minuteStep;
            self.setting.exClass = 'i_mui_' + options.skin;
            self.container.scroller('destroy').scroller(self.setting);

        }
    })

    /**
     * 回到顶部控件
     * @type {*|void}
     */
    var GoTop = Class.extend({
        //可配置参数
        options: {
            position: {
                right: '20px',
                bottom: '50px'
            },
            skin: 'red',
            exClass: '',
            isAnimate: true
        },

        skin: ['grey', 'red', 'blue', 'orange', 'green', 'purple'],

        //组件容器对象
        container: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.render();
            this.setStyle();
            this.bindEvent();

        },

        //参数校验
        checkOptions: function(){
            this.options.isAnimate = this.options.isAnimate && true;

            if($.inArray(this.options.skin, this.skin) == -1){
                this.options.skin = this.skin[0];
            }
        },

        //设置样式
        setStyle: function(){
            var self = this;
            var options = self.options;


            if(options.position){
                $.each(options.position,function(k,v){
                    self.container.css(k,v);
                })
            }

            //设置颜色
            this.container.addClass('i_mui_' + this.options.skin);

            //设置扩展类
            if (options.exClass) {
                self.content.addClass(options.exClass);
            }
        },

        //绑定事件
        bindEvent: function(){
            var self = this;
            var options = self.options;

            $(window).scroll( function(){
               if($(this).scrollTop() > 50){
                   self.container.fadeIn();
               }else{
                   self.container.fadeOut();
               }
            });

            self.container.click(function(){
                if(options.isAnimate){
                    var interval = setInterval(function(){
                        var scrollTop = $(window).scrollTop();
                        if(scrollTop > 0){
                            $(window).scrollTop(scrollTop - 200);
                        }else{
                            clearInterval(interval);
                        }
                    },50)
                }else{
                    $(window).scrollTop(0);
                }

            })
        },

        render: function(){
            var self = this;
            var options = self.options;

            self.container = $("<a>").text('▲').addClass("i_mui_goTop i_mui_button");

            $("body").append(self.container);
        }
    })

    exports.alert = function(options){
        return new Alert(options);
    }

    exports.confirm = function(options){
        return new Confirm(options);
    }

    exports.number = function(options){
        return new Number(options);
    };

    exports.progress = function(options){
        return new Progress(options);
    }

    exports.switchBar = function(options){
        return new SwitchBar(options);
    }

    exports.slideBar = function(options){
        return new SlideBar(options);
    }

    exports.rangeBar = function(options){
        return new RangeBar(options);
    }

    exports.calendar = function(options){
        return new Calendar(options);
    }

    exports.goTop = function(options){
        return new GoTop(options);
    }

})