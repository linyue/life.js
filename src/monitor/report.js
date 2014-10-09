define(function (require, exports, module) {
    /**
     * 幻灯片组件
     *
     * @author adam
     * @time 2014-05-09
     */

    "use strict";

    exports.deviceInfo = function(){

        var timing = window.performance ? window.performance.timing : '';

        var info = {
            referrer: document.referrer,

            screen: window.screen.width + "*" + window.screen.height,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,

            orientation: window.orientation ? Math.abs(window.orientation) : 'unknow',
            isPortrait: window.orientation ? Math.abs(window.orientation) !== 90 : 'unknow',
            isLandscape: window.orientation ? Math.abs(window.orientation) === 90 : 'unknow',

            t_redirect: timing ? (timing.redirectEnd - timing.redirectStart) : 'unknow',
            t_dns: timing ? (timing.domainLookupEnd - timing.domainLookupStart) : 'unknow',
            t_tcp: timing ? (timing.connectEnd - timing.connectStart) : 'unknow',
            t_request: timing ? (timing.responseStart - timing.requestStart) : 'unknow',
            t_response: timing ? (timing.responseEnd - timing.responseStart) : 'unknow',
            t_dom: timing ? (timing.domComplete - timing.domLoading) : 'unknow',
            t_all: timing ? (timing.domComplete - timing.navigationStart) : 'unknow'
        }

        return info;
    }

    exports.report = function(url, options){

        var s = [];
        for(var i in options){
            s.push(i + '=' + encodeURIComponent(typeof options[i] == 'undefined' ?  '' : options[i]));
        }

        var surl = url + (url.indexOf("?") > 0 ? '&' : '?') + s.join('&');

        window['i-report'] = new Image();
        window['i-report'].src = surl;
    }

    exports.visit = function(url){
        var self = this;
        if(document.all) {
            window.attachEvent('onload', function(){
                exports.report(url, self.deviceInfo());
            });
        } else {
            window.addEventListener('load', function(){
                exports.report(url, self.deviceInfo());
            }, false);
        }
    }
})
