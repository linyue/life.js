/**
 * Created by Administrator on 14-7-7.
 * @author Eric
 */
define(function(require, exports, module){
    var template = require('src/utils/template');
    return{
        showMask : function(){
            var masker = $(".mask");
            if(!masker[0]){
                $(document.body).append('<div class="mask"></div>');
                masker = $(".mask")[0];
                masker.style.cssText = 'display:block;background-color:#000;-ms-filter:"alpha(opacity=20)";#filter:alpha(opacity=70);opacity: 0.7; position:fixed;_position:absolute;left:0px;top:0px;z-index:1000;width:100%;height:100%;';
            }else{
                masker.show();
            }
        },
        hideMask : function(){
            $(".mask").hide();
        },
        getType : function(obj){
            return obj === null ? 'null': (obj === undefined ? 'undefined': Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
        },
        createVideoContainer : function(width, height, videoList){
            var self = this;
            var container = $("#video_container");
            if(!container[0]){
                var videoArr = ['<div id="video_container" style="display: none;">',
                    '<div class="video_list">',
                    '</div>',
                    ' <div class="video_close" style="position: relative;">',
                    '<a id="close_video" href="javascript:void(0);" title="关闭视频" style="position: absolute;top:0px; right: 0px; margin-top: -28px;color: #fff;text-decoration: none;display: block;padding: 5px 5px 5px 8px;background-color: #696969;">关闭</a>',
                    '</div>',
                    '<div class="video" style="margin-left: 200px;"></div>',
                    '</div>'];
                var videoListTemp = [
                    '<ul>',
                    '<%for(var i=0; i<list.length; i++){%>',
                    '<li _datahref="<%=list[i].video_url%>"><%=list[i].video_name%></li>',
                    '<%}%>',
                    '</ul>'].join("");
                if(videoList){
                    if(self.getType(videoList) == "array"){
                        var render = template.compile(videoListTemp);
                        var str = render({
                            list: videoList
                        });
                        videoArr.splice(2, 0, str);
                    }else if(self.getType(videoList == "string")){
                        var str = '<ul><li>' + videoList + '</li></ul>'
                        videoArr.splice(2, 0, str);
                    }
                }
                $(document.body).append( videoArr.join(""));
                container = $("#video_container")[0];
                container.style.cssText='position: absolute;height: '+ height +'px;width: '+ width +'px;top: 50%;left: 50%;margin-left: -'+(width/2)+'px;margin-top: -'+(height/2)+'px;z-index: 5000;';
            }
            self.createVideoContainer = null;
            self.bindEvent();
        },
        bindEvent : function(){
            var self = this;
            $("#video_container #close_video").bind("click", function(){
                //销毁播放器
                self.videoPlayer.dispose();
                self.videoPlayer = null;
                $("#video_container").hide();
                self.hideMask();
            });
            //事件代理绑定切换视频
            $("#video_container .video_list").delegate('li', 'click', function(){
                var src = $(this).attr("_datahref");
                if(!src){
                    return;
                }
                self.videoPlayer.dispose();
                self.videoPlayer = null;
                $(".video_list li").removeClass("current");
                $(this).addClass("current");
                self.showVideo(src, self.opt);
            });
            //禁止右键
            $("#video_container").bind("contextmenu", function(){
                return false;
            });
        },
        videoPlayer : null,
        opt : null,
        //只保存视频url 不保存后缀
        currentVideo : '',
        showVideo : function(videoSource, opt){
            var self = this;
            self.videoPlayer && self.videoPlayer.dispose();
            opt = opt || {};
            opt.width = (opt.width || 640);
            opt.height = (opt.height||360);
            if(opt.autoplay != false){
                opt.autoplay = true;
            }
            self.opt = opt;
            if(!videoSource){
                alert("没有视频源");
                return;
            }
            var source = "";
            //支持传两种格式的视频参数 字符串 或者数组数组项必须是object 包括url和type属性
            if(self.getType(videoSource) == "string"){
                var type = videoSource.lastIndexOf(".");
                var video = videoSource;
                if(type != -1){
                    video = videoSource.substring(0, type);
                }
                self.currentVideo = video;
                source += '<source src="'+ video +'.mp4" type="video/mp4" />';
                source += '<source src="'+ video +'.ogv" type="video/ogg" />';
            }else if(self.getType(videoSource) == "array" && videoSource.length > 0){
                for(var i = 0; i < videoSource.length; i++){
                    var v = videoSource[i];
                    source += '<source src="'+ v.url +'" type="' + v.type + '" />';
                }
                self.currentVideo = videoSource[0].url;
            }
            var playStr = [
                '<video id="help_video" class="video-js vjs-sublime-skin"',
                ' controls="controls" autoplay="auto" preload="auto" width="' + opt.width +'" height="' + opt.height+ '" >',
                source,
                '</video>'
            ].join("");
            self.showMask();
            self.createVideoContainer && self.createVideoContainer(opt.width + 200, opt.height, opt.videoList);
            $(".video_list li").removeClass("current");
            $(".video_list li").each(function(i){
                var ele = $(this);
                var href = ele.attr("_datahref");
                if(self.currentVideo.indexOf(href.substring(0, href.lastIndexOf("."))) != -1){
                    ele.addClass("current");
                }
            });
            $("#video_container").find(".video").html(playStr);
            videojs.options.flash.swf = "https://res.xiaoman.cn/life.js/res/swf/video-js.swf";
            self.videoPlayer = videojs("help_video", {
                "autoplay": opt.autoplay,
                "preload": opt.preload || "auto",
                "controls": true,
                "loop" : opt.loop || 'true'
            }, function(){
                $("#video_container").show();
            });

        }
    }
});