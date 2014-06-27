define(function(require, exports, module) {

    "use strict";

    var $ = require('$');

    exports.include = function(options){
        var opt = {
            url: '',
            id: ''
        }

        opt = $.extend({}, opt, options || {});

        $.ajax({
            url: opt.url,
            cache: true,
            dataType: "html",
            error: function(XMLHttpRequest, textStatus, errorThrown){
                //console.log(XMLHttpRequest)
            },
            success: function(result) {
                $("#" + opt.id).html(result);
            }
        });
    };
});

