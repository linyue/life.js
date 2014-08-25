define(function (require, exports, module) {
    /**
     * 刮刮卡组件
     *
     * @author adam
     * @time 2014-01-15
     */

    var $ = require('$');
    var Class = require('Class');

    require('baseCss');

    var Scratch = Class.extend({
        //可配置参数
        options: {
            id: null,                       //浮层ID
            width: 400,                     //浮层的宽
            height: 300,                    //浮层的高
            onDraw: function(){},           //浮层打开前的事件
            onSuccess: function(){},        //浮层打开后的事件
            exClass: ''                     //附加的 class
        },

        //组件容器对象
        container: null,
        content: null,
        canvas: null,
        context: null,
        resultText: null,
        mousedown: false,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_scratch');

            this.render();
            this.setStype();
            this.bindEvent();
            this.container.append(this.content);
        },

        //参数校验
        checkOptions: function () {

        },


        //设置样式
        setStype: function () {
            var options = this.options;

            //设置扩展类
            if (this.options.exClass) {
                this.content.addClass(this.options.exClass);
            }

            this.content.css({
                width: '100%',
                height: '100%',
                position: 'relative'
            })

            this.resultText.css({
                width: '100%',
                height: '40px',
                position: 'absolute',
                top: 0,
                left: 0,
                textAlign: 'center',
                lineHeight: '40px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#e0e0e0'
            })

            $(this.canvas).css({
                width: '150px',
                height: '40px',
                position: 'absolute',
                top: '0',
                left: '0'
            })
        },

        eventDown: function(e){
            e.preventDefault();

            var self = this;
            this.mousedown=true;
        },

        eventUp: function(e){
            e.preventDefault();

            var self = this;
            self.mousedown = false;
            var data = self.context.getImageData(0, 0, self.options.width, self.options.height).data;
            for(var i=0,j=0;i<data.length;i+=4){
                if(data[i] && data[i+1] && data[i+2] && data[i+3]){
                    j++;
                }
            }
            if(j <= self.options.width * self.options.height * 0.7){
               self.clearLayer()
            }
        },

        eventMove: function(e){
            e.preventDefault();

            var self = this;
            var offsetX = self.container.offset().left;
            var offsetY = self.container.offset().top;

            if(self.mousedown) {
                if(e.changedTouches){
                    e=e.changedTouches[e.changedTouches.length-1];
                }

                var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0;
                var y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;

                //括除涂层
                self.context.beginPath();
                self.context.arc(x, y, 5, 0, Math.PI * 2);
                self.context.fill();
            }
        },


        bindEvent: function () {
            var self = this;

            self.canvas.addEventListener('touchstart', function(e){
                self.eventDown(e)
            });
            self.canvas.addEventListener('touchend', function(e){
                self.eventUp(e)
            });
            self.canvas.addEventListener('touchmove', function(e){
                self.eventMove(e)
            });
            self.canvas.addEventListener('mousedown', function(e){
                self.eventDown(e)
            });
            self.canvas.addEventListener('mouseup', function(e){
                self.eventUp(e)
            });
            self.canvas.addEventListener('mousemove', function(e){
                self.eventMove(e)
            });
        },

        clearLayer: function(){
            this.context.fillStyle = 'gray';
            this.context.fillRect(0, 0, this.options.width, this.options.height);
            this.context.fill();
            this.context.save();
        },

        fullLayer: function(){
            this.context.fillStyle = 'gray';
            this.context.fillRect(0, 0, this.options.width, this.options.height);
            this.context.fill();
            this.context.save();
        },

        setText: function(text){
            this.resultText.text(text)
        },

        //渲染组件
        render: function () {
            var options = this.options;
            var content = this.content.html("");

            this.resultText = $("<div>").addClass("i_scratch_text");
            this.setText('谢谢参与');
            var canvas = $("<canvas>").addClass("i_scratch_canvas");
            content.append(this.resultText).append(canvas);

            this.canvas = canvas[0];
            this.canvas.width = options.width;
            this.canvas.height = options.height;


            this.context = this.canvas.getContext('2d');

            this.context.fillStyle = 'gray';
            this.fullLayer();

            this.context.font="20px microsoft yahei";
            this.context.fillStyle = '#ffffff';
            this.context.fillText("刮奖区",45,25);

            this.context.globalCompositeOperation = 'destination-out';
        }
    });

    module.exports = Scratch;

})