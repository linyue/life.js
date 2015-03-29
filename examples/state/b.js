define(function (require, exports, module) {
    /**
     *
     *
     * @author linyue
     * @time 15/3/22
     */


    "use strict";

    var Class = require('Class');

    var B = Class.extend({

        init: function(){
            $("title").text('B页面');
            $("#content").text('B页面');
        }
    })

    module.exports = B;

});