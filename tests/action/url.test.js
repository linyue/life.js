seajs.use("url",function(url){

    module( "getParam(key[, url]) 测试" );

    test('getParam(key)', function() {
        var search = "?a=123&b=abc456";
        if(window.location.search != search){
            window.location.search = search;
        };
        equal(url.getParam("a"),"123","本页面链接参数 a = " + url.getParam("a") + " ,获取成功！");
        equal(url.getParam("b"),"abc456","本页面链接参数 b = " + url.getParam("b") + " ,获取成功！");
        equal(url.getParam("c"),null,"本页面链接不存在参数c！");
    });

    test('getParam(key,url)', function() {
        var urlStr = "http://www.qq.com/";
        equal(url.getParam("a",urlStr),null,"[" + urlStr + "]不带参数");

        urlStr = "http://www.qq.com?a=111&b=222&c=中文#hash1?d=333&e=444#hash2";
        equal(url.getParam("a",urlStr),"111","[" + urlStr + "]参数 a = " + url.getParam("a", urlStr) + " ,获取成功！");
        equal(url.getParam("b",urlStr),"222","[" + urlStr + "]参数 b = " + url.getParam("b", urlStr) + " ,获取成功！");
        equal(url.getParam("c",urlStr),"中文","[" + urlStr + "]参数 c = " + url.getParam("c", urlStr) + " ,获取成功！");
        equal(url.getParam("d",urlStr),null,"[" + urlStr + "]不存在参数d！");
    });


    module( "getHash([url]) 测试" );

    test('getParam(key)', function() {
        window.location.hash = "abc";
        equal(url.getHash(),"abc","本页面链接的hash为" + url.getHash() + " ,获取成功！");

        var urlStr = 'http://www.qq.com/examples/test.html';
        equal(url.getHash(urlStr), "", "[" + urlStr + "]的hash为'' ,获取成功！");

        urlStr = 'http://www.qq.com/examples/test.html#xxx?a=111&b=222#yyy?c=333&d=444#zzz';
        equal(url.getHash(urlStr), "xxx?a=111&b=222#yyy?c=333&d=444#zzz", "[" + urlStr + "]的hash为" + url.getHash(urlStr) + " ,获取成功！");

    });


})