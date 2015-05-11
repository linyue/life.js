define(function (require, exports, module) {

    /**
     * 幻灯片组件
     *
     * @author elianlin@tencent.com
     * @time 2013-07-14
     */

    "use strict";

    var $ = require('$');
    var Class = require('Class');

    require('baseCss');
    require('../../res/css/gallery.css');

    var Gallery = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            width: '',                      //宽度
            height: '',                     //高度
            data: [],                       //组件数据,数据格式：[{url: '',link: '',title: '图片一',des: '我是图片一',target:'_blank'}]
            animate: 'toggle',              //切换效果,可选值有：toggle， fade， slide， scroll
            navTheme: 'none',               //导航风格,可选值有：none， point， number， line
            direction: 'left',              //切换方向,可选值有：top，bottom， left， right
            interval: 0,                    //自动切换时间间隔，单位s，0无不自动切换
            callback: null,                 //加载完成后执行的回调函数
            onToggleBefore: null,           //切换前事件
            onToggleAfter: null,            //切换后事件
            exClass: '',                    //附加的 class
            thumbsLayout: 'bottom',         //缩略图布局,可选值有：none， top， bottom， left， right
            navLayout: 'bottom',            //导航布局，可选值有：top， bottom
            infoLayout: 'bottom',           //图片信息布局，可选值有：top， bottom
            zIndex: 1,                      //起始zIndex
            isLoop: true,                   //是否循环播放
            isShowPN: true,                 //是否显示上一页和下一页按钮
            isShowTitle: true,              //是否显示标题
            isShowDes: true,                //是否显示描述内容
            isKeyControl: true              //是否支持键盘左右键进行前后页控制
        },

        //枚举值
        animate: ['toggle', 'fade', 'slide', 'scroll'],
        direction: [ 'left', 'right', 'top', 'bottom'],
        navTheme: ['none', 'point', 'number', 'line'],
        thumbsLayout: ['bottom', 'none', 'top', 'left', 'right'],
        navLayout: ['bottom', 'top'],
        infoLayout: ['bottom', 'top'],

        //组件容器对象
        container: null,
        content: null,
        list: null,
        nav: null,
        prev: null,
        next: null,
        thumbs: null,

        imgWidth: 0,
        imgHeight: 0,
        thumbWidth: 0,
        thumbHeight: 0,

        curImg: 0,
        curIndex: 0,
        playInterval: null,
        touch:{},
        s: 0,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_gallery');
            this.nav = $("<dev>").addClass("i_galleryNav");
            this.thumbs = $("<ul>").addClass("i_galleryThumbs");
            this.list = $("<div><ul></ul></div>").addClass("i_galleryList");

            this.setShow();
            this.render();
            this.setStyle();
            this.bindEvent();
            this.container.append(this.content);

            if(this.options.callback){
                this.options.callback(this);
            }
            this.autoPlay();
        },

        //参数校验
        checkOptions: function(){

            if($.inArray(this.options.animate, this.animate) == -1){
                this.options.animate = this.animate[0];
            }
            if($.inArray(this.options.direction,this.direction) == -1){
                this.options.direction = this.direction[0];
            }
            if($.inArray(this.options.navTheme,this.navTheme) == -1){
                this.options.navTheme = this.navTheme[0];
            }
            if($.inArray(this.options.thumbsLayout,this.thumbsLayout) == -1){
                this.options.thumbsLayout = this.thumbsLayout[0];
            }
            if($.inArray(this.options.navLayout,this.navLayout) == -1){
                this.options.navLayout = this.navLayout[0];
            }
            if($.inArray(this.options.infoLayout,this.infoLayout) == -1){
                this.options.infoLayout = this.infoLayout[0];
            }

            this.options.isLoop = this.options.isLoop || false;
        },

        //设置样式
        setStyle: function(){
            var self = this;
            var options = self.options;

            //设置当前图片的初始zIndex
            self.curIndex = self.options.zIndex,

                //设置容器尺寸
                self.content.width(options.width);
            self.content.height(options.height);

            //添加附加class
            if(options.exClass){
                self.content.addClass(options.exClass);
            }

            //计算图片和缩略图的尺寸
            if(options.thumbsLayout == "none"){
                self.imgWidth = options.width;
                self.imgHeight = options.height;
            }else{
                if(options.thumbsLayout == "top" || options.thumbsLayout == "bottom"){
                    self.thumbHeight = parseInt(options.height / 4);
                    self.imgHeight = options.height - self.thumbHeight;
                    self.imgWidth = options.width;
                    self.thumbWidth = parseInt(self.thumbHeight * self.imgWidth / self.imgHeight);
                }else{
                    self.thumbWidth = parseInt(options.width / 4);
                    self.imgWidth = options.width - self.thumbWidth;
                    self.imgHeight = options.height;
                    self.thumbHeight = parseInt(self.thumbWidth * self.imgHeight / self.imgWidth);
                }
            }

            //设置图片和缩略图的尺寸
            self.list.width(self.imgWidth).height(self.imgHeight);
            self.list.find("img").width('auto').height(self.imgHeight).each(function(){
                $(this).load(function(){
                    $(this).css({
                        marginLeft: -($(this).width() / 2)
                    })
                });
            })

            if(self.show.thumbs){
                self.thumbs.find("img").width(self.thumbWidth).height(self.thumbHeight);
            }

            //设置图片和缩略图的定位
            switch(options.thumbsLayout){
                case 'none':
                    self.list.css({
                        top: 0,
                        left: 0
                    });
                    break;
                case 'top':
                    self.list.css({
                        top: self.thumbHeight + 'px',
                        left: 0
                    });
                    self.thumbs.css({
                        width: options.width,
                        height: self.thumbHeight,
                        top: 0,
                        left: 0
                    });
                    break;
                case 'bottom':
                    self.list.css({
                        top: 0,
                        left: 0
                    });
                    self.thumbs.css({
                        width: options.width,
                        height: self.thumbHeight,
                        top: self.imgHeight + 'px',
                        left: 0
                    });
                    break;
                case 'left':
                    self.list.css({
                        top: 0,
                        left: self.thumbWidth + 'px'
                    });
                    self.thumbs.css({
                        width: self.thumbWidth,
                        height: options.height,
                        top: 0,
                        left: 0
                    });
                    break;
                case 'right':
                    self.list.css({
                        top: 0,
                        left: 0
                    });
                    self.thumbs.css({
                        width: self.thumbWidth,
                        height: options.height,
                        top: 0,
                        left: self.imgWidth + 'px'
                    });
            }

            //设置导航的定位
            if(self.show.nav){
                if(options.navLayout == 'top'){
                    self.nav.css({
                        top: 0
                    })
                }
                if(options.navLayout == 'bottom'){
                    self.nav.css({
                        top: 'auto',
                        bottom: 0
                    })
                }

                if(options.navTheme == 'line'){
                    self.nav.find('a').width(self.imgWidth / self.options.data.length);
                }
            }

            //设置图片信息的定位
            if(self.show.title || self.show.des){
                if(options.infoLayout == 'top'){
                    self.list.find(".i_galleryInfo").css({
                        top: 0,
                        bottom: 'auto'
                    })
                }
                if(options.infoLayout == 'bottom'){
                    self.list.find(".i_galleryInfo").css({
                        top: 'auto',
                        bottom: 0
                    })
                }
            }

            //设置前后面的定位
            if(self.options.isShowPN){
                var infoHeight = 0;

                if(options.isShowDes){
                    infoHeight += 25;
                }
                if(options.isShowTitle){
                    infoHeight += 20;
                }
                if(options.infoLayout == "top"){
                    up = infoHeight;
                }

                var up = options.infoLayout == "top" ? infoHeight : 0;

                self.next.css({
                    top: (self.imgHeight - 40 - infoHeight) / 2 + up + 'px'
                })
                self.prev.css({
                    top: (self.imgHeight - 40 - infoHeight) / 2 + up + 'px'
                })
            }

            //当切换效果为scroll时，需将定位方式改为浮动布局
            if(self.options.animate == 'scroll'){
                self.list.find("li").css({
                    width: self.imgWidth,
                    height: self.imgHeight,
                    position: 'relative'
                })
                if(self.options.direction == 'left' || self.options.direction == 'right'){
                    self.list.find("ul").width(self.imgWidth * self.options.data.length);
                }else{
                    self.list.find("ul").height(self.imgHeight * self.options.data.length);
                }

                if(self.options.direction == 'left' || self.options.direction == 'top'){
                    self.list.find("li").css({
                        float: 'left'
                    })
                }else{
                    self.list.find("li").css({
                        float: 'right'
                    })
                }
            }
        },

        //设置显示项
        setShow: function () {
            var options = this.options;
            this.show = {
                title: options.isShowTitle && true,
                des: options.isShowDes && true,
                prev: options.isShowPN && true,
                next: options.isShowPN && true,
                nav: options.navTheme == 'none' ? false : true,
                thumbs: options.thumbsLayout == 'none' ? false : true
            }

            if(options.data.length <= 1){
                this.show.nav = false;
            }
        },

        play: function(){
            var self = this;

            self.setShowPN();

            if (this.options.onToggleBefore) {
                this.options.onToggleBefore(self);
            }
            self['play_' + self.options.animate]();
            self.list.find("li").removeClass("active").eq(self.curImg).addClass("active");
            self.thumbs.find("li").removeClass("active").eq(self.curImg).addClass("active");
            self.nav.find("a").removeClass("active").eq(self.curImg).addClass("active");

            if (this.options.onToggleAfter) {
                this.options.onToggleAfter(self);
            }

            if(!self.options.isLoop && self.curImg == self.options.data.length - 1){
                clearInterval(self.playInterval);
            }

        },

        play_random: function(){
            var self = this;
            var animate = ['toggle', 'fade', 'slide', 'scroll'];
            var index = parseInt(Math.random() * 10) % animate.length;
            self['play_' + animate[index]];
        },

        play_toggle: function(){
            var self = this;
            var imgList = self.list.find("li");
            var active = imgList.eq(self.curImg);
            imgList.stop(true,false).hide();
            active.show();
        },

        play_fade: function(){
            var self = this;
            var imgList = self.list.find("li");
            var active = imgList.eq(self.curImg);
            imgList.stop(true,false);

            self.setIndex();
            active.hide().fadeIn(1000);
        },

        play_slide: function(){
            var self = this;
            var imgList = self.list.find("li");
            var active = imgList.eq(self.curImg);
            imgList.stop(true,false);
            active.css("zIndex", self.curIndex++);

            switch (self.options.direction){
                case 'left':
                    active.css("left",  self.imgWidth);
                    break;
                case 'right':
                    active.css("left",  -self.imgWidth);
                    break;
                case 'top':
                    active.css("top",  self.imgHeight);
                    break;
                case 'bottom':
                    active.css("top",  -self.imgHeight);
                    break;
            }

            active.animate({
                top: 0,
                left: 0
            },1000);
        },

        play_scroll: function(){
            var self = this;
            self.list.stop(true,false);
            if(self.options.direction == 'left' || self.options.direction == 'right'){
                var left = -(self.curImg * self.imgWidth);
                self.list.find("ul").animate({"left": left},500);
            }
            if(self.options.direction == 'top' || self.options.direction == 'bottom'){
                var top = -(self.curImg * self.imgHeight);
                self.list.find("ul").animate({"top": top},500);
            }

        },

        play_next: function(){
            var self = this;

            if(!self.isLoop && self.curImg == self.options.data.length -1){
                self.resetAutoPlay();
                self.play();
                return false;
            }
            self.setCurImg(self.curImg + 1);
            self.resetAutoPlay();
            self.play();
        },

        play_prev: function(){
            var self = this;

            if(!self.isLoop && self.curImg == 0){
                self.resetAutoPlay();
                self.play();
                return false;
            }

            self.setCurImg(self.curImg - 1);
            self.resetAutoPlay();
            self.play();
        },

        autoPlay: function(){
            var self = this;
            if(self.options.interval != 0){
                self.playInterval = setInterval(function(){
                    self.setCurImg(self.curImg + 1);
                    self.play();
                }, self.options.interval * 1000);
            }else{
                self.play(

                );
            }
        },

        resetAutoPlay: function(){
            var self = this;
            clearInterval(self.playInterval);
            self.autoPlay();
        },

        setShowPN: function(){
            if(!this.options.isShowPN){
                return false;
            }
            if(this.options.data.length == 0){
                this.prev.fadeOut();
                this.next.fadeOut();
            }else if(this.curImg == 0){
                this.prev.fadeOut();
                this.next.fadeIn();
            }else if(this.curImg == this.options.data.length - 1){
                this.prev.fadeIn();
                this.next.fadeOut();
            }else{
                this.prev.fadeIn();
                this.next.fadeIn();
            }
        },

        setCurImg: function(num){
            var self = this;
            self.curImg = num % self.options.data.length;
            if(self.curImg < 0){
                self.curImg = self.curImg + self.options.data.length;
            }
        },

        setIndex: function(){
            var self = this;
            self.list.find("li").eq(self.curImg).css("zIndex", self.curIndex++);
        },

        //绑定事件
        bindEvent: function(){
            var self = this;

            //缩略图点击事件
            if(self.options.thumbsLayout != 'none'){
                self.thumbs.delegate('li', 'click', function(){
                    if($(this).hasClass("active")){
                        return false;
                    }
                    self.setCurImg($(this).index());
                    self.resetAutoPlay();
                    self.play();
                });
            }

            //导航点击事件
            if(self.options.navTheme != 'none'){
                self.nav.delegate('a', 'click', function(){
                    if($(this).hasClass("active")){
                        return false;
                    }
                    self.setCurImg($(this).index());
                    self.resetAutoPlay();
                    self.play();
                });
            }

            //前后页事件
            if(self.options.isShowPN){
                self.next.click(function(){
                    self.play_next();
                });

                self.prev.click(function(){
                    self.play_prev();
                });
            }

            //滑动事件
            if(self.options.animate == 'scroll'){
                self.list.bind('touchstart', function(e){
                    self.touchStart(e);
                });
                self.list.bind('touchmove', function(e){
                    self.touchMove(e);
                });
                self.list.bind('touchend', function(e){
                    self.touchEnd(e);
                });
            }

            //键盘快捷键事件
            $(window).bind('keydown',function(event){
                switch(event.keyCode) {
                    case 37:
                        if(!self.options.isKeyControl){
                            return false;
                        }
                        self.play_prev();
                        break;
                    case 39:
                        if(!self.options.isKeyControl){
                            return false;
                        }
                        self.play_next();
                        break;
                }
            });

        },

        touchStart: function(e){
            var self = this;
            self.touch.start = self.getTouchLayout(e);
            self.touch.startLeft = this.list.find("ul").position().left;
            self.touch.startTop = this.list.find("ul").position().top;
        },

        touchMove: function(e){
            var self = this;
            self.touch.move = self.getTouchLayout(e);

            var moveX = self.touch.move.pageX - self.touch.start.pageX;
            var moveY = self.touch.move.pageY - self.touch.start.pageY;
            if(self.options.direction == 'left' || self.options.direction == 'right'){
                if(Math.abs(moveY) < Math.abs(moveX)){
                    e.preventDefault();
                    var left = self.touch.startLeft * 1 + moveX + 'px';

                    this.list.find("ul").css({
                        left: left
                    })
                }
            }else{
                if(Math.abs(moveY) > Math.abs(moveX)){
                    e.preventDefault();
                    var top = self.touch.startTop * 1 + moveY + 'px';

                    this.list.find("ul").css({
                        top: top
                    })
                }
            }

        },

        touchEnd: function(e){
            var self = this;
            self.touch.end = self.getTouchLayout(e);
            if(self.options.direction == 'left' || self.options.direction == 'right'){
                var moveX = self.touch.end.pageX - self.touch.start.pageX;
                if(moveX > 0){
                    self.play_prev();
                }
                if(moveX < 0){
                    self.play_next();
                }
            }else{
                var moveY = self.touch.end.pageY - self.touch.start.pageY;
                if(moveY > 0){
                    self.play_prev();
                }
                if(moveY < 0){
                    self.play_next();
                }
            }

        },

        /*手指每次点击在屏幕上的位置X,Y 多点触屏*/
        getTouchLayout: function(e){
            var touches = e.originalEvent.changedTouches;
            var pageLayout = {
                pageX: 0,
                pageY: 0
            };
            var pageY = 0;
            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i];
                pageLayout.pageX = touch.pageX;
                pageLayout.pageY = touch.pageY;
            }
            return pageLayout;
        },

        //渲染组件
        render: function () {
            var self = this;
            var options = self.options;
            var show = self.show;
            var content = self.content.html("");

            //缩略图
            if(show.thumbs){
                for(var i = 0; i < options.data.length; i++){
                    var thumb = $('<li><a><img  /></a></li>');
                    if(i==0){
                        thumb.addClass("active");
                    }
                    thumb.find("img").attr({
                        src: options.data[i].url
                    }).width(self.thumbWidth).height(self.thumbHeight);
                    self.thumbs.append(thumb).css("zIndex", self.curIndex + 100);;
                }
                content.append(self.thumbs);
            }

            //图片
            for(var i = 0; i < options.data.length; i++){
                var node = $('<li><div class="i_galleryImg"><a><img  /></a></div></li>');
                node.find("img").attr({
                    src: options.data[i].url,
                    alt: options.data[i].title
                }).width(self.imgWidth).height(self.imgHeight);

                node.find("a").attr({
                    target: options.data[i].target,
                    title: options.data[i].title
                })
                if(options.data[i].link){
                    node.find("a").attr("href", options.data[i].link);
                }

                if(show.title || show.des){
                    var info = $("<div>").addClass("i_galleryInfo");
                    if(show.title){
                        var title = $('<h2>').text(options.data[i].title);
                        info.append(title);
                    }
                    if(show.des){
                        var des = $('<p></p>').text(options.data[i].description);
                        info.append(des);
                    }
                    node.append(info);
                }
                self.list.find("ul").append(node);
            }
            content.append(self.list);

            //上一页菜单控制
            if (show.prev) {
                self.prev = $('<a>').addClass('i_galleryPrev').attr({
                    title: '上一页'
                }).css("zIndex", self.curIndex + 100).hide();
                self.list.append(self.prev);
            }

            //下一页菜单控制
            if (show.next) {
                self.next = $('<a>').addClass('i_galleryNext').attr({
                    title: '下一页'
                }).css("zIndex", self.curIndex + 100);
                self.list.append(self.next);
            }

            //导航菜单
            if(show.nav){
                self.nav.addClass('i_galleryNav_' + options.navTheme).css("zIndex", self.curIndex + 100);
                for(var i = 0; i < options.data.length; i++){
                    var node = $('<a></a>').text(i + 1);

                    if(i==0){
                        node.addClass("active");
                    }

                    self.nav.append(node);
                }
                self.list.append(self.nav);
            }
        }
    })

    module.exports = Gallery;

})