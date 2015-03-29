define(function (require, exports, module) {
    /**
     *
     *
     * @author linyue
     * @time 15/3/22
     */


    "use strict";

    var Class = require('Class');

    var C = Class.extend({

        init: function(){
            $("title").text('C页面');
            $("#content").text('C页面');
        }
    })

    module.exports = C;

});