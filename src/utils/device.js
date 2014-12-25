define(function (require, exports, module) {
    /**
     *  设备信息
     *
     * @author linyue
     * @time 2014/12/24
     */


    "use strict";

    var Class = require('Class');

    var UserAgent = Class.extend({

        userAgent: null,
        platform: 'unknown',
        mobile: 'unknown',
        isMobile: false,
        browser: 'unknown',
        browserVersion: 'unknown',

        platforms: {
            'windows phone 8': 'Windows Phone 8.x',
            'windows phone 7': 'Windows Phone 7.x',
            'windows ce': 'Windows CE',
            'windows nt 6.3': 'Windows 8.1',
            'windows nt 6.2': 'Windows 8',
            'windows nt 6.1': 'Windows 7',
            'windows nt 6.0': 'Windows Vista',
            'windows nt 5.2': 'Windows 2003',
            'windows nt 5.1': 'Windows XP',
            'windows nt 5.0': 'Windows 2000',
            'windows nt 4.0': 'Windows NT',
            'windows 98': 'Windows 98',
            'win98': 'Windows 98',
            'windows 95': 'Windows 95',
            'win95': 'Windows 95',
            'win': 'Windows',

            'os 5': 'Apple iOS 5.x',
            'os 6': 'Apple iOS 6.x',
            'os 7': 'Apple iOS 7.x',
            'os 8': 'Apple iOS 8.x',
            'os x': 'Apple OS X',
            'ppc mac': 'Apple Power PC',
            'ppc': 'Apple Macintosh',

            'android 5': 'Android 5.x',
            'android 4': 'Android 4.x',
            'android 3': 'Android 3.x',
            'android 2': 'Android 2.x',

            'symbian': 'Symbian',
            'series60': 'Symbian',
            'blackberry': 'BlackBerry',
            'rim': 'BlackBerry',
            'bb10': 'BlackBerry',
            'palm': 'Palm',
            'elaine': 'Palm',

            'linux': 'Linux',
            'unix': 'Unix'
        },

        browsers: {
            'micromessenger': '微信 WebView',
            'weibo': '微博 WebView',
            'ucbrowser': 'UC浏览器',
            'qqbrowser': 'QQ浏览器',
            'qq': 'QQ WebView',
            'bidubrowser': 'Baidu浏览器',
            'baidubrowser': 'Baidu浏览器',
            'baidu': 'Baidu WebView',
            'lbbrowser': '猎豹浏览器',
            'taobrowser': '淘宝浏览器',
            '360browser': '360浏览器',
            'se': '360浏览器',
            '360': '360浏览器',
            '2345explorer': '2345浏览器',
            'mxbrowser': '傲游浏览器',
            'miuibrowser': '小米浏览器',
            'maxthon': '傲游浏览器',
            'theworld': '世界之窗浏览器',
            'yabrowser': '红裤衩浏览器',
            'operamini': 'Opera Mini',
            'opera mini': 'Opera Mini',
            'opera': 'Opera',
            'opr': 'Opera',
            'chrome': 'Chrome',
            'msie': 'IE',
            'eie': 'IE',
            'internet explorer': 'IE',
            'firefox': 'Firefox',
            'ubrowser': 'Firefox',
            'android': 'Android WebView',
            'safari': 'Safari',
            'AppleWebKit': 'Chrome',
            'trident': 'IE',
            'gecko': 'Firefox'
        },

        mobiles: {
            //手机厂商
            'iphone': 'Apple iPhone',
            'ipad': 'Apple iPad',
            'ipod': 'Apple iTouch',
            'huawei': '华为',
            'hm': '红米',
            'xiaomi': '小米',
            'mi': '小米',
            'meizu': '魅族',
            'vivo': 'vivo',
            'lenovo': '联想',
            'coolpad': '酷派',
            'zte': '中兴',
            'htc': 'HTC',
            'doov': '朵唯',
            'lg': 'LG',
            'amoi': '夏新',
            'samsung': '三星',
            'sch': '三星',
            'sm': '三星',
            'nexus': 'Nexus',
            'nokia': 'Nokia',
            'motorola': 'Motorola',
            'mot-': 'Motorola',
            'palm': 'Palm',
            'sony': 'Sony',
            'ericsson': 'Ericsson',
            'blackberry': 'BlackBerry',
            'nec-': 'NEC',

            //手机系统
            'android': 'Android Phone',
            'Windows Phone': 'Windows Phone Phone',
            'windows ce': 'Windows CE Phone',
            'symbian': 'Symbian Phone',
            'phone': 'Generic Phone',
            'mobile': 'Generic Phone'
        },

        init: function(userAgent){
            var self = this;
            self.userAgent = (userAgent ? userAgent : navigator.userAgent).toLowerCase();

            self.initPlatform();
            self.initBrowser();
            self.initMobile();
        },

        initPlatform: function(){
            var self = this;

            for(var key in self.platforms){
                if(self.userAgent.indexOf(key.toLowerCase()) >= 0){
                    self.platform = self.platforms[key];
                    break;
                }
            }
        },

        initBrowser: function(){
            var self = this;

            for(var key in self.browsers){
                var reg = new RegExp(key + ".*?([0-9\.]+)", "ig");
                var match = self.userAgent.match(reg);
                if(match){
                    self.browser = self.browsers[key];
                    self.browserVersion = match[0].match(/([0-9\.]+)/ig)[0];
                };
            }
        },

        initMobile: function(){
            var self = this;

            for(var key in self.mobiles){
                if(self.userAgent.indexOf(key.toLowerCase()) >= 0){
                    self.mobile = self.mobiles[key];
                    self.isMobile = true;
                    break;
                }
            }

            if(!self.isMobile && window.screen.width <= 640){
                self.isMobile = true;
            }
        },

        getPlatform: function(){
            return this.platform;
        },

        getBrowser: function(){
            return this.browser;
        },

        getBrowserVersion: function(){
            return this.browserVersion;
        },

        getIsMobile: function(){
            return this.isMobile;
        },

        getMobile: function(){
            return this.mobile;
        }
    })


    exports.getPlatform = function(useragent){
        var ua = new UserAgent(useragent);

        return ua.getPlatform();
    }

    exports.isMobile = function(useragent){
        var ua = new UserAgent(useragent);

        return ua.getIsMobile();
    }

    exports.getBrowser = function(useragent){
        var ua = new UserAgent(useragent);

        return ua.getBrowser();
    }

    exports.getBrowserVersion = function(useragent){
        var ua = new UserAgent(useragent);

        return ua.getBrowserVersion();
    }

    exports.getMobile = function(useragent){
        var ua = new UserAgent(useragent);

        return ua.getMobile();
    }

    exports.getTimeline = function(){

        if(window.performance){
            var timing = window.performance.timing;
            return {
                redirect: timing.redirectEnd - timing.redirectStart,
                dns: timing.domainLookupEnd - timing.domainLookupStart,
                tcp: timing.connectEnd - timing.connectStart,
                request: timing.responseStart - timing.requestStart,
                response: timing.responseEnd - timing.responseStart,
                dom: timing.domComplete - timing.domLoading,
                all: timing.domComplete - timing.redirectStart
            }
        }else{
            return {
                redirect: 'unknown',
                dns: 'unknown',
                tcp: 'unknown',
                request: 'unknown',
                response: 'unknown',
                dom: 'unknown',
                all: 'unknown'
            }
        }
    }

    exports.getInfo = function(useragent){
        var ua = new UserAgent(useragent);
        var info = {
            referrer: document.referrer,

            platform: ua.getPlatform(),
            browser: ua.getBrowser(),
            browserVersion: ua.getBrowserVersion(),
            isMobile: ua.getIsMobile(),
            mobile: ua.getMobile(),

            screen: window.screen.width + "*" + window.screen.height,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,

            orientation: window.orientation ? Math.abs(window.orientation) : 'unknown',
            isPortrait: window.orientation ? Math.abs(window.orientation) !== 90 : 'unknown',
            isLandscape: window.orientation ? Math.abs(window.orientation) === 90 : 'unknown'
        }

        return info;
    }

});