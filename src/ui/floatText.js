define(function (require, exports, module) {
    /**
     *
     *
     * @author linyue
     * @time 14-7-10
     */


    "use strict";

    var $ = require('$');
    var Class = require('Class');

    var FloatText = Class.extend({
        options: {
            query: '',
            content: '',
            color: '#fff',
            onBefore: function(){

            },
            onAfter: function(){

            }
        },

        init: function(options){

            this.options = $.extend({}, this.options, options);

            this.float();
        },

        float: function(){
            var self = this;
            var options = self.options;
            $(options.query).each(function(){
                var offset = $(this).offset();
                var numDom = $("<div></div>").text(options.content);
                var left = offset.left + $(this).width() / 2 - 13;
                var top = offset.top + $(this).height() / 2 - 10;

                numDom.css({
                    position: 'absolute',
                    top: top,
                    left: left,
                    fontSize: '24px',
                    color: options.color,
                    opacity:.7
                })

                options.onBefore && options.onBefore();

                $("body").append(numDom);

                numDom.animate({
                    top: top - 40,
                    opacity: 0
                }, 1500, function(){
                    $(this).remove();
                    options.onAfter && options.onAfter();
                })
            })
        }

    })

    module.exports = FloatText;

});