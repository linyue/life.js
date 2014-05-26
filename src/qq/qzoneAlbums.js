define(function (require, exports, module) {
    /**
     * Qzone相册组件
     *
     * @author elianlin@tencent.com
     * @time 2013-12-16
     */
    "use strict";

    var JSON = require('JSON');
    var $ = require('$');
    var Class = require('Class');
    var Dialog = require('dialog');
    var md5 = require('md5').md5;

    require('baseCss');
    require('src/qq/photo_logic.js');
    require('res/css/qzoneAlbums.css');

    var qzoneAlbums = Class.extend({
        //可配置参数
        options: {
            id: '',                         //容器 DOM 节点 ID
            qq: '',                         //要拉取相册的QQ号
            callback: null,                 //加载完成后执行的回调函数
            minNum: 10,                     //图片数量下限
            maxNum: 10,                     //图片数量上限
            exClass: '',                    //附加的 class
            theme: 'default',               //样式主题，可设置项有：default、bootstrap、metro
            skin: 'grey',                   //主题颜色，可设置项有：grey、red、blue、green、orange、purple
            target: 'self',                 //要弹层的页面,可设置项有：self、parent、top
            zIndex: 10000,                  //浮层的层级
            isMask: true,                   //是否显示浮层
            isFixed: true                   //是否fixed定否
        },

        pageSize: 10,
        remaining: 0,
        container: null,
        albumContainer: null,
        photosContainer: null,
        tipContainer: null,
        selectedContainer: null,
        remainingContainer: null,
        albumsList: {},
        selectedList: {},

        init: function (options) {
            this.options = $.extend({}, this.options, options);
            console.log(this.selectedList,this.albumsList,this.remaining);
            this.remaining = this.options.maxNum;
            this.render();
            this.show();
            this.getAlbumList();


        },

        render: function(){
            this.container = $("<div>").addClass("i_qzoneAlbums");
            this.albumContainer = $("<div>").addClass("i_qzoneAlbums_albumContainer");
            this.photosContainer = $("<div><h2 class='i_qzoneAlbums_info'></h2><ul></ul><div id='i_qzoneAlbums_page'></div><div class='i_qzoneAlbums_photosContainer_tip'></div></div>").addClass("i_qzoneAlbums_photosContainer");
            this.selectedContainer = $("<div><ul></ul><div class='i_qzoneAlbums_selectedContainer_tip'></div></div>").addClass("i_qzoneAlbums_selectedContainer");
            this.tipContainer = $("<div>").addClass("i_qzoneAlbums_tipContainer");
            this.tipContainer.html('<span>您还可以再选择<strong class="i_qzoneAlbums_remaining"></strong>张图片</span>');
            this.remainingContainer = this.tipContainer.find(".i_qzoneAlbums_remaining").text(this.remaining);
            this.container.append(this.albumContainer).append(this.photosContainer).append(this.tipContainer).append(this.selectedContainer);
        },

        getAlbumList: function(){
            var self = this;
            //拉取相册列表
            PhotoLogic.getAlbumList({
                uin: self.options.qq,
                type:'0111',            //相册类别  第一位：QQ秀相册；第二位：说说日志相册&朋友网头像等系统相册；第三位：私密相册（当第三位为1时，第一位反转）；第四位：用户相册&贴图相册
                projectId:101,          //默认就是101，具体代表啥不知道
                pageId:1,               //默认是1
                callBack:function(obj){
                    var albums = $("<ul>");
                    for(var i=0; i< obj.albums.length; i++){
                        var album = $('<li><img /><h3></h3></li>').attr("data_albums_id",obj.albums[i].id);
                        album.find("img").attr("src", obj.albums[i].pre);
                        album.find("h3").attr("title", obj.albums[i].name).html(obj.albums[i].name);

                        //选择相册
                        album.click(function(){
                            var albums_id = $(this).attr("data_albums_id");
                            self.albumContainer.find("li").removeClass("active");
                            $(this).addClass("active");
                            self.getAlbumPhotos(albums_id);
                        })
                        albums.append(album);
                    }
                    self.albumContainer.html(albums);
                },
                errBack:function(){
                    return false;
                }
            });
        },

        getAlbumPhotos: function(albums_id){
            var self = this;
            if(self.albumsList[albums_id]){
                self.renderPhotos(1, self.pageSize, {
                    albums_id: albums_id
                });
            }else{
                PhotoLogic.getPhotoList({
                    uin: self.options.qq,
                    callBack:function(obj){
                        self.albumsList[obj.info.id] = {
                            name: obj.info.name,
                            photos: obj.photos
                        };
                        self.renderPhotos(1, self.pageSize, {
                            albums_id: obj.info.id
                        });
                    },
                    errBack:function(){
                        return false;
                    },
                    id: albums_id,
                    projectId: 101,
                    pageId: 1
                });
            }
        },

        renderPhotos: function(curPage, pageSize, exParams){
            var self = this;
            var albums_id = exParams['albums_id'];
            var photos = self.albumsList[albums_id].photos;

            self.photosContainer.find(".i_qzoneAlbums_photosContainer_tip").remove();
            self.photosContainer.find(".i_qzoneAlbums_info").html(self.albumsList[albums_id].name);

            var photosContent = self.photosContainer.find("ul").html("");

            var first = self.pageSize * (curPage - 1);
            var end = (first + self.pageSize) > photos.length ? photos.length : (first + self.pageSize);

            for(var i = first; i< end; i++){
                var photoInfo = {
                    prePic: photos[i].pre,
                    rawPic:  photos[i].raw
                }
                var photoId = md5(photos[i].pre);
                var photo = $('<li><div class="box"><div class="mid"><img /></div></div><p></p><a class="i_qzoneAlbums_checked"></a></li>').data("photoInfo", photoInfo).addClass(photoId);
                photo.find("img").attr("src", photos[i].pre);
                photo.find("p").attr("title", photos[i].name).text(photos[i].name);

                //选取图片
                photo.click(function(){
                    if($(this).hasClass("active")){
                        var photoInfo = $(this).data("photoInfo");
                        self.deletePic(md5(photoInfo.prePic));
                    }else{
                        if(self.remaining > 0){
                            $(this).addClass("active");
                            var photoInfo = $(this).data("photoInfo");
                            var picId = md5(photoInfo.prePic);
                            self.selectedList[picId] = photoInfo;

                            var pic = $('<li><div class="box"><div class="mid"><img /></div></div><a class="i_qzoneAlbums_del"></a></li>');
                            pic.data("photoInfo", photoInfo).addClass(picId);
                            pic.find("img").attr("src", photoInfo['prePic']);
                            pic.find(".i_qzoneAlbums_del").click(function(){
                                var picInfo = $(this).parents("li").data("photoInfo");
                                self.deletePic(picId);
                            });

                            self.selectedContainer.find("ul").append(pic);
                            self.remaining--;
                            self.updateRemaining();

                            //当限量小于0时，字体变红
                            if(self.remaining == 0){
                                self.remainingContainer.css({
                                    color: '#f00'
                                })
                            }else{
                                self.remainingContainer.css({
                                    color: '#000'
                                })
                            }
                        }
                    }

                })
                photosContent.append(photo);
            }

            if(photos.length > self.pageSize){
                life.page({
                    id: 'i_qzoneAlbums_page',
                    scope: self,
                    funName: 'renderPhotos',
                    exParams: exParams,
                    curPage: curPage,
                    totalItem: photos.length,
                    type: 'normal',
                    theme: self.options.theme,
                    skin: self.options.skin,
                    pageSize: self.pageSize,
                    isShowInfo: false,
                    isShowSkip: false,
                    isShowSize: false,
                    isKeyControl: false
                });
            }else{
                self.photosContainer.find("#i_qzoneAlbums_page").html("");
            }
            for(var i in self.selectedList){
                self.photosContainer.find("." + i).addClass("active");
            }
        },

        getPhotoId: function(prePic){
            return md5(prePic);
        },

        deletePic: function(picId){
            var self = this;
            self.photosContainer.find("." + picId).removeClass("active");
            self.selectedContainer.find("." + picId).remove();
            delete self.selectedList[picId];
            self.remaining++;
            self.updateRemaining();
        },

        updateRemaining: function(){
            var self = this;
            self.remainingContainer.text(self.remaining);
            if( self.selectedContainer.find("li").length == 0){
                self.selectedContainer.find(".i_qzoneAlbums_selectedContainer_tip").show();
            }else{
                self.selectedContainer.find(".i_qzoneAlbums_selectedContainer_tip").hide();
            }
        },

        show: function(){
            var self = this;
            var options = self.options;
            var opt = {
                id: options.id,
                title: 'Qzone相册图片选择',
                content: self.container,
                width: 800,
                height: 'auto',
                exClass: options.exClass,
                theme: options.theme,
                skin: options.skin,
                target: options.target,
                btns: [{
                    text: '确定',
                    callback: function(){
                        options.callback(self.selectedList);
                    }
                }],
                zIndex: options.zIndex,
                isMask: options.isMask,
                isFixed: options.isFixed,
                isMaskColse: false,
                isKeyControl: false
            }
            new Dialog(opt);
        }
    })

    module.exports = qzoneAlbums;

})