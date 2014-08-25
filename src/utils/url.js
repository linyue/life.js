(function (global) {

    "use strict";

    var url = {

        /**
         * 获取url的hash
         *
         * @param string url 要解析的url，默认为当前页面url
         * @return string value
         * @author adam[linyue@live.cn]
         * @time 2014-05-26
         */

        getHash: function(url){
            if(url){
                var reg = new RegExp("\#.*$", "i");
                var r = url.match(reg);
                return r != null ? r[0].substr(1) : "";
            }else{
                return window.location.hash === "" ? "" : window.location.hash.substr(1);
            }
        },


        /**
         * 获取url的参数
         *
         * @param string key 要获取值的key
         * @param string url 要解析的url，默认为当前页面url
         * @return string value
         * @author adam[linyue@live.cn]
         * @time 2013-07-14
         */
        getParam: function(key, url){
            var search = "";

            if(url){
                search = url.indexOf("?") > 0 ? url.split("?")[1] : "";
                search = search.indexOf("#") > 0 ? search.split("#")[0]: search;
            }else{
                search = window.location.search.substr(1);
            }

            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var r = search.match(reg);
            if (r != null){
                return r[2];
            }
            return null;
        }
    }


    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function (require, exports, module) {
            module.exports = url;
        });

    // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = url;
    } else {
        global.url = url;
    }

})(this.window || global);

