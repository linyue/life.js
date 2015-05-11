(function (global) {

    "use strict";

    var url = {

        /**
         * 获取url的hash
         *
         * @param string url 要解析的url，默认为当前页面url
         * @return string 锚点
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
         * 获取url的某个参数
         *
         * @param string key 要获取值的key
         * @param string url 要解析的url，默认为当前页面url
         * @return string key对应的value
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
                return decodeURIComponent(r[2]);
            }
            return null;
        },



        /**
         * 获取url的全部参数
         *
         * @param string url 要解析的url，默认为当前页面url
         * @return object value
         * @author adam[linyue@live.cn]
         * @time 2013-07-14
         */
        getParams: function(url){
            var search = "";

            if(url){
                search = url.indexOf("?") > 0 ? url.split("?")[1] : "";
                search = search.indexOf("#") > 0 ? search.split("#")[0]: search;
            }else{
                search = window.location.search.substr(1);
            }

            search = decodeURIComponent(search);

            if(search == ""){
                return {};
            }

            var params = {};
            var paramsArr = search.split("&");

            for(var i = 0; i < paramsArr.length; i++){
                var param = paramsArr[i].split("=");
                var key = decodeURIComponent(param[0]);
                var val = decodeURIComponent(param[1]);

                // 数组
                var execArr = /(\w+)(\[\d?\])$/.exec(key);
                if (execArr) {
                    key = execArr[1];

                    if(!params[key]){
                        params[key] = [];
                    }

                    params[key].push(decodeURIComponent(val));
                }else{
                    params[key] = val;
                }
            }
            return params;
        },


        /**
         * 解析URL
         *
         * @param string url 要解析的url，默认为当前页面url
         * @return object 解析结果
         * @author adam[linyue@live.cn]
         * @time 2014-10-09
         */
        parse: function(url){
            var self = this;

            var res = {};
            var regulars = {
                protocol: /([^\/]+:)\/\/(.*)/i,
                host: /(^[^\:\/]+)((?:\/|:|$)?.*)/,
                port: /\:?([^\/]*)(\/?.*)/,
                pathname: /([^\?#]+)(\??[^#]*)(#?.*)/
            };

            if(!url){
                url = decodeURIComponent(window.location.href);
            }

            for (var r in regulars) {
                var tmp = regulars[r].exec(url);
                res[r] = tmp[1];
                url = tmp[2];
                if (url === "") {
                    url = "/";
                }
                if (r === "pathname") {
                    res["pathname"] = tmp[1];
                    res["search"] = tmp[2];
                    res["hash"] = tmp[3];
                }
            }

            res["origin"] = res["protocol"] + "//" + res["host"];

            res["params"] = self.getParams();

            return res;
        },

        /**
         * 对象转换成一个序列化的字符串
         * @param params
         * @returns {string}
         */
        stringifyParams: function (params) {
            if (!params){
                return '';
            }

            var search = [];
            for (var key in params) {
                var value = params[key];
                if (Array.isArray(value)) {
                    for (var i = 0; i < value.length; ++i) {
                        search.push(encodeURIComponent(key + '[]') + '=' + encodeURIComponent(value[i]));
                    }
                    continue;
                }
                search.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
            }

            return search.join('&');
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

