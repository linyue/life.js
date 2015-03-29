seajs.use("$",function($) {

    var initPage = function(href){
        var objPath = './' + href.replace(".html", "") + '.js';

        console.log(href, objPath);

        seajs.use(objPath, function(Obj){
            new Obj();
        })
    }

    if($("#content").text() == ""){
        var urlArr = window.location.pathname.split("/");
        initPage(urlArr[urlArr.length - 1]);
    }

    $(".jump").click(function (e) {

        e.preventDefault();
        e.stopPropagation();

        var href = $(this).attr("href");

        var title = $("title").text();
        var state = {
            href: href,
            a: 123,
            b: 456
        };
        window.history.pushState(state, document.title, href);

        initPage(href);
    })

    window.addEventListener('popstate', function (e) {
        if (history.state) {
            var state = e.state;
            initPage(state.href);
        }
    }, false);

})