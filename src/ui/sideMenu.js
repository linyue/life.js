define(function (require, exports, module) {

    /**
     * sideMenu组件
     *
     * @author adam(linyue@live.cn)
     * @time 2014-06-03
     */

    "use strict";

    var $ = require('$');
    var Class = require('Class');
    var Sidebar = require('sidebar');

    require('baseCss');

    var SideMenu = Sidebar.extend({

        options: {
            data: [],
            width:  250,
            content: '',
            title: '',                      //浮层标题
            target: 'self',                 //要弹层的页面,可设置项有：self、parent、top
            direction: 'right',             //方向,可选值有：left， right
            animate: 'slide',               //切换效果,可选值有：toggle， fade， slide
            exClass: '',                    //附加的 class
            padding: '10px',                //内容区域内边距
            isMask: true,                   //是否显示遮罩
            isBlur: false,
            isShowCloseBtn: true,           //是否显示关闭按钮
            isMaskClose: true,              //是否点击遮罩就关闭浮层
            isKeyControl: true              //是否开启esc快捷键关闭浮层
        },

        menuBtn: null,
        menu: null,

        init: function(options){
            this.options = $.extend({}, this.options, options);

            this._super();
        },

        setStyle: function(){
            var self = this;
            var options = self.options;

            self._super();

            self.menuBtn.css({
                position: 'fixed',
                top: '30px',
                right: '50px',
                color: '#fff'
            })

            self.menu.css({
                listStyle: 'none',
                padding: '50% 50px 0',
                fontSize: '18px'
            })

            self.menu.find("a").css({
                lineHeight: '40px',
                color: '#ddd',
                textDecoration: 'none'
            })

            self.menu.find("a.active").css({
                fontSize: '20px',
                color: '#fff',
                fontWeight: 'bold'
            })

            self.mask.hide();

        },

        open: function(){
            var self = this;
            var options = self.options;

            self._super();

            self.menuBtn.animate({
                right: options.width + 50
            })

        },

        close: function(){
            var self = this;
            var options = self.options;

            self._super();

            self.menuBtn.animate({
                right: 50
            })

            self.mask.hide();
        },

        render: function(){

            var self = this;
            var options = self.options;

            self._super();

            self.menu = $("<ul></ul>").addClass("i_side_menu_content");
            for(var i = 0; i< options.data.length; i++){
                var info = options.data[i];
                var child = $("<li><a></a></li>");
                child.find("a").text(info.title).attr({
                    title: info.title,
                    href: info.url
                })
                if(info.isActive){
                    child.find("a").addClass("active");
                }
                self.menu.append(child);
            }
            self.main.html(self.menu);

            self.menuBtn = $('<a><img class="i_sidebar_menu_icon" />菜单</a>').addClass("i_sidebar_menu");
            self.menuBtn.find("img").attr({
                src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMDc4RDI5QThDRERFMzExOEU2OENERUFCRjAyMDk0NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMUJCMjY5RkUzRkQxMUUzQUE0NUY0NEZBN0I2RDZEOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMUJCMjY5RUUzRkQxMUUzQUE0NUY0NEZBN0I2RDZEOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1NDBGREU3RjVFNkUzMTE4MzZDQTlBRERDQkJDNDUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMwNzhEMjlBOENEREUzMTE4RTY4Q0RFQUJGMDIwOTQ3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+U6FKLQAAACVJREFUeNpi/A8EDGQCJgYKAAsQMw6IzQOnGeTn0dAe/qENEGAA3N0GIGwTeh4AAAAASUVORK5CYII='
            }).css({
                marginRight: '8px',
                fontSize: '18px',
                textDecoration: 'none'
            })
            self.container.append(self.menuBtn);
        },

        bindEvent: function(){
            var self = this;
            var options = self.options;

            self._super();

            self.menuBtn.click(function(){

                if($(this).hasClass("active")){
                    self.close();
                }else{
                    self.open();
                }

                $(this).toggleClass("active");
            })

            self.main.find("a").hover(function(){
                $(this).css({
                    color: '#fff'
                });

            },function(){
                if(!$(this).hasClass("active")){
                    $(this).css({
                        color: '#ddd'
                    });
                }
            })
        }
    })

    module.exports = SideMenu;

})