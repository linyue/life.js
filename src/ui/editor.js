define(function (require) {
    /**
     * 富文本编辑器组件
     * 引用第三方组件 simditor ：http://simditor.tower.im/
     *
     * @author linyue
     * @time 14-6-29
     */

    "use strict";

    var $ = require('$');
    var $ = require('editorStyle');
    var Simditor = require('src/plugin/simditor/simditor-all');

    require('src/plugin/simditor/simditor.css');
    require('src/plugin/simditor/font-awesome.css');

    return function(options){

        options.toolbarFloat = false;

        var editor = new Simditor(options);

        //跟据原textarea的尺寸调整编辑器的尺寸
        var editorNode = editor.el;
        var editorWrapper = editor.wrapper.find(".simditor-body");
        var textareaNode = editor.textarea;

        var containerWidth = textareaNode.width();
        var containerHeight = textareaNode.height();

        editorNode.width(containerWidth);
        editorNode.height(containerHeight);

        editorWrapper.css({
            height: containerHeight - 41,
            minHeight: 'inherit',
            overflow: 'auto'
        })

        return editor;
    }

});