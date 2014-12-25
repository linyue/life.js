define(function (require, exports, module) {
    /**
     * 上报组件
     *
     * @author adam
     * @time 2014-05-09
     */

    "use strict";

    var device = require('device');

    exports.report = function(url, options, sample){

        var s = [];
        for(var i in options){
            s.push(i + '=' + encodeURIComponent(typeof options[i] == 'undefined' ?  '' : options[i]));
        }
        s.push('sample=' + (sample ? sample : 1));

        var surl = url + (url.indexOf("?") > 0 ? '&' : '?') + s.join('&');

        window['i-report'] = new Image();
        window['i-report'].src = surl;
    }

    exports.visit = function(url, sample){
        var self = this;

        if(document.all) {
            window.attachEvent('onload', function(){
                var info = device.getInfo();
                var timeline = device.getTimeline();

                for(var i in timeline){
                    info[i] = timeline[i];
                }
                exports.report(url, info, sample ? sample : 1);
            });
        } else {
            window.addEventListener('load', function(){
                var info = device.getInfo();
                var timeline = device.getTimeline();

                for(var i in timeline){
                    info[i] = timeline[i];
                }
                exports.report(url, info, sample ? sample : 1);
            }, false);
        }
    }
})
