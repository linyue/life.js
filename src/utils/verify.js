define(function(require, exports, module) {

    /**
     * 格式校验
     *
     * @param text 需要校验的字符串
     * @return boolen
     * @author elianlin@tencent.com
     * @time 2013-12-9
     */

    "use strict";

    var regulars = {
        Mobile: /^1(3|4|5|8)\d{9}$/,
        Phone: /^(\d{3,4}[-|——|_|\s]+)?\d{7,8}([-|——|_|\s]+\d{2,6})?$/,
        ZipCode: /^[1-9]\d{5}(?!\d)$/,
        QQ: /^[1-9][0-9]{4,9}$/,
        IP: /^((?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
        Mail: /^([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        Certificate: /^\d{6}((\d{2}((0[1-9])|(1[0-2]))[0-3]\d{4})|((19|20)\d{2}((0[1-9])|(1[0-2]))[0-3]\d{4}[0-9xX]?))$/,
        Chinese: /^[\u4e00-\u9fa5]+$/,
        Letter: /^[a-zA-Z]+$/,
        Number: /^[-]?\d+((\.\d+)|(\d*))$/,
        Int: /^[-]?\d+$/,
        Float: /^[-]?\d+\.\d+$/,
        Url: /^(https|http):\/\/(((?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))|(([\w-]+).)+[a-zA-Z]{2,6}|localhost)(:[0-9]{1,6})?(\/[\w-]+)*((\/([\w-]+\.)+[\w-]{1,5})|\/)?$/,
        Link: /^(https|http):\/\/(((?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))|(([\w-]+).)+[a-zA-Z]{2,6}|localhost)(:[0-9]{1,6})?(\/[\w-]+)*((\/([\w-]+\.)+[\w-]{1,5})|\/)?((\?|\#)\S*)?$/
    }

    for(var i in regulars){
        (function(i){
            exports['is' + i] = function(text){
                return regulars[i].test(text);
            }
        })(i)
    }
});

