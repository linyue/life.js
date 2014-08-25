define(function (require, exports, module) {

    /**
     * 拖动组件
     *
     * @author elianlin@tencent.com
     * @time 2013-07-14
     */

    "use strict";

    var $ = require('$');
    var Class = require('Class');

    var Draggable = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            direction: 'left',              //切换方向,可选值有：top，bottom， left， right
            onStart: function(){

            },
            onDrag: function(offset){

            },
            onEnd: function(offset){

            }
        },

        //组件容器对象
        obj: null,
        mousedown: false,
        info: {},

        init: function (options) {
            this.options = $.extend({}, this.options, options);
            this.obj = $("#" + this.options.id);
            console.log(this.obj)
            this.bindEvent();
        },

        getEventLayout: function(e){
            if(e.changedTouches){
                e = e.changedTouches[e.changedTouches.length - 1];
            }
            var layout = {
                pageX: e.pageX,
                pageY: e.pageY
            }

            return layout;
        },

        eventDown: function(e){
            e.preventDefault();

            var self = this;
            this.mousedown = true;

            self.info.start = self.getEventLayout(e);

            if(self.options.onStart){
                self.options.onStart();
            }
        },

        eventMove: function(e){
            e.preventDefault();

            var self = this;

            if(self.mousedown) {
                var layout = self.getEventLayout(e);
                var offset = {
                    x: layout.pageX - self.info.start.pageX,
                    y: layout.pageY - self.info.start.pageY
                }
                if(self.options.onDrag){
                    self.options.onDrag(offset);
                }
            }
        },

        eventUp: function(e){
            e.preventDefault();

            var self = this;
            self.mousedown = false;

            var layout = self.getEventLayout(e);
            var offset = {
                x: layout.pageX - self.info.start.pageX,
                y: layout.pageY - self.info.start.pageY
            }
            if(self.options.onDrag){
                self.options.onDrag(offset);
            }
        },

        bindEvent: function () {
            var self = this;

            var obj = self.obj[0];
            obj.addEventListener('touchstart', function(e){
                self.eventDown(e)
            });
            obj.addEventListener('touchend', function(e){
                self.eventUp(e)
            });
            obj.addEventListener('touchmove', function(e){
                self.eventMove(e)
            });
            obj.addEventListener('mousedown', function(e){
                self.eventDown(e)
            });
            obj.addEventListener('mouseup', function(e){
                self.eventUp(e)
            });
            obj.addEventListener('mousemove', function(e){
                self.eventMove(e)
            });
        }

    });

    module.exports = Draggable;
})