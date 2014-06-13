define(function (require, exports, module) {

    /**
     * 上传组件
     *
     * @author adam(linyue@live.cn)
     * @time 2014-06-03
     */

    "use strict";

    var $ = require('$');
    var Class = require('Class');

    var Upload = Class.extend({
        //可配置参数
        options: {
            id: '',                                     //file控件ID
            url: '',                                    //上传地址
            exParams: {},                               //随文件上传一起提交的扩展参数
            limitSize: 0,                               //大小限制，单位为k，0为不限制
            limitFormat: [],                            //文件类型限制，不设为不限制
            onValidator: function(type, msg){
                alert(msg);
            },
            onSuccess: function(res, e){},              //上传成功后的回调
            onError: function(res, e){},                //失败后的回调
            onProgress: function(progress){}            //上传进度回调
        },

        //组件容器对象
        file: null,
        form: null,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.sendUpload();
        },

        //参数校验
        checkOptions: function(){


        },

        filter: function(){
            var self = this;
            var options = self.options;

            var name = self.file.name;
            var size = self.file.size / 1024;

            if(options.limitSize > 0 && options.limitSize < size){

                options.onValidator && options.onValidator('limitSize', '您上传的文件超过尺寸！');

                return false;
            }

            if(options.limitFormat.length > 0){
                var regexp = eval('/\.(?:' + options.limitFormat.join("|") + ')$/');
                if(!(regexp.test(name))){

                    options.onValidator && options.onValidator('limitFormat', '您上传的文件格式不符合要求！');

                    return false;
                }
            }

            return true;
        },

        sendUpload: function(){
            var self = this;
            var options = self.options;

            if(options.url == ""){
                return false;
            }

            self.file = $("#" + options.id)[0].files[0];

            if(!self.filter()){
                return false;
            }

            self.form = new FormData();
            self.form.append('file',self.file);

            for(var i in options.exParams){
                self.form.append(i, options.exParams[i]);
            }

            var xhr = new XMLHttpRequest();
            if (xhr.upload) {
                // 上传中
                xhr.upload.addEventListener("progress", function(e) {
                    var progress = parseInt(e.loaded / e.total * 100);
                    options.onProgress && options.onProgress(progress);
                }, false);

                // 文件上传成功或是失败
                xhr.onreadystatechange = function(e) {
                    if (xhr.readyState == 4) {

                        var result = eval('(' + xhr.responseText + ')');

                        if (xhr.status == 200) {
                            options.onSuccess && options.onSuccess(result, e);
                        } else {
                            options.onError && options.onError(result, e);
                        }

                    }
                };

                // 开始上传
                xhr.open("POST", options.url, true);
                xhr.send(self.form);
            }
        }
    })

    exports.common = function(options){
        return new Upload(options);
    }

})