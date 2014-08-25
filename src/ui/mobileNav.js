define(function (require, exports, module) {

    /**
     * 分页组件
     *
     * @author elianlin@tencent.com
     * @time 2013-07-14
     */

    "use strict";

    var $ = require('$');
    var Class = require('Class');

    require('baseCss');
    require('res/css/mobileNav.css');

    var MobileNav = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            width: '',                      //宽度
            height: '',                     //高度
            data: [],                       //组件数据,数据格式：[{name: '',url: ''}]
            theme: 'point',                 //导航风格,可选值有：normal， button， line
            callback: null,                 //加载完成后执行的回调函数
            direction: '',                  //面板弹出方向
            exClass: '',                    //附加的 class
            zIndex: null,                   //起如zIndex
            isDefaultOpen: true             //是否显示描述内容
        },

        //枚举值
        theme: ['normal', 'button', 'line'],
        direction_button: ['rb', 'lt', 'rt', 'lb'],
        direction_line: ['b', 't'],
        direction_normal: ['b', 't'],

        //组件容器对象
        container: null,
        content: null,
        navBar: null,
        navList: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            console.log(options);

            this.checkOptions();

            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_mobileNav');

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

            if($.inArray(this.options.theme, this.theme) == -1){
                this.options.theme = this.theme[0];
            }
            if($.inArray(this.options.direction, this['direction_' + this.options.theme]) == -1){
                this.options.direction = this['direction_' + this.options.theme][0];
            }
        },

        //设置样式
        setStyle: function(){
            var self = this;
            var options = self.options;

            //设置主题风格样式
            this.content.addClass('i_mobileNav_' + this.options.theme);

            //添加位置class
            self.content.addClass("i_mobileNav_" + this.options.theme + "_" + options.direction);

            //添加附加class
            if(options.exClass){
                self.content.addClass(options.exClass);
            }

            self.content.css({
                width: options.width,
                height: options.height
            });

            //normal风格下计算每个菜单的尺寸
            if(options.theme == "normal"){
                self.navList.height(options.height - 6);
                self.navList.find("li").css({
                    width: 100 / options.data.length + '%',
                    height: options.height - 7
                });
                self.navList.find("a").css({
                    height: options.height - 7,
                    lineHeight: options.height - 7 + 'px'
                });

                self.navList.find(".active").css({
                    height: options.height
                });

                if(options.direction == 't'){
                    self.navList.find(".active").find("a").css({
                        marginTop: '6px'
                    });
                }
            }

            //button风格下计算每个菜单的尺寸
            if(options.theme == "button"){
                var len = Math.sqrt(options.width * options.width + options.height * options.height) / 7;
                self.navBar.width(len + 2).height(len + 2);
                self.navBar.find(".i_mobileNav_collapse").width(len).height(len);
                var listHeight = options.height - len / 2;
                self.navList.css({
                    width: options.width - len / 2,
                    height: listHeight
                });
                self.navList.find("li").css({
                    height: listHeight / options.data.length - 1,       //下边框为1px
                    lineHeight: listHeight / options.data.length - 1 + 'px'
                });

                console.log(options.direction)
                //位置计算
                if(options.direction == 'rb'){
                    self.navList.css({
                        left: len / 2,
                        top: len / 2
                    })
                    self.navBar.css({
                        left: 0,
                        top: 0
                    })
                }

                if(options.direction == 'lb'){
                    self.navList.css({
                        right: len / 2,
                        top: len / 2,
                        left: 'auto'
                    })
                    self.navBar.css({
                        right: 0,
                        top: 0,
                        left: 'auto'
                    })
                }

                if(options.direction == 'lt'){
                    self.navList.css({
                        right: len / 2,
                        bottom: len / 2,
                        left: 'auto',
                        top: 'auto'
                    })
                    self.navBar.css({
                        right: 0,
                        bottom: 0,
                        left: 'auto',
                        top: 'auto'
                    })
                }

                if(options.direction == 'rt'){
                    self.navList.css({
                        left: len / 2,
                        bottom: len / 2,
                        top: 'auto'
                    })
                    self.navBar.css({
                        left: 0,
                        bottom: 0,
                        top: 'auto'
                    })
                }
            }

            //line风格下计算每个菜单的尺寸
            if(options.theme == "line"){
                //尺寸计算
                var navHeight = options.height / 5;
                self.navBar.height(navHeight);
                self.navBar.find("span").css({
                    height: navHeight / 7,
                    marginTop: navHeight / 7 + 'px'
                })
                self.navList.css({
                    height: options.height - navHeight - 25
                })
                self.navList.find("li").css({
                    height: (options.height - navHeight - 25) / options.data.length - 1,
                    lineHeight: (options.height - navHeight - 25) / options.data.length - 1 + 'px'
                })

                //位置计算
                if(options.direction == 't'){
                    console.log(options.height - navHeight - 8);
                    self.navList.css({
                        bottom: navHeight + 8 + 'px',
                        top: 'auto'
                    })
                    self.navBar.css({
                        bottom: 0,
                        top: 'auto'
                    })
                }

                if(options.direction == 'b'){
                    self.navList.css({
                        top: navHeight + 8 + 'px'
                    })
                    self.navBar.css({
                        top: 0
                    })
                }
            }

            if(options.isDefaultOpen){
                self.navList.addClass("active");
            }
        },

        bindEvent: function(){
            var self = this;
            var options = self.options;

            self.navBar.find(".i_mobileNav_collapse").click(function(){
                self.navList.toggleClass("active");
                return false;
            })
            self.navList.find("li").click(function(){
                self.navList.find("li").removeClass("active");
                $(this).addClass("active");

                //normal风格下重新计算每个菜单的尺寸
                if(options.theme == "normal"){
                    self.navList.height(options.height - 6);
                    self.navList.find("li").css({
                        height: options.height - 7,
                        marginTop: 0
                    });
                    $(this).css({
                        height: options.height
                    });
                    if(options.direction == 't'){
                        $(this).css({
                            marginTop: '-6px'
                        });
                        self.navList.find("a").css({
                            marginTop: '0'
                        });
                        $(this).find("a").css({
                            marginTop: '6px'
                        });
                    }
                }

                return false;
            })
            $(document).click(function(){
                self.navList.removeClass("active");
            })

        },

        //渲染组件
        render: function () {
            var self = this;
            var options = self.options;
            var content = self.content.html("");

            //上一页菜单控制
            self.navList = $('<ul>').addClass('i_mobileNav_container');
            for(var i in options.data){
                var li = $("<li><a></a></li>");
                li.find("a").attr({
//                    href: options.data[i].url,
                    title: options.data[i].name
                }).html(options.data[i].name);
                if(options.data[i].isActive){
                    li.addClass("active");
                }

                //在normal风格下插入两个小凸起
                if(options.theme == "normal"){
                    li.append("<span class='i_mobileNav_viewLeft'></span><span class='i_mobileNav_viewRight'></span>");
                }

                self.navList.append(li);
            }
            self.content.append(self.navList);

            self.navBar = $('<div><a class="i_mobileNav_collapse"><span></span><span></span><span></span></a></div>').addClass("i_mobileNav_bar");
            self.content.append(self.navBar);
        }
    })

    module.exports = MobileNav;
})