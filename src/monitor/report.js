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

            t_redirect: timing.redirectEnd - timing.redirectStart,
            t_dns: timing.domainLookupEnd - timing.domainLookupStart,
            t_tcp: timing.connectEnd - timing.connectStart,
            t_request: timing.responseStart - timing.requestStart,
            t_response: timing.responseEnd - timing.responseStart,
            t_dom: timing.domComplete - timing.domLoading
        }

        return info;
    }

    exports.report = function(url, options){

        var s = [];
        for(var i in options){
            s.push(i + '=' + encodeURIComponent(typeof options[i] == 'undefined' ?  '' : options[i]));
        }

        var surl = url + (url.indexOf("?") > 0 ? '&' : '?') + s.join('&');

        window['i-report'] = new Image;
        window['i-report'].src = surl;
    }

    exports.visit = function(url){
        var self = this;
        if(document.all) {
            window.attachEvent('onload', function(){
                exports.report(url, _getInfo());
            });
        } else {
            window.addEventListener('load', function(){
                exports.report(url, _getInfo());
            }, false);
        }
    }
})
