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

    var resPath = seajs.data.paths.res;

    var Scratch = Class.extend({
        //可配置参数
        options: {
            query: null,                    //容器选择器
            width: 400,                     //刮刮卡的宽
            height: 300,                    //刮刮卡的高
            type: 'font',
            exClass: '',                    //附加的 class
            thanksImg: resPath + '/img/roulette/thanks.png',
            checkDraw: function(){
                return {
                    code: 0,
                    msg: '允许抽奖'
                }
            },
            draw: function(){
                return {
                    code: 0,
                    msg: '抽奖成功',
                    data: {
                        grade: 0,
                        msg: '很遗憾，您没有中奖'
                    }
                }
            },
            onReady: function(){

            },
            onError: function(msg){
                alert(msg)
            },
            onSuccess: function(drawResult){
                alert(drawResult.msg)
            }
        },

        //组件容器对象
        container: null,
        content: null,
        canvas: null,
        context: null,
        resultContent: null,
        mouseDown: false,
        isAllow: false,
        drawRs: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $(this.options.query).html("");
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

            this.resultContent.width(options.width).height(options.height).css({
                position: 'absolute',
                top: 0,
                left: 0,
                textAlign: 'center',
                lineHeight: '40px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#e0e0e0'
            })

            $(this.canvas).width(options.width).height(options.height).css({
                position: 'absolute',
                top: '0',
                left: '0'
            })
        },

        eventDown: function(e){
            e.preventDefault();

            var self = this;
            this.mouseDown=true;
        },

        eventUp: function(e){
            e.preventDefault();

            var self = this;
            self.mouseDown = false;
            var data = self.context.getImageData(0, 0, self.options.width, self.options.height).data;
            for(var i = 0,j = 0; i<data.length; i+=4){
                if(data[i] && data[i+1] && data[i+2] && data[i+3]){
                    j++;
                }
            }
            if(j <= self.options.width * self.options.height * 0.7){
                self.clearLayer();
                self.options.onSuccess && self.options.onSuccess(self.drawRs);
            }
        },

        eventMove: function(e){
            e.preventDefault();

            var self = this;
            var options = self.options;
            var offsetX = self.container.offset().left;
            var offsetY = self.container.offset().top;

            if(self.mouseDown) {

                if(!self.isAllow){
                    var checkRs = options.checkDraw();
                    if(checkRs.code == 0){
                        self.isAllow = true;
                        var drawRs = options.draw();
                        var result = {};
                        if(drawRs.code != 0){
                            result = {
                                grade: 0,
                                msg: '很遗憾，没有中奖！'
                            };
                        }else{
                            result = drawRs.data;
                        }
                        self.setPrize(result);
                        self.drawRs = result;
                    }else{
                        self.isAllow = false;
                        options.onError(checkRs.msg);
                        return false;
                    }
                }

                if(e.changedTouches){
                    e = e.changedTouches[e.changedTouches.length - 1];
                }

                var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0;
                var y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
                var radius = 6;

                if(options.type == "image"){
                    radius = 12;
                }

                //括除涂层
                self.context.beginPath();
                self.context.arc(x, y, radius, 0, Math.PI * 2);
                self.context.fill();
            }
        },


        setPrize: function(result){
            var self = this;
            var options = self.options;

            if(result.grade == 0){
                if(options.type == "image"){
                    self.resultContent.attr({
                        src: options.thanksImg
                    });
                }else{
                    self.resultContent.text("谢谢参与！");
                }
            }else{
                if(options.type == "image"){
                    self.resultContent.attr({
                        src: options.data[result.grade].img
                    });
                }else{
                    self.resultContent.text( result.grade + "等奖");
                }
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
            this.context.fillStyle = 'grey';
            this.context.fillRect(0, 0, this.options.width, this.options.height);
            this.context.fill();
            this.context.save();
        },

        fullLayer: function(){
            this.context.fillStyle = 'grey';
            this.context.fillRect(0, 0, this.options.width, this.options.height);
            this.context.fill();
            this.context.save();
        },

        setText: function(text){
            this.resultContent.text(text)
        },

        //渲染组件
        render: function () {
            var options = this.options;
            var content = this.content.html("");

            if(options.type == "image"){
                this.resultContent = $("<img>").addClass("i_scratch_result").attr({
                    src: options.thanksImg
                });
            }else{
                this.resultContent = $("<div>").addClass("i_scratch_result").text('谢谢参与');
            }
            var canvas = $("<canvas>").addClass("i_scratch_canvas");
            content.append(this.resultContent).append(canvas);

            this.canvas = canvas[0];
            this.canvas.width = options.width;
            this.canvas.height = options.height;

            this.context = this.canvas.getContext('2d');

            this.context.fillStyle = 'grey';
            this.fullLayer();

            this.context.font="20px microsoft yahei";
            this.context.fillStyle = '#ffffff';

            if(options.type == "image"){
                this.context.fillText("刮奖区", options.width / 2 - 30, options.height / 2 + 6);
            }else{
                this.context.fillText("刮奖区", options.width / 2 - 30, options.height / 2 + 6);
            }

            this.context.globalCompositeOperation = 'destination-out';
        }
    });

    module.exports = Scratch;

})