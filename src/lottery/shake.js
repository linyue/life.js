define(function (require, exports, module) {
    /**
     * 摇一摇组件
     *
     * @author adam
     * @time 2014-01-15
     */

    var $ = require('$');
    var Class = require('Class');

    require('Array');
    require('baseCss');
    require('res/css/shake.css');

    var resPath = seajs.data.paths.res;

    var Shake = Class.extend({
        //可配置参数
        options: {
            query: null,
            data: [{
                grade : 1,
                name : '一等奖',
                img : resPath + '/img/shake/one.png'
            },{
                grade : 2,
                name : '二等奖',
                img : resPath + '/img/shake/two.png'
            },{
                grade : 3,
                name : '三等奖',
                img : resPath + '/img/shake/three.png'
            }],
            width: 200,
            height: 200,
            row: 5,
            line: 5,
            wallImg: resPath + '/img/shake/wall_red.png',
            thanksImg: resPath + '/img/shake/thanks.png',
            exClass: '',                                //附加的 class
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

        //枚举值
        type: ['font', 'image'],

        //组件容器对象
        container: null,
        content: null,
        tip: null,
        prize: null,
        wall: null,
        isShake: false,

        devicemotionInfo: {
            threshold: 5000,
            status: true,
            last_time: 0,
            last_x: 0,
            last_y: 0,
            last_z: 0
        },

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $(this.options.query).html("");
            this.content = $('<div>').addClass('i_shake');

            this.render();
            this.setStyle();
            this.bindEvent();
            this.container.append(this.content);
        },

        //参数校验
        checkOptions: function () {

        },

        //设置样式
        setStyle: function () {
            var options = this.options;

            this.content.width(options.width).height(options.height);

            //设置扩展类
            if (this.options.exClass) {
                this.content.addClass(this.options.exClass);
            }
        },

        setPrize: function(result){
            var self = this;
            var options = self.options;

            if(result.grade == 0){
                self.prize.attr({
                    src: options.thanksImg
                })
            }else{
                self.prize.attr({
                    src: options.data[result.grade - 1].img
                })
            }
        },

        drawAction: function(){
            var self = this;

            var checkRs = options.checkDraw();
            if(checkRs.code == 0){
                var drawRs = options.draw();
                var result = {};
                if(drawRs.code != 0){
                    result = {
                        grade: 0,
                        msg: '很遗憾，没有中奖！'
                    }
                }else{
                    result = drawRs.data
                }
                self.setPrize(result);
                self.drawPlay(result);
            }else{
                options.onError(checkRs.msg);
            }
        },

        drawPlay: function(result){
            var self = this;
            var options = self.options;

            self.tip.hide(); //隐藏提示
            //加锁
            if(self.isShake){
                return;
            }

            self.isShake = true;

            var walls = [];
            self.wall.find(".i_shake_wall_img").each(function(){
                walls.push($(this));
            })
            walls.shuffle();
            var index = 0;
            var interval = setInterval(function(){
                self.shake(walls[index]);
                if(index == options.row * options.line - 1){
                    clearInterval(interval);
                    setTimeout(function(){
                        options.onSuccess && options.onSuccess(result);
                    }, 2500)
                }else{
                    index++;
                }
            },31)
        },

        shake: function(wall){
            var range = 1;
            var direction = 1;
            var interval1;

            interval1 = setInterval(function(){
                direction = ((direction + 1) % 4);
                switch(direction){
                    case 0:
                        wall.css({
                            left: -range  + 'px',
                            top: -range + 'px'
                        });
                        break;
                    case 1:
                        wall.css({
                            left: -range  + 'px',
                            top: range + 'px'
                        });
                        break;
                    case 2:
                        wall.css({
                            left: range  + 'px',
                            top: range + 'px'
                        });
                        break;
                    case 3:
                        wall.css({
                            left: range  + 'px',
                            top: -range + 'px'
                        });
                        break;
                }
            },53);

            setTimeout(function(){
                clearInterval(interval1);
                wall.animate({
                    left: 0,
                    top: '200px',
                    opacity: 0
                },1000)
            }, 1500)
        },

        devicemotion_handle: function(e){
            var self = this;
            var x,y,z;
            var acceleration = e.accelerationIncludingGravity;
            var current_time = new Date().getTime();
            var interval = current_time - self.devicemotionInfo.last_time;
            if(interval > 10 && self.devicemotionInfo.status){
                self.devicemotionInfo.last_time = current_time;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                var speed = Math.abs(x+y+z-self.devicemotionInfo.last_x-self.devicemotionInfo.last_y-self.devicemotionInfo.last_z) / interval * 10000;
                if(speed > self.devicemotionInfo.threshold){
                    setTimeout(function(){
                        self.devicemotionInfo.status = true;
                    },1000);

                    self.drawAction();
                }
                last_x=x;
                last_y=y;
                last_z=z;
            }
        },

        bindEvent: function () {
            var self = this;

            if(window.DeviceMotionEvent){
                window.addEventListener("devicemotion",function(e){
                    self.devicemotion_handle(e);
                },false);
            }else{
                self.tip.show();
            }

            self.wall.click(function(){
                self.drawAction();
            })
        },

        //渲染组件
        render: function () {
            var self = this;
            var options = this.options;
            var content = this.content.html("");

            self.prize = $("<img>").addClass("i_shake_prize").attr({
                src: options.thanksImg
            });
            content.append(self.prize);

            self.wall = $("<div></div>").width(options.width).height(options.height).addClass("i_shake_wall");
            for(var i = 0;i < options.line; i++){
                for(var j = 0;j < options.row; j++){
                    var id = i * options.line + j + 1;
                    var node = $('<div></div>');
                    var mWidth = options.width / options.row;
                    var mHeight = options.height / options.line;
                    var bX = -mWidth * j;
                    var bY = -mHeight * i
                    node.addClass("i_shake_wall_img").width(mWidth).height(mHeight).attr({
                        id: 'i_shake_wall_img_' + id
                    }).css({
                        backgroundImage: 'url(' + options.wallImg + ')',
                        backgroundSize: options.width + 'px ' + options.height + 'px',
                        backgroundPosition: bX + 'px ' + bY + 'px'
                    });
                    self.wall.append(node);
                }
            }

            self.tip = $("<div>不支持摇一摇<br />点击图片抽奖</div>").addClass('i_shake_tip');
            self.wall.append(self.tip);

            content.append(self.wall);
        }
    });

    module.exports = Shake;

})