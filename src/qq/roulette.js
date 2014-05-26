define(function (require, exports, module) {
    /**
     * 大转盘组件
     *
     * @author adam
     * @time 2014-01-20
     */

    var $ = require('$');
    var Class = require('Class');

    require("src/plugin/jquery.rotate")($);
    require('baseCss');
    require('res/css/roulette.css');

    var Roulette = Class.extend({
        //可配置参数
        options: {
            id: null,                       //浮层ID
            data: {

            },
            thanksImg: '',
            onCheckDraw: null,
            onDraw: null,
            type: 'font',
            exClass: ''                     //附加的 class
        },

        //枚举值
        type: ['font', 'image'],

        //组件容器对象
        container: null,
        content: null,
        dial: false,
        hands: null,
        button: null,
        arrow: null,

        rotates: {
            2: {
                0: [60, 120, 240, 300],
                1: [0],
                2: [180]
            },
            3: {
                0: [60, 180, 300],
                1: [0],
                2: [120],
                3: [240]
            },
            4:{
                0: [120, 300],
                1: [0],
                2: [60],
                3: [180],
                4: [240]
            },
            5:{
                0: [300],
                1: [0],
                2: [60],
                3: [120],
                4: [180],
                5: [240]
            }
        },
        map: {
            0: '谢谢参与',
            1: '一 等 奖',
            2: '二 等 奖',
            3: '三 等 奖',
            4: '四 等 奖',
            5: '五 等 奖'
        },

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.container = $("#" + this.options.id).html("");
            this.content = $('<div>').addClass('i_roulette');

            this.render();
            this.setStype();
            this.bindEvent();
            this.container.append(this.content);
        },

        //参数校验
        checkOptions: function () {
            if($.inArray(this.options.type, this.type) == -1){
                this.options.type = this.type[0];
            }
        },


        //设置样式
        setStype: function () {
            var options = this.options;

            //设置扩展类
            if (this.options.exClass) {
                this.content.addClass(this.options.exClass);
            }

            this.content.addClass('i_roulette_' + this.options.data.length);
            this.content.addClass('i_roulette_' + this.options.type);

        },


        bindEvent: function () {
            var self = this;

            self.button.click(function(){
                var awardNum = self.options.data.length;
                var grade = parseInt(Math.random() * 1000) % (awardNum + 1);
                var dict =  self.rotates[awardNum][grade][parseInt(Math.random() * 1000) % self.rotates[awardNum][grade].length];
                self.arrow.rotate({
                    duration: 4000,
                    angle: 0,  //开始角度
                    animateTo: 1800 + dict, //转动角度，10圈+
                    callback: function(){ //回调函数
                        alert(self.map[grade]);
                    }
                });
            });
        },

        //渲染组件
        render: function () {
            var self = this;
            var options = this.options;
            var content = this.content.html("");

            this.hands = $("<div></div>").addClass("i_roulette_hands");
            this.button = $("<a>").addClass("i_roulette_hands_button");
            this.arrow = $("<a>").addClass("i_roulette_hands_arrow");
            this.dial = $("<div><ul></ul></div>").addClass("i_roulette_dial");


            if(options.type == 'image'){
                var awardNum = self.options.data.length;
                for(var i = 0; i <= 360; i = i + 60){

                    //判断该弧度是几等奖
                    for(var x in self.rotates[awardNum]){
                        for(var y in self.rotates[awardNum][x]){
                            if(self.rotates[awardNum][x][y] == i){
                                var grade = $("<li><img></li>");

                                if(x > 0){
                                    grade.find("img").attr({
                                        src: options.data[x - 1].img,
                                        alt: options.data[x - 1].name
                                    });
                                }else{
                                    grade.find("img").attr({
                                        src: options.thanksImg,
                                        alt: '谢谢参与'
                                    });
                                }

                                grade.css({
                                    "-moz-transform" : 'rotate('+i+'deg)',
                                    "-webkit-transform" : 'rotate('+i+'deg)',
                                    "-o-transform" : 'rotate('+i+'deg)'
                                })

                                this.dial.append(grade);
                                break;
                            }
                        }
                    }
                }
            }

            this.hands.append(this.arrow).append(this.button);
            content.append(this.dial).append(this.hands);
        }
    });

    module.exports = Roulette;

})