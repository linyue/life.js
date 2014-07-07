/**
 * Created by Administrator on 14-7-7.
 * @author Eric
 */
define(function(require, exports, module){
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
        createVideoContainer : function(width, height){
            var self = this;
            var container = $("#video_container");
            if(!container[0]){
                var videoArr = ['<div id="video_container" style="display: none;">',
                                    ' <div class="video_close" style="position: relative;">',
                                        '<a id="close_video" href="javascript:void(0);" title="关闭视频" style="position: absolute;top:0px; right: 0px; margin-top: -20px;color: #fff;text-decoration: none;display: block;padding: 1px 3px 1px 3px;">关闭</a>',
                                    '</div>',
                                    '<div class="video"></div>',
                               '</div>'].join("");
                $(document.body).append(videoArr);
                container = $("#video_container")[0];
                container.style.cssText='position: absolute;height: '+ height +'px;width: '+ width +'px;top: 50%;left: 50%;margin-left: -'+(width/2)+'px;margin-top: -'+(height/2)+'px;z-index: 5000;';
            }
            self.createVideoContainer = null;
            self.bindCloseEvent();
        },
        bindCloseEvent : function(){
           var self = this;
           $("#video_container #close_video").bind("click", function(){
               //销毁播放器
               self.videoPlayer.dispose();
               $("#video_container").hide();
               self.hideMask();
           });
        },
        videoPlayer : null,
        showVideo : function(videoSource, opt){
            opt = opt || {};
            opt.width = opt.width || 640;
            opt.height = opt.height||360
            if(!videoSource || videoSource.length < 1){
                alert("没有视频源");
                return;
            }
            var self = this,
                source = "";
            for(var i = 0; i < videoSource.length; i++){
                var v = videoSource[i];
                source += '<source src="'+ v.url +'" type="' + v.type + '" />';
            }
            var playStr = [
                '<video id="help_video" class="video-js"',
                'controls  width="' + opt.width +'" height="' + opt.height+ '">',
                source,
                '</video>'
            ].join("");
            self.showMask();
            self.createVideoContainer && self.createVideoContainer(opt.width, opt.height);
            $("#video_container").find(".video").html(playStr)
            self.videoPlayer = videojs("help_video", {
                "autoplay": opt.autoplay || true,
                "preload": opt.preload || "auto"
            }, function(){
                // Player (this) is initialized and ready.
                $("#video_container").show();
            });
        }
    }
});