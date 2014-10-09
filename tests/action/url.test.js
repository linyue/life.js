seajs.use("url",function(url){

    var search = "?a=123&b=xyz&c=参数";
    if(decodeURIComponent(window.location.search) != search){
        window.location.search = search;
    };

    module( "getParam(key[, url]) 测试" );

    test('getParam(key)', function() {
        equal(url.getParam("a"), "123", "本页面链接参数 a = " + url.getParam("a") + " ,获取成功！");
        equal(url.getParam("b"), "xyz", "本页面链接参数 b = " + url.getParam("b") + " ,获取成功！");
        equal(url.getParam("c"), "参数", "本页面链接参数 c = " + url.getParam("c") + " ,获取成功！");
        equal(url.getParam("d"), null, "本页面链接不存在参数d！");
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

    module( "getParams([url]) 测试" );

    test('getParams()', function() {
        var result = {
            a: "123",
            b: "xyz",
            c: "参数"
        }
        equal(JSON.stringify(url.getParams()),JSON.stringify(result),"本页面链接参数为" + JSON.stringify(url.getParams()) + " ,获取成功！");
    });

    test('getParams(url)', function() {
        var testCase = [{
            url: 'http://www.qq.com/',
            result: {}
        },{
            url: 'http://www.qq.com/index.html',
            result: {}
        },{
            url: 'http://www.qq.com/index.html#xyz',
            result: {}
        },{
            url: 'http://www.qq.com/index.html?a=123',
            result: {"a": "123"}
        },{
            url: 'http://www.qq.com/index.html?a=123&b=456',
            result: {a: '123', b: '456'}
        },{
            url: 'http://www.qq.com/index.html?a=123&b=&c=789',
            result: {a: '123', b: '', c: '789'}
        },{
            url: 'http://www.qq.com/index.html?a=123&b=456#xyz',
            result: {a: '123', b: '456'}
        }]

        for(var i = 0 ;i < testCase.length; i++){
            equal(JSON.stringify(url.getParams(testCase[i].url)), JSON.stringify(testCase[i].result), testCase[i].url + "的参数为：" + JSON.stringify(testCase[i].result) + " ,获取成功！");
        }
    });

    module( "getHash([url]) 测试" );

    test('getHash()', function() {
        window.location.hash = "abc";
        equal(url.getHash(),"abc","本页面链接的hash为" + url.getHash() + " ,获取成功！");
    });

    test('getHash(url)', function() {
        var urlStr = 'http://www.qq.com/examples/test.html';
        equal(url.getHash(urlStr), "", "[" + urlStr + "]的hash为'' ,获取成功！");

        urlStr = 'http://www.qq.com/examples/test.html#xxx?a=111&b=222#yyy?c=333&d=444#zzz';
        equal(url.getHash(urlStr), "xxx?a=111&b=222#yyy?c=333&d=444#zzz", "[" + urlStr + "]的hash为" + url.getHash(urlStr) + " ,获取成功！");
    });

    module( "parse([url]) 测试" );

    test('parse()', function() {
        var result = {
            protocol: "http:",
            host: "dn-life-js.qbox.me",
            port: "",
            pathname: "/tests/url.html",
            search: "?a=123&b=xyz&c=参数",
            hash: "#abc",
            origin: "http://dn-life-js.qbox.me"
        }
        equal(JSON.stringify(url.parse()),JSON.stringify(result),"本页面链接参数为" + JSON.stringify(url.parse()) + " ,获取成功！");
    });

    test('parse(url)', function() {

        var testCase = [{
            url: 'http://www.qq.com/',
            result: {
                protocol: "http:",
                host: "www.qq.com",
                port: "",
                pathname: "/",
                search: "",
                hash: "",
                origin: "http://www.qq.com"
            }
        },{
            url: 'https://www.qq.com/index.html',
            result: {
                protocol: "https:",
                host: "www.qq.com",
                port: "",
                pathname: "/index.html",
                search: "",
                hash: "",
                origin: "https://www.qq.com"
            }
        },{
            url: 'http://www.qq.com:8080/a/b?a=123&b=456#xyz',
            result: {
                protocol: "http:",
                host: "www.qq.com",
                port: "8080",
                pathname: "/a/b",
                search: "?a=123&b=456",
                hash: "#xyz",
                origin: "http://www.qq.com"
            }
        }]

        for(var i = 0 ;i < testCase.length; i++){
            equal(JSON.stringify(url.parse(testCase[i].url)), JSON.stringify(testCase[i].result), testCase[i].url + "的参数为：" + JSON.stringify(testCase[i].result) + " ,获取成功！");
        }
    });
})