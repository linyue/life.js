seajs.use("$",function($){

    module( "page(options) 参数测试" );

    var options = {
        id: 'pageContainer',
        funName: 'getList',
        totalItem: 150
    }

    var getShowInfo = function(){
        var page = $("#pageContainer > div");
        var showInfo = {
            pageSize: page.find(".i_pageSize").length,
            pageInfo: page.find(".i_pageInfo").length,
            pageFirst: page.find(".i_pageFirst").length,
            pagePrev: page.find(".i_pagePrev").length,
            pageNum: page.find(".i_pageNum").length,
            pageNext: page.find(".i_pageNext").length,
            pageEnd: page.find(".i_pageEnd").length,
            pageSkip: page.find(".i_pageSkip").length
        }
        return showInfo;
    }

    test('options --> pageLimit', function() {
        stop();
        var getList50 = function(curPage, pageSize){
            options.funName = 'getList50';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.pageLimit = 8;
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                equal(page.find(".i_pageNum").length, 8, '总页数15，设置 pageLimit 为 8，页码共有8个，参数生效！');
                start();
            })
            life.page(options);
        }
        getList50(3, 10);
    });

    test('options --> exClass', function() {
        stop();
        var exClass = "define";
        var getList0 = function(curPage, pageSize){
            options.funName = 'getList0';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.exClass = exClass;
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                ok(page.hasClass(exClass), '附加 Class 为 define，参数生效！');
                start();
            })
            life.page(options);
        }
        getList0(3, 10);
     });

    test('options --> type', function() {
        stop();
        stop();
        stop();
        stop();
        stop();
        var getList1 = function(curPage, pageSize){
            options.funName = 'getList1';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.type = 'normal';
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==1 &&
                    showInfo.pageInfo ==1 &&
                    showInfo.pageFirst ==1 &&
                    showInfo.pagePrev ==1 &&
                    showInfo.pageNum > 0 &&
                    showInfo.pageNext ==1 &&
                    showInfo.pageEnd ==1 &&
                    showInfo.pageSkip ==1
                )
                ok(assertion, '设置 type 为 normal，参数生效！');
                start();
            })
            life.page(options);
        }
        getList1(3, 10);

        var getList2 = function(curPage, pageSize){
            options.funName = 'getList2';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.type = 'number';
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==0 &&
                        showInfo.pageInfo ==0 &&
                        showInfo.pageFirst ==0 &&
                        showInfo.pagePrev ==0 &&
                        showInfo.pageNum > 0 &&
                        showInfo.pageNext ==0 &&
                        showInfo.pageEnd ==0 &&
                        showInfo.pageSkip ==0
                    )
                ok(assertion, '设置 type 为 number，参数生效！');
                start();
            })
            life.page(options);
        }
        getList2(3, 10);

        var getList3 = function(curPage, pageSize){
            options.funName = 'getList3';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.type = 'simple';
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==0 &&
                        showInfo.pageInfo ==0 &&
                        showInfo.pageFirst ==0 &&
                        showInfo.pagePrev ==1 &&
                        showInfo.pageNum == 0 &&
                        showInfo.pageNext ==1 &&
                        showInfo.pageEnd ==0 &&
                        showInfo.pageSkip ==0
                    )
                ok(assertion, '设置 type 为 simple，参数生效！');
                start();
            })
            life.page(options);
        }
        getList3(3, 10);

        var getList4 = function(curPage, pageSize){
            options.funName = 'getList4';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.type = null;
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==1 &&
                    showInfo.pageInfo ==1 &&
                    showInfo.pageFirst ==1 &&
                    showInfo.pagePrev ==1 &&
                    showInfo.pageNum > 0 &&
                    showInfo.pageNext ==1 &&
                    showInfo.pageEnd ==1 &&
                    showInfo.pageSkip ==1
                )
                ok(assertion, '不设置 type 为，则使用默认值 normal！');
                start();
            })
            life.page(options);
        }
        getList4(3, 10);

        var getList5 = function(curPage, pageSize){
            options.funName = 'getList5';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.type = 'abc';
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                showInfo.pageSize ==1 &&
                    showInfo.pageInfo ==1 &&
                    showInfo.pageFirst ==1 &&
                    showInfo.pagePrev ==1 &&
                    showInfo.pageNum > 0 &&
                    showInfo.pageNext ==1 &&
                    showInfo.pageEnd ==1 &&
                    showInfo.pageSkip ==1
                )
                ok(assertion, '设置 type 为 abc, 参数不生效，使用默认参数 normal。');
                start();
            })
            life.page(options);
        }
        getList5(3, 10);
    });

    test('options --> theme', function() {
        stop();
        stop();
        stop();
        stop();
        var getList6 = function(curPage, pageSize){
            options.funName = 'getList6';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.theme = 'bootstrap';
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = page.hasClass("i_bootstrap") && !page.hasClass("i_default");
                ok(assertion, '设置 theme 为 bootstrap，参数生效！');
                start();
            })
            life.page(options);
        }
        getList6(3, 10);

        var getList7 = function(curPage, pageSize){
            options.funName = 'getList7';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.theme = 'metro';
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = page.hasClass("i_metro") && !page.hasClass("i_default");
                ok(assertion, '设置 theme 为 metro，参数生效！');
                start();
            })
            life.page(options);
        }
        getList7(3, 10);

        var getList8 = function(curPage, pageSize){
            options.funName = 'getList8';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.theme = null;
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = page.hasClass("i_default");
                ok(assertion, '不设置 theme，则使用默认值 default！');
                start();
            })
            life.page(options);
        }
        getList8(3, 10);

        var getList9 = function(curPage, pageSize){
            options.funName = 'getList9';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.theme = 'abc';
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = !page.hasClass("i_abc") && page.hasClass("i_default");
                ok(assertion, '设置 theme 为 abc，参数不合法，不生效！使用默认参数 default');
                start();
            })
            life.page(options);
        }
        getList9(3, 10);
    });

    test('options --> skin', function() {
        stop();
        stop();
        stop();
        var getList10 = function(curPage, pageSize){
            options.funName = 'getList10';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.skin = 'blue';
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = page.hasClass("i_blue") && !page.hasClass("i_grey");
                ok(assertion, '设置 skin 为 blue，参数生效！');
                start();
            })
            life.page(options);
        }
        getList10(3, 10);

        var getList11 = function(curPage, pageSize){
            options.funName = 'getList11';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.skin = null;
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = page.hasClass("i_grey");
                ok(assertion, '不设置 skin，则使用默认值 grey！');
                start();
            })
            life.page(options);
        }
        getList11(3, 10);

        var getList12 = function(curPage, pageSize){
            options.funName = 'getList12';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.skin = 'abc';
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = !page.hasClass("i_abc") && page.hasClass("i_grey");
                ok(assertion, '设置 skin 为 abc，参数不合法，不生效！使用默认参数 grey');
                start();
            })
            life.page(options);
        }
        getList12(3, 10);
    });

    test('options --> align', function() {
        stop();
        stop();
        stop();
        var getList13 = function(curPage, pageSize){
            options.funName = 'getList13';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.align = 'left';
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = page.css("textAlign") == "left";
                ok(assertion, '设置 align 为 left，参数生效！');
                start();
            })
            life.page(options);
        }
        getList13(3, 10);

        var getList14 = function(curPage, pageSize){
            options.funName = 'getList14';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.align = null;
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = page.css("textAlign") == "center";
                ok(assertion, '不设置 align，则使用默认值 center！');
                start();
            })
            life.page(options);
        }
        getList14(3, 10);

        var getList15 = function(curPage, pageSize){
            options.funName = 'getList15';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.align = 'abc';
            options.callback = (function(info){
                var page = $("#pageContainer > div");
                var assertion = page.css("textAlign") == "center";
                ok(assertion, '设置 align 为 abc，参数不合法，不生效！使用默认参数 center');
                start();
            })
            life.page(options);
        }
        getList15(3, 10);
    });

    test('options --> isShowSize', function() {
        stop();
        var getList16 = function(curPage, pageSize){
            options.funName = 'getList16';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.isShowSize = false;
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==0 &&
                    showInfo.pageInfo ==1 &&
                    showInfo.pageFirst ==1 &&
                    showInfo.pagePrev ==1 &&
                    showInfo.pageNum > 0 &&
                    showInfo.pageNext ==1 &&
                    showInfo.pageEnd ==1 &&
                    showInfo.pageSkip ==1
                )
                ok(assertion, '设置 isShowSize 为 false，参数生效！');
                start();
            })
            life.page(options);
        }
        getList16(3, 10);
    });

    test('options --> isShowInfo', function() {
        stop();
        var getList17 = function(curPage, pageSize){
            options.funName = 'getList17';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.isShowInfo = false;
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==0 &&
                        showInfo.pageInfo ==0 &&
                        showInfo.pageFirst ==1 &&
                        showInfo.pagePrev ==1 &&
                        showInfo.pageNum > 0 &&
                        showInfo.pageNext ==1 &&
                        showInfo.pageEnd ==1 &&
                        showInfo.pageSkip ==1
                    )
                ok(assertion, '设置 isShowInfo 为 false，参数生效！');
                start();
            })
            life.page(options);
        }
        getList17(3, 10);
    });

    test('options --> isShowPN', function() {
        stop();
        var getList18 = function(curPage, pageSize){
            options.funName = 'getList18';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.isShowPN = false;
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==0 &&
                        showInfo.pageInfo ==0 &&
                        showInfo.pageFirst ==1 &&
                        showInfo.pagePrev ==0 &&
                        showInfo.pageNum > 0 &&
                        showInfo.pageNext ==0 &&
                        showInfo.pageEnd ==1 &&
                        showInfo.pageSkip ==1
                    )
                ok(assertion, '设置 isShowPN 为 false，参数生效！');
                start();
            })
            life.page(options);
        }
        getList18(3, 10);
    });

    test('options --> isShowFE', function() {
        stop();
        var getList19 = function(curPage, pageSize){
            options.funName = 'getList19';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.isShowFE = false;
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==0 &&
                        showInfo.pageInfo ==0 &&
                        showInfo.pageFirst ==0 &&
                        showInfo.pagePrev ==0 &&
                        showInfo.pageNum > 0 &&
                        showInfo.pageNext ==0 &&
                        showInfo.pageEnd ==0 &&
                        showInfo.pageSkip ==1
                    )
                ok(assertion, '设置 isShowFE 为 false，参数生效！');
                start();
            })
            life.page(options);
        }
        getList19(3, 10);
    });

    test('options --> isShowNum', function() {
        stop();
        var getList20 = function(curPage, pageSize){
            options.funName = 'getList20';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.isShowNum = false;
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==0 &&
                        showInfo.pageInfo ==0 &&
                        showInfo.pageFirst ==0 &&
                        showInfo.pagePrev ==0 &&
                        showInfo.pageNum == 0 &&
                        showInfo.pageNext ==0 &&
                        showInfo.pageEnd ==0 &&
                        showInfo.pageSkip ==1
                    )
                ok(assertion, '设置 isShowNum 为 false，参数生效！');
                start();
            })
            life.page(options);
        }
        getList20(3, 10);
    });

    test('options --> isShowSkip', function() {
        stop();
        var getList21 = function(curPage, pageSize){
            options.funName = 'getList21';
            options.curPage = curPage;
            options.pageSize = pageSize;
            options.isShowSkip = false;
            options.callback = (function(info){
                var showInfo = getShowInfo();
                var assertion = (
                    showInfo.pageSize ==0 &&
                        showInfo.pageInfo ==0 &&
                        showInfo.pageFirst ==0 &&
                        showInfo.pagePrev ==0 &&
                        showInfo.pageNum == 0 &&
                        showInfo.pageNext ==0 &&
                        showInfo.pageEnd ==0 &&
                        showInfo.pageSkip ==0
                    )
                ok(assertion, '设置 isShowSkip 为 false，参数生效！');
                start();
            })
            life.page(options);
        }
        getList21(3, 10);
    });
})
