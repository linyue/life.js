seajs.use([
    "$",
    "url",
    "template",
    "JSON"
],function($, url, template, JSON){

    var Doc = {

        api_id: '',
        apiList: {},
        apiInfo: {},

        init: function(){

            var self = this;

            if(!url.getHash()){
                window.location.hash = '#page'
            }

            self.api_id = url.getHash();
            self.getApiList();

            self.renderNav();
            self.renderDoc();

            for(var i in self){
                if(i.indexOf("bind") == 0 && $.isFunction(self[i])){
                    self[i]();
                }
            }
        },

        getApiList: function(){
            var self = this;
            $.ajax({
                url: 'apis.json',
                type: 'post',
                dataType: 'json',
                async: false,
                success: function(json){
                    self.apiList = json;
                }
            });
        },

        getApiInfo: function(){
            var self = this;
            $.ajax({
                url: 'apis/' + self.api_id + '.json',
                type: 'post',
                dataType: 'json',
                async: false,
                success: function(json){
                    self.apiInfo = json;
                },
                error: function(){
                    self.apiInfo = {
                        "name": "",
                        "explain": "",
                        "version": "",
                        "auth": "adam[linyue@live.cn]",
                        "path": "",
                        "params": [],
                        "method": [],
                        "returnVal": null,
                        "urls": {},
                        "compatibility": [],
                        "history": []
                    };
                }
            });
        },

        renderNav: function(){
            var self = this;

            var nav = [];
            for(var i = 0; i < self.apiList.length; i++){
                var tpl = $(template('tpl_nav', self.apiList[i]));
                nav.push(tpl);
            }

            $(".nav ul").html("").append(nav);

            //高亮当前api
            var activeNode = $("li[date_id='" + self.api_id + "'] .api_title");
            activeNode.addClass("active");
            activeNode.parents(".apiList_item").addClass("active");
            activeNode.parents(".apiType_item").addClass("active");
        },

        renderDoc: function(){
            var self = this;

            self.getApiInfo();

            if(self.apiInfo.returnVal.dataType == "object" && self.apiInfo.returnVal.define){
                self.apiInfo.returnVal.define = JSON.stringify(self.apiInfo.returnVal.define, {}, 4);
            }

            if(self.apiInfo.method){
                for(var i = 0; i < self.apiInfo.method.length; i++){
                    if(self.apiInfo.method[i].returnVal && self.apiInfo.method[i].returnVal.dataType == "object"){
                        self.apiInfo.method[i].returnVal.define = JSON.stringify(self.apiInfo.method[i].returnVal.define, {}, 4);
                    }
                }
            }

            var doc = $(template("tpl_doc", self.apiInfo))

            $(".doc").html("").append(doc);
        },

        bindNav: function(){
            var self = this;

            $(".apiType_item h2").click(function(){

                var item = $(this).parents(".apiType_item");
                if(item.hasClass("active")){
                    item.find(".apiList").slideUp(function(){
                        item.removeClass("active");
                    })
                    return false;
                }

                $(".apiType_item .apiList").slideUp(function(){
                    $(".apiType_item").removeClass("active");
                });

                item.find(".apiList").slideDown(function(){
                    item.addClass("active");
                })
            })

            $(".sub_title").click(function(){
                var item = $(this).parents(".apiList_item");
                if(item.hasClass("active")){
                    item.find(".subList").slideUp(function(){
                        item.removeClass("active");
                    })
                    return false;
                }

                $(".apiList_item .subList").slideUp(function(){
                    $(".apiList_item").removeClass("active");
                });

                item.find(".subList").slideDown(function(){
                    item.addClass("active");
                })
            })

            $(".api_title").click(function(){

                if($(this).hasClass("sub_title")){
                    return false;
                }

                $(".api_title").removeClass("active");
                $(this).addClass("active");

                //重新渲染
                var api_id = $(this).parent("li").attr("date_id");
                window.location.hash = "#" + api_id;
                self.api_id = api_id;
                self.renderDoc();
            })
        }
    }

    Doc.init();
})