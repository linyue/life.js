define(function (require, exports, module) {
    /**
     *
     *
     * @author linyue
     * @time 15/3/22
     */


    "use strict";

    var Class = require('Class');
    var $ = require('$');

    var A = Class.extend({

        init: function(){
            $("title").text('A页面');
            $("#content").text('A页面');
        }
    })

    module.exports = A;

});