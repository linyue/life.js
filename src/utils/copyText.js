define(function(require, exports, module) {

    /**
     * 获取某个变量的数据类型
     *
     * @param object obj 要获取类型的变量
     * @return string value
     * @author elianlin@tencent.com
     * @time 2013-11-17
     */

    "use strict";

    exports.copyText = function(options){

        var options = {
            id: options.id || '',
            content: options.content || ''
        }

        var dom = document.getElementById(options.id);
        if (window.clipboardData) {
            dom.onclick = function(){
                window.clipboardData.setData("Text", options.content);
            };
        }else{
            require('./../plugin/ZeroClipboard.js');
            var swf2 = navigator.plugins['Shockwave Flash'];
            if(swf2 != undefined){
                dom.setAttribute('data-clipboard-text', options.content);
                var client = new ZeroClipboard(dom);

                client.on("ready", function( readyEvent ) {
                    client.on( "aftercopy", function( event ) {
                        event.target.style.display = "none";
                    });
                });

            }else{
                document.getElementById(nodeId).onclick = function(){
                    alert('您的浏览器不支持复制功能，请更换浏览器后尝试');
                };
            }
        }
    };
});

