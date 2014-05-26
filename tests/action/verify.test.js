seajs.use(["verify", "$"],function(m,$){

    module( "isMobile(text) 测试" );

    test('isMobile(text)正确用例', function() {
        var texts = [
            '13824407678',
            '13533333333',
            '18865895478'
        ];
        for(var i in texts){
            ok(m.isMobile(texts[i]), "验证“" + texts[i] + "”为手机号");
        }
    });

    test('isMobile(text)异常用例', function() {
        var texts = [
            '11824407678',
            '138244076788',
            '1382440767',
            '1382440767a',
            'b1382440767',
            '1382c440767'
        ];
        for(var i in texts){
            ok(!m.isMobile(texts[i]), "验证“" + texts[i] + "”不是手机号");
        }
    });


    module( "isZipCode(text) 测试" );

    test('isZipCode(text)正确用例', function() {
        var texts = [
            '514200',
            '510000',
            '518000',
            '100000'
        ];
        for(var i in texts){
            ok(m.isZipCode(texts[i]), "验证“" + texts[i] + "”为邮政编码");
        }
    });

    test('isZipCode(text)异常用例', function() {
        var texts = [
            '5142000',
            '51420',
            '51420a',
            'b51420a',
            '514c20a'
        ];
        for(var i in texts){
            ok(!m.isZipCode(texts[i]), "验证“" + texts[i] + "”不是邮政编码");
        }
    });


    module( "isQQ(text) 测试" );

    test('isQQ(text)正确用例', function() {
        var texts = [
            '450142351',
            '10000',
            '2220707345',
            '1234567891'
        ];
        for(var i in texts){
            ok(m.isQQ(texts[i]), "验证“" + texts[i] + "”为QQ号");
        }
    });

    test('isQQ(text)异常用例', function() {
        var texts = [
            '5999',
            '12345678911',
            '5999ab'
        ];
        for(var i in texts){
            ok(!m.isQQ(texts[i]), "验证“" + texts[i] + "”不是QQ号");
        }
    });


    module( "isIP(text) 测试" );

    test('isIP(text)正确用例', function() {
        var texts = [
            '192.168.1.1',
            '10.6.208.116',
            '127.0.0.1',
            '255.255.255.255',
            '1.1.1.1'
        ];
        for(var i in texts){
            ok(m.isIP(texts[i]), "验证“" + texts[i] + "”为IP");
        }
    });

    test('isIP(text)异常用例', function() {
        var texts = [
            '192.168.1.1001',
            '192.168.256.1',
            'a.168.1.1',
            '-1.168.1.2'
        ];
        for(var i in texts){
            ok(!m.isIP(texts[i]), "验证“" + texts[i] + "”不是IP");
        }
    });

    module( "isMail(text) 测试" );

    test('isMail(text)正确用例', function() {
        var texts = [
            '2220707345@qq.com',
            'elianlin@tencent.com',
            'lin.yue@foxmail.com',
            'elian-yue@tencent.com.cn',
            '123_abc-def.qq@live.sb',
            'a@b.cn'
        ];
        for(var i in texts){
            ok(m.isMail(texts[i]), "验证“" + texts[i] + "”为邮箱");
        }
    });

    test('isMail(text)异常用例', function() {
        var texts = [
            '@qq.com',
            'test.html@com',
            'abc@foxmail@com',
            'test.html@live_cn'
        ];
        for(var i in texts){
            ok(!m.isMail(texts[i]), "验证“" + texts[i] + "”不是邮箱");
        }
    });


    module( "isCertificate(text) 测试" );

    test('isCertificate(text)正确用例', function() {
        var texts = [
            '441422198808250037',
            '44142219880825003X',
            '44142219880825003x',
            '320311770706001'
        ];
        for(var i in texts){
            ok(m.isCertificate(texts[i]), "验证“" + texts[i] + "”为身份证号码");
        }
    });

    test('isCertificate(text)异常用例', function() {
        var texts = [
            '441422198808450037',
            '441422180808250037',
            '44142219880825003y',
            '44142219880825003Y'
        ];
        for(var i in texts){
            ok(!m.isCertificate(texts[i]), "验证“" + texts[i] + "”不是身份证号码");
        }
    });


    module( "isChinese(text) 测试" );

    test('isChinese(text)正确用例', function() {
        var texts = [
            '林跃',
            '中华人民共和国'
        ];
        for(var i in texts){
            ok(m.isChinese(texts[i]), "验证“" + texts[i] + "”为中文");
        }
    });

    test('isChinese(text)异常用例', function() {
        var texts = [
            'abc',
            '123',
            '中国abc',
            'abc中国',
            '中abc国',
            'さしすせ',
            'αβγδ'
        ];
        for(var i in texts){
            ok(!m.isChinese(texts[i]), "验证“" + texts[i] + "”不是中文");
        }
    });


    module( "isLetter(text) 测试" );

    test('isLetter(text)正确用例', function() {
        var texts = [
            'a',
            'abcd'
        ];
        for(var i in texts){
            ok(m.isLetter(texts[i]), "验证“" + texts[i] + "”为英文字母");
        }
    });

    test('isLetter(text)异常用例', function() {
        var texts = [
            '123',
            '123abc',
            '中国abc',
            'さしすせ',
            'αβγδ'
        ];
        for(var i in texts){
            ok(!m.isLetter(texts[i]), "验证“" + texts[i] + "”不是英文字母");
        }
    });

    module( "isNumber(text) 测试" );

    test('isNumber(text)正确用例', function() {
        var texts = [
            '0',
            '123',
            '123.45',
            '-888'
        ];
        for(var i in texts){
            ok(m.isNumber(texts[i]), "验证“" + texts[i] + "”为数字");
        }
    });

    test('isNumber(text)异常用例', function() {
        var texts = [
            '123a',
            '123.3.3'
        ];
        for(var i in texts){
            ok(!m.isNumber(texts[i]), "验证“" + texts[i] + "”不是数字");
        }
    });


    module( "isInt(text) 测试" );

    test('isInt(text)正确用例', function() {
        var texts = [
            '0',
            '123',
            '-888'
        ];
        for(var i in texts){
            ok(m.isInt(texts[i]), "验证“" + texts[i] + "”为整数");
        }
    });

    test('isInt(text)异常用例', function() {
        var texts = [
            '1.2',
            '123a',
            '123.3.3'
        ];
        for(var i in texts){
            ok(!m.isInt(texts[i]), "验证“" + texts[i] + "”不是整数");
        }
    });


    module( "isFloat(text) 测试" );

    test('isFloat(text)正确用例', function() {
        var texts = [
            '0.1',
            '3.1415926',
            '-6.18',
            '123.0'
        ];
        for(var i in texts){
            ok(m.isFloat(texts[i]), "验证“" + texts[i] + "”为浮点数");
        }
    });

    test('isFloat(text)异常用例', function() {
        var texts = [
            '123',
            '123.',
            '123.a',
            '1,23',
            '123.3.3'
        ];
        for(var i in texts){
            ok(!m.isFloat(texts[i]), "验证“" + texts[i] + "”不是浮点数");
        }
    });

    module( "isFloat(text) 测试" );

    test('isFloat(text)正确用例', function() {
        var texts = [
            '0.1',
            '3.1415926',
            '-6.18',
            '123.0'
        ];
        for(var i in texts){
            ok(m.isFloat(texts[i]), "验证“" + texts[i] + "”为浮点数");
        }
    });

    test('isFloat(text)异常用例', function() {
        var texts = [
            '123',
            '123.',
            '123.a',
            '1,23',
            '123.3.3'
        ];
        for(var i in texts){
            ok(!m.isFloat(texts[i]), "验证“" + texts[i] + "”不是浮点数");
        }
    });


    module( "isUrl(text) 测试" );

    test('isUrl(text)正确用例', function() {
        var texts = [
            "http://www.qq.com",
            "https://www.qq.com",
            "http://192.168.0.1",
            "http://localhost",
            "http://aa.bb:8080",
            "http://ww-w.q_q.com/index.html",
            "http://www.qq.com/default/test.html",
            "http://dev.fengchi.qq.com/gallop/test.html/",
            "http://url.cn/HcZJ5M"
        ];
        for(var i in texts){
            ok(m.isUrl(texts[i]), "验证“" + texts[i] + "”为不带参数和锚点的链接");
        }
    });

    test('isUrl(text)异常用例', function() {
        var texts = [
            "ftp://www.qq.com",
            "http://aa",
            "http://www.qq..com",
            "http://.com",
            "abc",
            " ",
            null
        ];
        for(var i in texts){
            ok(!m.isUrl(texts[i]), "验证“" + texts[i] + "”不是不带参数和锚点的链接");
        }
    });


    module( "isLink(text) 测试" );

    test('isLink(text)正确用例', function() {
        var texts = [
            "http://www.qq.com",
            "https://www.qq.com?a=123",
            "http://192.168.0.1?a=123#abc",
            "http://localhost?a=123",
            "http://aa.bb:8080?a=123",
            "http://ww-w.q_q.com/index.html?a=123",
            "http://www.qq.com/default/test.html?a=123",
            "http://dev.fengchi.qq.com/gallop/test.html/?a=123",
            "http://url.cn/HcZJ5M?a=123"
        ];
        for(var i in texts){
            ok(m.isLink(texts[i]), "验证“" + texts[i] + "”为允许带参数和锚点的链接");
        }
    });

    test('isLink(text)异常用例', function() {
        var texts = [
            "ftp://www.qq.com?a=123",
            "http://aa?a=123",
            "http://www.qq..com?a=123",
            "http://.com?a=123",
            "abc",
            " ",
            null
        ];
        for(var i in texts){
            ok(!m.isLink(texts[i]), "验证“" + texts[i] + "”不是允许带参数和锚点的链接");
        }
    });
})