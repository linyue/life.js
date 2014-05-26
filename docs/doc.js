seajs.use(['$', "url", "template"],function($, url, template){

    var doc = {};
    var apis = {};
    var api = {};

    var getApiList = function(){
        $.ajax({
            url: 'apis.json',
            type: 'post',
            dataType: 'json',
            async: false,
            success: function(json){
                apis = json;
            }
        });
    };

    var getApiInfo = function(){
        $.ajax({
            url: 'apis/' + url.getParam("api") + '.json',
            type: 'post',
            dataType: 'json',
            async: false,
            success: function(json){
                api = json;
            }
        });
    };

    var init = function(){

        if(!url.getParam("api")){
            var link = window.location.href.split("?")[0];
            window.location.href = link + "?api=page";
        }

        getApiList();
        getApiInfo();
        nav = $(".apiType");
        doc = {
            name: $(".name"),
            explain: $(".explain"),
            param: $(".param"),
            returnVal: $(".return"),
            examples: $(".examples"),
            demo: $(".demo"),
            open: $(".open")
        };
    };

    var renderDoc = function(){
        //渲染api菜单
        $.each(apis,function(k,v){
            var htmlStr = template.render('nav', v);
            var navHtml =  $(htmlStr);
            var subNavHtml = navHtml.find(".subNav");

            $.each(v.apiList,function(k,v){
                var subNavStr = template.render('subNav', v);
                subNavHtml.append($(subNavStr).data("api",v.api).addClass(v.api.replace(/\(\)/g,"").replace(/\$\./g,"").replace(/fn\./g,"").replace(/\./g,"")));
            });

            nav.append(navHtml);
        });

        //设置菜单显示
        $("." + url.getParam('api')).addClass("active").parents("li").addClass("active").find(".subNav").show();

        //渲染api说明
        doc.name.text(api.name);
        doc.explain.html(api.explain);

        //渲染参数
        if(api.param){
            $.each(api.param, function(k,v){
                var param = v;
                param.key = k;
                var str = template.render('param', param);
                doc.param.append(str);
            });
        }else{
            doc.param.append("<li>null</li>");
        }

        //渲染返回值

        if(api.return){
            var returnVal = api.return;
            var str = template.render('return', returnVal);
            doc.returnVal.append(str);
        }else{
            doc.returnVal.append("<li>null</li>");
        }

        console.log(api)
        $(".demoWrapper iframe").attr("src",api.debug);

    }

    var bindEvent = function(){

        $(".apiType li h2 a").click(function(){
            if($(this).parents("li").hasClass("active")){
                $(".active .subNav").slideUp();
                $(".apiType > li").removeClass("active");
            }else{
                $(".apiType > li").removeClass("active");
                $(this).parents("li").addClass("active");
                $(".subNav").slideUp();
                $(".active .subNav").slideDown();
            }
        })


        $(".subNav li").click(function(){
            var api = $(this).data("api").replace(/\(\)/g,"").replace(/\$\./g,"").replace(/fn\./g,"").replace(/\./g,"");
            var url = window.location.href.split("?")[0];
            window.location.href = url + "?api=" + api;
        })

        doc.examples.find("li").click(function(){
            var demo = $(this).data("debug");
            doc.demo.attr("src",demo);
        })

        doc.examples.find("li").eq(0).click();

        doc.open.click(function(){
            var url = doc.demo.attr("src");
            window.open(url);
        });
    };

    init();
    renderDoc();
    bindEvent();
})