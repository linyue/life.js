(function (global) {

    "use strict";

    var time = {

        /**
         * 字符串转时间
         *
         * @param String|Int|Date  time  要转化成时间的字符串，支持以下格式：
         *      Date 对象
         *      Unix时间戳，
         *      2012-15-15 12:15:02，
         *      2012/15/18 15:18:01，
         *      Mar 04, 2012 22:15:14
         * @return Date date    时间对象
         */
        string2Date: function(time){
            var dateType = 0;
            var date = new Date();

            if(typeof time == "object"){
                dateType = 1;
            }else if(/^\d+$/.test(time)){
                //纯数字，则当做 unix 时间
                dateType = 2;
            }else if(time.indexOf('-')>0){
                //匹配到"-"，则当做 2012-15-15 12:15:02
                dateType = 3;
            }else if(time.indexOf('/')>0){
                //匹配到"/"，则当做 2012/15/18 15:18:01
                dateType = 4;
            }else if(time.indexOf(',')>0){
                //匹配到","，则当做Mar 04, 2012 22:15:14
                dateType = 5;
            }

            switch(dateType){
                case 1:
                    //已是时间对象
                    date = time;
                    break;
                case 2:
                    //处理unix时间
                    date = new Date(time * 1000);
                    break;
                case 3:
                    //处理2012-15-15 12:15:02
                    var times = time.split(' ');
                    var part1 = times[0].split('-');    //分解日期
                    var part2 = times[1].split(':');    //分解时间
                    date = new Date(part1[0], part1[1]-1, part1[2], part2[0], part2[1], part1[2]);
                    break;
                case 4:
                    //处理 2012/15/18 15:18:01
                    var times = time.split(' ');
                    var part1 = times[0].split('/');    //分解日期
                    var part2 = times[1].split(':');    //分解时间
                    date = new Date(part1[0], part1[1]-1, part1[2], part2[0], part2[1], part1[2]);
                    break;
                case 5:
                    //处理Mar 04, 2012 22:15:14时间表达式
                    date = Date.parse(time);
                    date = new Date(date * 1000);
                    break;
            }

            return date;
        },

        /**
         * 日期时间格式化
         *
         * @param String format 要解析的url，默认为当前页面url
         * @param String|Int|Date date 要格式化的时间，默认使用当前客户端时间。支持以下格式：
         *      Date 对象
         *      Unix时间戳，
         *      2012-15-15 12:15:02，
         *      2012/15/18 15:18:01，
         *      Mar 04, 2012 22:15:14
         * @return string date
         * @author adam[linyue@live.cn]
         * @time 2014-06-26
         */

        format: function(formatStr, date){
            var format = formatStr ? formatStr : 'yyyy-MM-DD HH:mm:ss';
            var date = date ? this(date) : new Date();

            var week = ['日','一','二','三','四','五','六'];
            var weekName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

            format = format.replace(/yyyy|YYYY/,time.getFullYear());
            format = format.replace(/yy|YY/g,(time.getYear() % 100) > 9 ? (time.getYear() % 100).toString() : '0' + (time.getYear() % 100));

            format = format.replace(/MM/,time.getMonth() + 1 > 9 ? (time.getMonth() + 1).toString() : '0' + (time.getMonth() + 1));
            format = format.replace(/M/g,time.getMonth() + 1);

            format = format.replace(/dd|DD/,time.getDate() > 9 ? time.getDate().toString() : '0' + time.getDate());
            format = format.replace(/d|D/g,time.getDate());

            format = format.replace(/HH/,time.getHours() > 9 ? time.getHours().toString() : '0' + time.getHours());
            format = format.replace(/H/g,time.getHours());

            format = format.replace(/hh/,(time.getHours() % 12) > 9 ? (time.getHours() % 12).toString() : '0' + (time.getHours() % 12));
            format = format.replace(/h/g,(time.getHours() % 12));

            format = format.replace(/mm/,time.getMinutes() > 9 ? time.getMinutes().toString() : '0' + time.getMinutes());
            format = format.replace(/m/g,time.getMinutes());

            format = format.replace(/ss/,time.getSeconds() > 9 ? time.getSeconds().toString() : '0' + time.getSeconds());
            format = format.replace(/s/g,time.getSeconds());

            format = format.replace(/SSS/g,time.getMilliseconds() > 99 ? time.getMilliseconds().toString() : time.getMilliseconds() > 9 ? '0' + time.getMilliseconds() : '00' + time.getMilliseconds());
            format = format.replace(/S/g,time.getMilliseconds());

            format = format.replace(/wwww/g,weekName[time.getDay()]);
            format = format.replace(/www/g,weekName[time.getDay()].substr(0,3));
            format = format.replace(/WWW/g,'星期' + week[time.getDay()]);
            format = format.replace(/W/g,week[time.getDay()]);

            format = format.replace(/a|A/g,time.getHours() > 12 ? 'PM' : 'AM');

            return format;
        },


        /**
         * 倒计时
         *
         * @param string now            当前时间
         * @param string url            截止时间
         * @param int interval          间隔时间,单位 s
         * @param function onInterval   定时回调，function(data){}
         * @param function onTimeUp     倒计时为0的回调，function(){}
         * @author adam[linyue@live.cn]
         * @time 2014-06-27
         */
        countdown: function(options){

            var opt = {
                now: typeof options.now != 'undefined' ? options.now : new Date(),
                deadline: typeof options.deadline != 'undefined' ? options.deadline : '',
                interval: typeof options.interval != 'undefined' ? options.interval : 1,
                onInterval: typeof options.onInterval != 'undefined' ? options.onInterval : function(data){},
                onTimeUp: typeof options.onTimeUp != 'undefined' ? options.onTimeUp : function(){}
            }

            var localSec = parseInt(new Date().getTime() / 1000);
            var nowSec = parseInt(this.string2Date(opt.now).getTime() / 1000);
            var deadlineSec = parseInt(this.string2Date(opt.deadline).getTime() / 1000);
            var differSec = nowSec - localSec;


            var counter = 0;
            var intervalFun = function(){
                //使用本地时间来时间差来重新计算，避免系统休眠引起的倒计时不准的问题
                var curSec = parseInt(new Date().getTime() / 1000);
                var secTotal = deadlineSec - curSec + differSec;

                var data = {}

                if(secTotal == 0){
                    data.isTimeout = false;
                    opt.onTimeUp();
                }else if(secTotal < 0){
                    data.isTimeout = true;
                    secTotal = secTotal * -1;
                }else{
                    data.isTimeout = false;
                }

                data.day = Math.floor(secTotal / 60 / 60 / 24);
                data.hour = Math.floor(secTotal / 60 / 60) % 24;
                data.minute = Math.floor(secTotal / 60) % 60;
                data.second = secTotal % 60;

                //触发回调
                if(counter % opt.interval == 0){
                    opt.onInterval(data);
                }
            }

            intervalFun();
            setInterval(intervalFun, 1000);
        }
    }


    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function (require, exports, module) {
            module.exports = time;
        });

        // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = time;
    } else {
        global.time = time;
    }

})(this.window || global);

